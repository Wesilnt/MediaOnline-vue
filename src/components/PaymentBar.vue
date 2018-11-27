<script>
import {
  createNamespacedHelpers,
  mapState as rootState,
  mapActions as rootActions
} from 'vuex'
import { openVideoDetail, openAudioDetail, identityType } from '../utils/config'
import PhoneVerif from './PhoneVerif'
import Share from './share/Share'
import GroupHeader from './GroupHeader'

const { mapState, mapActions, mapGetters } = createNamespacedHelpers(
  'columnData/payment'
)

const userAccessStatusType = {
  // 完全是自己和这个专栏的状态
  GROUPBUY_FAIL: -3,
  REFUND_SINGLED: -1,
  NONE: 0,

  SINGLED: 1001,

  GROUPED: 1003,
  GROUPING: 1005,
  GROUPING_OVERTIME: 1006, //拼团中但是已超时，等待系统处理

  COLLECTED: 1007, //集赞成功未领取
  COLLECTGET: 1008, //集赞成功并领取
  COLLECTING: 1009 //集赞中
}

export default {
  name: 'Payment',
  props: {
    isTryScan: {
      default: false
    },
    userAccessStatus: {
      default: null
    },
    groupBuyId: {
      default: null
    },
    collectLikeId: {
      default: null
    }
  },
  data() {
    const {
      groupBuyId: groupBuyIdFromShare,
      collectLikeId: collectLikeIdFromShare
    } = this.$route.query
    const { columnType, courseId } = this.$route.params
    return {
      userInfo: {}, // 用户信息
      columnType,
      courseId,
      groupBuyIdFromShare, // 记录从分享进入的拼团
      collectLikeIdFromShare, // 从分享进入的集赞
      payDisabled: false, // 所有支付是否可点击
      showTeleRegister: false, // 手机号注册弹窗
      sharePageShow: false, // 分享弹框页
      groupBuyStatusType: {}
    }
  },
  computed: {
    ...rootState(['url']),
    ...mapGetters([
      'collectLikeTemplateId',
      'groupBuyTemplateId',
      'sharePostUrl',
      'groupBuyPrice',
      'price',
      'groupBuyPersonCount',
      'freeLesson',
      'courseName',
      'purchased'
    ]),
    ...mapState([
      'viewer',
      'userPaymentStatus',
      'userList',
      'groupBuyFull',
      'createTime',
      'alreadyCount',
      'groupBuystatus' /* 120 1 / 2:拼团中 3：成功  4：失败 */,
      'timeDuration',
      'loading',
      'groupBuyErr'
    ]),
    paymentGroupBuyId: function() {
      const { groupBuyIdFromShare, groupBuyId, viewer } = this
      if (
        groupBuyIdFromShare &&
        groupBuyId &&
        groupBuyIdFromShare !== groupBuyId &&
        viewer === identityType.OWNER
      ) {
        this.$dialog
          .alert({
            title: '已有更新的拼团',
            message: `<ul style='text-align: center'>
                <li>您当前专栏拼团已过期</li><li>请返回最新的拼团</li>
            </ul>`
          })
          .then(() => {
            this.returnToSelfColumn()
          })
      }
      return groupBuyIdFromShare || groupBuyId
    },
    paymentCollectLikeId: function() {
      return this.collectLikeIdFromShare || this.collectLikeId
    }
  },
  methods: {
    ...rootActions(['setWxShareFriend', 'setWxShareZone']),
    ...mapActions([
      'getGroupBuyDetail',
      'checkoutWxAuthor',
      'checkoutUserInfo',
      'hideToast',
      'startCollectLike',
      'getCollectLike',
      'endLoading'
    ]),
    async getUserInfo(forceUpdate) {
      this.userInfo = await this.checkoutUserInfo(forceUpdate)
    },
    async mapGroupBuyDetailToPayment() {
      const { paymentGroupBuyId } = await this
      if (paymentGroupBuyId) {
        await this.getGroupBuyDetail({
          groupBuyId: paymentGroupBuyId
        })
      }
      await this.setWxShare()
    },
    renderPaymentStatus() {
      const {
        viewer,
        paymentGroupBuyId,
        paymentCollectLikeId,
        userAccessStatus,
        groupBuystatus,
        userPaymentStatus,
        groupBuyFull
      } = this
      // console.log(
      //   viewer,
      //   paymentGroupBuyId,
      //   paymentCollectLikeId,
      //   userAccessStatus,
      //   groupBuystatus,
      //   groupBuyFull
      // )
      let paymentStatus = null
      if (paymentCollectLikeId) {
        // 他人集赞不进入此页面 可简单判断
        switch (userAccessStatus) {
          case userAccessStatusType.COLLECTED:
            paymentStatus = this.groupBuyStatusType.getCollect
            break
          case userAccessStatusType.COLLECTGET:
            paymentStatus = this.groupBuyStatusType.got
            break
          case userAccessStatusType.COLLECTING:
            paymentStatus = this.groupBuyStatusType.shareCollect
            break
        }
        return paymentStatus
      }
      if (paymentGroupBuyId) {
        if (groupBuystatus === 1203) {
          // 成功
          switch (viewer) {
            case identityType.OWNER:
            case identityType.PARTNER:
              paymentStatus = this.groupBuyStatusType.got
              break
            case identityType.PASSER:
              paymentStatus = this.groupBuyStatusType.succeed
              break
            case identityType.PASSERFULL:
              paymentStatus = this.groupBuyStatusType.succeed
              break
          }
          return paymentStatus
        }
        if (groupBuystatus === 1204) {
          //拼团失败
          switch (viewer) {
            case identityType.OWNER:
              paymentStatus = this.groupBuyStatusType.resume
              break
            case identityType.PARTNER:
              paymentStatus = this.groupBuyStatusType.resume
              break
            default:
              paymentStatus = this.groupBuyStatusType.failed
              break
          }
          return paymentStatus
        }
        const isGrouping = groupBuystatus === 1201 || groupBuystatus === 1202
        if (isGrouping) {
          switch (viewer) {
            case identityType.OWNER:
            case identityType.PARTNER:
              paymentStatus = this.groupBuyStatusType.shareGroupBuy
              if (userPaymentStatus === 'selfPaymentNotSuccess') {
                paymentStatus = this.groupBuyStatusType.goOnPay
              }
              if (
                userPaymentStatus === 'someonePaymentNotSuccess' &&
                groupBuyFull
              ) {
                paymentStatus = this.groupBuyStatusType.waitPaySucc
              }
              break
            case identityType.PASSER:
              switch (userAccessStatus) {
                case userAccessStatusType.SINGLED:
                case userAccessStatusType.GROUPED:
                case userAccessStatusType.COLLECTGET:
                  paymentStatus = this.groupBuyStatusType.shareGroupBuyForFriend
                  break
                case userAccessStatusType.GROUPING:
                  paymentStatus = this.groupBuyStatusType
                    .shareGroupBuyOtherGroupForFriend
                  break
                case userAccessStatusType.GROUPING_OVERTIME:
                  paymentStatus = this.groupBuyStatusType
                    .shareGroupBuyOtherGroupForFriend
                  break
                case userAccessStatusType.COLLECTED:
                  paymentStatus = this.groupBuyStatusType
                    .shareGroupBuyInCollectedForFriend
                  break
                case userAccessStatusType.COLLECTING:
                  paymentStatus = this.groupBuyStatusType
                    .shareGroupBuyInCollectingForFriend
                  break
                default:
                  paymentStatus = this.groupBuyStatusType.join
              }
              break
            case identityType.PASSERFULL:
              paymentStatus = this.groupBuyStatusType.full
              break
          }
          return paymentStatus
        }
      }
      switch (
        userAccessStatus // 从自己的页面进入
      ) {
        case userAccessStatusType.SINGLED:
        case userAccessStatusType.GROUPED:
        case userAccessStatusType.COLLECTGET:
          paymentStatus = this.groupBuyStatusType.got
          break
        case userAccessStatusType.GROUPING:
          paymentStatus = this.groupBuyStatusType.shareGroupBuy
          break
        case userAccessStatusType.GROUPING_OVERTIME:
          paymentStatus = this.groupBuyStatusType.overtime
          break
        case userAccessStatusType.COLLECTED:
          paymentStatus = this.groupBuyStatusType.getCollect
          break
        case userAccessStatusType.COLLECTING:
          paymentStatus = this.groupBuyStatusType.shareCollect
          break
        default:
          paymentStatus = this.groupBuyStatusType.normal
      }
      return paymentStatus
    },
    async handlePayment(paymentQueryType, params) {
      this.payDisabled = true
      const { userInfo } = this

      await this.checkoutWxAuthor()

      if (!userInfo || !userInfo.mobileNo) {
        await this.hideToast()
        this.toggleTeleRegister(true)
        return (this.payDisabled = false)
      }
      await this.hideToast()
      await this[paymentQueryType]({ courseId: this.courseId, ...params })
      this.payDisabled = false
    },
    renderOriginBuy(onlyPrice) {
      const { price } = this
      const originPriceClass = `payment-flex-column ${
        onlyPrice ? 'payment-onlyOrigin' : ''
      }`
      return (
        <div
          class={originPriceClass}
          onClick={this.handlePayment.bind(this, 'handleOriginBuy')}
        >
          <div class="payment-price">￥{price}</div>
          <span class="payment-low-attention">原价购买</span>
        </div>
      )
    },
    renderGroupBuy({ txt, showPrice = false, handler }) {
      const { groupBuyPrice } = this
      return (
        <div
          class="payment-flex-column"
          style={{ justifyContent: !showPrice ? 'center' : 'inherit' }}
          onClick={
            handler
              ? handler
              : this.handlePayment.bind(this, 'handleStartGroupBuy')
          }
        >
          {showPrice && <div class="payment-price">￥{groupBuyPrice}</div>}
          <span class="payment-low-attention">{txt}</span>
        </div>
      )
    },
    renderCollectBuy({ txt, showPrice = false, handler }) {
      return (
        <div
          class="payment-flex-column payment-collect"
          style={{ justifyContent: !showPrice ? 'center' : 'inherit' }}
          onClick={handler ? handler : this.handleStartCollectLike}
        >
          {showPrice && <div class="payment-price">￥00.00</div>}
          <span class="payment-low-attention">
            {showPrice ? '我要集赞' : txt}
          </span>
        </div>
      )
    },
    renderPayment({ origin, group, collect } = {}) {
      const onlyPrice = !group && !collect
      const className = this.payDisabled
        ? 'qhht-flex payment-button-wrapper disabled'
        : 'qhht-flex payment-button-wrapper'
      return (
        <div class={className}>
          {this.payDisabled && <div class="payment-button-disabled" />}
          {origin && origin(onlyPrice)}
          {!onlyPrice && (
            <div class="qhht-flex payment-button-group">
              {group && group(!origin)}
              {collect && collect(!origin)}
            </div>
          )}
        </div>
      )
    },
    handleOriginBuy() {
      return this.$router.push({
        path: '/payment',
        query: {
          payType: 'origin',
          courseId: this.courseId
        }
      })
    },
    handleJoinGroupBuy() {
      return this.$router.push({
        path: '/payment',
        query: {
          payType: 'groupBuy',
          courseId: this.courseId,
          groupBuyId: this.paymentGroupBuyId
        }
      })
    },
    handleStartGroupBuy() {
      return this.$router.push({
        path: '/payment',
        query: {
          payType: 'groupBuy',
          courseId: this.courseId
        }
      })
    },
    handleStartCollectLike() {
      return this.handlePayment('startCollectLike')
    },
    handleGetCollectLike() {
      return this.handlePayment('getCollectLike', {
        collectLikeId: this.paymentCollectLikeId
      })
    },
    //点击集赞按钮
    gotoPraising() {
      return this.$router.push({
        name: 'Praise',
        params: {
          courseId: this.courseId,
          collectLikeId: this.paymentCollectLikeId
        },
        query: {
          columnType: this.columnType
        }
      })
    },
    goToFeedBack() {
      return this.$router.push({ path: '/my/Feedback' })
    },
    async returnToSelfColumn() {
      await this.$router.push({
        name: 'ColumnDetail',
        params: { columnType: this.columnType, courseId: this.courseId }
      })
      return location.reload()
    },
    routerToSingleSet(Lesson) {
      if (!Lesson) {
        return this.$toast('暂无试听课程')
      }
      const { courseId, columnType, courseName } = this
      const { id } = Lesson
      switch (this.columnType) {
        case 'onlineCourse':
          openVideoDetail(this, {
            courseId,
            columnType,
            lessonId: id
          })
          break
        case 'FreeZone':
          break
        // case 'reading':
        //   case 'onlineVision':
        default:
          openAudioDetail(this, {
            courseId,
            columnType,
            lessonId: id,
            courseName
          })
          break
      }
    },
    toggleTeleRegister(showTeleRegister) {
      return (this.showTeleRegister = showTeleRegister)
    },
    toggleSharePage(sharePageShow = false) {
      return (this.sharePageShow = sharePageShow)
    },
    setWxShare() {
      const {
        columnType,
        courseId,
        paymentGroupBuyId,
        paymentCollectLikeId,
        url,
        courseName,
        alreadyCount,
        groupBuyPersonCount,
        userInfo,
        groupBuystatus
      } = this;
      const hrefHasSign = location.href.includes('?');
      const href = hrefHasSign ? location.href.split('?')[0] : location.href;
      const shareHref = `${href}${href.includes('?') ? '&' : '?'}`;
      let title = `我正在学习《${this.courseName}》，快来一起学习吧`,
      link = `${shareHref}preUserId=${userInfo.id}`;
      if (paymentGroupBuyId && groupBuystatus !== 1204) {
        title = `我正在参加《${courseName}》拼团活动,仅差${groupBuyPersonCount - alreadyCount}人,快来和我一起拼团吧!`;
        link = `${url}/#/detail/${columnType}/${courseId}?groupBuyId=${paymentGroupBuyId}&preUserId=${userInfo.id}`
      }
      if (paymentCollectLikeId) {
        title = `我是${userInfo.nickName}, ${
          this.viewer === identityType.OWNER ? '我想免费' : '正在帮朋友'
        }领取《${courseName}》,求助攻~`;
        link = `${url}/#/praise/active/${courseId}/${paymentCollectLikeId}?columnType=${columnType}&preUserId=${userInfo.id}`
      }
      const share = {
        title,
        link
      }
      const shareData = {
        desc: '你一定会爱上国学课...',
        imgUrl: this.sharePostUrl,
        ...share
      }
      console.log('shareLink_title ', shareData)
      this.setWxShareFriend(shareData)
      this.setWxShareZone(shareData)
    }
  },
  async mounted() {
    await this.getUserInfo()
    await this.mapGroupBuyDetailToPayment()
    // 配置状态
    let handler = this.toggleSharePage.bind(this, true)
    this.groupBuyStatusType = {
      normal: {
        txt: this.groupBuyPersonCount === 3 ? '三人团' : '六人团',
        showPrice: true,
        showOrigin: true,
        handler: false
      },
      getCollect: {
        txt: '您已集赞成功，领取专栏',
        handler: this.handleGetCollectLike
      }, //领取专栏
      shareCollect: { txt: '邀请好友集赞', handler: this.gotoPraising }, // 弹出集赞界面
      join: {
        txt: '参与拼团',
        showPrice: true,
        handler: this.handlePayment.bind(this, 'handleJoinGroupBuy')
      }, // 支付事件->弹出拼团界面
      waitPaySucc: { txt: '请等待其他参与者完成支付', handler },
      goOnPay: {
        txt: '继续支付',
        handler: this.handlePayment.bind(this, 'handleJoinGroupBuy')
      },
      shareGroupBuy: { txt: '邀请其他好友拼团', handler },
      shareGroupBuyForFriend: { txt: '您已获取该专栏，帮助好友分享', handler },
      shareGroupBuyOtherGroupForFriend: {
        txt: '您参与其他好友的拼团，帮助好友分享',
        handler
      },
      shareGroupBuyInCollectedForFriend: {
        txt: '您已集赞成功（未领取），帮助好友分享',
        handler
      },
      shareGroupBuyInCollectingForFriend: {
        txt: '您正在集赞该专栏，帮助好友分享',
        handler
      },
      got: { hide: true },
      resume: {
        txt: '拼团失败,重新开团',
        handler: this.handlePayment.bind(this, 'handleStartGroupBuy')
      },
      succeed: {
        txt: '您的好友已拼团成功',
        handler: this.returnToSelfColumn
      },
      failed: {
        txt: '当前专栏拼团失败',
        handler: this.returnToSelfColumn
      },
      overtime: {
        txt: '拼团超时，请等待系统处理',
        handler: this.returnToSelfColumn
      }, // 返回主页
      full: {
        txt: '当前专栏拼团已满',
        handler: this.returnToSelfColumn
      }
    }
    this.endLoading()
  },
  render() {
    if (this.groupBuyErr) {
      return setTimeout(() => {
        this.returnToSelfColumn()
      }, 1000)
    }
    const paymentObj = this.renderPaymentStatus()
    if (!paymentObj || this.loading) return null
    const {
      isTryScan,
      courseId,
      columnType,
      price,
      groupBuyTemplateId,
      collectLikeTemplateId,
      showTeleRegister,
      sharePageShow,
      paymentGroupBuyId,
      paymentCollectLikeId
    } = this
    const tryTxt = isTryScan ? '试看' : '试听'
    const { hide, showOrigin = false } = paymentObj || {
      txt: '当前状态错误，前去反馈',
      handler: this.goToFeedBack
    }
    let paymentBtn = this.renderPayment({
      origin: price && showOrigin && this.renderOriginBuy,
      group: groupBuyTemplateId && this.renderGroupBuy.bind(this, paymentObj),
      collect:
        collectLikeTemplateId && this.renderCollectBuy.bind(this, paymentObj)
    })
    if (paymentGroupBuyId) {
      paymentBtn = this.renderPayment({
        group: this.renderGroupBuy.bind(this, paymentObj)
      })
    }
    if (paymentCollectLikeId) {
      paymentBtn = this.renderPayment({
        collect: this.renderCollectBuy.bind(this, paymentObj)
      })
    }

    console.log(hide)
    if (hide) {
      document.getElementById('navigation').style.marginBottom = 0
    }
    return hide ? null : (
      <div>
        {paymentGroupBuyId && (
          <GroupHeader
            timeDuration={this.timeDuration}
            leavePerson={this.groupBuyPersonCount - this.alreadyCount}
            isSixGroup={this.groupBuyPersonCount > 3}
            userList={this.userList}
            groupBuystatus={this.groupBuystatus}
          />
        )}
        <div class="qhht-flex payment-wrapper">
          <div
            class="payment-flex-column payment-audition"
            onClick={this.routerToSingleSet.bind(this, this.freeLesson)}
          >
            <i class="audition-icon" />
            <span class="payment-low-attention">{tryTxt}</span>
          </div>
          {paymentBtn}
          <Share
            show={sharePageShow}
            courseId={courseId}
            postType="collage"
            close={this.toggleSharePage}
            columnType={columnType}
          />
          {showTeleRegister && (
            <PhoneVerif
              style={{ zIndex: 100 }}
              hideTeleRegister={this.toggleTeleRegister.bind(this, false)}
              succFun={this.getUserInfo.bind(this, true)}
            />
          )}
        </div>
      </div>
    )
  }
}
</script>
<style lang='less'>
.payment-wrapper {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px 28px;
  border-top: 1px solid #efefef;
  background-color: #fff;
  font-size: 20px;
  z-index: 200;
}

.payment-flex-column {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: inherit;
  height: 80px;
  padding-left: 28px;
}

.payment-audition {
  padding: 0 28px 0 0;
  border-right: 1px solid #f8f8f8;
}

.audition-icon {
  display: block;
  width: 40px;
  height: 40px;
  background: url('../assets/images/onlinecourse-tabbar-try.png') no-repeat;
  background-size: 40px;
}

.payment-low-attention {
  color: #939393;
}

.payment-button-wrapper {
  position: relative;
  flex-grow: 1;
  .payment-button-disabled {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    background-color: rgba(255, 255, 255, 0.7);
    transition: background-color 1s linear 0.4s;
  }
  &.disabled {
    pointer-events: none;
  }
}

.payment-button-group {
  flex-grow: 1;
  overflow: hidden;
  height: 80px;
  line-height: 1;
  border-radius: 80px;
  margin-left: 28px;
  .payment-flex-column {
    flex-grow: 1;
    padding: 12px;
    background: linear-gradient(
      to right,
      rgb(254, 202, 0) 0,
      rgb(254, 149, 2) 100%
    );
    &.payment-collect {
      background: linear-gradient(
        to right,
        rgb(254, 119, 0) 0,
        rgb(255, 79, 5) 100%
      );
    }
  }
  .payment-price,
  .payment-low-attention {
    color: #fff;
  }
}

.payment-onlyOrigin {
  flex-grow: 1;
  text-align: center;
  margin-left: 28px;
  border-radius: 80px;
  padding: 12px;
  line-height: 1;
  background: linear-gradient(
    to right,
    rgb(254, 202, 0) 0,
    rgb(254, 149, 2) 100%
  );
  .payment-price,
  .payment-low-attention {
    color: #fff;
  }
}

.payment-price {
  font-weight: bold;
  font-size: 30px;
  color: #ffa32f;
}
</style>

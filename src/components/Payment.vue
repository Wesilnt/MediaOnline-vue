<script>
import {
  createNamespacedHelpers,
  mapState as rootState,
  mapActions as rootActions
} from 'vuex'
import { openVideoDetail, openAudioDetail } from '../utils/config'
import PhoneVerif from './PhoneVerif'
import Share from './share/Share'
import GroupHeader from './GroupHeader'
const { mapState, mapActions, mapGetters } = createNamespacedHelpers(
  'columnData/payment'
)
const identityType = {
  OWNER: 31000, // 发起人
  PARTNER: 31001, // 此拼团参与人
  PASSER: 31002, // 非参与人 拼团未满
  PASSERFULL: 31003 // 非参与人 拼团已满
}
const origin = 'origin',
  groupBuy = 'groupBuy',
  collect = 'collect'
const PAYMENTTYPE = {
  origin,
  groupBuy,
  collect
}

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
      userInfo: {},
      columnType,
      courseId,
      master: identityType.OWNER,
      groupBuyIdFromShare,
      collectLikeIdFromShare,
      payDisabled: false,
      showTeleRegister: false,
      paymentShowText: null,
      sharePageShow: false,
      paymentType: null
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
      'masterId',
      'starterUid',
      'userList',
      'createTime',
      'alreadyCount',
      'groupBuystatus' /* 120 1 / 2:拼团中 3：成功  4：失败 */,
      'timeDuration'
    ])
  },
  async mounted() {
    this.userInfo = await this.checkoutUserInfo()
    await this.mapGroupBuyDetailToPayment()
    // 配置状态
    const { groupBuyPersonCount, collectLikeId } = this
    const initialPayment = {
      txt: groupBuyPersonCount === 3 ? '三人团' : '六人团',
      showPrice: true,
        showOrigin:true,
      handler: false
    }
    let handler = this.toggleSharePage.bind(this, true)
    if (collectLikeId) {
      handler = this.gotoPraising
    }
    const groupBuyTextType = {
      20020: {
        txt: '邀请好友拼团',
        handler
      }, // 弹出拼团界面
      20021: { txt: '邀请好友集赞', handler }, // 弹出集赞界面
      20022: { txt: '您已拥有此专栏，帮助好友分享', handler }, // 弹出拼团界面
      20023: { txt: '您正在参与其他拼团,帮助好友分享', handler }, // 弹出拼团界面
      20024: { txt: '正在处理您的其他拼团,帮助好友分享', handler }, // 弹出拼团界面
      20032: { txt: '开团失败，重新开团', handler: this.handleStartGroupBuy },
      20033: { txt: '等待开团成功', handler }, // 弹出拼团界面
      2004: {
        txt: '参与拼团',
        showPrice: true,
        handler: this.handleJoinGroupBuy
      }, // 支付事件->弹出拼团界面
      2005: {
        txt: '您已集赞成功，领取专栏',
        handler: this.handleGetCollectLike
      }, //领取专栏
      2006: { txt: '拼团超时，请等待系统处理', handler: this.goBackHome }, // 返回主页
      2007: { txt: '当前拼团已满,看看其他', handler: this.goBackHome }, // 返回主页
      2008: { txt: '您已参与集赞,帮助好友分享', handler } // 弹出拼团界面
    }
    const groupBuyStatusType = {
      1201: {
        txt: '您已参与拼团，邀请其他好友',
        handler
      },
      1202: {
        txt: '您已参与拼团，邀请其他好友',
        handler
      },
      1203: {
        hide: true
      },
      1204: { txt: '开团失败，重新开团', handler: this.handleStartGroupBuy }
    }

    this.paymentShowText = {
      // 发起人
      [`${identityType.OWNER}_${
        userAccessStatusType.GROUPBUY_FAIL
      }`]: initialPayment,
      [`${identityType.OWNER}_${
        userAccessStatusType.REFUND_SINGLED
      }`]: initialPayment,
      [`${identityType.OWNER}_${userAccessStatusType.NONE}`]: initialPayment,
      [`${identityType.OWNER}_${userAccessStatusType.SINGLED}`]: {
        hide: true
      },
      [`${identityType.OWNER}_${userAccessStatusType.GROUPED}`]: {
        hide: true
      },
      [`${identityType.OWNER}_${
        userAccessStatusType.GROUPING
      }`]: groupBuyTextType[20020],
      [`${identityType.OWNER}_${
        userAccessStatusType.GROUPING_OVERTIME
      }`]: groupBuyTextType[2006],
      [`${identityType.OWNER}_${
        userAccessStatusType.COLLECTED
      }`]: groupBuyTextType[2005],
      [`${identityType.OWNER}_${userAccessStatusType.COLLECTGET}`]: {
        hide: true
      },
      [`${identityType.OWNER}_${
        userAccessStatusType.COLLECTING
      }`]: groupBuyTextType[20021],
      // 参与人与非参与人
      // 参与人
      [`${identityType.PARTNER}_1201`]: groupBuyStatusType[1201],
      [`${identityType.PARTNER}_1202`]: groupBuyStatusType[1202],
      [`${identityType.PARTNER}_1203`]: groupBuyStatusType[1203],
      [`${identityType.PARTNER}_1204`]: groupBuyStatusType[1204],
      // 非参与人 拼团未满
      [`${identityType.PASSER}_${
        userAccessStatusType.GROUPBUY_FAIL
      }`]: groupBuyTextType[2004],
      [`${identityType.PASSER}_${
        userAccessStatusType.REFUND_SINGLED
      }`]: groupBuyTextType[2004],
      [`${identityType.PASSER}_${
        userAccessStatusType.NONE
      }`]: groupBuyTextType[2004],
      [`${identityType.PASSER}_${
        userAccessStatusType.SINGLED
      }`]: groupBuyTextType[20022],
      [`${identityType.PASSER}_${
        userAccessStatusType.GROUPED
      }`]: groupBuyTextType[20022],
      [`${identityType.PASSER}_${
        userAccessStatusType.GROUPING
      }`]: groupBuyTextType[20023],
      [`${identityType.PASSER}_${
        userAccessStatusType.GROUPING_OVERTIME
      }`]: groupBuyTextType[20024],
      [`${identityType.PASSER}_${
        userAccessStatusType.COLLECTED
      }`]: groupBuyTextType[2008],
      [`${identityType.PASSER}_${
        userAccessStatusType.COLLECTGET
      }`]: groupBuyTextType[2008],
      [`${identityType.PASSER}_${
        userAccessStatusType.COLLECTING
      }`]: groupBuyTextType[2008],
      [`${identityType.PASSERFULL}_`]: groupBuyTextType[2007]
    }
  },
  methods: {
    ...rootActions(['setWxShareFriend', 'setWxShareZone']),
    ...mapActions([
      'getGroupBuyDetail',
      'checkoutWxAuthor',
      'checkoutUserInfo',
      'hideToast',
      'unlockCourse',
      'joinGroupBuy',
      'startGroupBuy',
      'startCollectLike',
      'getCollectLike'
    ]),
    async mapGroupBuyDetailToPayment() {
      const { groupBuyId, groupBuyIdFromShare } = this
      if (groupBuyIdFromShare || groupBuyId) {
        await this.getGroupBuyDetail({
          groupBuyId: groupBuyIdFromShare || groupBuyId
        })
      }
      await this.judgePaymentType()
      return await this.judgeIdentity()
    },
    async handlePayment(paymentQueryType, params) {
      this.payDisabled = true
      const { userInfo } = this

      await this.checkoutWxAuthor()
      await this.hideToast()
      if (!userInfo.mobileNo) {
        this.toggleTeleRegister(true)
        this.payDisabled = false
      }
      await this[paymentQueryType]({ courseId: this.courseId, ...params })
      this.payDisabled = false
    },
    judgePaymentType() {
      const {
        groupBuyIdFromShare, //来自于分享进入的拼团Id
        collectLikeIdFromShare, //来自于分享进入的集赞Id
        collectLikeId, // 来自于开团获取的id
        groupBuyId // 来自于集赞获取的id
      } = this
      let paymentType = PAYMENTTYPE.origin
      if (groupBuyIdFromShare || groupBuyId) {
        paymentType = PAYMENTTYPE.groupBuy
      }
      if (collectLikeIdFromShare || collectLikeId) {
        paymentType = PAYMENTTYPE.collect
      }
      this.paymentType = paymentType
      // this.mapGroupBuyDetailToPayment()
      this.setWxShare(paymentType)
    },
    judgeIdentity() {
      if (this.masterId === this.starterUid) return
      if (this.userList.some(item => item.id === this.masterId)) {
        return (this.master = identityType.PARTNER)
      } else {
        if (this.groupBuyPersonCount === this.userList.length) {
          return (this.master = identityType.PASSERFULL)
        }
        return (this.master = identityType.PASSER)
      }
    },
    renderOriginBuy(onlyPrice) {
      const { price } = this
      const originPriceClass = `payment-flex-column ${
        onlyPrice ? 'payment-onlyOrigin' : ''
      }`
      return (
        <div
          class={originPriceClass}
          onClick={this.handlePayment.bind(this, 'unlockCourse')}
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
          onClick={handler ? handler : this.handleStartGroupBuy}
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
    async handleJoinGroupBuy() {
      await this.handlePayment('joinGroupBuy', {
        groupBuyId: this.groupBuyIdFromShare
      })
      this.mapGroupBuyDetailToPayment()
    },
    async handleStartGroupBuy() {
      await this.handlePayment('startGroupBuy')
      this.mapGroupBuyDetailToPayment()
    },
    handleStartCollectLike() {
      this.handlePayment('startCollectLike')
    },
    handleGetCollectLike() {
      this.handlePayment('getCollectLike', {
        collectLikeId: this.collectLikeId
      })
    },
    //点击集赞按钮
    gotoPraising() {
      this.$router.push({
        name: 'Praise',
        params: {
          courseId: this.courseId,
          collectLikeId: this.collectLikeId
        },
        query: {
          columnType: this.columnType
        }
      })
    },

    goBackHome() {
      this.$router.push({ path: '/home' })
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
      this.showTeleRegister = showTeleRegister
    },
    toggleSharePage(sharePageShow = false) {
      this.sharePageShow = sharePageShow
    },
    setWxShare(paymentType) {
      const {
        columnType,
        courseId,
        groupBuyId,
        collectLikeId,
        url,
        courseName,
        alreadyCount,
        groupBuyPersonCount,
        userInfo
      } = this
      let title = `我正在学习《${this.courseName}》，快来一起学习吧`,
        link = window.location.href
      if (paymentType === groupBuy) {
        title = `我正在参加《${courseName}》拼团活动,仅差${groupBuyPersonCount -
          alreadyCount}人,快来和我一起拼团吧!`
        link = `${url}/#/detail/${columnType}/${courseId}?groupBuyId=${groupBuyId}`
      }
      if (paymentType === collect) {
        title = `我是${userInfo.nickName}, ${
          this.master === identityType.OWNER ? '我想免费' : '正在帮朋友'
        }领取《${courseName}》,求助攻~`
        link = `${url}/#/praise/active/${courseId}/${collectLikeId}?columnType=${columnType}`
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
      console.log('shareLink_title changed', shareData)
      this.setWxShareFriend(shareData)
      this.setWxShareZone(shareData)
    }
  },
  render() {
    if (!this.paymentShowText) return null
    const {
      isTryScan,
      courseId,
      columnType,
      price,
      groupBuyTemplateId,
      collectLikeTemplateId,
      showTeleRegister,
      sharePageShow,
      groupBuyId,
      collectLikeId,
      userList,
      groupBuyPersonCount
    } = this
    const tryTxt = isTryScan ? '试看' : '试听'
    const paymentObj =
      this.master === identityType.PARTNER
        ? this.paymentShowText[`${this.master}_${this.groupBuystatus}`]
        : this.paymentShowText[`${this.master}_${this.userAccessStatus}`]
    console.log('拼团状态  是  ' + this.paymentType)
    console.log(
      paymentObj,
      price,
      groupBuyTemplateId,
      collectLikeTemplateId,
      userList
    )
    const { hide, showOrigin=false } = paymentObj
    let paymentBtn = this.renderPayment({
      origin: price && showOrigin && this.renderOriginBuy,
      group: groupBuyTemplateId && this.renderGroupBuy.bind(this, paymentObj),
      collect:
        collectLikeTemplateId && this.renderCollectBuy.bind(this, paymentObj)
    })
    if (groupBuyId) {
      paymentBtn = this.renderPayment({
        group: this.renderGroupBuy.bind(this, paymentObj)
      })
    }
    if (collectLikeId) {
      paymentBtn = this.renderPayment({
        collect: this.renderCollectBuy.bind(this, paymentObj)
      })
    }
    let userListTop = userList.slice(0, 3),
      userListBot = []
    if (groupBuyPersonCount > 3) {
      userListBot = userList.slice(3)
    }

    return hide ? null : (
      <div>
        {this.paymentType === groupBuy && (
          <GroupHeader
            timeDuration={this.timeDuration}
            leavePerson={this.groupBuyPersonCount - this.alreadyCount}
            isSixGroup={this.groupBuyPersonCount > 3}
            userListTop={userListTop}
            userListBot={userListBot}
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
            close={this.toggleSharePage}
            columnType={columnType}
            // nativeOnClose={this.toggleSharePage}
            // postType={isGroupShare}
          />
          {showTeleRegister && (
            <PhoneVerif
              style={{ zIndex: 100 }}
              hideTeleRegister={this.toggleTeleRegister.bind(this, false)}
            />
          )}
        </div>
      </div>
    )
  }
}
/*废码暂存
*      [`${identityType.PARTNER}_${
        userAccessStatusType.GROUPBUY_FAIL
      }`]: groupBuyTextType[20032],
      [`${identityType.PARTNER}_${
        userAccessStatusType.REFUND_SINGLED
      }`]: groupBuyTextType[2004],
      [`${identityType.PARTNER}_${
        userAccessStatusType.NONE
      }`]: groupBuyTextType[2004],
      [`${identityType.PARTNER}_${
        userAccessStatusType.SINGLED
      }`]: groupBuyTextType[20022],
      [`${identityType.PARTNER}_${
        userAccessStatusType.GROUPED
      }`]: groupBuyTextType[20022],
      [`${identityType.PARTNER}_${
        userAccessStatusType.GROUPING
      }`]: groupBuyTextType[20033],
      [`${identityType.PARTNER}_${
        userAccessStatusType.GROUPING_OVERTIME
      }`]: groupBuyTextType[2006],
      [`${identityType.PARTNER}_${
        userAccessStatusType.COLLECTED
      }`]: groupBuyTextType[2008],
      [`${identityType.PARTNER}_${
        userAccessStatusType.COLLECTGET
      }`]: groupBuyTextType[2008],
      [`${identityType.PARTNER}_${
        userAccessStatusType.COLLECTING
      }`]: groupBuyTextType[2008],
* */
</script>
<style lang='less' >
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
  padding: 0;
  padding-right: 28px;
  border-right: 1px solid #f8f8f8;
}
.audition-icon {
  display: block;
  width: 40px;
  height: 40px;
  background-image: url('../assets/images/onlinecourse-tabbar-try.png');
  background-size: 40px;
}
.payment-low-attention {
  color: #939393;
}
.payment-button-wrapper {
  flex-grow: 1;
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

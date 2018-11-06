<script>
import {
  createNamespacedHelpers,
  mapState as rootState,
  mapActions as rootActions
} from 'vuex'
import { openVideoDetail, openAudioDetail } from '../utils/config'
import PhoneVerif from './PhoneVerif'
import Share from './share/Share'
const { mapState, mapActions } = createNamespacedHelpers('columnData/payment')
const identityType = {
  OWNER: 31000, // 发起人
  PARTNER: 31001, // 此拼团参与人
  PASSER: 31002, // 非参与人 拼团未满
  PASSERFULL: 31003 // 非参与人 拼团已满
}

const userAccessStatusType = {
  /* status:
   * 1201/2:拼团中
   * 3：成功
   * 4：失败
   * */
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
    columnDetail: {
      type: Object
    },
    selfGroupBuyId: {
      default: null
    },
    selfCollectLikeId: {
      default: null
    },
    userAccessStatus: {
      default: null
    }
  },
  data() {
    const { groupBuyId, collectLikeId } = this.$route.query
    const { columnType, courseId } = this.$route.params
    const {
      freeLessonList,
      groupBuyPrice,
      groupBuyPersonCount,
      groupBuyTemplateId,
      collectLikeTemplateId,
      price,
      name: courseName,
      sharePostUrl
    } = this.columnDetail
    return {
      userInfo: {},
      columnType,
      courseId,
      master: identityType.OWNER,
      groupBuyId: groupBuyId || this.selfGroupBuyId,
      collectLikeId: collectLikeId || this.selfCollectLikeId,
      sharePostUrl: `${sharePostUrl}?imageView2/1/w/100/h/100/format/jpg`,
      courseName,
      groupBuyTemplateId,
      collectLikeTemplateId,
      payDisabled: false,
      showTeleRegister: false,
      paymentShowText: null,
      price: this.formatPrice(price),
      groupBuyPrice: this.formatPrice(groupBuyPrice),
      groupBuyPersonCount,
      initialPayment: {
        txt: groupBuyPersonCount === 3 ? '三人团' : '六人团',
        showPrice: true,
        handler: false
      },
      freeLesson: freeLessonList && freeLessonList.length && freeLessonList[0], //试听试看课程
      sharePageShow: false,
      isGroupShare: true
    }
  },
  computed: {
    ...rootState(['url']),
    ...mapState([
      'masterId',
      'starterUid',
      'userList',
      'userAccessStatusFromGroup',
      'createTime',
      'alreadyCount',
      'status'
    ])
  },
  watch: {
    userAccessStatus(newval) {
      console.log('userAccessStatus' + newval)
      this.mapGroupBuyDetailToPayment()
      this.setWxShare()
    }
  },
  async created() {
    this.userInfo = await this.checkoutUserInfo()
    await this.mapGroupBuyDetailToPayment()
    // 配置状态
    const { initialPayment, collectLikeId } = this
    await this.setWxShare()
    let handler = this.toggleSharePage.bind(this, true)
    if (collectLikeId) {
      handler = this.toggleSharePage.bind(this, true, false)
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
      20032: { txt: '参与拼团失败，请等待退款', handler: this.goBackHome }, // 返回主页
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
      2007: { txt: '当前拼团已满,返回主页', handler: this.goBackHome }, // 返回主页
      2008: { txt: '您已参与集赞,帮助好友分享', handler } // 弹出拼团界面
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
      [`${identityType.PARTNER}_${
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
      const { groupBuyId } = this
      if (groupBuyId) {
        // 如果有拼团Id，请求拼团详情接口
        await this.getGroupBuyDetail({ groupBuyId })
        await this.judgeIdentity()
      }
    },
    async handlePayment(paymentQueryType, params) {
      this.payDisabled = true
      const { courseId, userInfo } = this
      await this.checkoutWxAuthor()
      this.hideToast()
      if (!userInfo.mobileNo) {
        this.toggleTeleRegister(true)
        this.payDisabled = false
      }
      await this[paymentQueryType]({ courseId, ...params })
      this.payDisabled = false
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
    handleJoinGroupBuy() {
      this.handlePayment('joinGroupBuy', { groupBuyId: this.groupBuyId })
    },
    handleStartGroupBuy() {
      this.handlePayment('startGroupBuy')
    },
    handleStartCollectLike() {
      this.handlePayment('startCollectLike')
    },
    handleGetCollectLike() {
      this.handlePayment('getCollectLike', {
        collectLikeId: this.collectLikeId
      })
    },
    goBackHome() {
      this.$router.push({ path: '/home' })
    },
    formatPrice: price => {
      if (!price) return null
      if (price.toString().indexOf('.') !== -1) return price
      else return price + '.00'
    },
    routerToSingleSet() {
      if (!this.freeLesson) {
        return this.$toast('暂无试听课程')
      }
      const { courseId, columnType, courseName } = this
      const { id } = this.freeLesson
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
    toggleSharePage(sharePageShow = false, isGroupShare = true) {
      this.sharePageShow = sharePageShow
      this.isGroupShare = isGroupShare
    },
    setWxShare() {
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
      let title = null,
        link = null
      if (groupBuyId) {
        ;(title = `我正在参加《${courseName}》拼团活动,仅差${groupBuyPersonCount -
          alreadyCount}人,快来和我一起拼团吧!`),
          (link = `${url}/#/detail/${columnType}/${courseId}?groupBuyId=${groupBuyId}`)
      }
      if (collectLikeId) {
        ;(title = `我是${userInfo.nickName}, ${
          this.master === identityType.OWNER ? '我想免费' : '正在帮朋友'
        }领取《${courseName}》,求助攻~`),
          (link = `${url}/#/praise/active/${courseId}/${collectLikeId}?columnType=${columnType}`)
      }
      const share = {
        title,
        link
      }
      const shareData = {
        title: `我正在学习《${this.courseName}》，快来一起学习吧`,
        link: window.location.href,
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
      price,
      courseId,
      columnType,
      groupBuyTemplateId,
      collectLikeTemplateId,
      showTeleRegister,
      sharePageShow,
      isGroupShare,
      groupBuyId,
      collectLikeId
    } = this
    const tryTxt = isTryScan ? '试看' : '试听'
    const paymentObj = this.paymentShowText[
      `${this.master}_${this.userAccessStatusFromGroup ||
        this.userAccessStatus}`
    ]
    console.log(paymentObj, groupBuyId, collectLikeId)
    const { hide, showPrice } = paymentObj
    let paymentBtn = this.renderPayment({
      origin: price && showPrice && this.renderOriginBuy,
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
        collect:
          collectLikeTemplateId && this.renderCollectBuy.bind(this, paymentObj)
      })
    }
    return hide ? null : (
      <div class="qhht-flex payment-wrapper">
        <div
          class="payment-flex-column payment-audition"
          onClick={this.routerToSingleSet}
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
          postType={isGroupShare}
        />
        {showTeleRegister && (
          <PhoneVerif
            style={{ zIndex: 100 }}
            hideTeleRegister={this.toggleTeleRegister.bind(this, false)}
          />
        )}
      </div>
    )
  }
}
</script>
<style scoped lang='less' >
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

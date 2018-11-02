<script>
import {
  createNamespacedHelpers,
  mapState as rootState,
  mapActions as rootActions
} from 'vuex'
const {
  // mapState,
  mapActions,
  mapGetters
} = createNamespacedHelpers('columnData/payment')
const viewType={
    'owner':31000,// 发起人
    'partner':31001,// 此拼团参与人
    'passer':31002,// 非参与人
}

const userAccessStatusType={//完全是自己和这个专栏的状态
    /*
    REFUND_GROUPBUY("-3","拼团失败"),
    REFUND_SINGLED("-1","单购退款"),
    NO("0","没有购买、没有集赞行为"),
    SINGLED("1001","单购成功"),
    GROUPED("1003","拼团成功"),
    GROUPING("1005","拼团中"),
    GROUPING_OVERTIME("1006","拼团中但是已超时，等待系统处理"),
    COLLECTED("1007","集赞成功未领取"),
    COLLECTGET("1008","集赞成功并领取"),
    COLLECTING("1009","集赞中");
    */
    fail:-3,
    refund:-1,
    normal:0,

    bought:1001,

    grouped:1003,
    grouping:1005,
    groupOvertime: 1006,

    collectSuccing:1007,
    collectSucced:1008,
    collecting:1009,
}
const groupBuyTextType={
    2001:  {txt:'我要学习'},
    20020: {txt:'邀请好友拼团'},
    20021: {txt:'邀请好友集赞'},
    20022: {txt:'帮助好友分享拼团'},
    20030: {txt:'我要开团'},
    20031:  {txt:'拼团失败，重新开团'},
    20032: {txt:'等待开团成功',disable:true},
    2004: {txt:'参与拼团'},
    2005: {txt:'领取专栏'},
    2006: {txt:'拼团超时，请等待系统处理',disable:true},
    2007: {txt:'当前拼团已满'},
    2008: {txt:'您已有其他状态，不可参与当前拼团'},
}
const  paymentShowText ={
    // 发起人
    [`${viewType.owner},${userAccessStatusType.fail}`] : groupBuyTextType[20031],
    [`${viewType.owner},${userAccessStatusType.refund}`] :null,
    [`${viewType.owner},${userAccessStatusType.normal}`] : null,
    [`${viewType.owner},${userAccessStatusType.bought}`] : {hide:true},
    [`${viewType.owner},${userAccessStatusType.grouped}`] : {hide:true},
    [`${viewType.owner},${userAccessStatusType.grouping}`] : groupBuyTextType[20020],
    [`${viewType.owner},${userAccessStatusType.groupOvertime}`] : groupBuyTextType[2006],
    [`${viewType.owner},${userAccessStatusType.collectSuccing}`] : groupBuyTextType[2005],
    [`${viewType.owner},${userAccessStatusType.collectSucced}`] : {hide:true},
    [`${viewType.owner},${userAccessStatusType.collecting}`] : groupBuyTextType[20021],
    // 参与人与非参与人
    // 参与人
    [`${viewType.partner},${userAccessStatusType.fail}`]: { txt: groupBuyTextType[20031] },
    [`${viewType.partner},${userAccessStatusType.refund}`]:  { txt: groupBuyTextType[20032] },
    [`${viewType.partner},${userAccessStatusType.normal}`]: { txt: groupBuyTextType[20032] },
    [`${viewType.partner},${userAccessStatusType.bought}`]: { hide: true },
    [`${viewType.partner},${userAccessStatusType.grouped}`]: { hide: true },
    [`${viewType.partner},${userAccessStatusType.grouping}`]: { txt: groupBuyTextType[20032] },
    [`${viewType.partner},${userAccessStatusType.groupOvertime}`]: groupBuyTextType[2006],
    [`${viewType.partner},${userAccessStatusType.collectSuccing}`]: { txt: groupBuyTextType[2005] },
    [`${viewType.partner},${userAccessStatusType.collectSucced}`]: { hide: true },
    [`${viewType.partner},${userAccessStatusType.collecting}`]: { txt: groupBuyTextType[20021] },
    // 非参与人
    [`${viewType.passer},${userAccessStatusType.fail}`] : {txt:groupBuyTextType[20022]},
    [`${viewType.passer},${userAccessStatusType.refund}`] :{txt:groupBuyTextType[2004]},
    [`${viewType.passer},${userAccessStatusType.normal}`] : {txt:groupBuyTextType[20030]},
    [`${viewType.passer},${userAccessStatusType.bought}`] : {hide:true},
    [`${viewType.passer},${userAccessStatusType.grouped}`] : {hide:true},
    [`${viewType.passer},${userAccessStatusType.grouping}`] : {txt:groupBuyTextType[20032]},
    [`${viewType.passer},${userAccessStatusType.groupOvertime}`] : groupBuyTextType[2006],
    [`${viewType.passer},${userAccessStatusType.collectSuccing}`] : {txt:groupBuyTextType[2008]},
    [`${viewType.passer},${userAccessStatusType.collectSucced}`] : {txt:groupBuyTextType[2008]},
    [`${viewType.passer},${userAccessStatusType.collecting}`] : {txt:groupBuyTextType[2008]},
}

export default {
  name: 'Payment',
  props: {
    isTryScan: {
      default: false
    },
    columnDetail: {
      type: Object
    }
  },
  data() {
    const { groupBuyId } = this.$route.query
    const { columnType, courseId } = this.$route.params
    return {
      groupBuyId,
      columnType,
      courseId,
      userAccessStatus: 0,
      collectLikeId: null,
      price: null,
      groupBuyPrice: null,
      groupBuyText: 0,
      groupBuyTemplateId: '',
      collectLikeTemplateId: '',
      freeLesson: false
    }
  },
  computed: {
    // ...mapGetters(['buyCount'])
  },
  created() {
    const { groupBuyId } = this
    if (groupBuyId) {
      this.getGroupBuyDetail({ groupBuyId })
    }
    this.mapColumnDetailToData()
    this.getGroupBuyDetail({ groupBuyId: '89013551171108864' }) //TODO 测试
  },
  methods: {
    ...mapActions(['getGroupBuyDetail']),
    mapColumnDetailToData() {
      const {
        freeLessonList,
        groupBuyPrice,
        groupBuyPersonCount,
        groupBuyTemplateId,
        collectLikeTemplateId,
        price,
        userAccessStatus,
        collectLikeId // 领取时用
      } = this.columnDetail
      Object.assign(this, {
        price: this.formatPrice(price),
        groupBuyPrice: this.formatPrice(groupBuyPrice),
        groupBuyTemplateId,
        collectLikeTemplateId,
        userAccessStatus,
        collectLikeId,
        groupBuyText: groupBuyPersonCount === 3 ? '三人团' : '六人团'
      })
      this.freeLesson =
        freeLessonList && freeLessonList.length && freeLessonList[0] //试听试看课程
    },
    renderOriginBuy(onlyPrice) {
      const { price } = this
      const originPriceClass = `payment-flex-column ${
        onlyPrice ? 'payment-onlyOrigin' : ''
      }`
      return (
        <div class={originPriceClass}>
          <div class="payment-price">￥{price}</div>
          <span class="payment-low-attention">原价购买</span>
        </div>
      )
    },
    renderGroupBuy(isUnderWay) {
      const { groupBuyPrice, groupBuyText } = this
      return (
        <div
          class="payment-flex-column"
          style={{ justifyContent: isUnderWay ? 'center' : 'inherit' }}
        >
          {!isUnderWay && <div class="payment-price">￥{groupBuyPrice}</div>}
          <span class="payment-low-attention">
            {isUnderWay ? '拼团中' : groupBuyText}
          </span>
        </div>
      )
    },
    renderCollectBuy(isUnderWay) {
      return (
        <div
          class="payment-flex-column payment-collect"
          style={{ justifyContent: isUnderWay ? 'center' : 'inherit' }}
        >
          {!isUnderWay && <div class="payment-price">￥00.00</div>}
          <span class="payment-low-attention">
            集赞{isUnderWay ? '中' : ''}
          </span>
        </div>
      )
    },
    renderPayment({ origin, group, collect } = {}) {
      const onlyPrice = !group && !collect
      return (
        <div class="qhht-flex payment-button-wrapper">
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
    handleCollect() {},
    formatPrice: price => {
      if (!price) return null
      if (price.toString().indexOf('.') !== -1) return price
      else return price + '.00'
    },
    routerToSingleSet() {
      if (!this.freeLesson) {
        return this.$toast('暂无试听课程')
      }
      const { id } = this.freeLesson
      switch (this.columnType) {
        case 'onlineCourse':
          this.$router.push({
            name: 'videoCourseDetail',
            params: { lessonId: id }
          })
          break
        case 'FreeZone':
          break
        // case 'reading':
        //   case 'onlineVision':
        default:
          this.$router.push({
            name: 'AudioPlay',
            params: { id },
            query: {
              courseId: this.courseId,
              columnType: this.serviceType,
              courseName: this.courseName
            }
          })
          break
      }
    }
  },

  render() {
    const {
      isTryScan,
      price,
      groupBuyTemplateId,
      collectLikeTemplateId,
      routerToSingleSet
    } = this
    const tryTxt = isTryScan ? '试看' : '试听'
    const paymentBtn = this.renderPayment({
      origin: price && this.renderOriginBuy,
      group: groupBuyTemplateId && this.renderGroupBuy,
      collect: collectLikeTemplateId && this.renderCollectBuy
    })
    return (
      <div class="qhht-flex payment-wrapper">
        <div
          class="payment-flex-column payment-audition"
          onClick={routerToSingleSet}
        >
          <i class="audition-icon" />
          <span class="payment-low-attention">{tryTxt}</span>
        </div>
        {paymentBtn}
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

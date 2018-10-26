<script>
import {
  createNamespacedHelpers,
  mapState as rootState,
  mapActions as rootActions
} from 'vuex'
const {
  // mapState,
  mapActions,
  // mapGetters
} = createNamespacedHelpers('payment')
/*
*  购买行为逻辑
*  判断是否来自分享
*   非分享
*       自己 直接根据userAccessStatus判断
*   来自分享 拼团Id => orderStatus
*       调起拼团详情接口 （主/参，拼团状态）
*           主动发起人 
*           参团人
* */
//userAccessStatus -3 0 1001 1003 1005 1007 1008 1009
const userAccessType = {
  // -3:''
}
const groupBuyTextType = {
  1003: '拼团成功',
  1005: '拼团中',
  2000: '我要学习',
  2001: '邀请好友拼团',
  2002: '参与拼团',
  2003: '重新开团',
  2004: '我要开团',
  2005: '继续支付'
}
/*
*  // 参与拼团
*  // 判断是主动发起人还是参与人还是非参与人
*     //拼团中
*       // 主 2001
*       // 参 
*           拼团未满 未支付 2002
*           拼团未满 取消支付 2005
*           拼团未满 已支付 2001
*           拼团已满 未支付 2005
*           拼团已满 其他人未支付 2001
*       // 非参团人 2004
*       
* */
const orderStatus = {
  1201: '', // 同原始状态
  1202: '拼团中', //2001 主 //2002 参
  1203: '拼团成功', //2000 主/参  //2004 非
  1204: '拼团失败' // 2003 主/参  //2004 非
}
const collectTextType = {
  1006: '集赞换',
  1007: '集赞成功未领取',
  1008: '集赞成功已领取',
  1009: '集赞中'
}

const chargePaymentType = () => {
  return groupBuyTextType[2000]
}

export default {
  name: 'Payment',
  props: {
    price: {
      default: 199
    },
    groupBuyPrice: {
      // default: null
      default: 100
    },
    groupBuyText: {
      // default: null
      default: '六人团'
    }
  },
  data() {
    return {
      fromShare: false
    }
  },
  created() {
    const { groupBuyId } = this.$route.query
    if (groupBuyId) {
      this.fromShare = true
        this.getGroupBuyDetail({groupBuyId})
    }
  },
  methods: {
      ...mapActions([
          "getGroupBuyDetail"
      ]),
    getPaymentStatus() {},
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
    handleCollect() {}
  },

  render() {
    const paymentBtn = this.renderPayment({
      origin: this.renderOriginBuy,
      group: this.renderGroupBuy,
      collect: this.renderCollectBuy
    })
    return (
      <div class="qhht-flex payment-wrapper">
        <div class="payment-flex-column payment-audition">
          <i class="audition-icon" />
          <span class="payment-low-attention">{false ? '试听' : '试看'}</span>
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
  top: 50%;
  left: 0;
  right: 0;
  padding: 20px 28px;
  border-top: 1px solid #efefef;
  border-bottom: 1px solid #efefef;
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

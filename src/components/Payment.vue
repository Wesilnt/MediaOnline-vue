<script>
export default {
  name: 'Payment',
  props: {
    price: {
      default: 199
    }
  },
  methods: {
    renderOriginBuy(onlyPrice) {
      const { price } = this
      const originPriceClass = `payment-flex-column ${
        onlyPrice ? 'payment-button' : ''
      }`
      return (
        <div class={originPriceClass}>
          <div class="payment-price">￥{price}</div>
          <span class="payment-low-attention">原价购买</span>
        </div>
      )
    },
    renderGroupBuy(isUnderWay) {
      const { price } = this
      return (
        <div class="payment-flex-column" style={{justifyContent:isUnderWay? 'center':'inherit'}}>
          {!isUnderWay && <div class="payment-price">￥{price}</div>}
          <span class="payment-low-attention">
            {isUnderWay ? '拼团中' : '三人团'}
          </span>
        </div>
      )
    },
    renderCollectBuy(isUnderWay) {
      return (
        <div class="payment-flex-column" style={{justifyContent:isUnderWay? 'center':'inherit'}}>
          {!isUnderWay && <div class="payment-price">￥00.00</div>}
          <span class="payment-low-attention">
            集赞{isUnderWay ? '中' : ''}
          </span>
        </div>
      )
    },
    renderPayment({ origin, group, collect } = {}) {
      const onlyPrice = !group && !collect
      const hasCollect = !!collect
      return (
        <div
          class="qhht-flex payment-button-wrapper"
          style={onlyPrice ? { marginLeft: '14px' } : null}
        >
          {origin && origin()}
          {!onlyPrice && (
            <div class="qhht-flex payment-button-group">
              {group && group(!origin)}
              {collect && collect(!origin)}
            </div>
          )}
        </div>
      )
    }
  },
  render() {
    const paymentBtn = this.renderPayment({
      origin: this.renderOriginBuy,
      // group: this.renderGroupBuy,
      // collect: this.renderCollectBuy
    })
    return (
      <div class="qhht-flex payment-wrapper">
        <div class="payment-flex-column payment-audition">
          <i class="audition-icon" />
          <span class="payment-low-attention">试听</span>
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
}
.payment-flex-column {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: inherit;
  height: 80px;
  padding: 0 28px;
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
  }
  .payment-price,
  .payment-low-attention {
    color: #fff;
  }
}
.payment-button {
  background: linear-gradient(
    to right,
    rgb(254, 119, 0) 0,
    rgb(255, 79, 5) 100%
  );
}
.payment-price {
  font-weight: bold;
  font-size: 30px;
  color: #ffa32f;
}
</style>

<template xmlns:v-lazy="http://www.w3.org/1999/xhtml">
    <div class="clearinghouse">
        <div class="qhht-flex clearinghouse-header">
            <i class="lazy-img-larger clearinghouse-header-img" v-lazy:background-image="payDetail.coverPic"></i>
            <ul class="clearinghouse-header-content">
                <li><h3>{{payDetail.courseName}}</h3></li>
                <li class="van-ellipsis clearinghouse-header-brief">{{payDetail.briefIntro}}</li>
                <li class="qhht-flex">
                    <strong class="clearinghouse-header-price">￥{{payDetail.price }}</strong>
                    <span>共 {{payDetail.lessonCount}} 讲</span>
                </li>
            </ul>
        </div>
        <div v-if="!IS_ONLINE||IS_ONLINE" class="qhht-flex clearinghouse-body" :style="{pointerEvents: `${deductionBookCoin>0?'':'none'}`}" @click="toggleDiscount">
            <span>优惠书币：消耗{{deductionBookCoin}}书币</span>
            <span class="qhht-flex clearinghouse-discount" :class="{checked}">
                <span>-￥{{ deductionAmount }}</span>
                <i class="clearinghouse-check"></i>
            </span>
        </div>
        <div class="clearinghouse-explain">
            您将购买的商品为虚拟内容服务，购买后不支持退订、转让、退换，请斟酌确认。
            <p>购买后可在 “我的——已购清单”内查看。</p>
        </div>
        <div class="clearinghouse-pay" :class="{disabled:payDisabled}" @click="handlePayment">确认支付 ￥
            <Counter :num="showPrice" :diff="difference" />
        </div>
    </div>
</template>

<script>
import {
  createNamespacedHelpers,
  mapState as rootState,
  mapActions as rootActions
} from 'vuex'
import { IS_ONLINE } from '../utils/config'
import Counter from './Counter'

const { mapState, mapActions, mapGetters } = createNamespacedHelpers(
  'columnData/payment'
)
export default {
  name: 'Payment',
  data() {
    const { courseId, groupBuyId, payType } = this.$route.query
    return {
      IS_ONLINE,
      checked: false,
      payDisabled: false,
      groupBuyId,
      courseId,
      payType,
      payAmount: 0,
      difference: 0,
      showPrice: 0,
    }
  },
  computed: {
    ...mapGetters([
      'courseName',
      'coverPic',
      'briefIntro',
      'groupBuyPrice',
      'price',
      'lessonCount',
    ]),
    ...mapState(['paySucceed']),
    ...rootState(['coinNum', 'deductionOrder', 'deductionProp']),
    //抵扣书币数
    deductionBookCoin: function() {
      const price = parseFloat(this.payDetail.price); //不抵扣书币的支付金额
      let totalAmount = (price * this.deductionProp) / 100; //最多能抵扣金额, deductionProp/100 抵扣金额比
      totalAmount = price - totalAmount < 0.01 ? price - 0.01 : totalAmount; //书币抵扣完,剩余支付金额不能小于0.01
      let totalCoin = (totalAmount * this.deductionOrder).toFixed(0); //最多抵扣需要花费多少书币, 1元 需要多少书币：deductionOrder
      return this.coinNum <= totalCoin ? this.coinNum : totalCoin //计算可用书币总数
    },
    //抵扣金额
    deductionAmount: function() {
      return parseFloat((Math.round((this.deductionBookCoin * 100) / this.deductionOrder) / 100).toFixed(2))
    },
    payDetail: function() {
      let payDetail = JSON.parse(sessionStorage.getItem('payDetail'));
      if(!payDetail) {
          if (this.courseName) {
              payDetail = {
                      courseName: this.courseName,
                      coverPic: this.coverPic,
                      briefIntro: this.briefIntro,
                      groupBuyPrice: this.groupBuyPrice,
                      price: this.price,
                      lessonCount: this.lessonCount
                  }
          }
      }
      const { groupBuyPrice, price: origin } = payDetail;
      const { payType } = this.$route.query;
      const price = parseFloat(payType === 'groupBuy' ? groupBuyPrice : origin);
      console.log(payType === 'groupBuy');
      this.payAmount = price;
      this.showPrice = price;
      return payDetail
    }
  },
  watch: {
    paySucceed: function(isSucceed) {
      if (isSucceed) {
        this.$toast('您已支付成功');
        setTimeout(() => this.$router.go(-1), 400)
      }
    }
  },
  methods: {
    ...mapActions(['unlockCourse', 'joinGroupBuy', 'startGroupBuy']),
    ...rootActions(['getBookCoinInfo']),
    async handlePayment() {
      this.payDisabled = true;
      const preUserIdStr = sessionStorage.getItem('preUserId');
      const preUserIdJSON = JSON.parse(preUserIdStr || '{}');
       console.log('preUserIdStr:',preUserIdStr);
      const payParams = {
        courseId: this.courseId, //购买专栏ID
        useFlag: this.checked, //是否使用书币
        ...preUserIdJSON //是否来自分销员分享
      };
      if (this.payType === 'groupBuy') {
        if (this.groupBuyId) {
          await this.joinGroupBuy({ ...payParams, groupBuyId: this.groupBuyId })
        } else {
          await this.startGroupBuy(payParams)
        }
      }
      if (this.payType === 'origin') {
        await this.unlockCourse(payParams)
      }
      this.payDisabled = false
    },
    toggleDiscount() {
      const toggledChecked = !this.checked;
      this.difference = toggledChecked
        ? -this.deductionAmount
        : this.deductionAmount;
      this.showPrice = toggledChecked
        ? -(this.deductionAmount - this.payAmount).toFixed(2)
        : this.payAmount;
      this.checked = toggledChecked
    }
  },
  async created() {
    document.title = '结算中心';
    await this.getBookCoinInfo();
    const {
      courseName,
      coverPic,
      briefIntro,
      groupBuyPrice,
      price,
      lessonCount
    } = this;
    if (courseName) {
      sessionStorage.setItem(
        'payDetail',
        JSON.stringify({
          courseName,
          coverPic,
          briefIntro,
          groupBuyPrice,
          price,
          lessonCount
        })
      );
    }
  },
  destroyed() {
    document.title = '秦汉胡同'
    sessionStorage.setItem('payDetail', null)
  },
  components: {
    Counter
  }
}
</script>

<style lang="less">
.clearinghouse {
  position: relative;
  height: 100vh;
  padding-top: 20px;
  background: #f7f7f7;
}

.clearinghouse-header {
  margin-bottom: 20px;
  padding: 32px 40px;
  background: #fff;
  &-img {
    width: 136px;
    height: 180px;
    border-radius: 16px;
    background: transparent center/cover no-repeat;
  }
  &-content {
    flex-grow: 1;
    display: flex;
    height: 180px;
    flex-direction: column;
    justify-content: space-around;
    padding: 8px 0;
    margin-left: 32px;
  }
  &--brief {
    max-width: 638px;
  }
  &-price {
    font-size: 30px;
    color: #fea330;
  }
}

.clearinghouse-body {
  padding: 30px 40px;
  background-color: #fff;
  font-size: 28px;
}

.clearinghouse-discount {
  font-size: 30px;
  color: #b3b3b3;
  transition: color 0.2s ease-in-out;
  &.checked {
    color: #ff4f05;
    font-weight: bold;
    .clearinghouse-check {
      background-color: #ff4f05;
      box-shadow: 0 0 0 2px #ff0f05;
    }
  }
}

.clearinghouse-check {
  display: inline-block;
  width: 30px;
  height: 30px;
  border: 6px solid #fff;
  margin-left: 24px;
  box-shadow: 0 0 0 2px #fea330;
  border-radius: 50%;
  background-color: #fff;
  transition: background-color 0.2s ease-in-out;
}

.clearinghouse-explain {
  padding: 30px 40px;
  color: #ccc;
  p {
    padding-top: 48px;
  }
}

.clearinghouse-pay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 96px;
  line-height: 96px;
  font-size: 32px;
  text-align: center;
  background-color: #fea330;
  color: #fff;
  &.disabled {
    pointer-events: none;
    background-color: rgba(254, 163, 48, 0.72);
  }
}
</style>

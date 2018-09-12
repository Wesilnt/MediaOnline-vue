<template>
    <div class="purchase-toolbar">
        <div class="toolbar-audition" @click="$emit('router-to-audition')">
            <i class="qhht-icon audition-icon"></i>
            <p class="under-text">试听</p>
        </div>
        <hr class="vertical-line"/>
        <div v-show="price[0]" class="toolbar-price" @click="buyByOriginPrice(originPrice)">
            <p class="toolbar-price-num">￥{{price[0] | formatPrice}}</p>
            <span class="under-text">原价购买</span>
        </div>
        <div v-show=" collage || collect" class="toolbar-btnGroup">
            <div v-show="collage" class="toolbar-btn toolbar-btn-left" @click="$emit('router-to-collage')">
                <div v-show="price[1]"  class="toolbar-btn-price">￥{{price[1] | formatPrice}}</div>
                <div>{{collageText}}</div>
            </div>
            <div v-show="collect" class="toolbar-btn toolbar-btn-right" @click="$emit('router-to-collect')">
                <div class="toolbar-btn-price">￥0.00</div>
                <div>发起集赞</div>
            </div>
        </div>
    </div>

    
</template>

<script>
export default {
  name: 'ToolsNavbar',
  props: {
    originPrice: {
      type: String,
      default: '0'
    },
    collage: {
      type: Boolean,
      default: false
    },
    collect: {
      type: Boolean,
      default: false
    },
    price: {
      type: Array,
      default: ['', '']
    },
    collageText: {
      default: '拼团购买'
    }
  },
  filters: {
    formatPrice: function(price) {
      if (!price) return ''
      if (price.includes('.')) return price
      else return price + '.00'
    }
  },
  methods: {
    buyByOriginPrice(price) {
      console.log('买' + price)
      console.log(this.collect)
    }
  }
  /*data() {
    return {
      btn_origin: {
        title: '原价购买',
        openType: 'none',
        isShow: true,
        price: 0,
        btnOriginClass: '',
        isshowprice: true
      },

      btn_group: {
        title: '拼团购买',
        openType: 'none',
        isShow: true,
        price: 0,
        btnGroupClass: '',
        isshowprice: true
      },

      btn_prise: {
        title: '发起集赞',
        openType: 'none',
        isShow: true,
        price: 0,
        btnPraiseClass: '',
        isshowprice: true
      }
    }
  },*/
  /*  mounted() {
    switch (this.btnstate) {
      case 0: //显示拼团购买,原价购买,发起集赞(默认显示)
        this.btn_origin = {
          title: '原价购买',
          price: '19.9',
          openType: 'none',
          isShow: true,
          btnOriginClass: '',
          isshowprice: true
        }
        this.btn_group = {
          title: '三人团',
          price: '19.9',
          openType: 'none',
          isShow: true,
          btnGroupClass: '',
          isshowprice: true
        }
        this.btn_prise = {
          title: '集赞换',
          price: '19.9',
          openType: 'none',
          isShow: true,
          btnPraiseClass: '',
          isshowprice: true
        }
        break
      case 1: //显示原价购买
        this.btn_origin = {
          title: '原价购买',
          price: '19.9',
          openType: 'none',
          isShow: false,
          btnOriginClass: '',
          isshowprice: true
        }
        this.btn_group = {
          title: '原价购买',
          price: '19.9',
          openType: 'none',
          isShow: true,
          btnGroupClass: '',
          isshowprice: true
        }
        this.btn_prise = {
          title: '集赞换',
          price: '19.9',
          openType: 'none',
          isShow: false,
          btnPraiseClass: '',
          isshowprice: true
        }
        break
      case 2: //显示原价购买,发起集赞
        this.btn_origin = {
          title: '原价购买',
          price: '19.9',
          openType: 'none',
          isShow: true,
          btnOriginClass: '',
          isshowprice: true
        }
        this.btn_group = {
          title: '三人团',
          price: '19.9',
          openType: 'none',
          isShow: false,
          btnGroupClass: '',
          isshowprice: true
        }
        this.btn_prise = {
          title: '集赞换',
          price: '19.9',
          openType: 'none',
          isShow: true,
          btnPraiseClass: '',
          isshowprice: true
        }
        break
      case 3: //显示原价购买,我要拼团
        this.btn_origin = {
          title: '原价购买',
          price: '19.9',
          openType: 'none',
          isShow: true,
          btnOriginClass: '',
          isshowprice: true
        }
        this.btn_group = {
          title: '三人团',
          price: '19.9',
          openType: 'none',
          isShow: true,
          btnGroupClass: '',
          isshowprice: true
        }
        this.btn_prise = {
          title: '集赞换',
          price: '19.9',
          openType: 'none',
          isShow: false,
          btnPraiseClass: '',
          isshowprice: true
        }
        break
      case 4: //显示您已发起集赞,请点击前往
        this.btn_origin = {
          title: '',
          price: '',
          openType: 'none',
          isShow: false,
          btnOriginClass: '',
          isshowprice: true
        }
        this.btn_group = {
          title: '您已发起集赞,请点击前往',
          price: '',
          openType: 'none',
          isShow: true,
          btnGroupClass: '',
          isshowprice: false
        }
        this.btn_prise = {
          title: '',
          price: '',
          openType: 'none',
          isShow: false,
          btnPraiseClass: '',
          isshowprice: true
        }
        break
      case 5: //显示我要开团
        this.btn_origin = {
          title: '',
          price: '',
          openType: 'none',
          isShow: false,
          btnOriginClass: '',
          isshowprice: true
        }
        this.btn_group = {
          title: '我要开团',
          price: '',
          openType: 'none',
          isShow: true,
          btnGroupClass: '',
          isshowprice: false
        }
        this.btn_prise = {
          title: '',
          price: '',
          openType: 'none',
          isShow: false,
          btnPraiseClass: '',
          isshowprice: true
        }
        break
      case 6: //显示继续支付
        this.btn_origin = {
          title: '',
          price: '19.9',
          openType: 'none',
          isShow: false,
          btnOriginClass: '',
          isshowprice: true
        }
        this.btn_group = {
          title: '',
          price: '19.9',
          openType: 'none',
          isShow: false,
          btnGroupClass: '',
          isshowprice: true
        }
        this.btn_prise = {
          title: '继续支付',
          price: '19.9',
          openType: 'none',
          isShow: true,
          btnPraiseClass: '',
          isshowprice: true
        }
        break
      case 7: //显示参与拼团
        this.btn_origin = {
          title: '原价购买',
          price: '19.9',
          openType: 'none',
          isShow: false,
          btnOriginClass: '',
          isshowprice: true
        }
        this.btn_group = {
          title: '三人团',
          price: '19.9',
          openType: 'none',
          isShow: false,
          btnGroupClass: '',
          isshowprice: true
        }
        this.btn_prise = {
          title: '参与拼团',
          price: '19',
          openType: 'none',
          isShow: true,
          btnPraiseClass: '',
          isshowprice: false
        }
        break
      case 8: //显示我要学习
        this.btn_origin = {
          title: '原价购买',
          price: '19.9',
          openType: 'none',
          isShow: false,
          btnOriginClass: '',
          isshowprice: true
        }
        this.btn_group = {
          title: '我要学习',
          price: '19.9',
          openType: 'none',
          isShow: true,
          btnGroupClass: '',
          isshowprice: false
        }
        this.btn_prise = {
          title: '集赞换',
          price: '19.9',
          openType: 'none',
          isShow: false,
          btnPraiseClass: '',
          isshowprice: true
        }
        break
      case 9: //显示已完成集赞,点击领取
        this.btn_origin = {
          title: '原价购买',
          price: '19.9',
          openType: 'none',
          isShow: false,
          btnOriginClass: '',
          isshowprice: true
        }
        this.btn_group = {
          title: '已完成集赞,点击领取',
          price: '19.9',
          openType: 'none',
          isShow: true,
          btnGroupClass: '',
          isshowprice: false
        }
        this.btn_prise = {
          title: '集赞换',
          price: '19.9',
          openType: 'none',
          isShow: false,
          btnPraiseClass: '',
          isshowprice: true
        }
        break
    }
  }*/
}
</script>

<style scoped lang='less' >
@origin: #ffa32f;
.purchase-toolbar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 120px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 2px solid #efefef;
  text-align: center;
  background-color: #fff;
  z-index: 10;
}
.toolbar-audition {
  margin: 0 16px;
  line-height: 24px;
}
.audition-icon {
  width: 52px;
  height: 52px;
  background-image: url('../assets/images/onlinecourse-tabbar-try.png');
  background-position-y: top;
  background-size: 40px;
}
.under-text {
  font-size: 20px;
  color: #696969;
}
.vertical-line {
  height: 70px;
  width: 2px;
  border: none;
  margin-right: 28px;
  background-color: #efefef;
}
.toolbar-price {
  /*margin-left: 28px;*/
  margin-right: 28px;
  line-height: 32px;
}
.toolbar-price-num {
  font-weight: 700;
  color: @origin;
  font-size: 30px;
}
.toolbar-btnGroup {
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
  border-radius: 80px;
  align-items: center;
  height: 80px;
  margin-right: 20px;
  text-align: center;
  font-size: 30px;
  overflow: hidden;
  color: #fff;
}
.toolbar-btn {
  height: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 10px 0;
}
.toolbar-btn-left {
  background: linear-gradient(
    to right,
    rgb(254, 202, 0) 0,
    rgb(254, 149, 2) 100%
  );
}
.toolbar-btn-right {
  background: linear-gradient(
    to right,
    rgb(254, 119, 0) 0,
    rgb(255, 79, 5) 100%
  );
}
.toolbar-btn-price {
  font-weight: 700;
  & + div {
    font-size: 20px;
  }
}
</style>

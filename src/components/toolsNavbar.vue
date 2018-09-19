<template>
    <div class="purchase-toolbar">
        <div class="toolbar-audition" @click="$emit('router-to-audition')">
            <i class="qhht-icon audition-icon"></i>
            <p class="under-text">试听</p>
        </div>
        <hr class="vertical-line"/>
        <div v-show="price[0]" :class="collage==false&&collect==false ?'toolbar-price-active' :'toolbar-price'"  @click="buyByOriginPrice(originPrice)">
            <p class="toolbar-price-num">￥{{price[0] | formatPrice}}</p>
            <span class="under-text">原价购买</span>
        </div>
        <div v-show=" collage || collect" class="toolbar-btnGroup">
            <div v-show="collage" class="toolbar-btn toolbar-btn-left" @click="clickCollageBtn">
                <div v-show="price[1]"  class="toolbar-btn-price">￥{{price[1] | formatPrice}}</div>
                <div>{{collageText}}</div>
            </div>
            <div v-show="collect" class="toolbar-btn toolbar-btn-right" @click="clickCollectBtn">
                <div v-show="price[0]" class="toolbar-btn-price">￥0.00</div>
                <div>{{collectText}}</div>
            </div>
        </div>
    </div>
   
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState,mapGetters,mapActions } = createNamespacedHelpers('videoColumnDetail/groupManager')
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
    },
    collectText: {
      default: '发起集赞'
    },
  },
  computed:{
    ...mapGetters(['courseId'])
  },
  filters: {
    formatPrice: function(price) {
      if (!price) return ''
      if (price.includes('.')) return price
      else return price + '.00'
    }
  },
  methods: {
    ...mapActions(['startGroupBuy']),
    buyByOriginPrice(price) {
      console.log('买' + price)
      console.log(this.collect)
    },
    clickCollageBtn(){
      let params = {
        "courseId" : this.courseId
      }
      this.startGroupBuy(params)
      this.$emit('router-to-collage')
    },
    clickCollectBtn(){
      let params = {
        "courseId" : this.courseId
      }
      this.startCollectLike(params)
      $emit('router-to-collect') 
    }   
  }
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
  margin-right:28px;
  background-color: #efefef;
}
.toolbar-price {
  // margin-left: 28px;
  margin-right: 28px;
  line-height: 32px;
}
.toolbar-price-active{
  // margin-left: 28px;
  flex-grow: 1;
  margin-right: 28px;
  line-height: 32px;
  background: linear-gradient(
    to right,
    rgb(254, 119, 0) 0,
    rgb(255, 79, 5) 100%
  );
  border-radius: 80px;
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

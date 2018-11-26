<template>
    <div id="navigation" class="navigation" v-if="navigationShow" :style="{marginBottom}">
        <ul class="navigation_ul" >
            <li @click="routerToHome">店铺主页</li>
            <li @click="routerToMy">个人中心</li>
            <li @click="togglePopup(true)">关注我们</li>
            <li @click="routerToFeedBack">问题反馈</li>
        </ul>
        <i class="navigation_img"></i>
        <van-popup v-model="popupShow">
            <div class="orcode-wrapper">
                <span class="orcode_close" @click="togglePopup()"></span>
                <p class="orcode-header">秦汉胡同</p>
                <img class="orcode" src="../assets/images/bottom_pic_orcode.png" alt="秦汉胡同">
                <p class="orcode-foot">长按二维码，识别并关注</p>
            </div>
            
        </van-popup>
    </div>
</template>

<script>
export default {
  name: 'Navigation',
  data: function() {
    return {
      navigationShow: true,
      marginBottom: '0',
      popupShow: false
    }
  },
  watch: {
    $route: {
      handler({ meta }) {
        const { navHide = false, navMarginBottom } = meta
        this.navigationShow = !navHide
        if (navMarginBottom) {
          this.marginBottom = (navMarginBottom / window.innerWidth) * 100 + 'vw'
        } else {
          this.marginBottom = 0
        }
      }
    }
  },
  methods: {
    routerToHome() {
      this.$router.push({ path: '/home' })
    },
    routerToMy() {
      this.$router.push({ path: '/my' })
    },
    routerToFeedBack() {
      return this.$router.push({ path: '/my/Feedback' })
    },
    togglePopup(show = false) {
      this.popupShow = show
    }
  }
}
</script>

<style lang="less">
.navigation {
  padding: 56px 0 48px;
  /*opacity: 0;*/
  text-align: center;
  font-size: 24px;
  color: #ffa32f;
  background-color: #f5f5f5;
  /*margin-top: 40px;*/
  &.show {
    opacity: 1;
    transition: opacity 0.3s linear;
  }
}
.navigation_ul {
  display: flex;
  justify-content: center;

  li {
    &:not(:last-child) {
      &:after {
        content: '|';
        padding: 0 12px;
        color: #e8e8e8;
      }
    }
  }
}
.navigation_img {
  display: inline-block;
  width: 200px;
  height: 117px;
  margin-top: 72px;
  background: url('../assets/images/bottom_pic_logo.png') center/cover no-repeat;
}
.orcode-wrapper {
  position: relative;
  width: 600px;
  margin: 0 auto;
  border-radius: 12px;
  background-color: #fff;
  padding: 68px 0 80px;
}
.orcode {
  width: 306px;
  margin: 32px auto;
}
.orcode-header {
  font-size: 36px;
}
.orcode-foot {
  font-size: 28px;
  color: #3b3b3b;
}
.orcode_close {
  position: absolute;
  top: 30px;
  right: 30px;
  width: 26px;
  height: 26px;
  background: url('../assets/images/bottom_ic_close.png') center/26px no-repeat;
  color: #b3b3b3;
}
</style>

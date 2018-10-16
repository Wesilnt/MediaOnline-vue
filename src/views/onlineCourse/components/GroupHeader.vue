<template>
    <div class="groupBuy-container">
        <div v-show="isShowGroupBuy">
            <div class="groupBuy-usericon" v-if="isSixGroup === true" >
                <div class="qhht-flex groupBuy-usericon-top">
                        <div class="groupBuy-usericon-item" v-for="(item,index) in userListTop" :key="index" :style="item.avatarUrl==null?{}:{ background : 'url('+item.avatarUrl+')', 'background-size' : '100%'}">
                            <div class="groupBuy-usericon-manager" v-show="item.isStarter">团长</div>            
                        </div>
                </div>
                <div class="qhht-flex groupBuy-usericon-bot">
                        <div class="groupBuy-usericon-item" v-for="(item,index) in userListBot" :key="index" :style="item.avatarUrl==null?{}:{ background : 'url('+item.avatarUrl+')', 'background-size' : '100%'}">
                        </div>
                </div>
            </div>
            <div class="groupBuy-usericon" v-else>
                <div class="qhht-flex groupBuy-usericon-top-three">
                    <div class="groupBuy-usericon-item" v-for="(item,index) in userListTop" :key="index" :style="item.avatarUrl==null?{}:{ background : 'url('+item.avatarUrl+')','background-size' : '100%' }">
                        <div class="groupBuy-usericon-manager" v-show="item.isStarter">团长</div>
                    </div>
                </div>
            </div>
            <div v-if="headerType==100">
                <div class="groupBuy-info">剩余<span>{{leavePerson}}</span>个名额</div>
                <div class="groupBuy-countDown-container">
                    <CountDown :duration="countDownTime"></CountDown>                  
                </div>
                <div class="groupBuy-deadline">距离截止时间</div>               
            </div>
            <div v-else-if="headerType==101">
                <div class="groupBuy-info">拼团成功</div>
            </div>
            <div v-else-if="headerType==102">
                <div class="groupBuy-info">拼团失败</div>
            </div>
            <div v-else-if="headerType==103">
                <div class="groupBuy-info">拼团已满</div>
            </div>
            <div class="groupBuy-circleline" v-show="false"></div>
        </div>
        <!--1. 读书会头图-->
        <div v-if="serviceType ==='Readings'">
          <div class="book-header-container lazy-img-larger">
            <div class="book-cover" v-lazy:background-image="`${profilePic}?imageView2/1/format/webp`">
            </div>
          </div>
        </div>
           <!--2. 少年视野，少年必修-->
        <div v-else class="lazy-img-larger groupBuy-banner" v-lazy:background-image="`${profilePic}?imageView2/1/format/webp`">
            <span class="groupBuy-banner-bottom" v-show="buyCount == 0 ? false : true">{{buyCount}}人已购买</span>
        </div>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapGetters, mapActions } = createNamespacedHelpers(
  'videoColumnDetailData/groupManagerData'
)
import CountDown from '../../../components/CountDown'
export default {
  name: 'GroupHeader',
  data() {
    return {}
  },
  components: {
    CountDown
  },
  computed: {
    ...mapState([
      'leavePerson',
      'countDownTime',
      'userListTop',
      'userListBot',
      'isSixGroup',
      'headerType',
      'isShowGroupBuy',
      'profilePic',
      'serviceType',
      'headerImageType'
    ]),
    ...mapGetters(['buyCount'])
  }
}
</script>


<style lang="scss" scoped>
.groupBuy-container {
  background-color: white;
  text-align: center;
}
//头像部分
.groupBuy-usericon {
  width: 100%;
}
.groupBuy-usericon-manager {
  margin-left: 60px;
  width: 64px;
  height: 36px;
  text-align: center;
  line-height: 32px;
  color: white;
  font-size: 20px;
  border-radius: 18px;
  border: 2px solid white;
  background-color: rgb(236, 93, 76);
  box-sizing: border-box;
}
.groupBuy-usericon-top {
  // background-color:green;
  padding: 30px 231px 40px;
  justify-content: center;
  // box-sizing: border-box;
  .groupBuy-usericon-item {
    &:not(:last-child) {
      margin-right: 48px;
    }
  }
}
.groupBuy-usericon-top-three {
  padding: 30px 76px 40px;
  justify-content: center;
  // box-sizing: border-box;
  .groupBuy-usericon-item {
    &:not(:last-child) {
      margin-right: 48px;
    }
  }
}
.groupBuy-usericon-bot {
  // background-color: red;
  justify-content: center;
  padding: 0 63px;
  .groupBuy-usericon-item {
    &:not(:last-child) {
      margin-right: 48px;
    }
  }
}
.groupBuy-usericon-item {
  width: 120px;
  height: 120px;
  background-color: rgb(250, 219, 162);
  border-radius: 50%;
}
.groupBuy-info {
  font-size: 32px;
  color: rgb(77, 77, 77);
  margin: 30px 0 40px;
  span {
    font-size: 40px;
    color: rgb(255, 163, 47);
  }
}
.groupBuy-countDown-container {
  // background-color: cyan;
  width: 100%;
  height: 48px;
}
.groupBuy-deadline {
  color: rgb(204, 204, 204);
  margin: 16px 0 10px;
}
.groupBuy-banner {
  height: 300px;
  padding: 0 40px;
  text-align: left;
  position: relative;
    background: #f6f6f6 center/cover no-repeat;
  span {
    position: absolute;
    bottom: 20px;
    right: 40px;
    font-size: 28px;
    color: white;
  }
}
.groupBuy-circleline {
  position: absolute;
  width: 112%;
  height: 40px;
  border-radius: 0 0 50% 50%;
  background-color: white;
  margin-top: -16px;
  margin-left: -6%;
  z-index: 99;
}
//1. 作品封面介绍
.book-header-container {
  height: 440px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: #f6f5f6;
  padding-top: 36px;
  .book-cover {
    position: relative;
    height: 350px;
    width: 268px;
    background: #f6f6f6 center/cover no-repeat;
    span {
      border-top-right-radius: 20px;
      background-color: red;
      font-weight: 500;
      padding: 10px 20px;
      position: absolute;
      bottom: 0;
      color: white;
      font-size: 36px;
      letter-spacing: 4px;
    }
  }
}
</style>

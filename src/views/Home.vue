<template>
  <div>
    <SkeletonFullScreen  v-if="loading"/>
    <div class="index" v-else>
      <div>
        <van-swipe :autoplay="4000" class="index-swiper">
          <van-swipe-item v-for="list in bannerList" :key="list.url">
            <i class="qhht-icon lazy-img-larger index-swiper-img" v-lazy:background-image="`${list.url}?imageView2/1/format/jpg`" @click="routerToSwiperDetail(list)"></i>
          </van-swipe-item>

        </van-swipe>
        <!-- <div class="swiper_bottom"></div> -->
      </div>
      <Notice :message-count="newMessageCount" :fromAvatarUrl= "fromAvatarUrl"/>
      <div class="index-container">
        <HomeItem v-for="item of Object.keys(homeColumnList)" 
                  :key="item" 
                  :item="homeColumnList[item]" 
                  :columnType="item"
                  :list='columns[homeColumnList[item].listKey]'/>
      </div>
    </div>
      <!--分销分享组件-->
      <DistributorShare v-model="show"></DistributorShare>
  </div>

</template>

<script>
import SkeletonFullScreen from '../components/SkeletonFullScreen'
import DistributorShare from '../components/share/DistributorShare'
import Notice from '../components/homeComponents/Notice.vue'
import HomeItem from '../components/HomeItem.vue'
import homeData from '../store/module/homeData.js'
import { homeColumnList } from '../utils/config'
import { createNamespacedHelpers } from 'vuex'
import { courseType, getColumnType } from '../utils/config'
const { mapState, mapActions } = createNamespacedHelpers('homeData')

export default {
  name: 'Homepage',
  data() {
    return {
      show: false,
      homeColumnList: homeColumnList
    }
  },
  components: {
    SkeletonFullScreen,
    DistributorShare,
    Notice,
    HomeItem
  },
  computed: mapState([
    'loading',
    'bannerList',
    'newMessageCount',
    'fromAvatarUrl',
    'freeList',
    'visionList',
    'videoList',
    'bookList',
    // 'homeColumnList',
    'columns'
  ]),
  methods: {
    ...mapActions(['getIndexPageData']),
    // type :"2501"
    routerToSwiperDetail(item) {
      if (!item) return
      if (item.type === '2501') {
        let data = item.link.split('&/&')
        this.$router.push({
          path: `/detail/${getColumnType(data[0])}/${data[1]}`
        })
      }
      if (item.type === '2502') {
        window.location.href = item.url
      }
      // if (url.includes('&/&')) {
      //   const [type, id] = url.split('&/&')
      //   // this.$router.push({ path: `/${courseType[type]}${id}` })

      // } else {
      //   console.log(url)
      //   window.location.href = url
      // }
    }
  },
  mounted() {
    this.getIndexPageData()
  }
}
</script>

<style lang='less' scoped>
.index {
  color: #3e3e53;
  // /deep/.van-swipe__indicators{
  //   bottom:30px;
  // }
  /deep/.van-swipe__indicator {
    background-color: #d9d9d9;
  }
  /deep/.van-swipe__indicator--active {
    background-color: white;
  }
}
.index-swiper {
  // margin-bottom: 28px;
}
// .swiper_bottom {
//   background-color: white;
//   width: 100%;
//   height: 60px;
//   position: absolute;
//   top: 320px;
//   border-top-left-radius: 50%;
//   border-top-right-radius: 50%;
//   z-index: 999;
// }
.index-swiper-img {
  width: 100%;
  height: 46.7vw;
}
.index-container {
  padding: 0 28px;
}
</style>

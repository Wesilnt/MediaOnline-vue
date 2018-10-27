<template>
  <div>
    <SkeletonFullScreen  v-if="loading"/>
    <div class="index" v-else>
      <div>
        <van-swipe :autoplay="4000" class="index-swiper">
          <van-swipe-item v-for="list in bannerList" :key="list.url">
            <i class="qhht-icon lazy-img-larger index-swiper-img" v-lazy:background-image="`${list.url}?imageView2/1/format/jpg`" @click="routerToSwiperDetail(list.link)"></i>
          </van-swipe-item>

        </van-swipe>
        <!-- <div class="swiper_bottom"></div> -->
      </div>

      <Notice :message-count="newMessageCount" :fromAvatarUrl= "fromAvatarUrl"/>
      <div class="index-container">
        <Header v-if="false" :link="'/home/freezone'" title="免费专区" subtitle="探索更多" />
        <FreeList v-if="false" :free-list="freeList" />
        <Header :link="'/home/visionList'" title="音频课程" subtitle="探索更多" />
        <DisCoverVisionList :vision-list="visionList" />
        <Header :link="'/home/videoList'" title="视频课程" subtitle="探索更多" />
        <DisCoverVideoList :video-list="videoList" />
<!--        <Header :link="'/home/readings'" title="少年读书会" subtitle="探索更多" />
        <BookList :book-list="bookList" />-->
      </div>
    </div>
  </div>

</template>

<script>
import SkeletonFullScreen from '../components/SkeletonFullScreen'
import Notice from '../components/homeComponents/Notice.vue'
import Header from '../components/homeComponents/Header.vue'
import FreeList from './FreeList.vue'
import DisCoverVisionList from '../components/homeComponents/DisCoverVisionList.vue'
import DisCoverVideoList from '../components/homeComponents/HomeVideoList.vue'
import BookList from './BookList.vue'
import homeData from '../store/module/homeData.js'

import { createNamespacedHelpers } from 'vuex'
import { courseType } from '../utils/config'
const { mapState, mapActions } = createNamespacedHelpers('homeData')

export default {
  name: 'Homepage',
  components: {
    SkeletonFullScreen,
    Notice,
    Header,
    FreeList,
    DisCoverVisionList,
    DisCoverVideoList,
    BookList
  },
  computed: mapState([
    'loading',
    'bannerList',
    'newMessageCount',
    'fromAvatarUrl',
    'freeList',
    'visionList',
    'videoList',
    'bookList'
  ]),
  methods: {
    ...mapActions(['getIndexPageData']),
    routerToSwiperDetail(url) {
      if (!url) {
        return
      }
      if (url.includes('&/&')) {
        const [type, id] = url.split('&/&')
        this.$router.push({ path: `/${courseType[type]}${id}` })
      } else {
        console.log(url)
        window.location.href = url
      }
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
  margin-bottom: 100px;
  // /deep/.van-swipe__indicators{
  //   bottom:30px;
  // }
  /deep/.van-swipe__indicator {
    background-color: white;
  }
  /deep/.van-swipe__indicator--active {
    background-color: #d9d9d9;
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

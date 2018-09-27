<template>
  <div class="index">
    <Swiper :images="bannerList"/>
    <Notice :message-count="newMessageCount"/>
    <div class="index-container">
      <Header :link="'/home/freezone'" title="免费专区" subtitle="探索更多"/>
      <FreeList :free-list="freeList"/>
      <Header :link="'/home/visionList'" title="少年视野" subtitle="探索更多" />
      <DisCoverVisionList :vision-list="visionList"/>
      <Header :link="'/home/videoList'" title="少年必修" subtitle="探索更多"/>
      <DisCoverVideoList :video-list="videoList"/>
      <Header :link="'/home/readings'" title="中国少年读书会" subtitle="探索更多"/>
      <BookList :book-list="bookList"/>
    </div>
  </div>
</template>

<script>
import Swiper from '../components/homeComponents/Swiper.vue'
import Notice from '../components/homeComponents/Notice.vue'
import Header from '../components/homeComponents/Header.vue'
import FreeList from './FreeList.vue'
import DisCoverVisionList from '../components/homeComponents/DisCoverVisionList.vue'
import DisCoverVideoList from '../components/homeComponents/HomeVideoList.vue'
import BookList from './BookList.vue'
import homeData from '../store/module/homeData.js'

import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('homeData')

export default {
  name: 'Homepage',
  components: {
    Swiper,
    Notice,
    Header,
    FreeList,
    DisCoverVisionList,
    DisCoverVideoList,
    BookList
  },
  computed: mapState([
    'bannerList',
    'newMessageCount',
    'freeList',
    'visionList',
    'videoList',
    'bookList'
  ]),
  methods: {
    ...mapActions(['getIndexPageData'])
  },
  mounted() {
    this.getIndexPageData()
  }
}
</script>

<style lang='less' scoped>
.index {
  font-size: 24px;
  color: #3E3E53;
  margin-bottom: 100px;
}
.index-container {
  padding: 0 28px;
}
</style>

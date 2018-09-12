<template>
  <div>
    <Swiper :images="bannerList"/>
    <Notice :message-count="newMessageCount"/>
    <Header :link="'/home/freezone'" title="免费专区" subtitle="探索更多"/>
    <FreeList :free-list="freeList"/>
    <div class="sepline"/>

    <Header :link="'/home/visionList'" title="少年视野" subtitle="探索更多" />
    <DisCoverVisionList :vision-list="visionList"/>
    <div class="sepline"/>
    <Header :link="'/home/videoList'" title="少年必修" subtitle="探索更多"/>
    <DisCoverVideoList :video-list="videoList"/>
    <div class="sepline" />
    <Header :link="'/home/readings'" title="中国少年读书会" subtitle="探索更多"/>
    <BookList :book-list="bookList"/>
    <div class="homePosition"/>

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
const { mapState, mapActions } = createNamespacedHelpers('homeData');

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
  computed:mapState([
    'bannerList',
    'newMessageCount',
    'freeList',
    'visionList',
    'videoList',
    'bookList'
  ]),
  methods:{
    ...mapActions([
      'getBannerList',
      'getNewMessageCount',
      'getFreeList',
      'getVisionList',
      'getVideoList',
      'getBookList'
    ])
  },
  created(){
    this.getBannerList();
    this.getNewMessageCount();
    this.getFreeList();
    this.getVisionList();
    this.getVideoList();
    this.getBookList();
  }
}
</script>

<style lang='less' scoped>
.sepline {
  width: 694px;
  height: 2px;
  background-color: rgb(238, 238, 238);
  margin-top: 28px;
  margin-left: 28px;
}
.homePosition {
  height: 100px;
}
</style>

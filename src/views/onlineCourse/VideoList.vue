<template>
    <div class="home-container">
        <div class="home-header"><img :src="require('../../assets/images/onlinecourse-pic-share.png')" alt=""></div>
            <div class="home-video">
            <router-link to="/videoColumnDetail">
                <videolistitem v-for="item of dataList" :key="item.id" :iteminfo="item"/>
            </router-link>
    </div>
    <div class="home-warnTip">没有更多了,不要在拉了~</div>
</div>
</template>
<script>
import videoListItem from './components/videoListItem.vue'

export default {
  name: 'VideoList',
  data() {
    return {
      dataList: [
        {
          id: 0,
          title: '中华五千年 (上)',
          info: '听历史故事,涨人生知识',
          name: '伍智',
          job: '国学老师',
          price: '99.00',
          number: '100'
        },
        {
          id: 1,
          title: '中华五千年 (上)',
          info: '听历史故事,涨人生知识',
          name: '伍智',
          job: '国学老师',
          price: '99.00',
          number: '100'
        },
        {
          id: 2,
          title: '中华五千年 (上)',
          info: '听历史故事,涨人生知识',
          name: '伍智',
          job: '国学老师',
          price: '99.00',
          number: '100'
        },
        {
          id: 3,
          title: '中华五千年 (上)',
          info: '听历史故事,涨人生知识',
          name: '伍智',
          job: '国学老师',
          price: '99.00',
          number: '100'
        },
        {
          id: 4,
          title: '中华五千年 (上)',
          info: '听历史故事,涨人生知识',
          name: '伍智',
          job: '国学老师',
          price: '99.00',
          number: '100'
        }
      ]
    }
  },
  methods: {},
  components: {
    videolistitem: videoListItem
  }
}
</script>

<style lang="scss" scoped>
.home-header {
  width: 100%;
  height: 300px;
  margin-bottom: 20px;
  background-color: red;

  img {
    width: 100%;
    height: 300px;
  }
}
.home-video {
  padding: 0 40px;
}
.home-warnTip {
  text-align: center;
  margin: 120px auto 180px;
  font-size: 24px;
  color: rgb(200, 200, 200);
}
</style>

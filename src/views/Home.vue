<template>
  <div>
    <Swiper :images="images"/>
    <Notice :message-count="messageCount"/>
    <Header :link="'/home/freezone'" title="免费专区" subtitle="探索更多"/>
    <FreeList :free-list="freeList"/>
    <div class="sepline"/>

    <Header :link="'/home/visionList'" title="视野" subtitle="探索更多" />
    <DisCoverVisionList :vision-list="list"/>
    <div class="sepline"/>
    <Header :link="'/home/videoList'" title="在线课堂" subtitle="探索更多"/>
    <DisCoverVideoList :video-list="videoList"/>
    <div class="sepline" />
    <Header :link="'/home/readings'" title="读书会" subtitle="探索更多"/>
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
  data: function() {
    return {
      images: [
        {
          clickUrl: '#',
          desc: 'nhwc',
          url: 'http://dummyimage.com/1745x492/f1d65b'
        },
        {
          clickUrl: '#',
          desc: 'hxrj',
          url: 'http://dummyimage.com/1745x492/40b7ea'
        },
        {
          clickUrl: '#',
          desc: 'rsdh',
          url: 'http://dummyimage.com/1745x492/e3c933'
        }
      ],
      messageCount: 1,
      freeList: [
        {
          title: '为什么抱元科技没有食堂？',
          type: '文学'
        },
        {
          title: '名画为什么这么值钱？',
          type: '艺术'
        }
      ],
      list: [
        {
          id: 1,
          url: 'http://dummyimage.com/1745x492/f1d65b',
          title: '中华五千年',
          desc: '听历史故事，涨人生见识',
          author: '伍智·国学教师',
          price: '99.00',
          count: 100,
          fit: '4-6岁儿童'
        },
        {
          id: 2,
          url: 'http://dummyimage.com/1745x492/f1d65b',
          title: '中华五千年',
          desc: '听历史故事，涨人生见识',
          author: '伍智·国学教师',
          price: '99.00',
          count: 100,
          fit: '4-6岁儿童'
        },
        {
          id: 3,
          url: 'http://dummyimage.com/1745x492/f1d65b',
          title: '中华五千年',
          desc: '听历史故事，涨人生见识',
          author: '伍智·国学教师',
          price: '99.00',
          count: 100,
          fit: '4-6岁儿童'
        }
      ],
      videoList: [
        {
          id: 4,
          url: 'http://dummyimage.com/1745x492/f1d65b',
          title: '中华五千年',
          desc: '听历史故事，涨人生见识',
          author: '伍智·国学教师',
          price: '99.00',
          count: 100
        },
        {
          id: 5,
          url: 'http://dummyimage.com/1745x492/f1d65b',
          title: '中华五千年',
          desc: '听历史故事，涨人生见识',
          author: '伍智·国学教师',
          price: '99.00',
          count: 100
        },
        {
          id: 6,
          url: 'http://dummyimage.com/1745x492/f1d65b',
          title: '中华五千年',
          desc: '听历史故事，涨人生见识',
          author: '伍智·国学教师',
          price: '99.00',
          count: 100
        }
      ],
      bookList: [
        {
          url: 'http://dummyimage.com/1745x492/40b7ea',
          title: '小麦的故事',
          isNew: false,
          price: 4.99
        },
        {
          url: 'http://dummyimage.com/1745x492/40b7ea',
          title: '小麦的故事',
          isNew: false,
          price: 4.99
        },
        {
          url: 'http://dummyimage.com/1745x492/40b7ea',
          title: '小麦的故事',
          isNew: false,
          price: 4.99
        },
        {
          url: 'http://dummyimage.com/1745x492/40b7ea',
          title: '小麦的故事',
          isNew: false,
          price: 4.99
        },
        {
          url: 'http://dummyimage.com/1745x492/40b7ea',
          title: '小麦的故事',
          isNew: false,
          price: 4.99
        },
        {
          url: 'http://dummyimage.com/1745x492/40b7ea',
          title: '小麦的故事',
          isNew: false,
          price: 4.99
        },
        {
          url: 'http://dummyimage.com/1745x492/40b7ea',
          title: '小麦的故事',
          isNew: false,
          price: 4.99
        },
        {
          url: 'http://dummyimage.com/1745x492/40b7ea',
          title: '小麦的故事',
          isNew: false,
          price: 4.99
        },
        {
          url: 'http://dummyimage.com/1745x492/40b7ea',
          title: '小麦的故事',
          isNew: false,
          price: 4.99
        }
      ]
    }
  }
  // props:['bannerList']
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

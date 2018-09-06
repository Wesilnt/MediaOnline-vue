<template>
    <div v-infinite-scroll="loadMore" class="myScroll" infinite-scroll-disabled="loading" infinite-scroll-distance="30">
        <img :src="banner" class="head" alt="">
        <div class="middle"/>
        <div v-for="(item, index) in list" :key="index" class="list">
            <VisionCell :vision="item" class="cell"/>
            <div class="sep"/>
        </div>
        <div class="bottomtip">没有更多了，不要再拉了</div>
    </div>
</template>

<script>
import VisionCell from '../../components/homeComponents/VisionCell.vue'
export default {
  components: {
    VisionCell
  },
  data() {
    return {
      banner: '',
      list: []
    }
  },
  created() {
    this.banner = 'http://dummyimage.com/1745x492/e3c933'
    this.list = [
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
      },
      {
        id: 4,
        url: 'http://dummyimage.com/1745x492/f1d65b',
        title: '中华五千年',
        desc: '听历史故事，涨人生见识',
        author: '伍智·国学教师',
        price: '99.00',
        count: 100,
        fit: '4-6岁儿童'
      },
      {
        id: 5,
        url: 'http://dummyimage.com/1745x492/f1d65b',
        title: '中华五千年',
        desc: '听历史故事，涨人生见识',
        author: '伍智·国学教师',
        price: '99.00',
        count: 100,
        fit: '4-6岁儿童'
      }
    ]
  },
  methods: {
    loadMore() {
      if (this.list.length > 20) {
        return
      }
      this.loading = true
      setTimeout(() => {
        this.getMoreData()
        this.loading = false
      }, 2500)
    },
    getMoreData() {
      let more = [
        {
          url: 'http://dummyimage.com/1745x492/f1d65b',
          title: '中华五千年',
          desc: '听历史故事，涨人生见识',
          author: '伍智·国学教师',
          price: '99.00',
          count: 100,
          fit: '4-6岁儿童'
        },
        {
          url: 'http://dummyimage.com/1745x492/f1d65b',
          title: '中华五千年',
          desc: '听历史故事，涨人生见识',
          author: '伍智·国学教师',
          price: '99.00',
          count: 100,
          fit: '4-6岁儿童'
        },
        {
          url: 'http://dummyimage.com/1745x492/f1d65b',
          title: '中华五千年',
          desc: '听历史故事，涨人生见识',
          author: '伍智·国学教师',
          price: '99.00',
          count: 100,
          fit: '4-6岁儿童'
        }
      ]

      this.list = this.list.concat(more)
    }
  }
}
</script>
<style lang="less" scoped>
.myScroll {
  max-height: 1400px;
  overflow-y: auto;
}
.head {
  display: block;
  width: 100%;
  height: 300px;
}
.middle {
  height: 10px;
  width: 100%;
}
.cell {
  margin-top: 20px;
  padding-bottom: 20px;
}
.sep {
  height: 1px;
  width: 100%;
  background-color: lightgray;
}
.bottomtip {
  text-align: center;
  height: 160px;
  color: lightgray;
  line-height: 160px;
  font-size: 28px;
}
</style>

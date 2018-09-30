<template>
    <div class="read-container">
        <!-- 1. 头部信息 -->
        <div class="header-container " v-lazy:background-image="bannerPic"></div>
        <!-- 2. 全部书籍按钮 -->
        <div class="book-sticky">
            <a class="book-btn">
                全部书籍
            </a>
        </div>
        <!-- 3. 读书会列表 -->  
          <div  class="read-list-container">
            <div v-for="item of bookList" :key="item.id"  @click="toDetail(item.id)" class="list-item">
                <div class="top-container" v-lazy:background-image="item.coverPic">
                    <span>上新</span>
                    <img src="../../assets/readings_item_play.png">
                </div>
                <div class="bottom-container">
                    <p>{{item.name}}</p>
                    <span>¥ {{item.price}}</span>
                </div>
            </div> 
          </div> 
        <!-- 分页加载 -->
        <div class="load-more-container" v-if="finished" v-scrollbottom="{scrollBottom,finished,refreshing}">
            <span>没有更多了，不要再拉啦～</span>
        </div>
    </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('readings')

export default {
  data() {
    return {
      refreshing: false
    }
  },
  directives: {
    scrollbottom: function(el, binding) {
      let top = 0
      window.onscroll = function() {
        var scrollTop = 0,
          bodyScrollTop = 0,
          documentScrollTop = 0
        if (document.body) {
          bodyScrollTop = document.body.scrollTop
        }
        if (document.documentElement) {
          documentScrollTop = document.documentElement.scrollTop
        }
        scrollTop =
          bodyScrollTop - documentScrollTop > 0
            ? bodyScrollTop
            : documentScrollTop

        var windowHeight = 0
        if (document.compatMode == 'CSS1Compat') {
          windowHeight = document.documentElement.clientHeight
        } else {
          windowHeight = document.body.clientHeight
        }

        // console.log(windowHeight)
        var scrollHeight = 0,
          bodyScrollHeight = 0,
          documentScrollHeight = 0
        if (document.body) {
          bodyScrollHeight = document.body.scrollHeight
        }
        if (document.documentElement) {
          documentScrollHeight = document.documentElement.scrollHeight
        }
        scrollHeight =
          bodyScrollHeight - documentScrollHeight > 0
            ? bodyScrollHeight
            : documentScrollHeight
        // console.log(scrollHeight)
        if (
          scrollTop - top > 0 &&
          scrollTop + windowHeight >= scrollHeight - 10 &&
          !binding.value.finished &&
          !refreshing
        ) {
          binding.value.scrollBottom()
        }
        top = scrollTop
      }
    }
  },
  computed: {
    ...mapState(['bannerPic', 'bookList', 'loading', 'finished'])
  },
  watch: {
    loading: function(state) {
      this.refreshing = state.loading
    }
  },
  created() {
    this.getReadingsList(true)
  },
  methods: {
    ...mapActions(['getReadingsList']),
    scrollBottom() {
      console.log('分页')
      this.getReadingsList(true)
    },
    //音频播放
    toDetail(id) {
      this.$router.push({ name: 'BookDetail', params: { courseId:id } })
    }
  }
}
</script>
<style lang="scss" scoped>
.read-container {
  display: flex;
  flex-direction: column;
  background-color: white;
  //头部样式
  .header-container {
    display: flex;
    flex-direction: column;
    background: #f6f6f6 center/100% no-repeat;
    color: white;
    padding: 40px;
    height: 372px;
    h5 {
      font-size: 48px;
      line-height: 56px;
      padding-top: 56px;
      margin: 0;
      font-weight: 300;
    }
    hr {
      margin: 0;
      margin-top: 40px;
      border: none;
      height: 4px;
      background-color: white;
      width: 128px;
    }
    p {
      margin: 40px 0 0 0;
    }
  }
  //中间按钮样式
  .book-sticky {
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    background-color: white;
    z-index: 2004;
  }
  .book-btn {
    display: inline-block;
    margin: 20px 40px;
    color: white;
    text-align: center;
    line-height: 64px;
    width: 208px;
    border-radius: 12px;
    height: 64px;
    background-color: #ffa32f;
    box-shadow: 0 1px 1px #efefef;
  }
  //列表样式
  .read-list-container {
    padding: 0 2.66666667% 0 2.53333333%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    margin-top: 40px;
    box-sizing: border-box;
    .list-item {
      display: flex;
      flex-direction: column;
      width: 33.33333333%;
      padding: 0 2.81293952% 64px 2.9535865%;
      box-sizing: border-box;
    }
    .top-container {
      position: relative;
      border-radius: 20px;
      width: 100%;
      height: 0;
      padding-bottom: 130.6122449%;
      background: #f6f6f6 center/100& no-repeat;
      span {
        position: absolute;
        bottom: 0;
        left: 0;
        border-radius: 0 20px 0 20px;
        background-color: red;
        padding: 6px 24px;
        color: white;
      }
      img {
        position: absolute;
        bottom: 10px;
        right: 10px;
        width: 56px;
        height: 56px;
      }
    }
    .bottom-container {
      display: flex;
      flex-direction: column;
      p {
        color: rgb(22, 35, 60);
        margin: 20px 0 0 0;
      }
      span {
        color: rgb(255, 163, 47);
        margin-top: 16px;
      }
    }
  }
  .load-more-container {
    width: 100%;
    text-align: center;
    height: 64px;
    margin-bottom: 64px;
    color: rgb(200, 200, 200);
  }
}
</style>

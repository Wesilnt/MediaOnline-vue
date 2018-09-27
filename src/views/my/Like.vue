<template>
    <section>
        <div v-if="likeList.length===0" class="like-nodata">
            <i class="qhht-icon like-nodata-icon"/>
            <p class="like-nodata-warn">暂无任何收藏</p>
            <a class="like-nodata-btn"></a>
        </div>
        <div v-else class="like-container">
            <div class="like-head-top-img">
            </div>
            <div class="like-head">
                <img class="like-head-left-icon" src="../../assets/images/my_record_play.png"/>
                <div class="like-head-record-text">播放全部</div>
                <div class="like-head-record-number">(共26条记录)</div>
                <img class="like-head-right-icon" src="../../assets/images/my_sys_menu.png">
            </div>

            <div v-for="(item,index) in likeList" :key="item.id" class="like-list">
                <van-swipe-cell :right-width="150" :on-close="onClose(item.id)">
                    <div class="like-list-item">
                        <!--<img src="" class="like-item-avatar"/>-->
                        <p class="like-list-item-order-number">{{index + 1}}</p>
                        <div class="like-list-item-content">
                            <p class="like-list-item-content-name">{{item.title}}</p>
                            <div>
                                <p class="like-list-item-content-detail">{{item.courseName}} -
                                    {{item.subTitle}} - {{item.learnTime}} / {{item.totalTime}}</p>
                            </div>
                        </div>
                        <img class="like-list-item-img-more" src="../../assets/images/my_record_more.png"/>
                    </div>
                    <span slot="right">删除</span>
                </van-swipe-cell>
            </div>
        </div>
    </section>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const { mapState, mapActions } = createNamespacedHelpers('myLike')
export default {
  name: 'Like',
  components: {
    // NavBar
  },
  data: function() {
    return {}
  },
  computed: {
    ...mapState(['likeList', 'loading'])
  },
  methods: {
    ...mapActions(['queryList', 'delMyLike'])
  },
  created() {
    this.queryList()
  }
}
</script>

<style scoped lang="less">
.like {
  &-container {
  }
  &-head-top-img {
    width: 100%;
    height: 300px;
    background: #fde3e3;
  }
  &-head {
    padding: 40px 30px 40px 0px;
    display: flex;
    flex-direction: row;
    margin-right: 30px;
    margin-left: 30px;
    border-bottom: 0.1px solid #ddd;
    &-left-icon {
      width: 40px;
      height: 40px;
      margin: 7px 20px 0px 0px;
    }
    &-record-text {
      padding: 3px 8px 0px 0px;
      font-size: 36px;
      color: #3e3e53;
    }
    &-record-number {
      padding: 6px 0px 0px 0px;
      font-size: 28px;
      color: #57668f;
    }

    &-right-icon {
      width: 28px;
      height: 26px;
      margin: 10px 0px 0px 0px;
      position: absolute;
      right: 30px;
    }
  }
  &-list {
    padding: 0px 30px 0px 30px;
    &-item {
      width: 100%;
      padding: 24px 0px 24px 10px;
      display: flex;
      flex-direction: row;
      border-bottom: 0.1px solid #ddd;
      &-order-number {
        font-size: 36px;
        color: #949aaa;
        padding: 24px 35px 24px 0px;
      }
      &-avatar {
        width: 94px;
        height: 94px;
        background-color: #ff9521;
        border-radius: 12px;
        margin: 30px 0px 0px 0px;
      }
      &-content {
        flex-grow: 1;
        &-name {
          padding: 6px 0px 0px 0px;
          font-size: 36px;
          color: #333030;
        }
        &-detail {

          color: #7d7d7e;
          padding: 16px 0px 0px 0px;
        }
      }
      &-img-more {
        width: 34px;
        height: 6px;
        margin: 59px 0px 0px 0px;
        /*position: absolute;*/
        /*right: 30px;*/
      }
    }
  }

  &-nodata {
    height: 100vh;
    text-align: center;
    color: #949aaa;
    &-icon {
      width: 180px;
      height: 200px;
      margin-top: 180px;
      background-image: url('../../assets/my-nodata.png');
    }
    &-warn {

      margin: 40px 0;
    }
  }
}
.van-swipe-cell span {
  width: 150px;
  height: 100%;
  color: #ffffff;
  font-size: 18px;
  display: block;
  line-height: 44px;
  background-color: #f44;
  display: flex;
  justify-content: center;
  align-items: Center;
}
</style>

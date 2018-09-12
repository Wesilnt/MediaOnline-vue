<template>
    <section>
        <div v-if="puzzleList.length===0 && selected===puzzleTypes.all && totalCount===0" class="my-puzzle-nodata">
            <i class="qhht-icon my-puzzle-nodata-icon"></i>
            <p class="my-puzzle-nodata-warn">暂无{{pageName}}信息</p>
            <a class="my-puzzle-nodata-btn">我要{{pageName}}</a>
        </div>
        <div v-else class="my-puzzle-container">
            <van-tabs v-model="selected" color="#ffa32f" :line-width='60'>
                <van-tab  v-for="item in Object.keys(puzzleTabs)"
                          :key="item"
                           :title="item==='waiting'?`${pageName}${puzzleTabs[item]}`: puzzleTabs[item]">
                    <div class="my-puzzle-content">
                        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
                            <Skeleton></Skeleton>
                            <div v-for="puzzle in puzzleList" :key="puzzle.id" class="my-puzzle-content-cell">
                            <p class="qhht-flex">
                                <i class="qhht-icon my-puzzle-content-cell-icon"></i>
                                <span class="my-puzzle-content-cell-date">{{pageName}}时间：{{puzzle.createTime}}</span>
                                <Badge :status="isPraise?puzzle.collectLikeStatus:puzzle.groupBuyStatus">{{pageName}}</Badge>
                            </p>
                            <div class="qhht-flex">
                                <img :alt="puzzle.course.name" :title="puzzle.course.name" class="my-puzzle-content-img" v-lazy="puzzle.course.coverPic" >
                                <ul class="my-puzzle-display">
                                    <li><h3> {{puzzle.course.name}}</h3></li>
                                    <li>{{puzzle.course.priefIntro?puzzle.course.priefIntro:'暂无简介'}}</li>
                                    <li><span class="my-puzzle-total-price">￥{{puzzle.course.price}}</span> / 共{{puzzle.course.lessonCount}}讲</li>
                                </ul>
                            </div>
                            <div v-show="!isPraise" class="my-puzzle-price">{{pageName}}价：<span class="my-puzzle-price-num">￥{{puzzle.price}}</span></div>
                        </div>
                        </van-pull-refresh>
                    </div>
                </van-tab>
            </van-tabs>
        </div>
    </section>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import Badge from '../../components/Badge'
import Skeleton from '../../components/Skeleton'

const { mapState, mapActions } = createNamespacedHelpers('myPuzzle_Praise')

export default {
  name: 'MyPuzzlePraise',
  data: function() {
    const { path } = this.$route
    let pageName = ''
    if (path.endsWith('my-puzzle')) pageName = '拼团'
    else if (path.endsWith('my-praise')) pageName = '集赞'
    return {
      refreshing: false,
      selected: '1200',
      pageName,
      isPraise: pageName === '集赞'
    }
  },
  // created() {
  // const { pageName, currentType } = this
  // this.queryList({ pageName, currentType })
  // },
  computed: {
    ...mapState([
      'puzzleTabs',
      'puzzleTypes',
      'currentType',
      'puzzleList',
      'loading',
      'totalCount',
      'pageSize',
      'currentPage'
    ])
  },
  watch: {
    selected: function(currentType) {
      const { isPraise, puzzleTypes, pageSize, currentPage } = this
      const Types = Object.values(puzzleTypes)
      this.toggleCurrentType({
        pageSize,
        currentPage,
        currentType: Types[currentType],
        isPraise
      })
    },
    loading: function(newLoading) {
      console.log(newLoading, this.refreshing)
      if (!newLoading && this.refreshing) {
        this.$toast('刷新成功')
        this.refreshing = false
      }
    }
  },

  methods: {
    ...mapActions(['queryList', 'toggleCurrentType']),
    onRefresh() {
      const { isPraise, puzzleTypes, pageSize, currentPage, currentType } = this
      console.log(currentType)
      const Types = Object.values(puzzleTypes)
      this.toggleCurrentType({
        pageSize,
        currentPage,
        currentType,
        isPraise
      })
    }
  },
  components: {
    Badge,Skeleton
  }
}
</script>

<style scoped lang="less">
@active: #ffa32f;
@fail: #ccc;
.my-puzzle {
  &-container {
    font-size: 24px;
    min-height: 100vh;
    background-color: #fffcf7;
    .van-tabs {
      padding-top: 0;
    }
    .van-tab {
      position: relative;
      border: 0;
      padding: 28px 0;
      color: #212d44;
      &&--active {
        color: @active;
        &:after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          margin: 0 auto;
          width: 120px;
          height: 4px;
          border-radius: 4px;
          background: @active;
        }
      }
    }
    .van-ellipsis {
      font-size: 36px;
    }
    /*}*/
  }
  &-content {
    padding: 32px 40px;
      min-height: 50vh;
    &-cell {
      position: relative;
      border-radius: 4px;
      padding: 32px;
      background-color: #fff;
      margin-bottom: 32px;
      &-icon {
        width: 24px;
        height: 24px;
        margin-right: 12px;
        background-image: url('../../assets/my_puzzle_clock.png');
      }
      &-date {
        flex-grow: 1;
        color: @fail;
      }
      .qhht-flex:first-child {
        margin-bottom: 24px;
      }
    }
    &-img {
      width: 136px;
      height: 180px;
      border-radius: 12px;
    }
  }
  &-display {
    flex-grow: 1;
    margin-left: 32px;
    align-self: start;
    h3 {
      font-size: 32px;
    }
    li:not(:last-child) {
      margin-bottom: 32px;
    }
  }
  &-total-price {
    color: @active;
  }
  &-price {
    position: absolute;
    bottom: 32px;
    right: 32px;
    color: #999;
    &-num {
      font-weight: 600;
      color: #333;
      font-size: 26px;
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
      font-size: 24px;
      margin: 40px 0;
    }
    &-btn {
      display: block;
      margin: 0 auto;
      width: 240px;
      height: 90px;
      line-height: 90px;
      border-radius: 90px;
      border: 1px solid @active; /*no*/
      color: @active;
      letter-spacing: 1px;
      font-size: 30px;
    }
  }
}
</style>

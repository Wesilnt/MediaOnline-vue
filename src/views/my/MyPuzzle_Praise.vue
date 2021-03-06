<template>
    <section>
        <div v-show="allNoData" class="my-puzzle-nodata">
            <i class="qhht-icon my-puzzle-nodata-icon"></i>
            <p class="my-puzzle-nodata-warn">暂无{{pageName}}信息</p>
            <a class="my-puzzle-nodata-btn" @click="routerToHome">我要{{pageName}}</a>
        </div>
        <div   class="my-puzzle-container">
            <van-tabs v-model="selected" color="#ffa32f" :line-width='60'>
                <van-tab  v-for="item in Object.keys(puzzleTabs)"
                          :key="item"
                           :title="item==='waiting'?`${pageName}${puzzleTabs[item]}`: puzzleTabs[item]">
                    <div class="my-puzzle-content">
                        <van-pull-refresh v-model="loadrefresh" @refresh="onRefresh">
                            <Skeleton v-show="!querying" :loading="puzzleList.length===0" rows="1">暂无相关信息</Skeleton>
                            <van-list
                                v-model="loadQuery"
                                :finished="finished"
                                @load="onLoadMore"
                                :offset="60"
                                :immediate-check="false"
                            >
                                <div v-for="puzzle in puzzleList"
                                     :key="puzzle.id"
                                     class="my-puzzle-content-cell"
                                     @click="routerToDetail(puzzle.course)"
                                >
                                    <p class="qhht-flex">
                                        <i class="qhht-icon my-puzzle-content-cell-icon"></i>
                                        <span class="my-puzzle-content-cell-date">{{pageName}}时间：{{puzzle.createTime}}</span>
                                        <Badge :status="isPraise?puzzle.collectLikeStatus:puzzle.groupBuyStatus">{{pageName}}</Badge>
                                    </p>
                                    <div class="qhht-flex">
                                        <div v-lazy:background-image="`${puzzle.course.coverPic}?imageView2/1/format/jpg`" class="my-puzzle-content-img"></div>
                                        <ul class="my-puzzle-display">
                                            <li><h3> {{puzzle.course.name}}</h3></li>
                                            <li>{{puzzle.course.priefIntro?puzzle.course.priefIntro:'暂无简介'}}</li>
                                            <li><span class="my-puzzle-total-price">￥{{puzzle.course.price}}</span> / 共{{puzzle.course.lessonCount}}讲</li>
                                        </ul>
                                    </div>
                                    <div v-show="!isPraise" class="my-puzzle-price">{{pageName}}价：<span class="my-puzzle-price-num">￥{{puzzle.price}}</span></div>
                                </div>
                                <p  v-show="!querying && finished && puzzleList.length>4" class="my-puzzle-finished">没有数据啦</p>
                            </van-list>
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
import {
  puzzleTabs,
  praiseTypes,
  puzzleTypes,
  courseType,
  getColumnType
} from '../../utils/config'

const { mapState, mapActions, mapGetters } = createNamespacedHelpers(
  'myPuzzle_PraiseData'
)

export default {
  name: 'MyPuzzlePraise',
  data: function() {
    const { path } = this.$route
    let pageName = '',
      productTypes = puzzleTypes
    if (path.endsWith('my-puzzle')) pageName = '拼团'
    else if (path.endsWith('my-praise')) {
      pageName = '集赞'
      productTypes = praiseTypes
    }

    return {
      puzzleTabs,
      productTypes,
      selected: '1200',
      pageName,
      isPraise: pageName === '集赞',
      loadrefresh: false,
      loadQuery: false,
      allNoData: false
    }
  },
  computed: {
    ...mapState([
      'currentType',
      'puzzleList',
      'querying',
      'refreshing',
      'totalCount',
      'pageSize',
      'currentPage'
    ]),
    ...mapGetters(['finished'])
  },
  watch: {
    selected: function(currentType) {
      const { isPraise, productTypes, pageSize, currentPage } = this
      console.log(productTypes)
      const Types = Object.values(productTypes)
      this.toggleCurrentType({
        pageSize,
        currentPage,
        currentType: Types[currentType],
        isPraise,
        loadType: 'querying'
      })
    },
    refreshing: function(refreshing) {
      this.loadrefresh = !!refreshing
    },
    querying: function(querying) {
      this.loadQuery = !!querying
    },
    puzzleList: function(puzzleList) {
      this.allNoData =
        puzzleList.length === 0 &&
        this.currentType === this.productTypes.all &&
        this.totalCount === 0
    }
  },
  methods: {
    ...mapActions(['queryList', 'toggleCurrentType']),
    onRefresh() {
      this.loadList(8, 'refreshing')
    },
    onLoadMore() {
      if (!this.finished) this.loadList(this.pageSize * 2)
    },
    loadList(pageSize, loadType = 'querying') {
      const { isPraise, currentPage, currentType } = this
      this.toggleCurrentType({
        pageSize,
        currentPage,
        currentType,
        isPraise,
        loadType
      })
    },
    routerToDetail({ type, id }) {
      // this.$router.push({ path: `/${courseType[type]}${id}` })
      this.$router.push({ path: `/detail/${getColumnType(type)}/${id}` })
    },
    routerToHome() {
      this.$router.push({ path: '/home' })
    }
  },
  components: {
    Badge,
    Skeleton
  }
}
</script>

<style scoped lang="less">
@active: #ffa32f;
@fail: #ccc;
.my-puzzle {
  &-container {
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
    padding: 132px 40px 32px;
    .van-list {
      min-height: 50vh;
    }

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
        background-image: url('../../assets/images/my_puzzle_clock.png');
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
      background: #f6f6f6 center/cover no-repeat;
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
      background-image: url('../../assets/images/my_praise_empty.png');
    }
    &-warn {
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
  &-finished {
    text-align: center;
    color: #ddd;
  }
}
</style>

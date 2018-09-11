<template>
    <section>
        <div v-if="puzzleList.length===0 && selected===puzzleTypes.all" class="my-puzzle-nodata">
            <i class="qhht-icon my-puzzle-nodata-icon"/>
            <p class="my-puzzle-nodata-warn">暂无{{pageName}}信息</p>
            <a class="my-puzzle-nodata-btn">我要{{pageName}}</a>
        </div>
        <div v-else class="my-puzzle-container">
            <van-tabs v-model="selected" color="#ffa32f" line-width="60">
                <van-tab  v-for="item in Object.keys(puzzleTabs)"
                           :title="item==='waiting'?`${pageName}${puzzleTabs[item]}`: puzzleTabs[item]">
                    <div class="my-puzzle-content">
                        <div v-for="puzzle in puzzleList" :key="puzzle.id" class="my-puzzle-content-cell">
                            <p class="qhht-flex">
                                <i class="qhht-icon my-puzzle-content-cell-icon"/>
                                <span class="my-puzzle-content-cell-date">{{pageName}}时间：{{puzzle.time}}</span>
                                <Badge :status="puzzle.status===puzzleTypes.succeed?'success':puzzle.status===puzzleTypes.fail?'warning':'normal'">{{pageName}}</Badge>
                            </p>
                            <div class="qhht-flex">
                                <img :src="puzzle.url" :alt="puzzle.title" :title="puzzle.title" class="my-puzzle-content-img">
                                <ul class="my-puzzle-display">
                                    <li><h3> {{puzzle.title}}</h3></li>
                                    <li>{{puzzle.description}}</li>
                                    <li><span class="my-puzzle-total-price">￥{{puzzle.totalPrice}}</span> / 共{{puzzle.totalLessons}}讲</li>
                                </ul>
                            </div>
                            <div class="my-puzzle-price">{{pageName}}价：<span class="my-puzzle-price-num">￥{{puzzle.price}}</span></div>
                        </div>
                    </div>
                </van-tab>
            </van-tabs>

        </div>
    </section>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import Badge from '../../components/Badge'

const { mapState, mapActions } = createNamespacedHelpers('myPuzzle_Praise')

export default {
  name: 'MyPuzzlePraise',
  data: function() {
    const { path } = this.$route
    let pageName = ''
    if (path.endsWith('my-puzzle')) pageName = '拼团'
    else if (path.endsWith('my-praise')) pageName = '集赞'
    return {
      selected: '0',
      pageName
    }
  },
  created() {
    this.queryList({ currentType: this.currentType })
  },
  computed: {
    ...mapState([
      'puzzleTabs',
      'puzzleTypes',
      'currentType',
      'puzzleList',
      'loading'
    ])
  },
  watch: {
    selected: function(currentType) {
      this.toggleCurrentType({ currentType })
    }
  },
  mounted() {
    console.log(this)
  },
  methods: {
    ...mapActions(['queryList', 'toggleCurrentType'])
  },
  components: {
    Badge
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
      border-radius: 6px;
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

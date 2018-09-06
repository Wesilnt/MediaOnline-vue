<template>
    <section class="my-puzzle-container">
        <mt-navbar  fixed :value="currentType" v-model="selected">
            <mt-tab-item
                    v-for="item in Object.keys(puzzleTabs)"
                    :key="item"
                    :id="puzzleTypes[item]">
                {{puzzleTabs[item]}}
            </mt-tab-item>
        </mt-navbar>
        <div class="my-puzzle-content">
            <div v-for="puzzle in puzzleList" :key="puzzle.id" class="my-puzzle-content-cell">
                <p class="qhht-flex">
                    <i class="qhht-icon my-puzzle-content-cell-icon"/>
                    <span class="my-puzzle-content-cell-date">拼团时间：{{puzzle.time}}</span>
                    <Badge :status="puzzle.status===puzzleTypes.succeed?'success':puzzle.status===puzzleTypes.fail?'warning':'normal'"></Badge>
                </p>
                <div>{{puzzle}}</div>
            </div>
        </div>
    </section>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import Badge from "../../components/Badge";
const { mapState, mapActions } = createNamespacedHelpers("myPuzzle");
export default {
  name: "MyPuzzle",
  data: function() {
    return {
      selected: '0'
    };
  },
  computed: {
    ...mapState([
      "puzzleTabs",
      "puzzleTypes",
      "currentType",
      "puzzleList",
      "loading"
    ])
  },
  watch: {
    selected: function(currentType) {
      this.toggleCurrentType({ currentType });
    }
  },
  created() {
    this.queryList({ currentType: this.currentType });
  },
  methods: {
    ...mapActions(["queryList", "toggleCurrentType"])
  },
  components: {
    Badge
  }
};
</script>

<style scoped lang="less">
@active: #ffa32f;
@fail: #ccc;
.my-puzzle {
  &-container {
    min-height: 100vh;
    background-color: #fffcf7;
    .mint-tab-item {
      position: relative;
      border: 0;
      padding: 28px 0;
      &.is-selected {
        color: @active;
        &:after {
          content: "";
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
  }
  &-content {
    margin-top: 80px;
    padding: 32px 40px;
    &-cell {
      border-radius: 4px;
      padding: 32px;
      background-color: #fff;
      margin-bottom: 32px;
      &-icon {
        width: 24px;
        height: 24px;
        margin-right: 12px;
        background-image: url("../../assets/my_puzzle_clock.png");
      }
      &-date {
        flex-grow: 1;
        color: @fail;
      }
    }
  }
}
</style>

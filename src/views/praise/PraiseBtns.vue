<template>
  <div class="praise-btns-container">
    <div v-if="btnState.isSingle" class="btn-single">
      <span :class="btnState.singleStyle" @click="onSingle">
        {{btnState.singleText}}
      </span>
    </div>
    <div v-else class="btn-double">
      <span @click="onLeft">
        {{btnState.leftText}}
      </span>
      <span @click="onRight">
        {{btnState.rightText}}
      </span>
    </div>
    <!-- <mobile-validate v-if="show" @callback="validateCallback"/> -->
  </div>
</template>
<script>
import { createNamespacedHelpers,mapState as mapRootState } from 'vuex'
import MobileVali from '../../components/PhoneVerif.vue'
const { mapState, mapActions, mapGetters } = createNamespacedHelpers('praiseData')
let buttonDatas = [
  {
    isSingle: false, //单按钮还是双按钮  0
    leftText: '分享给好友',
    rightText: '分享海报'
  },
  {
    isSingle: true, //单按钮还是双按钮   1
    singleStyle: 'solid-large', //按钮样式
    singleText: '为TA点赞，免费领取伍老师历史课程'
  },
  {
    isSingle: false, //单按钮还是双按钮  2
    leftText: '帮TA分享',
    rightText: '我也要集赞'
  },
  {
    isSingle: true, //单按钮还是双按钮   3
    singleStyle: 'hollow-small', //按钮样式
    singleText: '现在去领取'
  },
  {
    isSingle: true, //单按钮还是双按钮   4
    singleStyle: 'hollow-small', //按钮样式
    singleText: '马上去学习'
  },
  {
    isSingle: true, //单按钮还是双按钮   5
    singleStyle: 'solid-small', //按钮样式
    singleText: '我也要集赞'
  },
  {
    isSingle: true, //单按钮还是双按钮    6
    singleStyle: 'hollow-small', //按钮样式
    singleText: '活动已结束'
  },
  {
    isSingle: true, //单按钮还是双按钮   7
    singleStyle: 'solid-small', //按钮样式
    singleText: '重新发起集赞'
  }
]
export default {
  components: { 'mobile-validate': MobileVali },
  props: ['state', 'courseid', 'collectlikeid','columntype'],
  data() {
    return {
      show: false,
      buttonDatas: buttonDatas,
      btnState: buttonDatas[this.state]
    }
  },
  watch: {
    state: function(newValue) {
      this.btnState = buttonDatas[newValue]
    }
  },
  computed:{...mapRootState(['url'])},
  methods: {
    ...mapActions(['joinCollectLike']),
    onSingle() {
      if (1 == this.state) {
        //TODO  参与集赞
        this.joinCollectLike({ collectLikeId: this.collectlikeid })
      }
      if (
        3 == this.state || //集赞完成未领取（发起人）
        4 == this.state || //集赞完成已领取（发起人）
        5 == this.state || //集赞完成（好友）
        7 == this.state
      ) {
        //TODO专栏详情
       this.goColumnDetail()
        return
      }
    },
    onLeft() {
      //分享
      this.$emit('share')
    },
    onRight() {
      if (0 == this.state) { 
        let params = { id: this.collectlikeid }
        //分享海报
        //专栏类型columnType：  FreeZone 免费专区 OnlineCourse 在线课堂  OnlineVision 在线视野  Readings 读书会
        this.$router.push({
          name: 'SharePoster',
          params,
          query: {
                  shareUrl:( this.url + `#/praise/active?columnType=${this.columntype}`) || '/#/home',

                 }
        })
      }
      if (2 == this.state) {
        //我也要集赞
        this.goColumnDetail()
      }
    },
    goColumnDetail(){  
      //专栏类型  FreeZone 免费专区 OnlineCourse 在线课堂  OnlineVision 在线视野  Readings 读书会
      let columnName = this.columntype == "OnlineCourse" ? 
                'videoColumnDetail':this.columntype == 'OnlineVision'?
                'VisionDetail':this.columntype == 'FreeZone'? 
                'FreeZone':'BookDetail'
      this.$router.push({name: columnName, params: { courseId: this.courseid }})
    }
  }
}
</script>
<style lang="scss" scoped>
.praise-btns-container {
  width: 100%;
  //单按钮
  .btn-single {
    display: flex;
    flex-direction: row;
    justify-content: center;
    span {
      width: 650px;
      height: 100%;
    }
  }
  .btn-single .solid-large {
    width: 650px;
    padding: 0 60px;
    height: 96px;
    line-height: 96px;
    border-radius: 96px;
    background-color: rgb(255, 163, 47);
    color: white;
    font-size: 36px;
    text-align: center;
  }
  .btn-single .solid-small {
    width: 312px;
    padding: 0 60px;
    height: 96px;
    line-height: 96px;
    border-radius: 90px;
    background-color: rgb(255, 163, 47);
    color: white;
    font-size: 36px;
    border: 1px rgb(255, 163, 47) solid; /*no*/
  }
  .btn-single .hollow-small {
    width: 312px;
    padding: 0 60px;
    height: 96px;
    line-height: 96px;
    border-radius: 90px;
    background-color: white;
    color: rgb(255, 163, 47);
    font-size: 36px;
    border: 1px rgb(255, 163, 47) solid; /*no*/
  }
  //双按钮
  .btn-double {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
  }
  .btn-double :nth-child(1) {
    font-size: 36px;
    color: rgb(255, 163, 47);
    border-radius: 96px;
    border: 1px solid rgb(255, 163, 47); /*no*/
    width: 312px;
    text-align: center;
    line-height: 96px;
  }
  .btn-double :nth-child(2) {
    font-size: 36px;
    color: white;
    border-radius: 96px;
    background-color: rgb(255, 163, 47);
    width: 312px;
    text-align: center;
    line-height: 96px;
  }
}
</style>

<template>
    <div class="courseIntroduce">
        <div ref="content" class="content" :class="{'content-expand':isExpand}" >
           <!-- <p ref="contentChild">{{courseinfo}}</p> -->
           <div ref="contentChild" v-html="courseinfo"></div>
        </div>
        <div class="arrow-container" :class="{'arrow-container-expand':isExpand}" v-if="needExpand">
          <i class="qhht-icon arrow-icon-innner" :style="!isExpand ? imgUp : imgDown" @click="handleExpand"></i>
        </div>
    </div>
</template>

<script>
export default {
  name: 'CourseIntroduce',
  props: ['courseinfo'],
  data() {
    return {
      // infoword:'',
      needExpand: false,
      isExpand: false,
      imgDown: {
        backgroundImage:
          'url(' + require('../assets/images/onlinecourse_arrow_down.png') + ')'
      },
      imgUp: {
        backgroundImage:
          'url(' + require('../assets/images/onlinecourse_arrow_up.png') + ')'
      }
    }
  },
  methods: {
    handleExpand() {
      this.isExpand = !this.isExpand
    }
  },
  watch:{
    // Vue 中的 nextTick 来监听 DOM 中是数据变化。
    'courseinfo':function(newVal){
        this.$nextTick(function(){
          console.log(this.$refs.content.clientHeight)
          console.log(this.$refs.contentChild.clientHeight)
          this.needExpand =
                  this.$refs.content.clientHeight < this.$refs.contentChild.clientHeight
          console.log(this.needExpand)
        })

    }
  }
}
</script>

<style lang='scss' scoped>
.courseIntroduce {
  position: relative;
  background-color: #fff;
  margin-top: 48px;
  margin-bottom: 20px;
  .content {
    max-height: 150px;
    overflow: hidden;
    font-size: 30px;
    word-wrap: break-word;
    transition: height 0.4s linear;
    &.content-expand {
      max-height: inherit;
      overflow: visible;
    }
  }
}
.arrow-container {
  position: absolute;
  width: 100%;
  bottom: 0;
  text-align: center;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.8), #ffffff);
  // background: linear-gradient(
  //   to bottom,
  //   rgba(255, 255, 255, 0.2) 10%,
  //   rgba(255, 255, 255, 0.4) 25%,
  //   rgba(255, 255, 255, 0.6) 30%,
  //   rgba(255, 255, 255, 0.9) 90%,
  //   rgba(255, 255, 255, 1) 100%
  // );
  // margin-top: -70px;
  .arrow-icon-innner {
    margin-top: 50px;
  }
}
.arrow-container-expand {
  position: relative;
  .arrow-icon-innner {
    margin-top: 0px;
  }
}

</style>

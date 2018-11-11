<template>
    <div class="courseIntroduce">
        <div class="courseIntroduce-content" :class="{'content-expand':isExpand}" >
           <div  v-html="courseinfo" v-judgeHeight="needExpand"></div>
        </div>
        <div class="arrow-container" :class="{'arrow-container-expand':isExpand}" v-if="needExpand" @click="handleExpand">
          <a class="icon-arrow" ></a>
        </div>
    </div>
</template>

<script>
let inter = null,
  vm = null
export default {
  name: 'CourseIntroduce',
  props: ['courseinfo'],
  data() {
    return {
      needExpand: false,
      isExpand: false
    }
  },
  directives: {
    judgeHeight: {
      // 指令的定义
      inserted: function(el) {
        setTimeout(() => {
          vm('needExpand', el.parentElement.clientHeight < el.clientHeight)
        }, 60)
      }
    }
  },
  created() {
    vm = (status, val) => (this[status] = val)
  },
  methods: {
    handleExpand() {
      this.isExpand = !this.isExpand
    }
  }
}
</script>

<style lang='less' scoped>
.courseIntroduce {
  position: relative;
  background-color: #fff;
  padding: 48px 0;
  .courseIntroduce-content {
    max-height: 640px;
    overflow: hidden;
    font-size: 28px;
    word-wrap: break-word;
    transition: height 0.6s linear;
    &.content-expand {
      max-height: inherit;
      overflow: visible;
    }
  }
}
.arrow-container {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  text-align: center;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.2) 10%,
    rgba(255, 255, 255, 0.8) 30%,
    rgba(255, 255, 255, 0.96) 60%,
    rgba(255, 255, 255, 1) 100%
  );
  &.arrow-container-expand {
    position: relative;
    background: transparent;
    bottom: -40px;
    margin-top: -40px;
    .icon-arrow {
      margin-top: 0;
      background-position-y: 0;
      transform: rotate(180deg);
    }
  }
}
.icon-arrow {
  display: inline-block;
  width: 56px;
  height: 56px;
  margin-top: 80px;
  background: url('../assets/images/arrow_down.png') center no-repeat;
  background-size: 80%;
  transition: transform 0.2s linear;
}
</style>

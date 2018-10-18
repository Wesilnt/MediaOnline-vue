<template>
    <div class="courseIntroduce">
        <div ref="content" class="courseIntroduce-content" :class="{'content-expand':isExpand}" >
           <div ref="contentChild" v-html="courseinfo"></div>
        </div>
        <div class="arrow-container" :class="{'arrow-container-expand':isExpand}" v-if="needExpand" @click="handleExpand">
          <a class="icon-arrow" ></a>
        </div>
    </div>
</template>

<script>
let inter = null
export default {
  name: 'CourseIntroduce',
  props: ['courseinfo'],
  data() {
    return {
      needExpand: false,
      isExpand: false
    }
  },
  methods: {
    handleExpand() {
      this.isExpand = !this.isExpand
    },
    ExpandWatched() {
        clearTimeout(inter)
        inter = setTimeout(() => {
            this.$nextTick(() => {
                const { content, contentChild } = this.$refs
                const { clientHeight: contentClientHeight } = content
                const { clientHeight: contentChildClientHeight } = contentChild

                if (!contentChildClientHeight) {
                    return
                }
                console.log('正在判定介绍高度',contentClientHeight,contentChildClientHeight)
                if (!contentClientHeight) {
                    return this.ExpandWatched()
                }
                this.needExpand = contentChildClientHeight > contentClientHeight
                console.log('介绍高度判定结束')
                // this.$refs.content.clientHeight < this.$refs.contentChild.clientHeight
            })
        }, 100)
    }
  },
  watch: {
      courseinfo: {
      handler: 'ExpandWatched',
      immediate: true
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
    max-height: 168px;
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
  transition: transform 0.1s linear;
}
</style>

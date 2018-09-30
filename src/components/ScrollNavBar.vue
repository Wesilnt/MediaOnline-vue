<template>
    <ul class="qhht-flex scroll-navBar" ref="scrollTool">
        <li class="scroll-navBar-item" v-for="(item,index) in bars" :key="item.title" @click="scrollToRef(index)"><a class="scroll-navBar-item-btn" :class="{active:active===index}">
            {{item.title}}
        </a></li>
    </ul>
</template>

<script>
import { throttle } from '../utils/utils'
let handleWindowScroll = () => {}
export default {
  name: 'ScrollNavBar',
  props: {
    bars: {
      type: Array,
      default: [
        {
          title: '标题',
          ref: 'title'
        },
        {
          title: '详情',
          ref: 'describe'
        },
        {
          title: '评论',
          ref: 'comment'
        }
      ],
      validator: function(value) {
        // 这个值必须匹配下列字符串中的一个
        console.log(value)
        return true
        // return ['success', 'warning', 'danger'].indexOf(value) !== -1
      }
    },
    offsetBottom: {
      type: Number,
      default: 4
    },
    active: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      scrollToolOffsetBottom: 0, // 微调点击item时，屏幕滚动高度
      scrollTargetClientRect: [] // 初始的被监视元素宽高及具顶部信息（尽量少的去获取或者Dom操作，优化性能）
    }
  },
  mounted() {
    this.getScrollTargetClientRect()
    handleWindowScroll = throttle(this.handleScroll, 300) // 节流处理
    window.addEventListener('scroll', handleWindowScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', handleWindowScroll)
  },
  methods: {
    getScrollTargetClientRect() {
      // 获取scrollTool的高度及微偏移量
      // 记录初始的被监视元素宽高及具顶部信息
      this.scrollToolOffsetBottom =
        this.$refs.scrollTool.clientHeight + this.offsetBottom
      this.scrollTargetClientRect = this.bars.map(item => {
        /*TODO getBoundingClientRect与offsetTop优缺点 (微信浏览器没有y值)
        * getBoundingClientRect返回的是元素现在所在位置距离顶部高等，所以如果当前页面记录了访问位置，拿到的就不准确，逻辑会全部错误。但此方法返回的位置最为精确
        * offsetTop 拿到的是距离是当前元素上边缘距离offsetParent返回元素的距离的数值  （offsetParent此属性可以返回距离当前元素最近的采用定位（position属性值为fixed、relative或者absolute）祖先元素）考虑到应用场景，此值拿到的较为准确
        * */
        const elem = document.getElementById(item.ref)
        const { offsetTop, clientHeight } = elem
        return { top: offsetTop, height: clientHeight + offsetTop }
        // const { top, height } = elem.getBoundingClientRect()
        // return { top: Math.ceil(top), height }
      })
    },
    scrollToRef(active) {
      this.active = parseInt(active, 10)
      window.scrollTo(
        0,
        this.scrollTargetClientRect[active].y - this.scrollToolOffsetBottom
      )
    },
    handleScroll(e) {
      e.preventDefault()
      e.stopPropagation()
      const { top } = document.body.getBoundingClientRect()
      const offsetBodyTop = -top
      this.scrollTargetClientRect.forEach((item, index) => {
        // console.log( `距顶 ${item.y - offsetBodyTop}, 距底${item.height - offsetBodyTop} `)
        // 如果元素在视图内，就设置active当前对象index
        // 判断依据 body滚动高度是否大于该元素距离顶部高度，且低于该元素高度
        if (
          item.top - offsetBodyTop > 0 &&
          item.height - offsetBodyTop < window.innerHeight &&
          this.active !== index
        ) {
          return (this.active = index)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.scroll-navBar {
  position: sticky;
  top: -1px;
  left: 0;
  right: 0;
    height: 79px;
  text-align: center;
  background-color: #fff;
  box-shadow: 0 1px 2px #ddd;
  z-index: 20;
}
.scroll-navBar-item {
  flex-grow: 1;
}
.scroll-navBar-item-btn {
  display: block;
  width: 120px;
  margin: 0 auto;
  height: 80px;
  line-height: 80px;
  font-weight: bolder;
  font-size: 28px;
  color: #3e3e53;
  /*transition: border 0.3s linear;*/
  &.active {
    border-bottom: 4px solid #ffa32f;
    color: #ffa32f;
  }
}
</style>

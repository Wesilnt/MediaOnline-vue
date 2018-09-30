<template>
    <div>
        <div class="lazy-img-most wxconfig-header" v-lazy:background-image="null"></div>
        <ul class="qhht-flex scroll-tool" ref="scrollTool">
            <li class="scroll-tool-item" v-for="(item,index) in bars" :key="item.title" @click="scrollToRef(index)"><a class="tool-btn" :class="{active:active===index}">
                {{item.title}}
            </a></li>
        </ul>
        <div class="wxconfig-title" ref="title">
            <p>模拟标题</p>
        </div>
        <div  class="btn-wrapper">
            <van-button type="default" size="large" @click="handleRegisterWxConfig">注册微信</van-button>
            <van-button type="primary" size="large"  @click="handleWxShare">分享按钮</van-button>
            <van-button type="warning" size="large" @click="onOpenPupop">测试Picker</van-button>
            <van-button type="danger" size="large">待测试</van-button>
        </div>
        <div class="wxconfig-title" ref="describe">
            <p>模拟详情</p>
        </div>
        <div class="wxconfig-title" ref="comment">
            <p>模拟评论</p>
        </div>
        <div class="wxconfig-footer">
            模拟中间层
        </div>
        <div class="wxconfig-footer">
            模拟底部
        </div>
        <van-popup v-model="show" position="bottom">
            <van-picker
                show-toolbar
                title="标题"
                :columns="columns"
                @cancel="onCancel"
                @confirm="onConfirm"
                ref="picker"
            />
        </van-popup>

    </div>
</template>

<script>
// 处理过的问题
// 微信config 重复注册，分享不成功(link必须与当前域名相同)等
// Vant picker组件
//tabBar头部黏贴 点击滚动到相应位置
import { mapActions } from 'vuex'
import { throttle } from '../../utils/utils'
let handleWindowScroll = () => {}
export default {
  name: 'wxConfig',
  data() {
    return {
      show: false,
      bars: [
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
      scrollToolOffsetBottom: 0, // 微调点击item时，屏幕滚动高度
      scrollTargetClientRect: [], // 初始的被监视元素宽高及具顶部信息（尽量少的去获取或者Dom操作，优化性能）
      active: 0,
      columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
      selectColumn: 0
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
    ...mapActions(['registerWxConfig', 'setWxShareFriend', 'setWxShareZone']),
    handleRegisterWxConfig: function() {
      const { fullPath } = this.$route
      this.registerWxConfig({
        fullPath,
        jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline']
      })
    },
    handleWxShare: function() {
      const options = {
        title: '分享',
        desc: '测试分享',
        link: window.location.href,
        imgUrl: require('../../assets/poster_header_bg.jpg'),
        successCB: res => console.log(res),
        cancelCB: res => console.log(res)
      }
      this.setWxShareFriend(options)
      this.setWxShareZone(options)
    },
    onOpenPupop() {
      this.show = true
    },
    onChange(picker, value, index) {
      this.$toast(`当前值：${value}, 当前索引：${index}`)
    },
    onConfirm(value, index) {
      this.$toast(`当前值：${value}, 当前索引：${index}`)
      this.show = false
    },
    onCancel() {
      this.$toast('取消')
      this.show = false
    },
    getScrollTargetClientRect() {
      // 获取scrollTool的高度及微偏移量
      // 记录初始的被监视元素宽高及具顶部信息
      this.scrollToolOffsetBottom = this.$refs.scrollTool.clientHeight + 4
      this.scrollTargetClientRect = this.bars.map(item => {
        /*TODO getBoundingClientRect与offsetTop优缺点 (微信浏览器没有y值)
* getBoundingClientRect返回的是元素现在所在位置距离顶部高等，所以如果当前页面记录了访问位置，拿到的就不准确，逻辑会全部错误。但此方法返回的位置最为精确
* offsetTop 拿到的是距离是当前元素上边缘距离offsetParent返回元素的距离的数值  （offsetParent此属性可以返回距离当前元素最近的采用定位（position属性值为fixed、relative或者absolute）祖先元素）考虑到应用场景，此值拿到的较为准确
* */
        const elem = this.$refs[item.ref]
        const { offsetTop, clientHeight } = elem
        return { y: offsetTop, height: clientHeight + offsetTop }
        // const { top, height } = this.$refs[item.ref].getBoundingClientRect()
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
          item.y - offsetBodyTop > 0 &&
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
.wxconfig-header {
  height: 400px;
  background: #fff center no-repeat;
}
.scroll-tool {
  position: sticky;
  top: -1px;
  left: 0;
  right: 0;
  text-align: center;
  background-color: #fff;
  box-shadow: 0 1px 2px #ddd;
  z-index: 20;
}
.scroll-tool-item {
  flex-grow: 1;
}
.tool-btn {
  display: block;
  width: 56px;
  margin: 0 auto;
  height: 80px;
  line-height: 80px;
  font-weight: bolder;
  color: #999;
  &.active {
    border-bottom: 4px solid #f871ff;
    color: #f871ff;
  }
}
.wxconfig-title {
  height: 560px;
  margin: 20px;
  line-height: 560px;
  background: #fffad0;
  color: #6b6b6b;
  text-align: center;
}

.wxconfig-footer {
  margin: 20px;
  height: 400px;
  line-height: 400px;
  background: #fbfbfb;
  color: #9e9e9e;
  text-align: center;
}
.btn-wrapper {
  margin: 24px;
}
.van-button {
  margin-bottom: 12px;
}
</style>

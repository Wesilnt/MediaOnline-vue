<template>
  <div>
    <SkeletonFullScreen  v-if="loading"/>
    <div class="anti-bottomBar" v-else>
      <GroupHeader></GroupHeader>
      <GroupContent></GroupContent>
      <!-- 底部工具条 -->
      <tools-navbar/>
    </div>
  </div>

</template>

<script>
import SkeletonFullScreen from '../../components/SkeletonFullScreen'
import GroupHeader from './components/GroupHeader'
import GroupContent from './components/GroupContent'
import toolsNavbar from '../../components/toolsNavbar.vue'
import {
  createNamespacedHelpers,
  mapState as rootState,
  mapActions as rootActions
} from 'vuex'
const { mapState, mapMutations, mapActions } = createNamespacedHelpers(
  'videoColumnDetailData'
)

export default {
  name: 'VideoColumnDetail',
  components: {
    SkeletonFullScreen,
    'tools-navbar': toolsNavbar,
    GroupHeader,
    GroupContent
  },
  data() {
    return {
      courseId:this.$route.params.courseId
    }
  },
  watch: {},
  computed: {
    ...rootState(['url']),
    ...mapState([
      'loading',
      'freeLessonList', //试看课程数组
      'profilePic', //头图
      'description', //专栏介绍
      'outlinePic', //课程列表下面的大图展示
      'videoColumnComments', //视频专栏的留言
      'buyIntro', //购买须知
      'lessonCount', //专栏课集总数
      'commentCount', //留言总条数
      'buyCount',
      'collectLikeId', //集赞ID
      'courseName'
    ])
  },
  methods: {
    ...rootActions([
      'getUserInfo',
      'registerWxConfig',
      'setWxShareFriend',
      'setWxShareZone'
    ]),
    ...mapMutations(['initDatas', 'resetState']),
    ...mapActions(['getVideoColumnDetail'])
  },
  created() {
    //获取专栏Id
    // const courseId = this.$route.params.courseId
    const groupBuyId = this.$route.query.groupBuyId
    this.initDatas(this.courseId)
    this.getVideoColumnDetail({ courseId: this.courseId, groupBuyId: groupBuyId })
    const { fullPath } = this.$route
    this.registerWxConfig({
      fullPath,
      jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline']
    })
  },
  mounted() {
    this.getUserInfo().then(user => {
      //拼装分享内容
      this.shareData = {
        link: this.url + `/#/videoColumnDetail/${this.courseId}`,
        title: `${this.courseName}`,
        desc: '你一定会爱上国学课...',
        successCB: () => console.log('分享回调成功'),
        cancelCB: () => console.log('分享回调失败')
      }
      this.setWxShareFriend(this.shareData)
      this.setWxShareZone(this.shareData)
    })
  },
  beforeDestroy() {
    this.resetState()
  }
}
</script>

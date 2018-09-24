<template>
  <div class="videocol-dec-container">
    <GroupHeader></GroupHeader>
    <GroupContent></GroupContent>
    <!-- 底部工具条 -->
    <tools-navbar/>
  </div>
</template>

<script>
import GroupHeader from './components/GroupHeader'
import GroupContent from './components/GroupContent'
import toolsNavbar from '../../components/toolsNavbar.vue'
import { createNamespacedHelpers } from 'vuex'
const { mapState,mapMutations,mapActions } = createNamespacedHelpers('videoColumnDetail')

export default { 
    name: 'VideoColumnDetail',
    components: {       
      'tools-navbar': toolsNavbar,
      GroupHeader,
      GroupContent ,
    },
    data() {
      return {

      }
    },
    watch: {},
    computed: {
      ...mapState([
        'freeLessonList', //试看课程数组
        'profilePic', //头图
        'description', //专栏介绍
        'outlinePic', //课程列表下面的大图展示
        'videoColumnComments', //视频专栏的留言
        'buyIntro', //购买须知
        'lessonCount', //专栏课集总数
        'commentCount', //留言总条数
        'buyCount',
        'collectLikeId' //集赞ID
      ])
    },
    methods: {
      ...mapMutations(['initDatas']),
      ...mapActions(['getVideoColumnDetail']),
    }, 
    created() {
      //获取专栏Id
      const courseId = this.$route.params.courseId

      this.initDatas(courseId)
      this.getVideoColumnDetail({ "courseId": courseId }) 
    }
}
</script>

<style lang="scss" scoped>
.videocol-dec-container {
  margin: 0;
  padding: 0;
  background-color: #fff;
  height: 100%;
}
</style>

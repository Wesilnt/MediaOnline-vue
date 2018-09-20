<template>
  <div class="videocol-dec-container">
    <GroupHeader></GroupHeader>
    <GroupContent></GroupContent>
    <!-- 底部工具条 -->
    <tools-navbar
        v-on:router-to-audition="routerToAudition"
        v-on:router-to-collage="routerToCollage"
        v-on:router-to-collect="routerToCollect"
        :originPrice="100"
        :price="['100','10']"
        collageText="拼团"
        collectText="集赞"
        :collect='true'
        :collage='true'
    />
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
      routerToAudition() {
        console.log('跳转到试听')
      },
      routerToCollage() {
        console.log('跳转到拼团')
      },
      routerToCollect() {
        console.log('跳转到集赞')
        // this.$router.push({ name: 'PraiseActive',params: { courseId : this.$route.params.courseId ,collectLikeId:this.collectLikeId} }) 
      }
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

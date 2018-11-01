<template>
  <div>
    <SkeletonFullScreen  v-if="renderLoading"/>
    <div class="anti-bottomBar" v-else>
      <GroupHeader></GroupHeader>
      <GroupContent></GroupContent>
      <!-- 底部工具条 -->
      <!-- <Payment /> -->
      <toolsNavbar/>
    </div>
  </div>
</template>

<script>
import SkeletonFullScreen from '../../components/SkeletonFullScreen'
import GroupHeader from './components/GroupHeader'
import GroupContent from './components/GroupContent'
import toolsNavbar from '../../components/toolsNavbar.vue'
import Payment from '../../components/Payment'
import { createNamespacedHelpers } from 'vuex'
import {columnType,columnStatus} from '../../utils/config'
const { mapState, mapMutations, mapActions } = createNamespacedHelpers(
  'columnData'
)

export default {
  name: 'VideoColumnDetail',
  components: {
    SkeletonFullScreen,
    toolsNavbar,
    GroupHeader,
    GroupContent,
    Payment
  },
  data() {
    return {
      columnType:this.$route.params.columnType,
      courseId:this.$route.params.courseId,
      groupBuyId:this.$route.query.groupBuyId
    }
  },
  computed: {
    ...mapState(['renderLoading'])
  },
  methods: {
    ...mapMutations(['initDatas', 'resetState']),
    ...mapActions(['getColumnDetail','getLessonList','getCategoryList'])
  },
  created() {
    //初始化页面数据(将路由中带过来的专栏ID存储到仓库)
    this.initDatas({ courseId: this.courseId, groupBuyId: this.groupBuyId })
   // 获取专栏详情
    this.getColumnDetail({
      courseId: this.courseId,
      groupBuyId: this.groupBuyId,
      columnType: this.columnType
    })
    //获取专栏下的所有单集
    if(this.columnType === 'onlineCourse'){
      this.getLessonList({
        courseId: this.courseId,
        refresh:false
      })
    }else if(this.columnType === 'onlineVision') {
      this.getCategoryList(this.courseId)
    }

  },
  beforeDestroy() {
    //页面销毁前将loading状态还原
    this.resetState()
  }
}
</script>

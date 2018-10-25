<template>
  <div>
    <SkeletonFullScreen  v-if="loading"/>
    <div class="anti-bottomBar" v-else>
      <GroupHeader></GroupHeader>
      <GroupContent></GroupContent>
      <!-- 底部工具条 -->
      <Payment />
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
const { mapState, mapMutations, mapActions } = createNamespacedHelpers(
  'videoColumnDetailData'
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
      courseId: this.$route.params.courseId,
      groupBuyId: this.$route.query.groupBuyId
    }
  },
  computed: {
    ...mapState(['loading'])
  },
  methods: {
    ...mapMutations(['initDatas', 'resetState']),
    ...mapActions(['getVideoColumnDetail'])
  },
  created() {
    //初始化页面数据(将路由中带过来的专栏ID存储到仓库)
    this.initDatas({ courseId: this.courseId, groupBuyId: this.groupBuyId })
    //获取专栏详情
    this.getVideoColumnDetail({
      courseId: this.courseId,
      groupBuyId: this.groupBuyId
    })
  },
  beforeDestroy() {
    //页面销毁前将loading状态还原
    this.resetState()
  }
}
</script>

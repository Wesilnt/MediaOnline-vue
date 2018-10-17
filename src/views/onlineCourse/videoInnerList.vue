<template>
  <div>
    <playlist v-for="(item,index) of videoCourseList" :key="item.id" :iteminfo="item" :lastindex="index == (videoCourseList.length - 1)" @jumpEvent="gotoVideoCourseDetailPage(item.id)"/>
  </div>
</template>

<script>
import playlist from './components/playlist.vue'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions, mapGetters } = createNamespacedHelpers(
  'videoColumnDetailData'
)

export default{
  data(){
    return{

    }
  },
  computed: { 
    ...mapState(['videoCourseList','courseName', 'userAccessStatus'])
  },
  components: {
    playlist
  },
  methods: {
    gotoVideoCourseDetailPage(lessonId) {
      this.$router.push({ name: 'videoCourseDetail', params: { lessonId } })
    },
  },
  mounted(){

  }
}
 

</script>

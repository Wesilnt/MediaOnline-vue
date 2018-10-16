<template>
  <div>
    <SingleSetList :singletype="'OnlineCourse'"  :list='videoCourseList' :coursename="courseName" :useraccessstatus="userAccessStatus"></SingleSetList>
  </div>
</template>

<script>
import SingleSetList from '../../components/SingleSetList.vue'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions, mapGetters } = createNamespacedHelpers(
  'videoColumnDetailData'
)

export default{
   computed: { 
    ...mapState(['videoCourseList','courseName', 'userAccessStatus'])
  },
  components: {
    SingleSetList
  },
  methods: {
    ...mapActions(['getVideoCourseList'])
  },
  mounted(){
  //   this.getVideoCourseList(this.$route.params.courseId)
  }
}
 

</script>

<template>
  <div>
    <div class="listHeader">
      <span class="headerCount">共{{courseCount}}讲</span>
      <div class="ascButton" @click="reverseList">
        <img class="sortIcon" :src="Ascending?ascDown:ascUp" alt=""> {{Ascending?'正序':'倒序'}}
      </div>

    </div>
    <div class="category" v-for="item in lessonList" :key="item.id">
      <div v-if="item.id != -1" @click="spreat(item.id)" 
      :class="(item.id ===selectCate)&&spread?'categoryHeader selectShadow':'categoryHeader'" 
      :style="{background:'url('+item.picUrl+')',backgroundSize:'100%'}">
        <div class="categoryHeaderCount"> {{item.lessonCount}}期 </div>
      </div>
      <SingleSetList
        v-show="item.id == selectCate && spread" 
        class="lessonList" 
        :courseid="courseId"
        :columnType="columnType" 
        :list='item.lessonList' 
        :coursename="courseName" 
        :useraccessstatus="userAccessStatus"></SingleSetList>
    </div>
  </div>
</template>
<script>
import SingleSetList from '../../components/SingleSetList.vue'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions, mapGetters } = createNamespacedHelpers('columnData')
export default {
  data() {
    return {
      courseId:this.$route.params.courseId,
      columnType:this.$route.params.columnType,
      userAccessStatus:0,
      selectCate: 0,
      spread: true,
      ascDown: require('../../assets/images/vision_list_down.png'),
      ascUp: require('../../assets/images/vision_list_up.png'),
      Ascending: true,
      courseCount: 0
    }
  },
  // props: ['courseId'],
  computed: { 
    ...mapState(['lessonList','courseName'])
  },
  components: {
    SingleSetList
  },
  created(){
    this.getUserAccessStatus({courseId:this.courseId}).then(res=>this.userAccessStatus = res)
  },
  methods: {
    ...mapActions(['reverse', 'getCategoryList','getUserAccessStatus']),
    spreat(id) {
      if (id === this.selectCate) {
        this.spread = !this.spread
      } else {
        this.selectCate = id
        this.spread = true
      }
    },
    reverseList() {
      this.Ascending = !this.Ascending
      this.reverse()
    }
  },
  mounted() {
    this.getCategoryList(this.$route.params.courseId).then(() => {
      this.selectCate = this.lessonList[0].id;
      let categoryCount = 0;
      let narmalCount = 0;
      this.lessonList.map(item => {
          if(-1==item.id) narmalCount = item.lessonList.length;
          categoryCount += item.lessonList.length
      });
      this.courseCount =   categoryCount || narmalCount
    })
  }
}
</script>

<style lang="less" scoped>
.listHeader {
  padding: 30px 0px 30px 40px;
  border-bottom: 1px rgb(227, 227, 227) solid;
  display: flex;
  justify-content: space-between;
  vertical-align: middle;
}
.headerCount {
  color: rgb(148, 154, 170);
  font-size: 28px;
  margin-top: 16px;
}
.ascButton {
  width: 120px;
  height: 60px;
  display: flex;
  border: 2px rgb(255, 163, 47) solid;
  border-radius: 8px;

  color: rgb(255, 163, 47);
  margin-right: 28px;
  line-height: 60px;
  justify-content: center;
  vertical-align: middle;
}
.sortIcon {
  margin-top: 19px;
  margin-right: 10px;
  width: 22px;
  height: 24px;
}
.category {
  margin-top: 24px;
  margin-bottom: 24px;
}
.categoryHeader {
  width: 710px;
  height: 96px;
  // vertical-align: middle;
  font-size: 30px;
  color: #3e3e3e;
  margin-left: 20px;
  border-radius: 8px;
  
}
.categoryHeaderCount {
  display: inline-block;
  position: absolute;
  right: 40px;
  margin-top: 28px;
}
.lessonList {
  margin-top: 20px;
}
.selectShadow {
  box-shadow: 0 8px 15px 2px #e5dacf;
}
</style>

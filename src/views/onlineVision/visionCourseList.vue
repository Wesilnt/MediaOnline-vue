<template>
<div>
    <div class="listHeader">
        <span class="headerCount">共143讲</span>
        <div class="ascButton">
            <img class="sortIcon" src="../../assets/vision_list_down.png" alt=""> 正序
        </div>
       
       
    </div>
      <SingleSetList :list='courseList'></SingleSetList>
    </div>
</template>
<script>
import SingleSetList from '../../components/SingleSetList.vue'
export default {
  props: ['courseList'],
  components: {
    SingleSetList
  },
  mounted(){
      console.log(this.courseList)
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
  font-size: 24px;
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
</style>

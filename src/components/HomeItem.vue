<template>
  <div class="homeitem-container">
    <Header :title="item.title" subtitle="探索更多" :link="item.link" />
    <div :class="{'vision-list': columnType === 'onlineVision',
                   'video-list': columnType === 'onlineCourse',
                   'qhht-flex': columnType === 'reading',
                   'book-list': columnType === 'reading',}">
          <component v-for="data in list"
                    :is="item.componentName" 
                    :data="data"  
                    :key="data.id" 
                    :columnType="columnType"
                    :class="{emptyItem:!data.id}"/> 
    </div>
  </div>
</template>
<script>
import Header from './homeComponents/Header.vue'
import FreeList from '../views/FreeList.vue'
import VisionCell from './homeComponents/VisionCell.vue'
import VideoCell from './homeComponents/VideoCell.vue'
import BookCell from './homeComponents/BookCell.vue'
export default {
    props:['columnType','item','list'],
    components:{ Header,FreeList,VisionCell,VideoCell,BookCell,}
}
</script> 

<style lang="less" scoped>
.vision-list{
  border-bottom: 2px solid #F1F1F1;
}
.video-list{
  padding-bottom: 28px;
  border-bottom: 2px solid #F1F1F1;
}
.book-list {
  flex-wrap: wrap;
  justify-content: space-between;
}
.emptyItem { 
  visibility: hidden;
 }
</style>
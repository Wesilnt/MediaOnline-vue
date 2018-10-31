<template>
  <div class="homeitem-container">
    <Header :title="item.title" subtitle="探索更多" :link="item.link" />
    <div :class="{'vision-list': columnType === '1003',
                   'video-list': columnType === '1005',
                   'qhht-flex': columnType === '1007',
                   'book-list': columnType === '1007',}">
          <component v-for="data in list"
                    :is="item.componentName" 
                    :data="data"  
                    :key="data.id" 
                    :class="{emptyItem:!data.id}"/> 
    </div>
  </div>
</template>
<script>
import Header from './homeComponents/Header.vue'
import FreeList from '../views/FreeList.vue'
// import DisCoverVisionList from './homeComponents/DisCoverVisionList.vue'
// import DisCoverVideoList from './homeComponents/HomeVideoList.vue'
// import BookList from '../views/BookList.vue'
import VisionCell from './homeComponents/VisionCell.vue'
import VideoCell from './homeComponents/VideoCell.vue'
import BookCell from './homeComponents/BookCell.vue'
export default {
    props:['columnType','item','list'],
    components:{ Header,
                 FreeList,
                //  BookList,
                //  DisCoverVisionList,
                //  DisCoverVideoList,
                 VisionCell,
                 VideoCell,
                 BookCell,
                }
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
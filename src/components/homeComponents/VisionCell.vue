<template>
  <div class="qhht-flex cell" @click="enterVisionDetail(data.id)">
    <i v-lazy:background-image="`${data.coverPic}?imageView2/1/format/jpg`" class="qhht-icon vision-avater"></i>
    <ul class="cell-content">
      <li class="cell-content-title">{{data.name}}</li>
      <li>{{data.briefIntro}}</li>
      <li>{{data.authorName}}</li>
      <li class="footText">
        <span class="price">¥{{data.price}}</span>/共{{data.lessonCount}}讲
      </li>
    </ul>
    <div class="qhht-flex cell-footer"> 
      <span class="fit">{{data.fitFor}}岁</span>
      <p v-if="1001 === data.userAccessStatus  ||
                1003 === data.userAccessStatus ||  
                1008 === data.userAccessStatus"    
                class="purchase">已购买</p>
      <a v-else-if="data.freeLessonList" 
                class="cell-footer-btn" 
                @click.stop="enterVisionPlay">
        <i class="qhht-icon play-tringle"></i>
        <span class="try-listen">试听</span>
      </a>
      
    </div>
  </div>
</template>

<script>
import { openAudioDetail } from '../../utils/config'
export default {
  props: ['data','columnType'],
  methods: {
    enterVisionDetail(id) {
      let columnType = this.columnType || this.$route.params.columnType
      this.$router.push({
        name: 'ColumnDetail',
        params: { columnType, courseId: id }
      })
      // this.$router.push({ path: '/home/visionDetail/' + id })
    },
    enterVisionPlay() {
      const { freeLessonList } = this.data;
      if (!freeLessonList || freeLessonList.length === 0) return;
      let columnType = this.columnType || this.$route.params.columnType;
      const lesson = freeLessonList.reduce((pre,item)=>(-1 == pre.categoryId && -1 != item.categoryId) ? item:pre,freeLessonList[0]);
      openAudioDetail(this,{courseId:this.data.id, columnType, lessonId:lesson.id})
      // this.$router.push({
      //   name: 'AudioPlay',
      //   params: { 
      //       courseId: this.data.id,
      //       columnType,
      //       lessonId: freeLessonList[0].id,
      //     }, 
      //   query: {courseName: this.data.name}
      // })
    }
  }
}
</script>

<style lang="less" scoped>
.cell {
  width: 100%;
  flex-wrap: nowrap;
  /*height: 240px;*/
  align-items: center;
  margin-bottom: 36px;
}
.vision-avater {
  width: 180px;
  height: 240px;
  border-radius: 12px;
  flex-shrink: 0;
}
.cell-content {
  flex: 1;
  margin-left: 20px;
  padding: 20px 0;
  flex-basis: inherit;
  /deep/ li {
    color: #666666;
    word-break: break-all;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    max-width: 48vw;
  }
  .cell-content-title {
    font-size: 32px;
    color: rgb(51, 51, 51);
    font-weight: bolder;
  }
}
.price {
  color: rgb(255, 163, 47);
}
.footText {
  margin-top: 30px;
}
.cell-footer {
  text-align: center;
  padding: 28px 0;
  flex-wrap: wrap;
  flex-direction: column;
  height: 240px;
}
.fit {
  border: 2px #dadde2 solid;
  border-radius: 20px;
  font-size: 20px;
  height: 40px;
  padding: 0 10px;
  line-height: 40px;
  min-width: 132px;
}
.play-tringle {
  width: 16px;
  height: 20px;
  margin-right: 8px;
  background-image: url('../../assets/images/home_vision_play.jpg');
}
.cell-footer-btn {
  width: 132px;
  height: 60px;
  padding: 14px 0px;
  border-radius: 30px;
  background-color: #ffa32f;
  color: #fff;
  box-shadow: 0 0 15px 2px #e5dacf;
}
.purchase {
  width: 100%;
  text-align: right;
  font-size: 28px;
  color: rgb(255, 163, 47);
}
</style>

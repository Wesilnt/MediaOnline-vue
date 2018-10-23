<template>
  <div class="qhht-flex cell" @click="enterVisionDetail(vision.id)">
    <i v-lazy:background-image="`${vision.coverPic}?imageView2/1/format/jpg`" class="qhht-icon vision-avater"></i>
    <ul class="cell-content">
      <li class="cell-content-title">{{vision.name}}</li>
      <li>{{vision.briefIntro}}</li>
      <li>{{vision.authorName}}</li>
      <li class="footText">
        <span class="price">¥{{vision.price}}</span>/共{{vision.lessonCount}}讲
      </li>
    </ul>
    <div class="qhht-flex cell-footer">
      <span class="fit">{{vision.fitFor}}岁</span>
      <a v-if="vision.freeLessonList" class="cell-footer-btn" @click.stop="enterVisionPlay">
        <i class="qhht-icon play-tringle" />试听
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: ['vision'],
  methods: {
    enterVisionDetail(id) {
      console.log(id)
      this.$router.push({ path: '/home/visionDetail/' + id })
    },
    enterVisionPlay() {
      const { freeLessonList } = this.vision
      if (!freeLessonList || freeLessonList.length === 0) {
        return
      }
      this.$router.push({
        name: 'AudioPlay',
        params: {id: freeLessonList[0].id },
        query:{courseId: this.vision.id, columnType:'1003',courseName:this.vision.name}
      })
    }
  }
}
</script>

<style lang="less" scoped>
.cell {
  flex-wrap: nowrap;
  /*height: 240px;*/
  align-items: center;
  margin-bottom: 36px;
}
.vision-avater {
  width: 180px;
  height: 240px;
  border-radius: 12px;
}
.cell-content {
  flex: 1;
  margin-left: 20px;
  padding: 20px 0;
  /deep/ li {
    color: #949aaa;
  }
  .cell-content-title {
    font-size: 32px;
    color: rgb(68, 78, 98);
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
</style>

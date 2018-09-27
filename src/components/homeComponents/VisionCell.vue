<template>
  <lazy-component class="qhht-flex cell" @click="enterVisionDetail(vision.id)">
      <img v-lazy="vision.coverPic" class="visionicon" alt="">
    <ul class="detailContent">
      <li class="visionTitle">{{vision.name}}</li>
      <li>{{vision.briefIntro}}</li>
      <li>{{vision.authorName}}</li>
      <li class="footText">
        <span class="price">¥{{vision.price}}</span>/共{{vision.lessonCount}}讲
      </li>
    </ul>
    <div class="cell-footer">
      <p class="fit">{{vision.fitFor}}岁</p>
      <div class="visionPlay" @click.stop="enterVisionPlay">
        <i class="qhht-icon playTringle" />试听
      </div>
    </div>
  </lazy-component>
</template>

<script>
export default {
  props: ['vision'],
  methods: {
    enterVisionDetail(id) {
      this.$router.push({ path: '/home/visionDetail/' + id })
    },
    enterVisionPlay() {
      if (this.vision.freeLessonList.length === 0) {
        return
      }
      this.$router.push({
        name: 'AudioPlay',
        params: { id: this.book.freeLessonList[0].id }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.cell {
  flex-wrap: nowrap;
  height: 240px;
  align-items: center;
  margin-bottom: 36px;
}
.detailContent {
  flex: 2;
  margin-left: 20px;
  /deep/ li {
    color: #949aaa;
  }
  .visionTitle {
    font-size: 32px;
    color: rgb(68, 78, 98);
    font-weight: bolder;
  }
}

.visionicon {
  width: 180px;
  height: 240px;
  /*background-color: rgb(253, 231, 231);*/
  border-radius: 12px;
}

.price {
  color: rgb(255, 163, 47);
}
.footText {
  margin-top: 30px;
}
.cell-footer {
  text-align: center;
}
.fit {
  border: 2px #dadde2 solid;
  border-radius: 20px;
  font-size: 20px;
  height: 40px;
  padding: 0 5px;
  line-height: 40px;
}
.playTringle {
  width: 16px;
  height: 20px;
  margin-right: 8px;
  background-image: url('../../assets/home_vision_play.jpg');
}
.visionPlay {
  width: 132px;
  height: 60px;
  margin-top: 96px;
  line-height: 60px;
  border-radius: 30px;
  background-color: #ffa32f;
  color: #fff;
  box-shadow: 0 0 15px 2px #e5dacf;
}
</style>

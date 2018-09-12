<template>
  <div class="cell" @click="enterVisionDetail(vision.id)">
    <div>
      <img :src="vision.coverPic" class="visionicon" alt="">
    </div>
    <div class="detailContent">
      <p class="visionTitle">{{vision.name}}</p>
      <p class="visionDetail">{{vision.briefIntro}}</p>
      <p class="visionDetail">{{vision.authorName}}</p>
      <p class="visionDetail footText">
        <span class="price">¥{{vision.price}}</span>/共{{vision.lessonCount}}讲
      </p>
    </div>
    <div>
      <div class="fit">{{vision.fitFor}}岁</div>
      <div class="visionPlay" @click.stop="enterVisionPlay">
        <div class="visionPlayContent">
          <img class="palyTringle" src="../../assets/home_vision_play.jpg" alt="">试听
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  props: ['vision'],
  methods: {
    enterVisionDetail(id) {
      this.$router.push({ path: '/home/visionDetail/' + id })
    },
    enterVisionPlay(){
       this.$router.push({ path: '/audio/audioplay', query: { id:this.vision.id }  })
    }
  }
}
</script>

<style lang="less" scoped>
.cell {
  width: 694px;
  margin-left: 28px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
}
.detailContent {
  flex: 2;
  margin-left: 20px;
}

.visionicon {
  width: 180px;
  height: 240px;
  background-color: rgb(253, 231, 231);
  border-radius: 12px;
}
.visionTitle {
  margin-top: 18px;
  font-size: 32px;
  color: rgb(68, 78, 98);
  font-weight: bolder;
}
.visionDetail {
  margin-top: 12px;
  font-size: 24px;
  color: rgb(148, 154, 170);
}
.price {
  color: rgb(255, 163, 47);
}
.footText {
  margin-top: 30px;
}

.fit {
  padding-left: 5px;
  padding-right: 5px;
  margin-top: 28px;
  border: rgb(218, 221, 226) 2px solid;
  border-radius: 20px;
  font-size: 20px;
  color: rgb(170, 175, 188);
  height: 40px;
  text-align: center;
  line-height: 40px;
}
.palyTringle {
  width: 16px;
  height: 20px;
  margin-right: 8px;
}
.visionPlay {
  width: 132px;
  height: 60px;
  border-radius: 30px;
  background-color: #ffa32f;
  margin-top: 96px;
  color: #fff;
  font-size: 24px;
  text-align: center;
  -webkit-box-shadow: 0 0 15px 2px #e5dacf;
  -moz-box-shadow: 0 0 15px 2px #e5dacf;
  box-shadow: 0 0 15px 2px #e5dacf;
}
.visionPlayContent {
  display: inline-block;
  vertical-align: middle;
  line-height: 60px;
}
</style>

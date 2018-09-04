<template>
  <div class="cell" @click="enterVisionDetail(vision.id)">
    <ul>
      <li>
        <img class="icon" :src="vision.url" alt="">
      </li>
      <li>
        <p class="visionTitle">{{vision.title}}</p>
        <p class="visionDetail">{{vision.desc}}</p>
        <p class="visionDetail">{{vision.author}}</p>
        <p class="visionDetail bottomtext">
          <span class="price">¥{{vision.price}}</span>/共{{vision.count}}讲
        </p>

      </li>
      <li>
        <div class="fit">{{vision.fit}}</div>
        <img class="visionPlay" src="../assets/home_vision_paly.png" alt="">
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["vision"],
  methods: {
    enterVisionDetail(id) {
      alert(id)
      this.$router.push({ path: "./home/visionDetail/" + id });
    }
  }
};
</script>

<style lang="less" scoped>
.cell {
  width: 694px;
  height: 240px;
  margin-left: 28px;

  ul,
  li {
    list-style: none;
  }
  ul {
    width: 694px;
    height: 100%;
    padding: 0;
  }
  li:nth-child(1) {
    width: 180px;
    height: 100%;
    float: left;
    position: relative;
  }
  li:nth-child(2) {
    width: 336px;
    height: 100%;
    float: left;
    padding-left: 20px;
    position: relative;
  }
  li:nth-child(3) {
    width: 132px;
    height: 100%;
    float: right;
    position: relative;
  }
}

.icon {
  width: 180px;
  height: 240px;
  background-color: rgb(253, 231, 231);
  border-radius: 12px;
}
.visionTitle {
  margin-top: 12px;
  font-size: 32px;
  color: rgb(68, 78, 98);
  font-weight: bolder;
}
.visionDetail {
  margin-top: 6px;
  font-size: 24px;
  color: rgb(148, 154, 170);
}
.price {
  color: rgb(255, 163, 47);
}
.bottomtext {
  margin-bottom: 0;
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
.visionPlay {
  width: 132px;
  height: 70px;
  margin-top: 96px;
}
</style>

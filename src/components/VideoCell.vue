<template>
    <div class="cell" :style="{backgroundImage: 'url(' + video.url + ')' }">
        <img class="videoPlay" src="../assets/home_video_play.png" alt="">
        <div class="text">
            <p class="videoTitle">{{video.title}}</p>
            <p class="videoDetail">{{video.desc}}</p>
            <p class="videoDetail">{{video.author}}</p>
            <p class="videoDetail">
                <span class="price">¥{{video.price}}</span>/共{{video.count}}讲
            </p>
        </div>

    </div>
</template>

<script>
export default {
  props: ["video"]
};
</script>

<style lang="less" scoped>
p {
  margin: 0;
  padding: 0;
}
.cell {
  position: relative;
  width: 694px;
  border-radius: 16px;
  margin-left: 28px;
  overflow: hidden;
}
.videoPlay {
  position: absolute;
  width: 60px;
  height: 60px;
  top: 50%;
  left: 50%;
  margin-top: -30px; /* 高度的一半 */
  margin-left: -30px; /* 宽度的一半 */
}
.text {
  margin-left: 36px;
  margin-top: 30px;
}
.videoTitle {
  font-size: 32px;
  color: rgb(51, 51, 51);
  font-weight: bolder;
  margin-bottom: 8px;
}
.videoDetail {
  font-size: 24px;
  margin-bottom: 8px;
  color: rgb(102, 102, 102);
}
.price {
  color: rgb(255, 163, 47);
}
</style>

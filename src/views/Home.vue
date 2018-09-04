<template>

  <div>
    <video ref="myVideo" width="100%" v-on:play="getV()" @pause="getV()" src="http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400"></video>
    <mt-button @click="playV">get v</mt-button>
    <p>{{isplay}}</p>
    <p>{{currentTime}}</p>
    <div class="boxRem"></div>
    <div class="boxVw"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import "whatwg-fetch";
export default {
  name: "home",
  data: function() {
    return {
      inter: null,
      isplay: null,
      currentTime: []
    };
  },
  methods: {
    playV() {
      const video = this.$refs.myVideo;
      this.isplay ? video.pause() : video.play();
    },
    getV() {
      const isplay = !this.isplay;
      this.isplay = isplay;

      clearInterval(this.inter);
      if (isplay)
        this.inter = setInterval(() => {
          this.getCurrentTime();
        }, 1000);
    },
    getCurrentTime() {
      this.currentTime.push(this.$refs.myVideo.currentTime);
    }
  }
  /*components: {
    // NavBar
  }*/
};
</script>
<style lang="scss" scoped>
.boxRem {
  width: 10rem;
  height: 20rem;
  background: #17a2b8;
}
.boxVw {
  width: 10vw;
  height: 20vw;
  background: #28a745;
}
</style>

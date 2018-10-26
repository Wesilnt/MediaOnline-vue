<template>
  <div class="video-bigimage-container">
    <div class="originImage">
      <img :src="`${src}?imageView2/1/format/jpg`" class="lazy-img-larger img" @click="isExtend=true">
      <img :src="require('../assets/images/icon_zoom.png')" class="videocol-bigimage-search" @click="isExtend=true">
    </div>
    <transition enter-active-class="fadeIn" leave-active-class="fadeOut">
      <div v-if="isExtend&&src" class="imageExtend" @click="isExtend=false">
        <div class="extend-back"/>
        <img :src="`${src}?imageView2/1/format/jpg`"  class="extend-img">
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'Bigimage',
  props: ['src'],
  data() {
    return {
      isExtend: false
    }
  }
}
</script>

<style lang="scss" scoped>
.originImage {
  position: relative;
  max-height: 800px;
  overflow: hidden;
}
.videocol-bigimage-search {
  position: absolute;
  width: 80px;
  height: 80px;
  right: 0;
  bottom: 0;
}
.video-bigimage-container {
  display: block;
  margin-bottom: 40px;
  .imageExtend {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 3500;
    overflow: scroll;
  }
  .img {
    width: 100%;
    display: block;
  }
  .extend-back {
    position: absolute;
    background-color: #000;
    width: 100%;
    height: 100%;
    opacity: 0.8;
  }
  .extend-img {
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    // max-height: 100%;
    // max-width: 100%;
    width: 100%;
  }
}

.fadeIn {
  animation: fadeIn 0.5s;
}

.fadeOut {
  animation: fadeIn 0.5s reverse;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>

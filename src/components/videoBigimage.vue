<template>
  <div class="video-bigimage-container">
    <div class="originImage">
      <img :src="src" class="img" @click="isExtend=true" @error="imgerrHandler">
    </div>
    <transition enter-active-class="fadeIn" leave-active-class="fadeOut">
      <div v-if="isExtend&&src" class="imageExtend" @click="isExtend=false">
        <div class="extend-back"/>
        <img class="extend-img" :src="src">
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'Bigimage',
  props: ['src', 'imgerr'],
  data() {
    return {
      isExtend: false
    }
  },
  methods: {
    imgerrHandler(e) {
      e.target.src = this.imgerr
    }
  }
}
</script>

<style lang="scss" scoped>
.originImage {
  width: 100%;
  height: 800px;
  overflow: hidden;
}
.video-bigimage-container {
  display: inline-block;
  .imageExtend {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 2345;
    overflow: scroll;
    top: 0;
  }
  .img {
    width: 100%;
    height: 100%;
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

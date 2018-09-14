<template>
    <div class="cl-courseIntroduce">
        <div :class=" isFold ? 'fold' : 'extend'" class="foldbase" @click="foldFn">
           <div v-html="courseinfo"></div>
        </div>
        <div class="arrow-container"  @click="foldFn">
          <i class="qhht-icon arrow-icon-innner" :style="isFold ? imgUp : imgDown"></i>
        </div>
    </div>
</template>

<script>
export default {
  name: 'CourseIntroduce',
  props: ['courseinfo'],
  data() {
    return {
      isFold: true,
      imgDown: {
        backgroundImage :  "url("+require('../assets/images/onlinecourse_arrow_down.png')+")",
      },
      imgUp: {
        backgroundImage : "url("+require('../assets/images/onlinecourse_arrow_up.png')+")",       
      }
    }
  },
  methods: {
    foldFn() {
      this.isFold = !this.isFold
    }
  }
}
</script>

<style lang='scss' scoped>
.cl-courseIntroduce {
  background-color: #fff;

  .foldbase {
    width: 100%;
    background-color: white;
    transition: height 0.3s linear;
  }
}

.foldbase p {
  // padding: 0 20px;
  font-size: 30px;
  word-wrap: break-word;
}
.fold {
  height: 250px;
  overflow: hidden;
}
.extend {
  height: auto;
  overflow: auto;
}

.arrow-container { 
  text-align: center;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.2) 10%,
    rgba(255, 255, 255, 0.4) 25%,
    rgba(255, 255, 255, 0.6) 30%,
    rgba(255, 255, 255, 0.8) 90%,
    rgba(255, 255, 255, 1) 100%
  );
  margin-top: -40px;
}
.arrow-icon-innner{
   margin-top: 50px;
}
</style>

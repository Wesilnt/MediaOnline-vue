<template>
    <div class="cl-playlist-container-father">
        <div class="cl-playlist-container">
            <div class="cl-list-left"><img :class="{'cl-img-active' : iteminfo.isPlaying}" :src="iteminfo.isPlaying ? imgPlaying : imgPause"></div>
            <div class="cl-list-right">
                <div :class="{'cl-list-title' : true, 'cl-list-title-active' : iteminfo.isPlaying}">{{iteminfo.title}}</div>
                <div class="cl-list-info">{{iteminfo.info}}</div>
                <div class="cl-list-bottom">
                    <input class="cl-bottom-btn" type="button" value="试听">
                    <div class="cl-time">00:06:22</div>
                    <div class="cl-number">已听1%</div>
                </div>
            </div>  
       
        <!-- <div class="cl-bottom-line"></div> -->
        </div>
             <hr v-if="!lastindex">
    </div>
</template>

<script>
export default {
  props: ['iteminfo', 'lastindex'],
  data() {
    return {
      imgPlaying: require('../../../assets/images/onlinecourse_ic_playing.png'),
      imgPause: require('../../../assets/images//onlinecourse_play_ic_pause.png')
    }
  },
  methods: {}
}
</script>

<style lang='scss' scoped>
.cl-playlist-container {
  padding: 28px 0px 24px;
  background-color: white;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 230px;
  box-sizing: border-box;
}

.cl-playlist-container-father {
  display: flex;
  flex-direction: column;
  hr {
    height: 1px;
    width: 100%;
    background-color: lightgray;
    border: none;
  }
}

.cl-list-left {
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  text-align: center;
  background-color: rgb(253, 231, 231);
  align-self: center;
  img {
    position: absolute;
    top: 26px;
    left: 32px;
    width: 40px;
    height: 48px;
  }

  .cl-img-active {
    top: 26px;
    left: 28px;
    width: 48px;
    height: 44px;
  }
}
.cl-list-right {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 0 24px;
  flex: 1;
  box-sizing: border-box;
}
.cl-list-title {
  font-size: 28px;
  color: rgb(51, 51, 51);
  text-align: left;
}
.cl-list-title-active {
  // font-size: 14px;
  color: rgb(255, 163, 47);
  // text-align: left;
}
.cl-list-info {
  font-size: 24px;
  color: rgb(102, 102, 102);
  text-align: left;
}
.cl-list-bottom {
  display: flex;
  flex-direction: row;
  align-items: center;

  .cl-bottom-btn {
    border-radius: 16px;
    background-color: rgb(237, 108, 103);
    height: 50px;
    align-self: center;
    color: white;
    line-height: 4px;
    border: none;
  }

  .cl-time {
    font-size: 26px;
    color: rgb(102, 102, 102);
    margin-left: 10px;

    &:after {
      content: '|';
      margin-left: 10px;
      width: 1px;
      height: 30px;
    }
  }

  .cl-number {
    font-size: 24px;
    color: rgb(102, 102, 102);
    margin-left: 10px;
  }
}
</style>

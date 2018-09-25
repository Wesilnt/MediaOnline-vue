<template> 
    <div class="singleset-item-container" tag="div" @click="onItemClick(item.id)">
      <div class="item-content">
        <div :class="{'icon-playing':playing}" class="item-icon">
          <img :src="playing?require('../assets/readings_detail_play.png'):require('../assets/readings_detail_pause.png')">
        </div>
        <div class="item-describe">
          <h3 :class="{'item-playing':playing}">
            {{item.title}}
          </h3>
          <h4>
            {{item.subTitle}}
          </h4>
          <div class="bottom-container">
            <span v-if="item.isAudition">试听</span> 
            <p>{{item.totalTime | formatDuring}} | {{item.learnTime | learntimeFormat(item.totalTime,item.id)}}</p> 
          </div>
        </div>
      </div>
      <hr>
    </div> 
</template>

<script>
export default { 
  //singleset 单集  playing是否正在播放
  props: ['item', 'playing'],
  methods: {
    onItemClick(id) {
      this.$router.push({ name: 'AudioPlay', params:{id}, query: {hiddenDraft:1 } })
    }
  }
}
</script>
<style lang="scss" scoped>
.singleset-item-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  hr {
    height: 2px;
    border: none;
    margin: 0 20px;
    background-color: rgb(237, 237, 237);
  }
  .item-icon {
    align-self: center;
    width: 96px;
    height: 96px;
    // padding: 28px 31px 28px 35px;
    box-sizing: border-box;
    background-color: #fde3e3;
    display: flex;
    border-radius: 96px;
  }
  .icon-playing {
    padding: 31px 28px 31px 29px;
  }
  .item-icon img {
    margin: auto 31px auto 35px;
    width: 28px;
    height: 40px;
  }
  .icon-playing img {
    width: 38px;
    height: 34px;
    margin: auto 0;
  }
  .item-content {
    margin-left: 36px;
    display: flex;
    flex-direction: row;
  }
  .item-describe {
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    h3 {
      font-size: 32px;
      color: rgb(22, 35, 60);
      margin: 24px 0 0 0;
      line-height: 32px;
      font-weight: 500;
    }
    h4 {
      margin: 20px 0 0 0;
      font-size: 24px;
      line-height: 24px;
      font-weight: 300;
      color: rgb(102, 102, 102);
    }
    .item-playing {
      color: rgb(255, 163, 47);
    }
  }
  .bottom-container {
    display: flex;
    flex-direction: row;
    margin: 20px 0 24px 0;
    align-items: center;
  }
  .bottom-container span {
    background-color: #ea605c;
    color: white;
    padding: 3px 10px;
    border-radius: 10px;
    font-size: 26px;
    margin-right: 20px;
    line-height: 36px;
  }
  .bottom-container p {
    font-size: 24px;
    color: rgb(148, 154, 170);
    margin: 0;
    line-height: 24px;
  }
}
</style>

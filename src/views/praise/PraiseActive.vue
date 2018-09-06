<template>
    <div class="praise-active">
        <div class="active-item" v-for="(item,i) of actives" :key="i">
            <img :src="item.url">
        </div>
        <div @click="toHelp" class="help-btn">
            为TA助力，免费领取某某课程
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      actives: [
        { url: require('../../assets/praise_head_bg.png') },
        { url: require('../../assets/praise_head_bg.png') },
        { url: require('../../assets/praise_head_bg.png') },
        { url: require('../../assets/praise_head_bg.png') }
      ]
    }
  },
  methods: {
    toHelp() {
      this.$router.push({ path: '/praise' })
    }
  }
}
</script>
<style lang="scss" scoped>
.active-item {
  display: flex;
  flex-direction: column;
  width: 100%;
  img {
    width: 100%;
  }
}
.help-btn {
  background-color: rgb(255, 163, 47);
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  border: 0px solid transparent;
  border-radius: 0;
  color: white;
  padding: 10px 0;
  font-size: 30px;
  outline: none;
  height: 96px;
  line-height: 96px;
}
</style>

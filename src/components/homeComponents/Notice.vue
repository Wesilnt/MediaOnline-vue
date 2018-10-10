<template>
    <div v-if="messageCount>0" class="qhht-flex notice" @click="enterMessage">
        <i class="qhht-icon notice-avatar" :style="{backgroundImage:`url(${fromAvatarUrl})`}"/>
        <span class="message">{{messageCount}}条新消息</span>
        <i class="qhht-icon notice-arrow" />
    </div>
</template>

<script>
export default {
  props: ['messageCount','fromAvatarUrl'],
  methods: {
    enterMessage() {
      this.$router.push('/my/Reply')
    }
  }
}
</script>

<style lang="less" scoped>
.notice {
  width: 360px;
  margin: 40px auto 28px;
  background-color: #383838;
  border-radius: 8px;
  padding: 8px;
}
.notice-avatar {
  width: 64px;
  height: 64px;
  border-radius: 8px;
  background-color: #fde7e7;
}
.message {
  flex-grow: 1;
  color: white;
  font-size: 28px;
  font-weight: bolder;
  text-align: center;
}
.notice-arrow {
  width: 20px;
  height: 20px;
  margin-right: 24px;
  background-image: url('../../assets/images/home_notice_arrow.png');
}
</style>

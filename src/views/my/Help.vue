<template>
    <div class="help">
        <div>
            <textarea v-bind="content" class="input-text" rows="8" placeholder="请填写您的意见和建议"/>
            <button class="submit-button">提交反馈</button>
            <p class="text-desc">紧急问题可以通过以下方式联系我们：</p>
            <p class="text-mail">qhht@con.shbaoyuantech.com</p>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Help',
  data: function() {
    return {
      content: ''
    }
  },

  methods: {}
}
</script>

<style scoped>
.help {
  padding: 40px 20px 20px 20px;
  font-size: 16px;
}
.input-text {
  width: 100%;
  height: 200px;
  placeholder: 'text';
  border-radius: 10px;
  padding: 20px;
  background: rgb(247, 247, 247);
}
.submit-button {
  width: 100%;
  height: 40px;
  margin-top: 30px;
  border-radius: 30px;
  background-color: rgb(251, 252, 252);
  color: rgb(172, 172, 180);
  font-size: 16px;
}
.text-desc {
  padding-top: 20px;
  padding-bottom: 0px;
  width: 100%;
  color: black;
}
.text-mail {
  width: 100%;
  padding-top: 0px;
  color: rgb(255, 163, 47);
  font-size: 16px;
}
</style>

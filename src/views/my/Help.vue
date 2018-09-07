<template>
    <div class="help">
        <div>
            <textarea v-bind="content" class="input-text" rows="8" placeholder="请填写您的意见和建议"/>
            <div class="sub-dev">
                <button class="button">提交反馈</button>
            </div>
            <p class="text-desc">紧急问题可以通过以下方式联系我们：</p>
            <div class="text-mail"><div class="mail-label">邮箱： </div>qhht@con.shbaoyuantech.com</div>
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
  padding: 40px 20px 0px 20px;
}
.input-text {
  width: 100%;
  height: 400px;
  border-radius: 30px;
  padding: 40px;
  background: #f7f7f7;
  border-color: #b5b5b5;
  color: #b5b5b5;
  font-size: 28px;
  box-shadow: 0px 0px 0px #ffffff;
  border-width: 1px;
  -webkit-appearance: none;
}
.sub-dev {
  padding: 100px 55px 0px 55px;
}
.button {
  width: 100%;
  height: 80px;
  background: #f7f7f7;
  color: #b5b5b5;
  border-radius: 50px;
  border-color: #b5b5b5;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 28px;
  border-width: 1px;
}
.text-desc {
  width: 100%;
  padding: 80px 55px 32px 55px;
  color: black;
  font-size: 28px;
  float: left;
  color: #3f4651;
  font-size: 28px;
}
.mail-label {
  color: black;
  font-size: 28px;
  float: left;
  color: rgb(172, 172, 180);
  font-size: 28px;
}
.text-mail {
  width: 100%;
  padding: 32px 55px 0px 55px;
  color: #ffa32f;
  font-size: 28px;
}
</style>

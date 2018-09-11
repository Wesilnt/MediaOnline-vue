<template>
    <div>
        <div class="reply-container" v-for="item in list" :key="item.name">
            <div class="div1">
                <div class="div3">
                    <img src="" class="avatar"/>
                </div>
                <div class="div4">
                    <div class="name">{{item.name}}</div>
                    <div class="content">{{item.content}}</div>
                    <div class="time">{{item.time}}</div>
                </div>
            </div>
            <div class="div2">
                <div class="content-my">{{item.content}}</div>
            </div>
            <div class="divider-line"></div>
        </div>
        <div class="read-more-container">
            <div class="read-more">查看更早的消息</div>
        </div>

    </div>
</template>

<script>
export default {
  name: 'Reply',
  components: {
    // NavBar
  },
  data: function() {
    return {
      list: [
        {
          name: '白杨1',
          type: '系统通知',
          time: '08-08',
          content: '感谢您一直以来对秦汉胡同的支持'
        },
        {
          name: '白杨2',
          type: '小胡同',
          time: '08-08',
          content: '您的反馈我们已经收到，谢谢'
        },
        {
          name: '白杨3',
          type: '系统通知',
          time: '08-08',
          content: '感谢您一直以来对秦汉胡同的支持'
        },
        {
          name: '白杨4',
          type: '小胡同',
          time: '08-08',
          content: '您的反馈我们已经收到，谢谢'
        }
      ]
    }
  },
  methods: {}
}
</script>

<style scoped>
.reply-container {
  float: left;
  width: 100%;
  height: 250px;
}

.div1 {
  float: left;
  width: 70%;
  height: 250px;
}

.div2 {
  width: 30%;
  height: 250px;
  float: right;
}

.div3 {
  float: left;
  width: 30%;
  height: 250px;
  padding: 18px 0px 0px 20px;
}

.avatar {
  width: 94px;
  height: 94px;
  background-color: #ff9521;
  border-radius: 12px;
}

.name {
  padding: 6px 0px 0px 0px;
  font-size: 28px;
  color: #57668f;
}

.content {
  font-size: 28px;
  color: #111111;
  padding: 20px 30px 22px 0px;
}

.time {
  font-size: 26px;
  color: #737373;
  padding: 0px 0px 16px 0px;
}

.div4 {
  width: 70%;
  height: 250px;
  float: right;
  font-size: 26px;
  padding: 24px 20px 0px 0px;
}

.content-my {
  padding: 36px 36px 0px 36px;
  font-size: 26px;
}

.divider-line {
  border-bottom: 1px solid #ddd;
  text-align: center;
}

.read-more-container {
  text-align: center;
}

.read-more {
  width: 100%;
  height: 118px;
  font-size: 26px;
  color: #737373;
  align-content: center;
}
</style>

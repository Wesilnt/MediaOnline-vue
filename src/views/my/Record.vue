<template xmlns="http://www.w3.org/1999/html">
    <div>
        <div class="div-head-img"></div>

        <div class="record-head">
            <div>
                <img class="head-left-icon" src="../../assets/images/my_record_play.png"/>
            </div>
            <div class="last-record-text">最近播放</div>
            <div class="last-record-number">(共26条记录)</div>
            <div>
                <img class="head-right-icon" src="../../assets/images/my_sys_menu.png"/>
            </div>
        </div>

        <div v-for="item in list" :key="item.name">
            <div class="record-item">
                <img src="" class="avatar"/>

                <div class="div-content">
                    <div class="name">{{item.name}}</div>
                    <div class="content">{{item.content}}</div>
                </div>
                <div>
                    <img class="img-more" src="../../assets/images/my_record_more.png"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Record',
  components: {
    // NavBar
  },
  data: function() {
    return {
      list: [
        {
          name: '程序员殴打产品全指南1',
          type: '系统通知',
          time: '08-08',
          content: '感谢您一直以来对秦汉胡同的支持'
        },
        {
          name: '程序员殴打产品全指南2',
          type: '小胡同',
          time: '08-08',
          content: '您的反馈我们已经收到，谢谢'
        },
        {
          name: '程序员殴打产品全指南3',
          type: '系统通知',
          time: '08-08',
          content: '感谢您一直以来对秦汉胡同的支持'
        },
        {
          name: '程序员殴打产品全指南4',
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
.div-head-img {
  width: 100%;
  height: 300px;
  background: #fde3e3;
}

.record-head {
  padding: 20px;
  display: flex;
  flex-direction: row;
}

.head-left-icon {
  width: 60px;
  height: 60px;
  margin: 20px 20px 20px 20px;
}

.head-right-icon {
  width: 42px;
  height: 39px;
  margin: 30px 30px 0px 0px;
  position: absolute;
  right: 30px;
}

.last-record-text {
  padding: 20px 8px 0px 0px;
  font-size: 36px;
  color: #3e3e53;
}

.last-record-number {
  padding: 25px 0px 0px 0px;
  font-size: 28px;
  color: #57668f;
}

.record-item {
  width: 100%;
  height: 200px;
  padding: 30px;
  display: flex;
  flex-direction: row;
  border-top: 1px solid #ddd;
}
.avatar {
  width: 94px;
  height: 94px;
  background-color: #ff9521;
  border-radius: 12px;
  float: left;
  margin: 30px 0px 0px 0px;
}
.div-content {
  flex-grow: 1;
  padding: 20px;
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

.img-more {
  width: 34px;
  height: 6px;
  margin: 59px 30px 0px 0px;
  /*position: absolute;*/
  /*right: 30px;*/
}
</style>

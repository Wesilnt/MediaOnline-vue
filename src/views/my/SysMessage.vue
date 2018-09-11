<template>
    <div>
        <div class="container" justify-content="around">
            <div class="avatar-item-left">
                <img class="head-img-left" src="../../assets/images/my_sys_notify.png">
                <div class="head-notice">全部通知</div>
            </div>
            <div class="avatar-item-right">
                <img class="head-img-right" src="../../assets/images/my_sys_menu.png">
            </div>
        </div>
        <div>
            <div>
                <div v-for="item in list" :key="item.name" class="list-item">
                    <div>
                        <div class="divider-line"></div>
                        <div class="item-head">
                            <div class="item-title">{{item.type}}</div>
                            <div class="item-time">{{item.time}}</div>
                        </div>
                        <div class="item-content">{{item.content}}</div>
                    </div>
                </div>
                <div class="divider-line-end"></div>
                <div/>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'SysMessage',
  components: {
    // NavBar
  },
  data: function() {
    return {
      list: [
        {
          name: '/my/a',
          type: '系统通知',
          time: '08-08',
          content: '感谢您一直以来对秦汉胡同的支持'
        },
        {
          name: '/my/b',
          type: '小胡同',
          time: '08-08',
          content: '您的反馈我们已经收到，谢谢'
        },
        {
          name: '/my/c',
          type: '系统通知',
          time: '08-08',
          content: '感谢您一直以来对秦汉胡同的支持'
        },
        {
          name: '/my/d',
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
.container {
  display: flex;
  justify-content: space-between;
  padding: 54px 30px 34px 30px;
}

.avatar-item-left {
  flex-direction: column;
  align-items: center; /*垂直居中*/
  justify-content: center; /*水平居中*/
}

.head-notice {
  width: 300px;
  padding-top: 5px;
  font-size: 36px;
}

.avatar-item-right {
}

.head-img-left {
  width: 60px;
  height: 60px;
  float: left;
  margin-right: 20px;
}

.head-img-right {
  width: 42px;
  height: 39px;
  float: left;
}

.divider-line {
  border-top: 1px solid #ddd;
  text-align: center;
}

.list-item {
  padding: 16px 16px 24px 30px;
  font-size: 16px;
  white-space: nowrap;
}
.item-head {
  padding-top: 30px;
}

.item-title {
  padding: 0px 24px 0px 0px;
  font-weight: bold;
  font-size: 32px;
  display: inline;
}

.item-time {
  font-size: 22px;
  display: inline;
  color: #9ba1b0;
}

.item-content {
  padding: 32px 32px 0px 70px;
  font-size: 28px;
  color: #808080;
}

.divider-line-end {
  border-top: 1px solid #ddd;
  text-align: center;
  margin: 0px 30px 0px 30px;
}
</style>

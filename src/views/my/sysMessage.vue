<template>
    <mu-container>
        <mu-flex class="container" justify-content="around" >
            <mu-avatar class="avatar-item-left">
                <img class="img" src="../../assets/images/my_sys_notify.png">
                <div class="head-notice">全部通知</div>
            </mu-avatar>
            <mu-avatar class="avatar-item-right">
                <img class="img" src="../../assets/images/my_sys_menu.png">
            </mu-avatar>
        </mu-flex>
        <mu-flex>
            <mu-list >
                <mu-list-item class="list-item" v-for="item,index in list" :key="index">
                    <mu-list-item-content>
                        <div class="item-title">{{item.type}}</div>
                        <div class="item-time">{{item.time}}</div>
                        <div class="item-content">{{item.content}}</div>
                    </mu-list-item-content>
                </mu-list-item>
                <mu-divider/>
            </mu-list>
        </mu-flex>
    </mu-container>
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
          name: '/my/purchase',
          type: '系统通知',
          time: '08-08',
          content: '感谢您一直以来对秦汉胡同的支持'
        },
        {
          name: '/my/purchase',
          type: '小胡同',
          time: '08-08',
          content: '您的反馈我们已经收到，谢谢'
        },
        {
          name: '/my/purchase',
          type: '系统通知',
          time: '08-08',
          content: '感谢您一直以来对秦汉胡同的支持'
        },
        {
          name: '/my/purchase',
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
  padding: 20px 20px;
}

.avatar-item-left {
  flex-direction: column;
  align-items: center; /*垂直居中*/
  justify-content: center; /*水平居中*/
}

.head-notice {
}
.avatar-item-right {
  flex-wrap: wrap;
  align-items: center; /*垂直居中*/
  justify-content: center; /*水平居中*/
}
.img {
  width: 25px;
  height: 25px;
}

.list-item {
  padding: 16px 16px 24px 16px;
  font-size: 16px;
}
.item-title {
  padding: 10px 0px 0px 0px;
  font-weight: bold;
}
.item-time {
}
.item-content {
}
</style>

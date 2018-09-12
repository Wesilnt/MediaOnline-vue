<template>
  <div class="my">
      <div justify-content="center">
          <div class="user-info">
              <img :src="avatarUrl" class="user-info-avatar">
              <span class="user-info-nickname">{{nickName}}</span>
              <div class="edit-info">编辑个人资料</div>
          </div>
          <!--<div class="background-cover"/>-->
          <div class="grid-list">
              <div v-for="item in list" :key="item.name"  class="grid-item">
                  <router-link :to="item.name">
                      <img :src="item.image" class="img">
                  </router-link>
                  <span class="title">{{item.title}}</span>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
// @ is an alias to /src

import purchase from '../assets/images/my_purchase.png'
import record from '../assets/images/my_record.png'
import like from '../assets/images/my_like.png'
import puzzle from '../assets/images/my_puzzle.png'
import reply from '../assets/images/my_reply.png'
import praise from '../assets/images/my_praise.png'
import sys from '../assets/images/my_sys_message.png'
import help from '../assets/images/my_help.png'
import bg from '../assets/images/my_head_bg.png'
export default {
  name: 'My',
  components: {
    // NavBar
  },
  data: function() {
    return {
      nickName: '肖绪波',
      avatarUrl: praise,
      headBg: bg,
      list: [
        {
          name: '/my/Purchase',
          image: purchase,
          title: '已购清单(问题)'
        },
        {
          name: '/my/Record',
          image: record,
          title: '播放记录'
        },
        {
          name: '/my/Like',
          image: like,
          title: '我喜欢的'
        },
        {
          name: '/my/my-puzzle',
          image: puzzle,
          title: '我的拼团'
        },
        {
          name: '/my/Reply',
          image: reply,
          title: '回应我的'
        },
        {
          name: '/my/my-praise',
          image: praise,
          title: '我的集赞'
        },
        {
          name: '/my/SysMessage',
          image: sys,
          title: '系统消息'
        },
        {
          name: '/my/Help',
          image: help,
          title: '意见反馈'
        }
      ]
    }
  },
  methods: {}
}
</script>
<style lang="less" scoped>
.my {
  padding: 0;
}
.user-info {
  width: 100%;
  align-items: center;
  flex-direction: column;
  display: flex;
  justify-content: flex-start;
  height: 322px;
  background: rgb(247, 202, 118);
  z-index: 2;
}

.user-info-avatar {
  width: 112px;
  height: 112px;
  margin-top: 56px;
  border-radius: 50%;
  background-color: rgb(253, 231, 231);
}

.user-info-nickname {
  margin-top: 24px;
  color: #fff;
  font-size: 32px;
}
.edit-info {
  height: 48px;
  border-radius: 30px;
  padding: 10px 40px 48px 40px;
  font-size: 24px;
  color: rgb(255, 255, 255);
}

/*.background-cover {*/
/*background-color: rgb(247, 202, 118);*/
/*width: 100%;*/
/*height: 65px;*/
/*margin-top: -25px;*/
/*border-radius: 40%;*/
/*align-items: center;*/
/*flex-direction: column;*/
/*display: flex;*/
/*justify-content: flex-start;*/
/*padding-top: 5px;*/
/*z-index: -1;*/
/*}*/
.grid-list {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding-top: 56px;
}
.grid-item {
  width: 33.3%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding-bottom: 56px;
  border: 1px #000;
  flex-wrap: wrap;
}
.img {
  width: 112px;
  height: 112px;
}
.title {
  font-size: 26px;
  padding-top: 24px;
}
</style>

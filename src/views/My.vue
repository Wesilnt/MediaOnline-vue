<template>
  <div class="my">
      <div justify-content="center">
          <div class="user-info">
              <img class="user-info-avatar" :src="avatarUrl">
              <span class="user-info-nickname">{{nickName}}</span>
              <div class="edit-info">完善资料领书币</div>
          </div>
          <div class='background-cover'/>
          <div class="grid-list">
              <div class="grid-item" v-for="item,index in list" :key="'tile' + index">
                  <router-link :to="item.name">
                      <img class="img" :src="item.image">
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
          name: '/my/my-purchase',
          image: purchase,
          title: '已购清单'
        },
        {
          name: '/my/my-record',
          image: record,
          title: '播放记录'
        },
        {
          name: '/my/my-like',
          image: like,
          title: '我喜欢的'
        },
        {
          name: '/my/my-puzzle',
          image: puzzle,
          title: '我的拼团'
        },
        {
          name: '/my/my-reply',
          image: reply,
          title: '回应我的'
        },
        {
          name: '/my/my-praise',
          image: praise,
          title: '我的集赞'
        },
        {
          name: '/my/my-sysMessage',
          image: sys,
          title: '系统消息'
        },
        {
          name: '/my/my-help',
          image: help,
          title: '意见反馈'
        }
      ]
    }
  },
  mounted() {
    console.log('loadings')
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
.my {
  padding: 0;
}
.user-info {
  width: 100%;
  align-items: center;
  flex-direction: column;
  display: flex;
  justify-content: flex-start;
  height: 340px;
  background: rgb(247, 202, 118);
  z-index: 2;
}

.user-info-avatar {
  width: 120px;
  height: 120px;
  margin-top: 72px;
  border-radius: 50%;
  background-color: rgb(253, 231, 231);
}

.user-info-nickname {
  margin-top: 18px;
  color: #fff;
  font-size: 32px;
}
.edit-info {
  height: 48px;
  border-radius: 30px;
  margin: 20px;
  padding: 10px 40px 10px 40px;
  font-size: 24px;
  color: rgb(255, 255, 255);
  background-color: rgb(255, 150, 33);
}

.background-cover {
  background-color: rgb(247, 202, 118);
  width: 100%;
  height: 65px;
  margin-top: -25px;
  border-radius: 40%;
  align-items: center;
  flex-direction: column;
  display: flex;
  justify-content: flex-start;
  padding-top: 5px;
  z-index: -1;
}
.grid-list {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding-top: 90px;
}
.grid-item {
  width: 33.3%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding-bottom: 48px;
  border: 1px #000;
  flex-wrap: wrap;
}
.img {
  width: 120px;
  height: 120px;
}
.title {
  padding-top: 24px;
}
</style>

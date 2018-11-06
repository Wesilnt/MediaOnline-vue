<template>
    <div class="my">
        <div class="my-user-info">
            <i class="qhht-icon my-user-info-avatar" :style="{backgroundImage:`url(${userInfo.avatarUrl})`}" @click="editUserInfo"></i>
            <span class="my-user-info-nickname">{{ userInfo.nickName }}</span>
            <div v-if="showEdit" class="my-user-info-edit" @click="editUserInfo">编辑个人资料</div>
        </div>

        <div class="my-grid-list">
            <div v-for="item in list" :key="item.name" class="my-grid-item" @click="itemClick(item.name)">
                <i class="qhht-icon my-grid-item-img" :style="{backgroundImage:`url(${item.image})`}">
                    <div  v-if="(replyMessageCount !== 0 && item.name ==='/my/Reply')" class="my-grid-item-badge">{{ replyMessageCount }}</div>
                </i>
                <span class="my-grid-item-title">{{item.title}}</span>
            </div>
        </div>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('myData')

import purchase from '../assets/images/my_purchase.png'
import record from '../assets/images/my_record.png'
import like from '../assets/images/my_like.png'
import puzzle from '../assets/images/my_puzzle.png'
import reply from '../assets/images/my_reply.png'
import praise from '../assets/images/my_praise.png'
import feedback from '../assets/images/my_feedback.png'

export default {
  name: 'My',
  data: function() {
    return {
      nickName: '',
      avatarUrl: praise,
      showEdit: true,
      list: [
        {
          name: '/my/Purchase',
          image: purchase,
          title: '已购清单'
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
          name: '/my/Feedback',
          image: feedback,
          title: '意见反馈'
        }
        /*{
            name: '/my/Public',
            image: feedback,
            title: '公共内容'
          },*/
        /* {
          name: '/my/SysMessage',
          image: sys,
          title: '系统消息'
        },*/
        /* {
            name: '/my/wx-config',
            image: require('../assets/images/logo.png'),
            title: '组件测试'
          }*/
      ]
    }
  },
  computed: {
    ...mapState(['replyMessageCount', 'userInfo'])
  },
  methods: {
    ...mapActions(['queryNewMessageCount', 'getMyUserInfo']),
    editUserInfo: function() {
      if (
        undefined != this.userInfo.gender &&
        undefined != this.userInfo.grade &&
        undefined != this.userInfo.role &&
        undefined != this.userInfo.mobileNo
      ) {
        // 用户信息都填写完整
        this.showEdit = false
        this.$router.push({ path: './my/DisplayUserInfo' })
      } else {
        if (this.userInfo.mobileNo) {
          // 填写了电话号码则直接跳到其他信息填写页面
          this.$router.push({ path: './my/EditUserInfo' })
          // 所有的信息都没有填写则从电话验证开始填写
        } else {
          this.$router.push({ path: './my/EditUserPhone' })
        }
      }
    },
    itemClick: function(name) {
      this.$router.push({ path: name })
    }
  },
  created() {
    this.queryNewMessageCount()
    this.getMyUserInfo().then(() => {
      this.showEdit =
        undefined == this.userInfo.gender ||
        undefined == this.userInfo.grade ||
        undefined == this.userInfo.role ||
        undefined == this.userInfo.mobileNo
    })
  }
}
</script>
<style lang="less" scoped>
.my {
  padding: 0;
  justify-content: center;
  &-user-info {
    width: 100%;
    align-items: center;
    flex-direction: column;
    display: flex;
    justify-content: flex-start;
    height: 322px;
    background: url('./../assets/images/my_head_bg.png');
    z-index: 2;

    &-avatar {
      width: 112px;
      height: 112px;
      margin-top: 56px;
      border-radius: 50%;
      background-color: rgb(253, 231, 231);
    }

    &-nickname {
      margin-top: 24px;
      color: #fff;
      font-size: 32px;
    }

    &-edit {
      height: 48px;
      border-radius: 30px;
      padding: 10px 40px 48px 40px;
      color: rgb(255, 255, 255);
    }
  }
  &-grid-list {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    padding-top: 56px;
  }

  &-grid-item {
    width: 33.3%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    padding-bottom: 56px;
    border: 1px #000;
    flex-wrap: wrap;
    &-badge {
      float: right;
      width: 36px;
      height: 36px;
      background: red;
      color: white;
      border-radius: 50%;
      align-content: center;
      padding: 3px 0px 0px 0px;
      text-align: center;
    }
    &-img {
      width: 112px;
      height: 112px;
    }
    &-title {
      font-size: 26px;
      padding-top: 24px;
      color: #596880;
    }
  }
}
</style>

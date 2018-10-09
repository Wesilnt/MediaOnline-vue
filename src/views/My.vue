<template>
    <div class="my">
        <div class="my-user-info" @click="editUserInfo">
            <i class="qhht-icon my-user-info-avatar" :style="{backgroundImage:`url(${userInfo.avatarUrl})`}"></i>
            <span class="my-user-info-nickname">{{ userInfo.nickName }}</span>
            <div class="my-user-info-edit">编辑个人资料</div>
        </div>

        <div class="my-grid-list">
            <div v-for="item in list" :key="item.name" class="my-grid-item" @click="itemClick(item.name)">
                <div v-if="(newReplyMessageCount !== 0 && item.name ==='/my/Reply') || (newSysMessageCount !== 0 && item.name ==='/my/SysMessage') "
                     class="my-grid-item-badge">
                    {{ item.name === '/my/Reply' ? newReplyMessageCount : newSysMessageCount }}
                </div>
                <i class="qhht-icon my-grid-item-img" :style="{backgroundImage:`url(${item.image})`}"></i>
                <span class="my-grid-item-title">{{item.title}}</span>
            </div>
        </div>
    </div>
</template>

<script>
  import {createNamespacedHelpers} from 'vuex'

  const {mapState, mapActions} = createNamespacedHelpers('myData')

  import purchase from '../assets/images/my_purchase.png'
  import record from '../assets/images/my_record.png'
  import like from '../assets/images/my_like.png'
  import puzzle from '../assets/images/my_puzzle.png'
  import reply from '../assets/images/my_reply.png'
  import praise from '../assets/images/my_praise.png'
  import sys from '../assets/images/my_sys_message.png'
  import feedback from '../assets/images/my_feedback.png'

  export default {
    name: 'My',
    data: function () {
      return {
        nickName: '',
        avatarUrl: praise,
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
            name: '/my/SysMessage',
            image: sys,
            title: '系统消息'
          },
          {
            name: '/my/Feedback',
            image: feedback,
            title: '意见反馈'
          }
          /*{
            name: '/my/wx-config',
            image: require('../assets/images/logo.png'),
            title: '组件测试'
          }*/
        ]
      }
    },
    computed: {
      ...mapState(['newReplyMessageCount', 'newSysMessageCount', 'userInfo'])
    },
    methods: {
      ...mapActions(['queryNewMessageCount', 'getMyUserInfo']),
      editUserInfo: function () {
        if (this.userInfo.gender && this.userInfo.grade && this.userInfo.role) {
          this.$router.push({path: './my/DisplayUserInfo'})
        } else {
          this.$router.push({path: './my/EditUserPhone'})
        }
      },
      itemClick: function (name) {
        this.$router.push({path: name})
      }
    },
    created() {
      this.queryNewMessageCount()
      this.getMyUserInfo()
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
            background: rgb(247, 202, 118);
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
                min-width: 36px;
                height: 36px;
                border-radius: 30px;
                background-color: #e64340;
                color: #fff;
                text-align: center;
                font-size: 26px;
                padding: 0 10px 8px;
                margin-bottom: 100px;
            }
            &-img {
                width: 112px;
                height: 112px;
            }
            &-title {
                font-size: 26px;
                padding-top: 24px;
            }
        }
    }
</style>

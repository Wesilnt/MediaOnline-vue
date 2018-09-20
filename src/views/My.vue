<template>
    <div class="my">
        <div class="my-user-info" @click="editUserInfo">
            <lazy-component>
                <img v-lazy="avatarUrl" class="my-user-info-avatar">
            </lazy-component>
            <span class="my-user-info-nickname">{{ nickName }}</span>
            <div class="my-user-info-edit">编辑个人资料</div>
        </div>

        <div class="my-grid-list">
            <div v-for="item in list" :key="item.name" class="my-grid-item" @click="itemClick(item.name)">
                <div v-if="(newReplyMessageCount !== 0 && item.name ==='/my/Reply') || (newSysMessageCount !== 0 && item.name ==='/my/SysMessage') " class="my-grid-item-badge">
                    {{ item.name === '/my/Reply' ? newReplyMessageCount : newSysMessageCount }}
                </div>
                <lazy-component>
                    <img v-lazy="item.image" class="my-grid-item-img">
                </lazy-component>
                <span class="my-grid-item-title">{{item.title}}</span>
            </div>
        </div>
    </div>
</template>

<script>
  import { createNamespacedHelpers } from 'vuex'

  const { mapState, mapActions } = createNamespacedHelpers(
    'myData'
  )

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
    data: function () {
      return {
        nickName: '肖绪波',
        avatarUrl: praise,
        headBg: bg,
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
            name: '/my/Help',
            image: help,
            title: '意见反馈'
          }
        ]
      }
    },
    computed: {
      ...mapState(['newReplyMessageCount','newSysMessageCount'])
    },
    methods: {
      ...mapActions(['queryNewMessageCount']),
      editUserInfo: function () {
        this.$router.push({path: './my/DisplayUserInfo'})
      },
      itemClick: function (name) {
        this.$router.push({path: name})
      }
    },
    created() {
      this.queryNewMessageCount()
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
                font-size: 24px;
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
                padding: 0px 10px 8px 10px;
                margin: 0px 0px 0px 100px;
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

<template>
    <section>
        <div v-if="showDefaultMessage" class="reply-list">
            <div v-for="item in messageList" :key="item.id">
                <div class="reply-list-item">
                    <img :src="item.content.fromAvatarUrl" class="reply-list-item-avatar"/>
                    <div class="reply-list-item-content">
                        <p class="reply-list-item-content-name">{{ item.content.fromNickName }}</p>
                        <p class="reply-list-item-content-detail">{{ item.content.reply }}</p>
                        <p class="reply-list-item-content-time">{{ item.createTime | formatDate }}</p>
                    </div>
                    <p class="reply-list-item-parent-content">{{ item.content.parentContent }}</p>
                </div>
                <div class="divider-line"></div>
            </div>
            <div v-if="messageList.length === 0" class="reply-no-data">
                <p class="reply-no-data-text">暂无新消息</p>
            </div>
            <div class="reply-divider-line"></div>

            <div class="reply-read-more" @click="viewBeforeMessage">
                <p class="reply-read-more-text">查看更早的消息...</p>
            </div>
            <div class="reply-divider-line"></div>
        </div>
        <div v-if="!showDefaultMessage" class="reply-used-list">
            <div v-for="item in usedMessageList" :key="item.id">
                <div class="reply-list-item">
                    <img :src="item.content.fromAvatarUrl" class="reply-list-item-avatar"/>
                    <div class="reply-list-item-content">
                        <p class="reply-list-item-content-name">{{ item.content.fromNickName }}</p>
                        <p class="reply-list-item-content-detail">{{ item.content.reply }}</p>
                        <p class="reply-list-item-content-time">{{ item.createTime | formatDate }}</p>
                    </div>
                    <p class="reply-list-item-parent-content">{{ item.content.parentContent }}</p>
                </div>
                <div class="divider-line"></div>
            </div>
            <div v-if="usedMessageList.length === 0" class="reply-no-data">
                <p class="reply-no-data-text">暂无历史消息</p>
            </div>
            <div class="reply-divider-line"></div>
            <div class="reply-read-more" @click="viewBeforeMessage">
                <p class="reply-read-more-text">查看新消息...</p>
            </div>
            <div class="reply-divider-line"></div>
        </div>
    </section>
</template>

<script>
  import { createNamespacedHelpers } from 'vuex'
  import { getDateDiff } from './../../utils/utils'
  const {mapState, mapActions} = createNamespacedHelpers('myReplyData')
  export default {
    name: 'Reply',
    components: {
      // NavBar
    },
    data: function () {
      return {
        showDefaultMessage:true
      }
    },
    computed: {
      ...mapState(['messageList', 'usedMessageList', 'loading'])
    },
    methods: {
      ...mapActions(['queryList','queryUsedList', 'delMessage']),
      viewBeforeMessage() {
        this.showDefaultMessage = !this.showDefaultMessage
        this.queryUsedList()
      }
    },
    created() {
      this.queryList()
    },
    filters: {
      formatDate: function (time) {
        return getDateDiff(time)
      },
    }
  }
</script>

<style scoped lang="less">
    .reply {
        display: flex;
        flex-direction: column;
        font-size: 28px;
        &-list {
            padding: 0px 30px 0px 30px;
            &-item {
                width: 100%;
                padding: 30px 0px 30px 0px;
                display: flex;
                flex-direction: row;
                border-bottom: #ddd 1px solid;
                &-avatar {
                    width: 94px;
                    height: 94px;
                    background-color: #ff9521;
                    border-radius: 12px;
                    outline: none;
                }

                &-content {
                    width: 70%;
                    float: right;
                    font-size: 26px;
                    padding: 6px 20px 0px 20px;
                    &-name {
                        padding: 0px 0px 20px 0px;
                        font-size: 28px;
                        color: #57668f;
                    }
                    &-detail {
                        padding: 0px 0px 22px 0px;
                        font-size: 28px;
                        color: #57668f;
                    }
                    &-time {
                        font-size: 26px;
                        color: #737373;
                    }
                }
                &-parent-content {
                    width: 130px;
                    height: 120px;
                    font-size: 26px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                }
            }
        }
        &-used-list {
            padding: 0px 30px 0px 30px;
        }
        &-read-more {
            width: 100%;
            height: 118px;
            text-align: center;
            border-bottom: #ddd 1px solid;
            &-text {
                width: 100%;
                height: 118px;
                font-size: 28px;
                color: #737373;
                line-height: 118px;
            }
        }
        &-no-data {
            width: 100%;
            height: 110px;
            text-align: center;
            border-bottom: #ddd 1px solid;
            &-text {
                width: 100%;
                height: 110px;
                font-size: 24px;
                color: #b3b3b3;
                line-height: 110px;
            }
        }
    }
</style>

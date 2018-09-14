<template>
    <div class="reply">
        <div v-for="item in messageList" :key="item.id" class="reply-list">
            <div class="reply-list-item">
                <img src="item.content | jsonToData('fromAvatarUrl')" class="reply-list-item-avatar"/>
                <div class="reply-list-item-content">
                    <p class="reply-list-item-content-name">{{ item.content | jsonToData('fromNickName') }}</p>
                    <p class="reply-list-item-content-detail">{{ item.content | jsonToData('reply') }}</p>
                    <p class="reply-list-item-content-time">{{ item.createTime | formatDate }}</p>
                </div>
                <p class="reply-list-item-parent-content">{{ item.content | jsonToData('parentContent') }}</p>
            </div>
            <div class="divider-line"></div>
        </div>

        <div class="reply-read-more">
            <p class="reply-read-more-text">查看更早的消息...</p>
        </div>
        <div class="reply-divider-line"></div>

    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const { mapState, mapActions } = createNamespacedHelpers('myReply')
export default {
  name: 'Reply',
  components: {
    // NavBar
  },
  data: function() {
    return {}
  },
  computed: {
    ...mapState(['messageList', 'loading'])
  },
  methods: {
    ...mapActions(['queryList', 'delMessage'])
  },
  created() {
    this.queryList()
  },
  filters: {
    formatDate: function(time) {
      var date = new Date(time / 1000)
      const seperator1 = '-'
      let month = date.getMonth() + 1
      let strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      return month + seperator1 + strDate
    },
    jsonToData: function(json, name) {
      var obj = JSON.parse(json)
      switch (name) {
        case 'fromNickName':
          return obj.fromNickName
        case 'reply':
          return obj.reply
        case 'parentContent':
          return obj.reply
        case 'fromAvatarUrl':
          return obj.fromAvatarUrl
      }
    }
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
  &-read-more {
    width: 100%;
    height: 118px;
    text-align: center;
    border-bottom: #ddd 1px solid;
    &-text {
      width: 100%;
      height: 118px;
      font-size: 26px;
      color: #737373;
      line-height: 118px;
    }
  }
}
</style>

<template>
    <div class="reply-container">
        <div v-for="item in messageList" :key="item.id">
            <div class="replay-list-item">
                <img src="item.content | jsonToData('fromAvatarUrl')" class="replay-list-item-avatar"/>
                <div class="replay-list-item-content">
                    <p class="replay-list-item-content-name">{{ item.content | jsonToData('fromNickName') }}</p>
                    <p class="replay-list-item-content-detail">{{ item.content | jsonToData('reply') }}</p>
                    <p class="replay-list-item-content-time">{{ item.createTime | formatDate }}</p>
                </div>
                <p class="replay-list-item-parent-content">{{ item.content | jsonToData('parentContent') }}</p>
            </div>
            <div class="divider-line"></div>
        </div>

        <div class="read-more-container">
            <p class="read-more">查看更早的消息</p>
        </div>
        <div class="divider-line"></div>

    </div>
</template>

<script>
  import { createNamespacedHelpers } from 'vuex'
  import { json2formData } from "../../utils/utils";

  const { mapState, mapActions } = createNamespacedHelpers(
    'myReply'
  )
  export default {
    name: 'Reply',
    components: {
      // NavBar
    },
    data: function () {
      return {}
    },
    computed: {
      ...mapState(['messageList', 'loading'])
    },
    methods: {
      ...mapActions(['queryList', 'delMessage']),
    },
    created() {
      this.queryList()
    },
    filters: {
      formatDate: function (time) {
        var date = new Date(time/1000);
        const seperator1 = '-'
        let month = date.getMonth() + 1
        let strDate = date.getDate()
        if (month >= 1 && month <= 9) {
          month = '0' + month
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = '0' + strDate
        }
        return (
          month + seperator1 + strDate
        )
      },
      jsonToData:function (json, name) {
        var obj = JSON.parse(json)
        switch(name) {
          case "fromNickName":
            return obj.fromNickName
            break
          case "reply":
            return obj.reply
            break
          case "parentContent":
            return obj.reply
            break
          case "fromAvatarUrl":
            return obj.fromAvatarUrl
            break

        }
      }
    }
  }
</script>

<style scoped>
    .reply-container {
        display: flex;
        flex-direction: column;
    }

    .replay-list-item {
        width: 100%;
        padding: 30px 36px 16px 20px;
        display: flex;
        flex-direction: row;
    }
    .replay-list-item-avatar {
        width: 94px;
        height: 94px;
        background-color: #ff9521;
        border-radius: 12px;
        outline: none;
    }
    .replay-list-item-content-name {
        padding: 0px 0px 0px 0px;
        font-size: 28px;
        color: #57668f;
    }

    .replay-list-item-content {
        width: 70%;
        float: right;
        font-size: 26px;
        padding: 6px 20px 0px 20px;
    }

    .replay-list-item-content-time {
        font-size: 26px;
        color: #737373;
        padding: 0px 0px 16px 0px;
    }

    .replay-list-item-parent-content {
        width: 130px;
        height: 120px;
        font-size: 26px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    }

    .divider-line {
        height: 1px;
        background: #ddd;
        text-align: center;
        margin: 0px 30px 0px 30px;
    }

    .read-more-container {
        width: 100%;
        height: 118px;
        text-align: center;
    }

    .read-more {
        width: 100%;
        height: 118px;
        font-size: 26px;
        color: #737373;
        line-height: 118px;
    }
</style>

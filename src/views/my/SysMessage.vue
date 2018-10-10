<template>
    <section>
        <div v-if="messageList.length===0" class="sysmessage-nodata">
            <i class="qhht-icon sysmessage-nodata-icon"/>
            <p class="sysmessage-nodata-warn">暂无系统消息</p>
            <a class="sysmessage-nodata-btn"></a>
        </div>
        <div v-else class="sysmessage-container">
            <div v-if="showCheck === false" class="sysmessage-head-default">
                <img class="sysmessage-head-default-left-icon" :src="require('../../assets/images/my_record_play.png')"/>
                <p class="sysmessage-head-default-record-text">最近播放</p>
                <img class="sysmessage-head-default-right-icon" :src="require('../../assets/images/my_sys_menu.png')"
                     @click="handleMenu">
            </div>
            <div v-else="showCheck" class="sysmessage-head-check">
                <div class="sysmessage-head-check-all-check">
                    <van-checkbox v-model="checked" >
                        <img slot="icon"
                             @click="allChecked"
                             class="check-img"
                             slot-scope="props"
                             :src="props.checked ? icon.active : icon.normal"
                        >
                    </van-checkbox>
                </div>
                <p class="sysmessage-head-check-text">全选</p>
                <p class="sysmessage-head-check-right-text" @click="handleDeleteAll">完成</p>
            </div>
        </div>
        <div>
            <div style="margin-bottom: 59px">
                <div v-for="item,index in messageList" :key="item.id" class="sysmessage-list">
                    <div class="sysmessage-list-item">

                        <!--                        <van-checkbox class="sysmessage-list-item-check" v-if="showCheck" v-model="item.isChecked"
                                                              @change="singleChecked(item,index)"
                                                              :src="props.checked ? checkBox.active : checkBox.normal"/>-->
                        <van-checkbox v-if="showCheck" class="sysmessage-list-item-check" v-model="messageListCheck[index]">
                            <img slot="icon"
                                 class="check-img"
                                 slot-scope="props"
                                 :src="messageListCheck[index] ? icon.active : icon.normal"
                            >
                        </van-checkbox>
                        <div class="sysmessage-list-item-content">
                            <div>
                                <div v-if="item.busiType===3102" class="sysmessage-list-item-content-top-title">
                                    留言入选通知
                                </div>
                                <div v-else-if="item.busiType===3103" class="sysmessage-list-item-content-top-title">
                                    系统消息
                                </div>
                                <div v-else-if="item.busiType===3105" class="sysmessage-list-item-content-top-title">
                                    留言升级通知
                                </div>
                                <div v-else-if="item.busiType===3106" class="sysmessage-list-item-content-top-title">
                                    用户反馈通知
                                </div>
                                <div class="sysmessage-list-item-content-top-time">{{item.createTime | formatDate
                                    }}
                                </div>
                            </div>
                            <div class="sysmessage-list-item-content-detail">{{item.content}}</div>
                        </div>
                        <div v-if="!showCheck" class="sysmessage-list-item-more"
                             @click="showDelete(item.id)">
                            <img :src="require('../../assets/images/my_record_more.png')" class="sysmessage-list-item-more-img"/>
                        </div>
                    </div>
                    <van-popup v-model="isShowDelete" position="bottom" >
                        <img class="del-icon" :src="require('../../assets/images/my_alter_delete.png')" @click="handleDelete"/>
                        <p class="del-text">删除</p>
                    </van-popup>
                    <van-popup v-model="showCheck" position="bottom" :overlay="false" :lock-scroll="false">
                        <img class="del-icon"  :src="require('../../assets/images/my_alter_delete.png')" @click="handleDeleteAll"/>
                        <p class="del-text">删除</p>
                    </van-popup>
                </div>
                <div/>
            </div>
        </div>
    </section>
</template>

<script>
  import {createNamespacedHelpers} from 'vuex'
  import {Toast} from 'vant'
  import {Vue} from 'vue'

  const {mapState, mapMutations,mapActions} = createNamespacedHelpers('mySysMessageData')
  export default {
    name: 'SysMessage',
    components: {
      // NavBar
    },
    data: function () {
      return {
        isShowDelete: false,
        deleteId: '',
        checkAll: false,
        showCheck: false,
        checkboxes: [],
        checked: false,
        icon: {
          normal: require('../../assets/images/my_checkbox_normal.png'),
          active: require('../../assets/images/my_checkbox_checked.png'),
        }
      }
    },
    computed: {
      ...mapState(['messageList', 'loading','messageListCheck'])
    },
    methods: {
      ...mapMutations(['setCheckToList','setCheckList']),
      ...mapActions(['queryList', 'delMessage','delManyMessage']),
      handleMenu: function () {
        this.setCheckToList()
        this.showCheck = true
        console.log("showCheck is click")
      },
      showDelete: function (id) {
        this.deleteId = id
        this.isShowDelete = true
      },
      handleDelete: function () {
        console.log("handle" + this.deleteId)
        let id = this.deleteId
        this.delMessage({id})
      },
      handleDeleteAll: function () {
        this.showCheck = false
        this.checked = false
        //  to do delete select message
        this.delManyMessage()

      },
      allChecked: function () {
        console.log("all checked")
        const status = !this.checked
        this.setCheckList(status)
      }

    },
    watch: {
      loading: function (loading) {
        if (loading === false) {
          Toast.success("删除成功")
          this.isShowDelete = false
        }
      }
    },
    created() {
      this.queryList()
    },
    filters: {
      formatDate: function (time) {
        let date = new Date(time)
        const separator = '-'
        let month = date.getMonth() + 1
        let strDate = date.getDate()
        if (month >= 1 && month <= 9) {
          month = '0' + month
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = '0' + strDate
        }
        return month + separator + strDate
      }
    }
  }
</script>

<style scoped lang="less">
    @active: #ffa32f;
    .sysmessage {
        &-container {
        }
        &-head-default {
            display: flex;
            flex-direction: row;
            padding: 34px 0px 34px 0px;
            margin: 0px 30px 0px 30px;
            border-bottom: 0.1px solid #ddd;
            &-left-icon {
                width: 40px;
                height: 40px;
                margin: 7px 20px 0px 0px;
            }
            &-record-text {
                padding: 3px 8px 0px 0px;
                font-size: 36px;
                color: #3e3e53;
            }
            &-right-icon {
                width: 28px;
                height: 26px;
                margin: 10px 0px 0px 0px;
                position: absolute;
                right: 30px;
            }
        }
        &-head-check {
            display: flex;
            flex-direction: row;
            padding: 34px 0px 20px 0px;
            margin: 0px 30px 0px 30px;
            border-bottom: 0.1px solid #ddd;
            &-all-check {

                margin: 10px 20px 0px 0px;
            }
            &-text {
                padding: 14px 8px 20px 0px;
                font-size: 36px;
                color: #3e3e53;
            }
            &-right-text {
                margin: 14px 0px 0px 0px;
                position: absolute;
                right: 30px;
                font-size: 36px;
                color: #ffa32f;
            }
        }
        &-list {
            padding: 0px 30px 0px 30px;

            &-item {
                width: 100%;
                display: flex;
                flex-direction: row;
                padding: 24px 0px 32px 0px;
                border-bottom: 0.1px solid #ddd;
                &-check {
                    margin: 55px 0px 0px 0px;
                    padding: 0px 20px 0px 0px;
                }
                &-content {
                    flex-grow: 1;
                    &-top {
                        display: flex;
                        flex-direction: row;
                        &-title {
                            font-weight: bold;
                            font-size: 32px;
                            display: inline;
                            padding-right: 24px;
                        }
                        &-time {
                            font-size: 22px;
                            display: inline;
                            color: #9ba1b0;
                        }
                    }
                    &-detail {
                        padding: 32px 32px 0px 70px;
                        font-size: 28px;
                        color: #808080;
                    }
                }
                &-more {
                    &-img {
                        width: 32px;
                        height: 6px;
                        margin-top: 65px;
                    }
                }
            }
        }
        &-nodata {
            height: 100vh;
            text-align: center;
            color: #949aaa;
            &-icon {
                width: 180px;
                height: 200px;
                margin-top: 180px;
                background-image: url('../../assets/images/my_data_empty.png');
            }
            &-warn {
                margin: 40px 0;
            }
        }
    }

    .van-swipe-cell span {
        width: 150px;
        height: 100%;
        color: #ffffff;
        font-size: 18px;
        display: block;
        line-height: 44px;
        background-color: #f44;
        display: flex;
        justify-content: center;
        align-items: Center;
    }

    .van-popup {
        height: 60px;
        text-align: center;
        background-color: white;
        border-top: 0.1px solid #ddd;
    }

    .del-icon {
        width: 55px;
        height: 55px;
        margin: 15px 0px 10px 0px;
        align-content: center;
    }
    .del-text {
        font-size: 28px;
        color: #808080;
    }
    .check-img {
        height: 45px;
        width: 45px;
        margin: 0px 0px 20px 0px;
    }

</style>

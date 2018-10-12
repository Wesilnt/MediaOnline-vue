<template>
    <section>
        <div v-if="likeList.length===0" class="like-nodata">
            <i class="qhht-icon like-nodata-icon"/>
            <p class="like-nodata-warn">暂无收藏记录</p>
        </div>
        <div v-else class="like-container">
            <div class="like-header-container " v-lazy:background-image="require('../../assets/images/my_like_head.png')"></div>
            <div v-if="showCheck === false" class="like-head-default">
                <img class="like-head-default-left-icon" :src="require('../../assets/images/my_record_play.png')"/>
                <p class="like-head-default-record-text">播放全部</p>
                <div class="like-head-default-record-number">(共{{likeList.length}}条记录)</div>
                <img class="like-head-default-right-icon" :src="require('../../assets/images/my_sys_menu.png')"
                     @click="handleMenu">
            </div>
            <div v-else="showCheck" class="like-head-check">
                <div class="like-head-check-all-check">
                    <van-checkbox v-model="checked" >
                        <img slot="icon"
                             @click="allChecked"
                             class="check-img"
                             slot-scope="props"
                             :src="props.checked ? icon.active : icon.normal"
                        >
                    </van-checkbox>
                </div>
                <p class="like-head-check-text">全选</p>
                <p class="like-head-check-right-text" @click="handleDeleteAll">完成</p>
            </div>
        </div>
        <div>
            <div style="margin-bottom: 59px">
                <div v-for="item,index in likeList" :key="item.id" class="like-list" @click="toPlay(item)">

                    <div class="like-list-item">
                        <van-checkbox v-if="showCheck" class="like-list-item-check" v-model="likeCheckList[index]"  >
                            <img slot="icon"
                                 class="check-img"
                                 slot-scope="props"
                                 :src="likeCheckList[index] ? icon.active : icon.normal"
                                 @click="toggleCheck(index)"
                            >
                        </van-checkbox>
                        <p v-if="!showCheck" class="like-list-item-content-order-number">{{index + 1}}</p>
                        <div class="like-list-item-content">

                            <div class="like-list-item-content-info">
                                <p class="like-list-item-content-info-name">{{item.title}}</p>
                                <p class="like-list-item-content-info-detail">{{item.courseName}} -
                                    {{item.subTitle}} - {{item.learnTime}} / {{item.totalTime}}</p>
                            </div>
                        </div>
                        <div v-if="!showCheck" class="like-list-item-more"
                             @click="showDelete(item.id)">
                            <img :src="require('../../assets/images/my_record_more.png')" class="like-list-item-more-img"/>
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
  import { courseType} from "../../utils/config";
  import {Vue} from 'vue'

  const {mapState, mapMutations,mapActions} = createNamespacedHelpers('myLikeData')
  export default {
    name: 'Like',
    components: {
      // NavBar
    },
    data: function () {
      return {
        isShowDelete: false,
        deleteId: '',
        checkAll: false,
        showCheck: false,
        likeCheckList:[],
        checked: false,
        icon: {
          normal: require('../../assets/images/my_checkbox_normal.png'),
          active: require('../../assets/images/my_checkbox_checked.png'),
        }
      }
    },
    computed: {
      ...mapState(['likeList', 'loading'])
    },
    methods: {
      ...mapMutations(['modifyLikeList']),
      ...mapActions(['queryList', 'delMyLike','batchDelMyLike']),
      toPlay:function (item) {
        this.$router.push({
          name: 'AudioPlay'
          , params: {id: item.id}
          , query: {playType: courseType[item.courseType], courseName: item.title}
        })

      },
      handleMenu: function () {
        this.setCheckToList()
        this.showCheck = true
      },
      showDelete: function (id) {
        this.deleteId = id
        this.isShowDelete = true
      },
      handleDelete: function () {
        let id = this.deleteId
        this.delMyLike({id})
      },
      handleDeleteAll: function () {
        this.showCheck = false
        this.checked = false
        //  to do delete select like
        let ids = ''
        if (this.likeCheckList.length > 0) {
          for (let i = 0; i < this.likeCheckList.length; i++) {
            if (this.likeCheckList[i] === true) {
              ids += this.likeList[i].id + ','
            }
          }
        }
        if(ids === ''){
          return
        } else {
          ids = ids.substring(0,ids.length - 1)
        }
        this.batchDelMyLike({ids})

      },
      allChecked: function () {
        const status = !this.checked
        this.setCheckList(status)
      },
      toggleCheck:function (index) {
        this.modifyCheckList(index)
      },
      setCheckToList() {
        if (this.likeList.length > 0) {
          for (let i = 0; i < this.likeList.length; i++) {
            this.likeCheckList[i] = false
          }
        }
      },
      setCheckList(status) {
        if (this.likeList.length > 0) {
          for (let i = 0; i < this.likeList.length; i++) {
            this.likeCheckList[i] = status
          }
        }
      },
      modifyCheckList( index) {
        if (this.likeCheckList.length > index) {
          this.likeCheckList[index] = !this.likeCheckList[index]
        }
      }
    },
    watch: {
      loading: function (loading) {
        if (loading === false) {
         /* Toast.success("删除成功")
          this.isShowDelete = false*/
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
    .like {
        &-container {
        }
        &-header-container {
            display: flex;
            flex-direction: column;
            background: #f6f6f6 center/100% no-repeat;
            background-size: 100%;
            color: white;
            height: 300px;
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
            &-record-number {
                padding: 6px 0px 0px 0px;
                font-size: 28px;
                color: #7d7d7e;
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
                padding: 24px 0px 24px 10px;
                display: flex;
                flex-direction: row;
                border-bottom: 0.1px solid #ddd;
                &-check {
                    padding: 24px 35px 24px 0px;
                }
                &-content {
                    flex-grow: 1;
                    &-order-number {
                        font-size: 36px;
                        color: #949aaa;
                        padding: 24px 35px 24px 0px;
                    }
                    &-info{
                        &-name {
                            padding: 6px 0px 0px 0px;
                            font-size: 36px;
                            color: #333030;
                        }
                        &-detail {

                            color: #7d7d7e;
                            padding: 16px 0px 0px 0px;
                        }
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
                background-image: url('../../assets/images/my_like_empty.png');
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

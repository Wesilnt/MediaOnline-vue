<template>
    <section>
        <div v-if="playRecordList.length===0" class="playRecord-nodata">
            <i class="qhht-icon playRecord-nodata-icon"/>
            <p class="playRecord-nodata-warn">暂无播放记录</p>
        </div>
        <div v-else class="playRecord-container">
            <div class="playRecord-header-container " v-lazy:background-image="require('../../assets/images/my_playrecord_head.png')"></div>
            <div v-if="showCheck === false" class="playRecord-head-default">
                <img class="playRecord-head-default-left-icon" :src="require('../../assets/images/my_record_play.png')"/>
                <p class="playRecord-head-default-record-text">播放全部</p>
                <div class="playRecord-head-default-record-number">(共{{playRecordList.length}}条记录)</div>
                <img class="playRecord-head-default-right-icon" :src="require('../../assets/images/my_menu_list.png')"
                     @click="handleMenu">
            </div>
            <div v-else-if="showCheck" class="playRecord-head-check">
                <div class="playRecord-head-check-all-check">
                    <van-checkbox v-model="checked" >
                        <img slot="icon"
                             @click="allChecked"
                             class="check-img"
                             slot-scope="props"
                             :src="props.checked ? icon.active : icon.normal"
                        >
                    </van-checkbox>
                </div>
                <p class="playRecord-head-check-text">全选</p>
                <p class="playRecord-head-check-right-text" @click="handleDeleteAll">完成</p>
            </div>
        </div>
        <div>
            <div style="margin-bottom: 59px">
                <div v-for="(item,index) in playRecordList" :key="item.id" class="playRecord-list" >

                    <div class="playRecord-list-item">
                        <van-checkbox v-if="showCheck" class="playRecord-list-item-check" v-model="playRecordCheckList[index]"  >
                            <img slot="icon"
                                 class="check-img"
                                 slot-scope="props"
                                 :src="playRecordCheckList[index] ? icon.active : icon.normal"
                                 @click="toggleCheck(index)"
                            >
                        </van-checkbox>
                        <p v-if="!showCheck" class="playRecord-list-item-content-order-number">{{index + 1}}</p>
                        <div class="playRecord-list-item-content" @click="toPlay(item)">

                            <div class="playRecord-list-item-content-info">
                                <p class="playRecord-list-item-content-info-name">{{item.title}}</p>
                                <p class="playRecord-list-item-content-info-detail">{{item.courseName}} -
                                    {{item.subTitle}} - {{item.learnTime}} / {{item.totalTime}}</p>
                            </div>
                        </div>
                        <div v-if="!showCheck" class="playRecord-list-item-more"
                             @click="showDelete(item.userLessonId)">
                            <img :src="require('../../assets/images/my_record_more.png')" class="playRecord-list-item-more-img"/>
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
  import {courseType} from "../../utils/config";
  import {Vue} from 'vue'

  const {mapState, mapMutations,mapActions} = createNamespacedHelpers('myPlayRecordData')
  export default {
    name: 'PlayRecord',
    components: {
      // NavBar
    },
    data: function () {
      return {
        isShowDelete: false,
        deleteId: '',
        checkAll: false,
        showCheck: false,
        playRecordCheckList:[],
        checked: false,
        icon: {
          normal: require('../../assets/images/my_checkbox_normal.png'),
          active: require('../../assets/images/my_checkbox_checked.png'),
        }
      }
    },
    computed: {
      ...mapState(['playRecordList', 'loading'])
    },
    methods: {
      ...mapMutations(['modifyPlayRecordList']),
      ...mapActions(['queryList', 'delPlayRecord','batchDelPlayRecord']),
      toPlay:function (item) {
        console.log("courseType: " + item.courseType + '\t' + item.id)
        if (item.courseType === '1003' || item.courseType === '1007' ) {
          this.$router.push({
            name: 'AudioPlay'
            , params: {id: item.id}
            , query: {courseId:-1,columnType: courseType[item.courseType], courseName: item.title}
          })
        } else if (item.courseType === '1005' ) {
          this.$router.push({ name: 'videoCourseDetail', params: { lessonId: item.id} })
        }

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
        console.log("handle" + this.deleteId)
        let id = this.deleteId
        this.delPlayRecord({id})
      },
      handleDeleteAll: function () {
        this.showCheck = false
        this.checked = false
        //  to do delete select playRecord
        let ids = ''
        if (this.playRecordCheckList.length > 0) {
          for (let i = 0; i < this.playRecordCheckList.length; i++) {
            if (this.playRecordCheckList[i] === true) {
              ids += this.playRecordList[i].userLessonId + ','
            }
          }
        }
        if(ids === ''){
          return
        } else {
          ids = ids.substring(0,ids.length - 1)
        }
        this.batchDelPlayRecord({ids})

      },
      allChecked: function () {
        const status = !this.checked
        this.setCheckList(status)
      },
      toggleCheck:function (index) {
        this.modifyCheckList(index)
      },
      setCheckToList() {
        if (this.playRecordList.length > 0) {
          for (let i = 0; i < this.playRecordList.length; i++) {
            this.playRecordCheckList[i] = false
          }
        }
      },
      setCheckList(status) {
        if (this.playRecordList.length > 0) {
          for (let i = 0; i < this.playRecordList.length; i++) {
            this.playRecordCheckList[i] = status
          }
        }
      },
      modifyCheckList( index) {
        if (this.playRecordCheckList.length > index) {
          this.playRecordCheckList[index] = !this.playRecordCheckList[index]
          for(let i = 0; i < this.playRecordCheckList.length;i++) {
            console.log("checkd" + this.playRecordCheckList[index])
          }
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
    .playRecord {
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
                background-image: url('../../assets/images/my_record_empty.png');
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
        width: 45px;
        height: 45px;
        margin: 15px 0px 10px 0px;
        align-content: center;
    }
    .del-text {
        font-size: 24px;
        color: #808080;
    }
    .check-img {
        height: 45px;
        width: 45px;
        margin: 0px 0px 20px 0px;
    }

</style>

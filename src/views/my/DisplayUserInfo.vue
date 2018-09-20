<template>
   <div class="display-user-info">
       <div class="display-user-info-column" @click="handleUpdateUserInfo('gender')">
           <p class="display-user-info-column-label">性别</p>
           <p class="display-user-info-column-content">男</p>
           <img class="display-user-info-column-image-arraw" src="../../assets/images/onlinecourse_arrow_right.png"/>
       </div>
       <div class="display-user-info-column" @click="handleUpdateUserInfo('grade')">
           <p class="display-user-info-column-label">年级</p>
           <p class="display-user-info-column-content">三年级</p>
           <img class="display-user-info-column-image-arraw" src="../../assets/images/onlinecourse_arrow_right.png"/>
       </div>
       <div class="display-user-info-column" @click="handleUpdateUserInfo('phone')">
           <p class="display-user-info-column-label">手机号码</p>
           <p class="display-user-info-column-content">151****5465</p>
           <img class="display-user-info-column-image-lock" src="../../assets/images/my_userinfo_lock.png"/>
       </div>
       <Picker :columns="whichPicker ==='gender' ? genders : grades" :isShow="isShow" v-on:toggle="toggleConfirm"/>
   </div>
</template>

<script>
  import { createNamespacedHelpers } from 'vuex'
  import Picker from '../../components/Picker'
  import { Toast } from 'vant'
  const { mapState, mapActions } = createNamespacedHelpers(
    'userInfo'
  )
  export default {
    name: "DisplayUserInfo",
    components: {
      Picker
    },
    data: function() {
      return {
        whichPicker:'',
        isShow:false,
        genders:['男','女'],
        grades: ['未上学', '幼儿园', '一年级', '二年级', '三年级','四年级','五年级','六年级','初一','初二','初三','初三以上']
      }
    },
    computed: {
      ...mapState(['userInfo', 'loading'])
    },
    methods: {
      ...mapActions(['getMyUserInfo', 'updateUserInfo']),
      handleUpdateUserInfo:function (type) {
        if (type === 'gender') {
            this.whichPicker = 'gender'
            this.isShow = true
        } else if ( type === 'grade') {
            this.whichPicker = 'grade'
            this.isShow = true
        } else if( type === 'phone') {
          Toast.fail('电话号码无法编辑')
        }
      },
      toggleConfirm:function(value) {
        console.log(value);
        if(this.genders.indexOf(value) != -1 ) {
          if (!( value === this.userInfo.gender)) {
            this.updateUserInfo(value)
          }
        } else if(this.grades.indexOf(value) != -1){
          if (!( value === this.userInfo.grade)) {
            this.updateUserInfo(value)
          }
        }
      },
    },

    created() {
      this.getMyUserInfo()
    }
  }
</script>

<style scoped lang="less">
    .display-user-info{
        font-size: 28px;
        padding: 0px 40px 0px 40px;
        &-column {
            display: flex;
            flex-direction: row;
            padding: 46px 0px 46px 0px;
            border-bottom: 0.1px solid #ddd;
            &-label {
                color:#3e3e53;
            }
            &-content {
                position: absolute;
                right: 90px;
                color: #959899;
            }
            &-image-arraw {
                width: 15px;
                height: 28px;
                position: absolute;
                right: 30px;
                margin: 5px 16px 0px 0px;
            }
            &-image-lock {
                width: 26px;
                height: 26px;
                position: absolute;
                right: 30px;
                margin: 5px 16px 0px 0px;
            }
        }
    }
</style>

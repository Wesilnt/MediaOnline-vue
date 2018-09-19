<template>
   <div class="display-user-info">
       <div class="display-user-info-column">
           <p class="display-user-info-column-label">性别</p>
           <p class="display-user-info-column-content">}男</p>
           <img class="display-user-info-column-image-arraw" src="../../assets/images/onlinecourse_arrow_right.png"/>
       </div>
       <div class="display-user-info-column">
           <p class="display-user-info-column-label">年级</p>
           <p class="display-user-info-column-content">三年级</p>
           <img class="display-user-info-column-image-arraw" src="../../assets/images/onlinecourse_arrow_right.png"/>
       </div>
       <div class="display-user-info-column">
           <p class="display-user-info-column-label">手机号码</p>
           <p class="display-user-info-column-content">151****5465</p>
           <img class="display-user-info-column-image-lock" src="../../assets/images/my_userinfo_lock.png"/>
       </div>
   </div>
</template>

<script>
  import { createNamespacedHelpers } from 'vuex'

  const { mapState, mapActions, mapGetters } = createNamespacedHelpers(
    'userInfo'
  )
  export default {
    name: "DisplayUserInfo",
    data: function() {
      return {
      }
    },
    computed: {
      ...mapState(['userInfo', 'loading'])
    },
    methods: {
      ...mapActions(['getMyUserInfo', 'updateUserInfo']),
      handleUpdateUserInfo:function () {
        console.log("handleUpdateUserInfo")
      }
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

            }
            &-content {
                font-size: 27px;
                position: absolute;
                right: 90px;
            }
            &-image-arraw {
                width: 15px;
                height: 28px;
                position: absolute;
                right: 30px;
                margin: 0px 16px 0px 0px;
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

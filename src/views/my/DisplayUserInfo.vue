<template>
    <div class="display-user-info">
        <div class="display-user-info-column" @click="handleUpdateUserInfo('gender')">
            <p class="display-user-info-column-label">性别</p>
            <p class="display-user-info-column-content">{{userInfo.gender == '1' ? '男': userInfo.gender == '2'? '女':'未知'}}</p>
            <img class="display-user-info-column-image-arraw" :src="require('../../assets/images/arrow_right.png')"/>
        </div>
        <div class="display-user-info-column" @click="handleUpdateUserInfo('grade')">
            <p class="display-user-info-column-label">年级</p>
            <p class="display-user-info-column-content">{{userInfo.grade|gradeFilter}}</p>
            <img class="display-user-info-column-image-arraw" :src="require('../../assets/images/arrow_right.png')"/>
        </div>
        <div class="display-user-info-column" @click="handleUpdateUserInfo('phone')">
            <p class="display-user-info-column-label">手机号码</p>
            <p class="display-user-info-column-content">{{ userInfo.mobileNo === null ? '没有手机号码' : userInfo.mobileNo }}</p>
            <img class="display-user-info-column-image-lock" :src="require('../../assets/images/my_userinfo_lock.png')"/>
        </div>
        <van-popup v-model="isShow" position="bottom" >
            <van-picker
                    show-toolbar
                    :columns="whichPicker ==='gender' ? genders : grades"
                    @confirm="onConfirm"
                    @cancel="onCancel"></van-picker>
        </van-popup>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { getGradeStr, getGradeNum } from './../../utils/utils'

const { mapState, mapActions } = createNamespacedHelpers('userInfoData')
export default {
  name: 'DisplayUserInfo',
  data: function() {
    return {
      whichPicker: '',
      isShow: false,
      genders: ['男', '女'],
      grades: [
        '未上学',
        '幼儿园',
        '一年级',
        '二年级',
        '三年级',
        '四年级',
        '五年级',
        '六年级',
        '初一',
        '初二',
        '初三',
        '初三以上'
      ]
    }
  },
  computed: {
    ...mapState(['userInfo', 'loading'])
  },
  methods: {
    ...mapActions([
      'getMyUserInfo',
      'updateUserInfo',
      'updateUserInfoGender',
      'updateUserInfoGrade'
    ]),
    handleUpdateUserInfo: function(type) {
      if (type === 'gender') {
        this.whichPicker = 'gender'
        this.isShow = true
      } else if (type === 'grade') {
        this.whichPicker = 'grade'
        this.isShow = true
      } else if (type === 'phone') {
        this.$toast.fail('电话号码无法编辑')
      }
    },
    onCancel: function() {
      this.isShow = false
    },
    onConfirm: function(value) {
      this.isShow = false
      if (this.genders.indexOf(value) != -1) {
        if (!(value === this.userInfo.gender)) {
            //值为1时是男性，值为2时是女性，值为0时是未知
          let gender = value === '男' ? '1' :  value === '女'?'2':'0'
          this.updateUserInfoGender({ gender })
        }
      } else if (this.grades.indexOf(value) != -1) {
        if (!(value === this.userInfo.grade)) {
          let grade = -1
          grade = getGradeNum(value)
          this.updateUserInfoGrade({ grade })
        }
      }
    }
  },
  filters: {
    gradeFilter: function(type) {
      return getGradeStr(type)
    }
  },

  created() {
    this.getMyUserInfo()
  }
}
</script>

<style scoped lang="less">
.display-user-info {
  font-size: 28px;
  padding: 0px 40px 0px 40px;
  &-column {
    display: flex;
    flex-direction: row;
    padding: 46px 0px 46px 0px;
    border-bottom: 0.1px solid #ddd;
    &-label {
      color: #3e3e53;
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

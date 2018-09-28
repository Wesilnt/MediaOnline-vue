<template>
    <section>
        <p class="userinfo-title">填写孩子的资料 </p>
        <div v-if='showIdentity' class="userinfo-identity">
            <p class="userinfo-identity-sub-title">你的身份</p>
            <div class="userinfo-identity-container">
                <van-radio-group v-model="identity">
                    <div class="userinfo-identity-container-item"
                         :class="{'userinfo-identity-container-item-selected':identity === '0'}"
                         @click="identityChoice('0')">
                        <div class="userinfo-identity-container-item-circle"
                             :class="{'userinfo-identity-container-item-selected-circle':identity === '0'}"/>
                        <p class="userinfo-identity-container-item-text"
                           :class="{'userinfo-identity-container-item-selected-text':identity === '0'}">我是家长</p>
                        <van-radio v-if="identity === '0'" name="0"/>
                    </div>
                    <div class="userinfo-identity-container-item"
                         :class="{'userinfo-identity-container-item-selected':identity === '1'}"
                         @click="identityChoice('1')">
                        <div class="userinfo-identity-container-item-circle"
                             :class="{'userinfo-identity-container-item-selected-circle':identity === '1'}"/>
                        <p class="userinfo-identity-container-item-text"
                           :class="{'userinfo-identity-container-item-selected-text':identity === '1'}">我是学生</p>
                        <van-radio v-if="identity === '1'" name="1"/>
                    </div>
                </van-radio-group>
            </div>
        </div>
        <div v-if='showNext' class="userinfo-identity">
            <p class="userinfo-identity-sub-title">{{identity === '0'? '您孩子的性别' : '你的性别'}}</p>
            <div class="userinfo-identity-container">
                <van-radio-group v-model="gender">
                    <div class="userinfo-identity-container-item"
                         :class="{'userinfo-identity-container-item-selected':gender === '0'}"
                         @click="genderChoice('0')">
                        <div class="userinfo-identity-container-item-circle"
                             :class="{'userinfo-identity-container-item-selected-circle':gender === '0'}"/>
                        <p class="userinfo-identity-container-item-text"
                           :class="{'userinfo-identity-container-item-selected-text':gender === '0'}">我是男生</p>
                        <van-radio v-if="gender === '0'" name="0"/>
                    </div>
                    <div class="userinfo-identity-container-item"
                         :class="{'userinfo-identity-container-item-selected-girl':gender === '1'}"
                         @click="genderChoice('1')">
                        <div class="userinfo-identity-container-item-circle"
                             :class="{'userinfo-identity-container-item-selected-girl-circle':gender === '1'}"/>
                        <p class="userinfo-identity-container-item-text"
                           :class="{'userinfo-identity-container-item-selected-text':gender === '1'}">我是女生</p>
                        <van-radio v-if="gender === '1'" name="1"/>
                    </div>
                </van-radio-group>
            </div>
        </div>
        <div v-if="showNext" class="userinfo-grade-container">
            <p class="userinfo-identity-sub-title">{{identity === '1'? '您孩子的年级' : '你的年级'}}</p>
            <van-picker :columns="columns" @change="onChange"/>
        </div>
        <div class="userinfo-submit-area">
            <button class="userinfo-submit-area-button" @click="handleNext">
                {{showNext === true? '确认' : '下一步'}}
            </button>
            <p v-if="showNext" class="userinfo-submit-area-agreement-label">
                <span class="userinfo-submit-area-agreement-text">点击按钮即表示同意</span>
                《秦汉胡同使用协议》
            </p>
        </div>
        <loading-dialog v-if="showLoading"></loading-dialog>
    </section>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { Toast } from 'vant'
import LoadingDialog from '../../components/LoadingDialog'
import { getGradeNum } from './MyUtil'

const { mapState, mapActions } = createNamespacedHelpers('userInfo')
export default {
  name: 'EditUserInfo',
  components: { 'loading-dialog': LoadingDialog },
  data: function() {
    return {
      identity: '',
      gender: '',
      grade: -1,
      showIdentity: true,
      showNext: false,
      showLoading:false,
      columns: [
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
  watch: {
    loading: function(loading) {
      let num = 1
      let that = this
      if (loading === true) {
        this.showLoading = true
        var timer = setInterval(function() {
          num--
          if (num === 0) {
            that.$router.back(-1)
            clearInterval(timer)
          }
        }, 1000)
      } else {
        this.showLoading = false
      }
    }
  },
  methods: {
    ...mapActions(['getMyUserInfo', 'updateUserInfo']),
    handleNext: function() {
      if (this.showNext === false) {
        if (this.identity === '') {
          Toast.fail('请先选择身份')
        } else {
          this.showNext = true
          this.showIdentity = false
        }
      } else {
        if (this.sex === '') {
          Toast.fail('请选择性别')
        } else if (this.grade === '') {
          Toast.fail('请选择年级')
        } else if (this.showNext === true) {
          this.updateUserInfo({
            role: this.identity,
            gender: this.gender,
            grade: this.grade
          })
        }
      }
    },
    identityChoice: function(type) {
      console.log(type)
      this.identity = type
    },
    genderChoice: function(type) {
      console.log(type)
      this.gender = type
    },
    onChange(picker, value, index) {
      console.log(value)
      this.grade = getGradeNum(value)
    }
  }
}
</script>
<style lang="less" scoped>
.userinfo {
  &-title {
    padding: 104px 0px 60px 60px;
    font-size: 54px;
    color: #ffa32f;
  }
  &-identity {
    font-size: 28px;

    &-sub-title {
      padding: 0px 0px 32px 60px;
      font-size: 28px;
      color: #a3a8b6;
    }
    &-container {
      display: flex;
      flex-direction: row;
      padding: 0px 45px 198px 45px;
      &-item {
        display: flex;
        flex-direction: row;
        position: relative;
        width: 300px;
        height: 200px;
        padding-bottom: 56px;
        border: 1px #000;
        margin: 0px 15px 0px 15px;
        border-radius: 20px;
        box-shadow: #f4f4f4 5px 5px 5px 5px; //边框阴影
        background-color: white;
        &-text {
          line-height: 200px;
          font-size: 28px;
          padding: 0px 0px 0px 30px;
          color: #d2d0d6;
        }
        &-circle {
          width: 120px;
          height: 120px;
          margin: 40px 0px 40px 20px;
          border-radius: 50%;
          box-shadow: #e5e5e5 3px 3px 3px 3px;
        }
      }
      &-item-selected {
        background-color: #86befb;
        &-text {
          color: white;
        }
        &-circle {
          background-color: #418ee0;
          box-shadow: #418ee0 0px 0px 0px 0px;
        }
      }
        &-item-selected-girl {
            background-color: #f7828f;
            &-text {
                color: white;
            }
            &-circle {
                background-color: #db4154;
                box-shadow: #db4154 0px 0px 0px 0px;
            }
        }
    }
  }
  &-grade-container {
    margin-top: -100px;
  }
  &-submit-area {
    margin: 72px 55px 0;
    &-button {
      width: 100%;
      height: 90px;
      margin: 24px auto 80px;
      font-size: 32px;
      display: block;
      text-align: center;
      border-radius: 50px;
      border: 1px solid #d4d3d7;
      color: #b5b5b5;
      outline: none;
      background: #ffa32f;
      color: white;
      border: none;
      box-shadow: 0 0 10px #ffaa3f;
      transition: background, color, border, box-shadow 0.4s linear;
    }

    &-agreement-label {
      color: #ffa32f;
      text-align: center; //文字居中
    }
    &-agreement-text {
      color: #acacb4;
      padding-bottom: 30px;
    }
  }
}

.van-radio-group {
  display: flex;
  flex-direction: row;
}

.van-radio {
  width: 40px;
  height: 40px;
  position: absolute;
  right: 0px;
  bottom: -25px;
}
.van-picker {
    height: 170px;
}
.van-picker__columns {
    overflow: hidden;
}
.van-picker-column {
    overflow: visible;
}
.van-picker-column__item {
    width: 100vw;
}
</style>

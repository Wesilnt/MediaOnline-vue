import Vue from 'vue'
import Vuex from 'vuex'
import myPuzzle_Praise from './module/myPuzzle_Praise'
import columnInfo from './module/columnInfo'
import homeData from './module/homeData'
import videoColumnDetail from './module/videoColumnDetail'
import videoCourseDetail from './module/videoCourseDetail'
import visionData from './module/visionData'
import audio from './module/audioData'
import readings from './module/readingsData'
import myData from './module/myData'
import myFeedback from './module/myFeedback'
import mySysMessage from './module/mySysMessage'
import myReply from './module/myReply'
import myLike from './module/myLike'
import myPlayRecord from './module/myPlayRecord'
import myPurchase from './module/myPurchase'
import userInfo from './module/userInfo'
import comment from './module/commentData'
import freezone from './module/freezoneData'
import audiotask from './module/audioTask'
import share from './module/shareData'
import praise from './module/praiseData'
import mobile from './module/mobileData'

import { getToken } from '../services/accessToken'
import { getCookie } from '../utils/userAuth';

Vue.use(Vuex)
export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    taken: ''
  },
  actions: {
    async getAccessToken() {
      const response = await getToken()
      console.log(response)
    },
      async checkToken({dispatch}){
          if (getCookie('COOKIE_TOKEN_KEY_CNONLINE') != null) {
              // dispatch('getAccessToken')
              // todo 缓存
              // const expireTime = getCookie('COOKIE_TOKEN_KEY_EXPIRE_TIME')
              // const timestamp = new Date().getTime()
              // if (expireTime < timestamp) {
              //     dispatch('getAccessToken')
              // }
          } else{
              dispatch('getAccessToken')
          }
      },
    async refreshAccessToken() {}
  },
  modules: {
    myPuzzle_Praise,
    homeData,
    columnInfo,
    videoColumnDetail,
    videoCourseDetail, // 内建 问题列表modul
    myData,
    myFeedback,
    mySysMessage,
    myReply,
    myLike,
    myPlayRecord,
    myPurchase,
    userInfo,
    visionData,
    readings,
    audio,
    comment,
    freezone,
    audiotask,
    share,
    praise,
    mobile
  }
})

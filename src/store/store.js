import Vue from 'vue'
import Vuex from 'vuex'
import counter from './module/counter'
// import mocker from './module/mock'
import myPuzzle_Praise from './module/myPuzzle_Praise'
import columnInfo from './module/columnInfo'
import homeData from './module/homeData'
import videoColumnDetail from './module/videoColumnDetail'
import videoCourseDetail from './module/videoCourseDetail'
import questionList from './module/questionList'
import visionData from './module/visionData'
import audio from './module/audioData'
import readings from './module/readingsData'
import myFeedback from './module/myFeedback'
import mySysMessage from './module/mySysMessage'
import myReply from './module/myReply'
import myLike from './module/myLike'
import myPlayRecord from './module/myPlayRecord'
import myPurchase from './module/myPurchase'
import comment from './module/commentData'
import freezone from './module/freezoneData'
import audiotask from './module/audioTask'

Vue.use(Vuex)
export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    counter,
    // mocker,
    myPuzzle_Praise,
    homeData,
    columnInfo,
    videoColumnDetail,
    videoCourseDetail,
    questionList,
    myFeedback,
    mySysMessage,
    myReply,
    myLike,
    myPlayRecord,
    myPurchase,
    visionData,
    readings,
    audio,
    comment,
    freezone,
    audiotask
  },
})

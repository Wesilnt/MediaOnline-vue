import {
  wechatSubscribed,
  getUserByToken,
  checkStatus,
  getCollectDetail,
  getCollectLike,
  getPoster,
  startCollectLike,
  joinCollectLike,
  getColumnDetail
} from '../../api/praiseApi' 
export default {
  namespaced: true,
  state: {
    userId: 0,
    isPraised:false,   //当前用户关于这个集赞是否已点赞
    rollerFlag: true,
    praiseDetail: {},
    seconds: 0, //倒计时总时长(秒)
    remainTime: null, //倒计时提示文案
    rollerInterval: null, //倒计时滚动定时器
    timerInterval: null, //倒计时定时器
    pageBgUrl: '',
    courseName: '',
    columnType: 'Readings',
    time:0
  },
  mutations: {
    bindPraiseDetail(state, res) {
      res.userList.map(item => state.isPraised = !state.isPraised && item.id == state.userId)
      state.praiseDetail = res
    },
    bindUserInfo(state, res) {
      state.userId = res.id
    },
    bindColumnTYpe(state, columnType) {
      state.columnType = columnType
    },
    //设置滚动提示定时器
    setRollerInterval(state) {
      state.rollerFlag = !state.rollerFlag
    },
    //设置时间提示定时器
    setTimerInterval( state, { timerInterval, rollerInterval, isEnded, remainTime } ) {
      if (isEnded) {
        clearInterval(state.timerInterval)
        clearInterval(state.rollerInterval)
        state.remainTime = '很遗憾,活动已结束...'
      } else {
        state.timerInterval = timerInterval
        state.rollerInterval = rollerInterval
        state.remainTime = remainTime
        if(Date.now()-state.time>6000){
          state.rollerFlag = !state.rollerFlag
          state.time= Date.now()
        }
      }
    },
    //绑定集赞状态
    bindPraiseStatus(state, res) {
      state.pageBgUrl = res.pageBgUrl
      state.courseName = res.courseName
    },
    //销毁定时器
    destroyInterval(state) {
      if (state.timerInterval) clearInterval(state.timerInterval)
      if (state.rollerInterval) clearInterval(state.rollerInterval)
    }
  },
  actions: {
    //验证是否完成了公众号授权
    async checkoutAuthorrization({dispatch},params){ 
      const result = await wechatSubscribed()  
      // if(result && result==1){
          dispatch('checkStatus',params)
          return dispatch('getCollectDetail',params)
      // }else{          //跳转去关注公众号
      //     window.location.href = WECHAT_SUBSCRIPTION_URL
      // }
    },
    //积攒状态检查
    async checkStatus({ commit ,dispatch}, params) {
      const res = await checkStatus(params) 
      if (res) commit('bindPraiseStatus', res)
      return dispatch('getCollectDetail',params)
    },
    //集赞详情
    async getCollectDetail({ state, commit,dispatch }, params) {
      const res = await getCollectDetail(params)
      await dispatch('getUserInfo',null,{root:true})
      .then(user=>{
                    commit('bindUserInfo', user)
                    dispatch('setShareInfo',{user, res})
      })
      console.log(res)
      commit('bindPraiseDetail', res) 
      if (res.status != 1202) return res
      await commit('destroyInterval')
      let totalTime = res.duration * 3600 +  (res.createTime - res.sysTime) / 1000  
      let timerInterval = setInterval(() => {
        var hours = parseInt(totalTime / (60 * 60))
        var minutes = parseInt((totalTime % (60 * 60)) / 60)
        var seconds = totalTime % 60
        hours = parseInt(hours)
        minutes = parseInt(minutes)
        seconds = parseInt(seconds)
        hours = hours < 10 ? '0' + hours : hours
        minutes = minutes < 10 ? '0' + minutes : minutes
        seconds = seconds < 10 ? '0' + seconds : seconds
        let remainTime = '距离结束还有:' + hours + '时' + minutes + '分' + seconds + '秒'
        totalTime -= 1
        commit('setTimerInterval', { timerInterval, isEnded: totalTime <= 0,remainTime})
        }, 1000)
      //
      return res
    },
    //领取集赞
    async getCollectLike({ commit }, params) {
      const res = await getCollectLike(params)
      console.log(res)
    },
    //集赞海报页
    async getPoster({ commit }, params) {
      const res = await getPoster(params)
      console.log(res)
    },
    //发起集赞
    async startCollectLike({ commit }, params) {
      const res = await startCollectLike(params)
      console.log(res)
    },
    //参与集赞
    async joinCollectLike({ dispatch }, params) {
      const res = await joinCollectLike(params) 
      dispatch('getCollectDetail',params)
    },
    //获取用户信息是否订阅免费专区
    async getUserByToken({ commit }, params) {
      const res = await getUserByToken(params) 
      console.log(res)
      if (!res) return
      commit('bindUserInfo', res) 
    },
    //获取专栏详情
    async getColumnDetail({commit,rootState }, params) { 
      if(rootState.columnDetail.id) return rootState.columnDetail
      const result = await getColumnDetail(params)  
      commit('bindCurrentColumn', {columnType: params.columnType , columnDetail:result},{root:true})
      console.log('user',"详情=================================================================",result)
      return result
    },
    //设置分享信息
    async setShareInfo({state,dispatch},{user, res}){
     
      dispatch('getColumnDetail',{courseId:res.course.id})
      .then(columnDetail=>{ 
        let currentUser  =  user.id == res.starterUid
        let title = `我是${user.nickName}, ${currentUser?'我想免费':'正在帮朋友'}领取《${columnDetail.name}》,求助攻~` 
        //拼装分享内容
        let shareData = {
          link:  window.location.href.split('#')[0]+`/#/praise/active/${columnDetail.id}/${res.id}?columnType=${state.columnType}`,
          title,
          desc: '你一定会爱上国学课...',
          imgUrl:`${columnDetail.sharePostUrl}?imageView2/1/w/100/h/100/format/jpg`,
          successCB: () => console.log('分享回调成功') ,
          cancelCB: () =>  console.log('分享回调失败')
        }
        dispatch('setWxShareFriend',shareData,{root:true})
        dispatch('setWxShareZone',shareData,{root:true}) 
      }) 
    }
  },
  getters: {
    praiseData: state => {
      let btnState = 0 //按钮状态
      let isCurrentUser = false //当前用户是否是发起集赞者
      let praised = false //当前用户是否点赞
      let alreadyCount = 0 // 
      let praiseDesc = '帮我点赞免费领取，求助攻' //集赞提示信息
      let userList = state.praiseDetail.userList //点赞用户列表
      if (!userList)
        return {praiseUsers: [],praised,btnState,praiseDesc,isCurrentUser,alreadyCount}
      let totalNums = new Array(state.praiseDetail.personCount).fill(
        require('../../assets/images/praise_header_bg.png')
      )
      userList.map((item, index) => {
        totalNums[index] = item.avatarUrl
        praised = !praised && item.id == state.userId
      })
      isCurrentUser = state.userId == state.praiseDetail.starterUid 
      alreadyCount = state.praiseDetail.alreadyCount
      let code = state.praiseDetail.code ? parseInt(state.praiseDetail.code) : 0
      let status = state.praiseDetail.status ? parseInt(state.praiseDetail.status): 0
      // isCurrentUser = false
      //1. 集赞中：发起人         btnState:0
      if (status == 1202 && isCurrentUser) {
        btnState = 0
        praiseDesc = '我想免费领取课程,来帮我点赞吧'
      }
      //2. 集赞中：好友 未点赞   btnState:1
      if (status == 1202 && !isCurrentUser && !praised) {
        btnState = 1
        praiseDesc = '帮我点赞免费领取，求助攻'
      }
      //3. 集赞中：好友 已点赞   btnState:2
      if (status == 1202 && !isCurrentUser && praised) {
        btnState = 2
        praiseDesc = '感谢你帮我点赞'
      }
      //4. 集赞完成：发起人 未领取  btnState:3
      if (status == 1203 && isCurrentUser) {
        btnState = 3
        praiseDesc = '集赞完成，感谢大家帮我点赞'
      }
      //5. 集赞完成：发起人 已领取  btnState:4
      if (status == 1205 && isCurrentUser) {
        btnState = 4
        praiseDesc = '集赞完成，感谢大家帮我点赞'
      }
      //6. 集赞失败：发起人     btnState:4
      if (status == 1204 && isCurrentUser) {
        btnState = 7
        praiseDesc = '呜呜呜...很遗憾，活动结束'
      }
      //7. 集赞完成未领取/已领取：好友 已点赞  btnState:5
      if ((status == 1203 || status == 1205) && !isCurrentUser && praised) {
        btnState = 5
        praiseDesc = '集赞完成，感谢您帮我点赞'
      }
      //8. 集赞完成未领取/已领取：好友 未点赞  btnState:5
      if ((status == 1203 || status == 1205) && !isCurrentUser && !praised) {
        btnState = 5
        praiseDesc = '集赞完成，感谢大家帮我点赞'
      }
      //9. 集赞失败：好友 已点赞  btnState:5
      if (status == 1204 && !isCurrentUser && praised) {
        btnState = 5
        praiseDesc = '活动结束，感谢你帮我点赞'
      }
      //10. 集赞失败：好友 未点赞  btnState:5
      if (status == 1204 && !isCurrentUser && !praised) {
        btnState = 5
        praiseDesc = '呜呜呜...很遗憾，活动结束'
      }
      //10. 集赞失败：好友 未点赞  btnState:5
      if (status == 1204 && code == 1005 && !isCurrentUser && !praised) {
        btnState = 5
        praiseDesc = '呜呜呜...很遗憾，活动结束'
      }
      return {
        praiseUsers: totalNums,
        praised,
        btnState,
        praiseDesc,
        isCurrentUser,
        alreadyCount
      }
    }
  }
}

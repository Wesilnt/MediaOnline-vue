import { getGroupBuyDetail,startGroupBuy,joinGroupBuy,startCollectLike,getCollectLike,unlockCourse,wechatSubscribed } from '../../api/groupBuyApi.js'
import {getLessonListByCourse} from '../../api/columnsApi.js'
import {getMyUserInfo} from '../../api/myApi'
import {Toast} from 'vant'
import { WECHAT_SUBSCRIPTION_URL, courseType,columnType } from '../../utils/config'

const groupManagerData = {
    namespaced: true,
    state:{
        //页面展示相关状态
        userListTop:[],     //拼团成员列表第一排
        userListBot:[],     //拼团成员列表第二排
        leavePerson:0,   //拼团剩余名额
        countDownTime:0, //倒计时剩余时长      
        isSixGroup:false,  //是否是六人团
        headerType:0,       // 100倒计时  101拼团成功  102拼团失败  103拼团已满 
        isShowMobileDialog:false, //是否弹出手机号收集框
        isLoading:false,   //发起拼团  原价购买  发起集赞 防止重复操作
        isShowGroupBuy:false ,  //是否显示拼团UI
        //专栏相关状态
        profilePic:'',//专栏头图
        courseId:0,//专栏ID
        freeLesson:{},//试听对象  type字段用来区分点击试听按钮跳往哪里  freeLessonList是当前专栏的免费试听课程数组
        lessonsArray:[], //专栏下的所有课程
        userAccessStatus:0,
        //拼团相关状态
        achieveOriginBuy:false, //是否完成原价购买
        orderStatus:0,//当前订单状态
        isOwner:false,    //是不是开团人 
        isGroupCurrent:false, //当前用户是否在拼团列表
        isFullStaff:false,//拼团是否已满
        achievePayment:false,//当前用户是否完成支付
        isAllPay:false,//拼团用户列表中的用户是否都完成支付
        currUserStatus:0,//当前用户的支付状态
        groupBuyId:0,//拼团ID       
        toolsObject:null,//工具条对象  
        //集赞相关状态
        startPraiseFlag:false,//发起集赞标记位
        collectLikeId:0  //集赞ID    
    },
    getters:{
        //专栏头图
        buyCount(state,getters, rootState) { 
          switch(state.serviceType){
            case "1003":
                return rootState.visionData.buyCount 
            case "1005":
                return  rootState.videoColumnDetailData.buyCount 
            case "1007":
                return rootState.readingsData.buyCount  
          } 
        },
        //专栏名称
        // courseName(state,getters,{videoColumnDetailData},rootGetters) {
        //     return rootGetters['videoColumnDetailData/courseName']
        // },
        courseName(state,getters,rootState) {
            let nameStr = ""
            switch(state.serviceType){
                case "1003":
                    nameStr = rootState.visionData.courseName
                break
                case "1005":
                    nameStr = rootState.videoColumnDetailData.courseName
                break
                case "1007":
                    nameStr = rootState.readingsData.courseName
                break
            }
            return nameStr
        },
        //是否来自分享
        isFromShare:(state,getters,rootState) => {
            if(rootState.columnType=='1003') return rootState.visionData.isFromShare
            if(rootState.columnType=='1005') return rootState.videoColumnDetailData.isFromShare
            if(rootState.columnType=='1007') return rootState.readingsData.isFromShare
        }
    },
    mutations:{
        bindColumnObject(state,{toolsObject,groupBuyId,collectLikeId,isShowGroupBuy,userAccessStatus,profilePic,courseId,freeLesson}) {
            state.toolsObject = toolsObject ||  state.toolsObject;
            state.groupBuyId = groupBuyId || state.groupBuyId;
            state.isShowGroupBuy = isShowGroupBuy || state.isShowGroupBuy;
            state.userAccessStatus = userAccessStatus || state.userAccessStatus;
            state.collectLikeId = collectLikeId || state.collectLikeId;
            state.profilePic = profilePic || state.profilePic;
            state.courseId = courseId || state.courseId;
            state.freeLesson = freeLesson || state.freeLesson;
        },
        //集赞
        bindCollectLikeId(state,collectLikeId) {state.collectLikeId = collectLikeId} ,
        toggolePraiseFlag(state,flag) {state.startPraiseFlag = flag} ,
        //拼团
        bindGroupHeaderData(state,payload) {        
            state.userListTop = payload.userListTop
            state.userListBot = payload.userListBot
            state.leavePerson = payload.leavePerson
            state.countDownTime = payload.countDownTime
            state.headerType = payload.headerType
            state.isSixGroup = payload.isSixGroup
        },
        bindOrderObject(state,{toolsObject,groupBuyId,isShowGroupBuy,userAccessStatus}) {
            state.toolsObject = toolsObject
            state.groupBuyId = groupBuyId
            state.isShowGroupBuy = isShowGroupBuy
            state.userAccessStatus = userAccessStatus
        },
        //控制团购订单状态
        checkOrderStatus(state,{orderStatus,isOwner,isGroupCurrent,isFullStaff,achievePayment,isAllPay,currUserStatus}) {
            state.orderStatus = orderStatus
            state.isOwner = isOwner
            state.isGroupCurrent = isGroupCurrent
            state.isFullStaff = isFullStaff
            state.achievePayment = achievePayment
            state.isAllPay = isAllPay
            state.currUserStatus = currUserStatus
        },
        //单购
        bindAchieveOriginBuy(state,achieveOriginBuy) {state.achieveOriginBuy = achieveOriginBuy},
        //是否弹出手机号收集框
        bindIsShowMobileDialog(state,isShowMobileDialog) {state.isShowMobileDialog = isShowMobileDialog},
        //专栏所有单集
        bindLessonsArray(state,lessons) {state.lessonsArray = lessons},
        deleteCountTime(state) {state.countDownTime = 0},
        updateUserAccessStatus(state) {state.userAccessStatus = 0},
        bindColunmnInfo(state,{profilePic,courseId,freeLesson}) {
            state.profilePic = profilePic
            state.courseId = courseId
            state.freeLesson = freeLesson
        },       
        setLoading(state ,isLoading) {state.isLoading = isLoading} 
    },
    actions:{
        //自定义分享
        setupShareOption({state,getters,dispatch,rootState},{courseName,courseId,groupBuyId,collectLikeId,leavePerson,orderStatus}){
            dispatch('getUserInfo',null,{root:true}).then(user =>{
                let title = null
                let link = ''
                if(getters.isFromShare){
                    switch (orderStatus) {
                        case 1202: //拼团中
                            title = `我正在参加《${courseName}》拼团活动,仅差${leavePerson || 0}人,快来和我一起拼团吧!`
                            break
                        default:
                            title = courseName
                            break
                        }                          
                        if(1202==orderStatus){
                        // link = `${rootState.url}/#/${courseType[rootState.columnType]}${courseId}?groupBuyId=${groupBuyId}`
                        link =  `${rootState.url}/#/detail/${rootState.columnType}/${courseId}?groupBuyId=${groupBuyId}`
                        }else {
                        // link = `${rootState.url}/#/${courseType[rootState.columnType]}${courseId}`
                        link =  `${rootState.url}/#/detail/${rootState.columnType}/${courseId}`
                        }
                }else{
                    switch (state.userAccessStatus) {
                        case 1005: //拼团中
                            title = `我正在参加《${courseName}》拼团活动,仅差${leavePerson || 0}人,快来和我一起拼团吧!`
                            break
                        case 1009: //集赞中
                            title = `我是${user.nickName}, ${true ? '我想免费' : '正在帮朋友'}领取《${courseName}》,求助攻~`
                            break
                        default:
                            title = courseName 
                            break
                        } 
                        if(1005==state.userAccessStatus){
                          // link = `${rootState.url}/#/${courseType[rootState.columnType]}${courseId}?groupBuyId=${groupBuyId}`
                          link = `${rootState.url}/#/detail/${rootState.columnType}/${courseId}?groupBuyId=${groupBuyId}`
                        }else if(1009==state.userAccessStatus) {
                          link =  `${rootState.url}/#/praise/active/${courseId}/${collectLikeId}?columnType=${rootState.columnType}` 
                        }else {
                          // link = `${rootState.url}/#/${courseType[rootState.columnType]}${courseId}`
                          link = `${rootState.url}/#/detail/${rootState.columnType}/${courseId}`
                        }  
                }
                let shareData = {
                  link,
                  title,
                  desc: '你一定会爱上国学课...',
                  imgUrl:`${rootState.columnDetail.sharePostUrl}?imageView2/1/w/100/h/100/format/jpg`,
                  successCB: () => console.log('分享回调成功'),
                  cancelCB: () => console.log('分享回调失败')
                }
                console.log('专栏详情分享参数:', shareData)
                dispatch('setWxShareFriend',shareData,{root:true})
                dispatch('setWxShareZone',shareData,{root:true})
            })         
        },

        initColumnInfo({commit,dispatch},{courseId,profilePic,freeLesson}){
            commit('bindColunmnInfo',{courseId,profilePic,freeLesson})
            //获取专栏下所有课程
            let params = {
                'courseId' :courseId,
                'currentPage':1,
                'pageSize':10
              }
            dispatch('getAllLessons',params)
        },

        //初始化工具条
        initToolsBar({commit,dispatch},toolsData){
            //设置分享
            dispatch('setupShareOption',{'courseName':toolsData.courseName,
                'courseId':toolsData.courseId,
                'groupBuyId':toolsData.groupBuyId,
                'collectLikeId':toolsData.collectLikeId})
            //集赞状态
            const praiseData = {
                "collectLikeDuration" : toolsData.collectLikeDuration || 0,
                "collectLikeId" : toolsData.collectLikeId || "",
                "collectLikePersonCount" : toolsData.collectLikePersonCount || 0,
                "collectLikeTemplateId" : toolsData.collectLikeTemplateId || ""
            }
            //拼团状态
            const groupData = {
                "groupBuyDuration" : toolsData.groupBuyDuration || 0,
                "groupBuyPersonCount" : toolsData.groupBuyPersonCount || 0,
                "groupBuyPrice" : toolsData.groupBuyPrice || 0,
                "groupBuyId": toolsData.groupBuyId || "",
                "groupBuyTemplateId" : toolsData.groupBuyTemplateId || ""
            }
            const userAccessStatus = toolsData.userAccessStatus
            let isShowGroupBuy;
            const personStr = groupData.groupBuyPersonCount > 3 ? "六人拼团" : "三人拼团"
            let toolsObject = {
                "originPrice":toolsData.price || 0,
                "groupPrice":groupData.groupBuyPrice || 0,
                "collageText":personStr,
                "collectText":"集赞换",
                "collect":true,
                "collage":true,
                "isShow":true
            }
            switch(userAccessStatus) {
                case -3:
                    //拼团失败
                    isShowGroupBuy = false
                    if(praiseData.collectLikeTemplateId && groupData.groupBuyTemplateId){
                        Object.assign(toolsObject)
                    }else if(praiseData.collectLikeTemplateId == "" && groupData.groupBuyTemplateId != ""){
                        Object.assign(toolsObject,{ "collect":false})
                    }else if(praiseData.collectLikeTemplateId && groupData.groupBuyTemplateId == ""){
                        Object.assign(toolsObject,{ "collage":false})
                    }else if(praiseData.collectLikeTemplateId == "" && groupData.groupBuyTemplateId ==""){
                        Object.assign(toolsObject,{ "collect":false,"collage":false,})
                    }
                break
                case 0:
                    isShowGroupBuy = false
                    if(praiseData.collectLikeTemplateId && groupData.groupBuyTemplateId){                        
                        Object.assign(toolsObject)
                    }else if(praiseData.collectLikeTemplateId == "" && groupData.groupBuyTemplateId != ""){
                        Object.assign(toolsObject,{ "collect":false})
                    }else if(praiseData.collectLikeTemplateId && groupData.groupBuyTemplateId == ""){
                        Object.assign(toolsObject,{ "collage":false})
                    }else if(praiseData.collectLikeTemplateId == "" && groupData.groupBuyTemplateId ==""){
                        Object.assign(toolsObject,{ "collect":false,"collage":false,})
                    }
                break
                case 1001:
                    console.log('单购成功')
                    isShowGroupBuy = false
                    Object.assign(toolsObject,{ "isShow":false })
                break
                case 1003:
                    console.log('拼团成功')
                    isShowGroupBuy = true
                    Object.assign(toolsObject,{ "isShow":false })
                break
                case 1005:
                    console.log('拼团中')
                    isShowGroupBuy = true
                    dispatch("getGroupBuyDetail",groupData.groupBuyId)
                break
                case 1007:
                    console.log('集赞成功未领取')
                    isShowGroupBuy = false
                    Object.assign(toolsObject,{ 'originPrice':'','collectText':'集赞成功未领取',"collage":false })
                break
                case 1008:
                    console.log('集赞成功已领取')
                    isShowGroupBuy = false
                    Object.assign(toolsObject,{ "isShow":false })               
                break
                case 1009:                 
                    isShowGroupBuy = false
                    Object.assign(toolsObject,{ 'originPrice':'', 'collectText':'集赞中', "collage":false })         
                break
            }
            const groupBuyId = groupData.groupBuyId
            const collectLikeId = praiseData.collectLikeId
            commit('bindOrderObject',{toolsObject,groupBuyId,isShowGroupBuy,userAccessStatus})
            commit('bindCollectLikeId',collectLikeId)

        },
        //获取拼团详情
        async getGroupBuyDetail({commit,dispatch},groupBuyId) {
            const result = await getGroupBuyDetail({'groupBuyId':groupBuyId})
            if(result == null) return
            //1.获取当前订单状态
            let orderStatus = result.status;
            let userAccessStatus = result.userAccessStatus
            //2.判断是开团人还是参团人
            let currentUserId = result.userId;//拿到当前用户ID
            let isOwner = currentUserId == result.starterUid;           
            //3.计算当前拼团是否已满
            //计算剩余拼团名额
            const personNum = result.personCount - result.alreadyCount
            let isFullStaff = personNum == 0 || result.personCount == result.userList.length
            //4.当前用户是否完成支付
            let achievePayment = result.userAccessStatus > 0
            //5.拼团中其他成员是否完成支付
            //6.当前用户是否在拼团列表中
            //7.获取当前用户的支付状态
            let isAllPay = 1  //是否都完成支付
            let isGroupCurrent = 0 //是否在当前列表中
            let currUserStatus = 0 //当前用户的支付状态
            result.userList.forEach(currentValue => {
                if (currentValue.status == 2601 && isAllPay) { isAllPay = 0 }         
                if (currentValue.id == currentUserId) { isGroupCurrent = 1, currUserStatus = currentValue.status}
            });
            //8.计算倒计时
            const countTime = (result.createTime + result.duration * 60 * 60 * 1000 - result.sysTime)/1000;
            //设置分享
            dispatch('setupShareOption',{
                'courseName':result.course.name,
                'courseId':result.course.id,
                'groupBuyId':result.id,
                'leavePerson':personNum,
                'orderStatus':orderStatus
            })
            console.log('orderStatus = '+orderStatus)
            console.log('currentUserId = '+currentUserId)
            console.log('isOwner = '+isOwner)
            console.log('personNum = '+personNum)
            console.log('isFullStaff = '+isFullStaff)
            console.log('achievePayment = '+achievePayment)
            console.log('isAllPay = '+isAllPay)
            console.log('isGroupCurrent = '+isGroupCurrent)
            console.log('currUserStatus = '+currUserStatus)
            console.log('countTime = '+countTime)
            console.log("上面都是状态指标")

            //保存当前订单状态
            commit('checkOrderStatus',{orderStatus,isOwner,isFullStaff,achievePayment,isAllPay,isGroupCurrent,currUserStatus})

            let toolsObject = {
                "originPrice":'',
                "groupPrice":'',
                "collageText":"立即邀请好友拼团",
                "collectText":"",
                "collect":false,
                "collage":true,
                "isShow":true
            }
            let headerType = 0
            let isShowGroupBuy = true
            switch(orderStatus){
                case 1204:
                    //拼团失败
                    //拼团成功&&在拼团列表中 显示重新开团
                    //拼团成功&&不在拼团列表中 显示我要开团
                    if(isGroupCurrent){
                        headerType = 102
                        Object.assign(toolsObject,{'collageText':"重新开团"})
                    }else{
                        headerType = 102
                        Object.assign(toolsObject,{'collageText':"我要开团"})
                    }
                break
                case 1203:
                    //拼团成功
                    //拼团成功&&在拼团列表中 显示我要学习
                    //拼团成功&&不在拼团列表中 显示我要开团
                    if(isGroupCurrent){
                        headerType = 101
                        Object.assign(toolsObject,{'collageText':"我要学习"})
                    }else {
                        headerType = 101
                        Object.assign(toolsObject,{'collageText':"我要开团"})
                    }

                break
                case 1201:
                case 1202:
                //拼团中&&开团人  显示  邀请好友拼团  
                    if(isOwner){
                        headerType = 100
                        Object.assign(toolsObject)
                    }
                //拼团中&& 参团人 && 如果拼团已满 && 当前用户已完成购买 && 存在其他人未完成支付  "立即邀请好友拼团"
                    if(!isOwner&&isFullStaff&&achievePayment&&!isAllPay){
                        headerType = 103
                        Object.assign(toolsObject)
                    }
                //拼团中&&参团人&&当前拼团未满&&当前用户完成支付   按钮显示:"邀请好友拼团"
                if (!isOwner && !isFullStaff && achievePayment){
                        headerType = 100
                        Object.assign(toolsObject)
                }
                //拼团中&&参团人&&当前拼团未满&&当前用户未调起支付   按钮显示:"参与拼团"
                if(!isOwner && !isFullStaff && !achievePayment && currUserStatus == 0){
                        headerType = 100
                        Object.assign(toolsObject,{'collageText':"参与拼团"})
                }
                //拼团中&&参团人&&当前拼团未满&&当前用户调起支付未支付完成   按钮显示:"继续支付"
                if(!isOwner && !isFullStaff && !achievePayment && currUserStatus == 2601){
                        headerType = 100
                        Object.assign(toolsObject,{'collageText':"继续支付"})
                }
                //拼团中&&参团人&&当前拼团已满&&当前用户未完成支付&&当前用户不在拼团用户列表中  按钮显示"我要开团"
                if(!isOwner && isFullStaff && !achievePayment && !isGroupCurrent){
                        headerType = 103
                        Object.assign(toolsObject,{'collageText':"我要开团"})
                }
                //拼团中&&参团人&&当前拼团已满&&当前用户未完成支付&&当前用户在拼团用户列表中  按钮显示"继续支付"
                if(!isOwner && isFullStaff && !achievePayment && isGroupCurrent){
                        headerType = 103
                        Object.assign(toolsObject,{'collageText':"继续支付"})                   
                }
                break
            }
           
            //更新工具条状态
            commit('bindOrderObject',{toolsObject,groupBuyId,isShowGroupBuy,userAccessStatus})

            //9.整理拼团用户数组
            let topList = []
            let botList = []            
            let userList = result.userList
            let isSixGroup = false
            if(result.personCount > 3) {
                isSixGroup = true
                let tempList = []
                for(let i = 0; i < 6; i++) {
                    if(userList[i] == null) {
                        tempList.push({})
                    } else{
                        if(userList[i].isStarter == 1) {
                            tempList.unshift(userList[i])
                        }else{
                            tempList.push(userList[i])
                        }
                    }
                }
                   topList=tempList.slice(0,2)
                   botList=tempList.slice(2,6)
            }else{
                isSixGroup = false
                for(let i = 0; i < 3; i++) {
                   if(userList[i] == null) {
                    topList.push({})
                   }else{
                       if(userList[i].isStarter == 1) {
                           topList.unshift(userList[i])
                       }else{
                        topList.push(userList[i])
                       }
                   } 
                }
            }

            commit('bindGroupHeaderData',{
                "leavePerson" : personNum,
                "countDownTime" : countTime,
                "userListTop" : topList,
                "userListBot" : botList || [],
                "headerType" :headerType,
                'isSixGroup':isSixGroup
            }) 
        },

        //验证是否完成了公众号授权
        async checkoutAuthorrization({state,commit,dispatch},payload){
            if(state.isLoading) {
              Toast("正在调起支付...")
              return
            }
            commit('setLoading', true)   //锁住  拼团  集赞中...
            const result = await wechatSubscribed()
            console.log('是否关注公众号')
            console.log(result)
            if(result && result==1){
                dispatch('checkoutShowTeleDialog',payload)
            }else{
                commit('setLoading', false)
                //跳转去关注公众号
                window.location.href = WECHAT_SUBSCRIPTION_URL
            }
        },

        //验证是否弹出手机号输入框
        async checkoutShowTeleDialog({dispatch,commit},payload){
            let telephone = window.localStorage.getItem('telephone')
            console.log('本地存储的手机号 = ',telephone)
            if(!telephone){
                const result = await getMyUserInfo()
                if(result==null) {
                  commit('setLoading', false)
                  return
                }
                let phoneNum = result.mobileNo
                if(phoneNum){
                    window.localStorage.setItem('telephone',phoneNum) 
                    if(payload.payType == 3){
                        //发起集赞
                        let params = {
                            courseId: payload.courseId
                        }
                        dispatch('startCollectLike',params)
                    }else{
                        dispatch('beginPayment',payload)
                    }                   
                 
                }else{
                    commit('setLoading', false)
                    console.log('弹出手机号收集框')
                    commit('bindIsShowMobileDialog',true)
                }
            }else {
                if(payload.payType == 3){
                    //发起集赞
                    let params = { courseId: payload.courseId }
                    dispatch('startCollectLike',params)
                }else{
                    dispatch('beginPayment',payload)
                }
                
            }
        },
        
        //payType 0:原价购买  1:拼团购买  2:参与购买
        beginPayment({dispatch},payload){
            let params = null
            console.log('当前用户支付类型 payload = ',payload)
            switch(payload.payType){
                case 0:
                    params = {
                        "courseId" : payload.courseId
                    }
                    dispatch('unlockCourse',params)
                break
                case 1:
                    params = {
                        "courseId" : payload.courseId
                    }
                    dispatch('startGroupBuy',params)
                break
                case 2:
                    params = {
                        "groupBuyId" : payload.groupBuyId
                    }
                    dispatch('joinGroupBuy',params)
                break
            }
        },

        //原价购买
        async unlockCourse({commit,dispatch},payload) {
            const result = await unlockCourse(payload)
            console.log('原价购买成功')
            console.log(result)
            commit('setLoading', false)
            if(result == null) return
            dispatch("getPayment",{result,payType:0})
        },
        //发起拼团
        async startGroupBuy({commit,dispatch},payload) {
            const result = await startGroupBuy(payload)
            console.log('发起拼团成功')
            console.log(result)
            commit('setLoading', false)
            if(result == null) return
            dispatch("getPayment",{result,payType:1})
        },
        //参与拼团
        async joinGroupBuy({dispatch,commit},payload) {
            const result = await joinGroupBuy(payload)
            console.log('参与拼团成功')
            console.log(result)
            commit('setLoading', false)
            if(result == null) return
            dispatch('getPayment',{result,payType:2})
        },
        //发起集赞
        async startCollectLike({state,dispatch,commit},payload) {
            const result = await startCollectLike(payload) 
            commit('setLoading', false)
            if (result == null) return
            console.log('发起集赞成功')
            commit("toggolePraiseFlag",true)
            dispatch('updateFatherData')            
        },
        //领取集赞
        async getCollectLike({dispatch,commit},payload) {
            const result = await getCollectLike(payload)
            console.log('领取集赞成功')
            console.log(result)
            dispatch('updateFatherData')
        },
        //调起微信支付
        async getPayment({commit,dispatch},{result,payType}){
            console.log('result ==',result)
            dispatch('wxPayment',{
                timestamp: result.timestamp,
                nonceStr: result.nonceStr, // 支付签名随机串，不长于 32 位
                packageStr: result.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                paySign: result.paySign, // 支付签名
                successCB: function (res) {
                    // 支付成功后的回调函数
                    console.log("支付成功"); 
                    console.log(payType)
                    dispatch('updateFatherData')
                    switch(payType){
                        case 0:
                            console.log('原价购买支付成功~~~')
                            commit('bindAchieveOriginBuy',true)
                        break
                        case 1:
                            console.log('发起拼团支付成功~~~')
                            //调起拼团详情
                            dispatch('getGroupBuyDetail',result.groupBuyId)
                        break
                        case 2:
                            console.log('参与拼团支付成功~~~')
                            //调起拼团详情
                            dispatch('getGroupBuyDetail',result.groupBuyId)
                        break
                    }
                   
                },
                failCB : function (errmsg) {
                    console.log(errmsg)
                    // Toast(errmsg)
                }
            },{root:true})      
        },
        
        //从新获取专栏详情接口,刷新父组件显示
        async updateFatherData({dispatch,state,getters,rootState}){
            switch(rootState.columnType){
                case "1003":
                    dispatch('visionData/getVisionDetail',{"courseId" : state.courseId},{root:true})
                break
                case "1005":
                    dispatch('videoColumnDetailData/getVideoColumnDetail',{"courseId" : state.courseId},{root:true})
                break
                case "1007":
                    dispatch('readingsData/getBookDetail',{"courseId" : state.courseId},{root:true})
                break
            }
        },

        //获取专栏下所有课程
        async getAllLessons({commit},params){
            const reponse = await getLessonListByCourse(params)
            if(!reponse) return
            const lessons = reponse.result
            commit('bindLessonsArray',lessons)
        }
    }
}

export default groupManagerData
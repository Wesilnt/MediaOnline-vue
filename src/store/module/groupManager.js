
import { wxConfig,getGroupBuyDetail,startGroupBuy,joinGroupBuy,startCollectLike,getCollectLike,unlockCourse,wechatSubscribed } from '../../services/groupBuyAPi.js'
import {getMyUserInfo} from '../../services/my'

const groupManager = {
    namespaced: true,
    state:{
        userListTop:[],     //拼团成员列表第一排
        userListBot:[],     //拼团成员列表第二排
        leavePerson:0,   //拼团剩余名额
        countDownTime:0, //倒计时剩余时长
        collectLikeId:0,  //集赞ID
        isSixGroup:false,  //是否是六人团
        headerType:0,       // 100倒计时  101拼团成功  102拼团失败  103拼团已满  
        isOwner:true,    //是不是开团人 
        achieveOriginBuy:false, //是否完成原价购买
        isShowMobileDialog:false, //是否弹出手机号收集框

        profilePic:'',//专栏头图
        courseId:0,//专栏ID
        freeLesson:{},//试听对象  type字段用来区分点击试听按钮跳往哪里  freeLessonList是当前专栏的免费试听课程数组

        userAccessStatus:0,
        groupBuyId:0,//拼团ID
        //工具条对象
        toolsObject:null,
        //是否显示拼团UI
        isShowGroupBuy:false  
    },
    getters:{
        // //专栏头图
        // profilePic(state,getters,{ videoColumnDetail }) {
        //     return videoColumnDetail.profilePic
        // },
        // //专栏ID
        // courseId(state,getters,{ videoColumnDetail }) {
        //     return videoColumnDetail.courseId
        // },
        // freeLessonList(state,getters,{ videoColumnDetail }){
        //     return videoColumnDetail.freeLessonList
        // }
    },
    mutations:{
        bindCollectLikeId(state,collectLikeId) {
            state.collectLikeId = collectLikeId
        },
        bindGroupHeaderData(state,payload){        
            state.userListTop = payload.userListTop
            state.userListBot = payload.userListBot
            state.leavePerson = payload.leavePerson
            state.countDownTime = payload.countDownTime
            state.headerType = payload.headerType
            state.isOwner = payload.isOwner
            state.isSixGroup = payload.isSixGroup
        },
        bindAchieveOriginBuy(state,achieveOriginBuy){
            state.achieveOriginBuy = achieveOriginBuy
        },
        bindIsShowMobileDialog(state,isShowMobileDialog){
            state.isShowMobileDialog = isShowMobileDialog
        },

        bindOrderObject(state,{toolsObject,groupBuyId,isShowGroupBuy,userAccessStatus}){         
            state.toolsObject = toolsObject
            state.groupBuyId = groupBuyId
            state.isShowGroupBuy = isShowGroupBuy
            state.userAccessStatus = userAccessStatus
        },

        deleteCountTime(state) {
            state.countDownTime = 0
        },

        bindColunmnInfo(state,{profilePic,courseId,freeLesson}){
            state.profilePic = profilePic
            state.courseId = courseId
            state.freeLesson = freeLesson
        }
    },
    actions:{

        initColumnInfo({commit},{courseId,profilePic,freeLesson}){
            commit('bindColunmnInfo',{courseId,profilePic,freeLesson})
        },

        //初始化工具条
        initToolsBar({commit,dispatch},toolsData){
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

            //订单状态
            const userAccessStatus = toolsData.userAccessStatus
            let isShowGroupBuy;
            let toolsObject;
            const personStr = groupData.groupBuyPersonCount > 3 ? "六人拼团" : "三人拼团"
            switch(userAccessStatus) {
                case -3:
                    //拼团失败
                    isShowGroupBuy = true
                    dispatch("getGroupBuyDetail",groupData.groupBuyId)
                break
                case 0:
                    isShowGroupBuy = false
                    if(praiseData.collectLikeTemplateId && groupData.groupBuyTemplateId){
                        toolsObject = {
                            "originPrice":toolsData.price || 0,
                            "groupPrice":toolsData.groupBuyPrice || 0,
                            "collageText":personStr,
                            "collectText":"集赞换",
                            "collect":true,
                            "collage":true,
                            "isShow":true
                        }
                    }else if(praiseData.collectLikeTemplateId == "" && groupData.groupBuyTemplateId != ""){
                        toolsObject = {
                            "originPrice":toolsData.price || 0,
                            "groupPrice":toolsData.groupBuyPrice || 0,
                            "collageText":personStr,
                            "collectText":"集赞换",
                            "collect":false,
                            "collage":true,
                            "isShow":true
                        }
                    }else if(praiseData.collectLikeTemplateId && groupData.groupBuyTemplateId == ""){
                        toolsObject = {
                            "originPrice":toolsData.price || 0,
                            "groupPrice":toolsData.groupBuyPrice || 0,
                            "collageText":personStr,
                            "collectText":"集赞换",
                            "collect":true,
                            "collage":false,
                            "isShow":true
                        }
                    }else if(praiseData.collectLikeTemplateId == "" && groupData.groupBuyTemplateId ==""){
                        toolsObject = {
                            "originPrice":toolsData.price || 0,
                            "groupPrice":toolsData.groupBuyPrice || 0,
                            "collageText":personStr,
                            "collectText":"集赞换",
                            "collect":false,
                            "collage":false,
                            "isShow":true
                        }
                    }
                break
                case 1001:
                    console.log('单购成功')
                    isShowGroupBuy = false
                    toolsObject = {
                        "originPrice":'',
                        "groupPrice":'',
                        "collageText":"",
                        "collectText":"",
                        "collect":true,
                        "collage":false,
                        "isShow":false
                    }  
                break
                case 1003:
                    console.log('拼团成功')
                    isShowGroupBuy = true
                    dispatch("getGroupBuyDetail",groupData.groupBuyId)
                    // toolsObject = {
                    //     "originPrice":'',
                    //     "groupPrice":'',
                    //     "collageText":"我要学习",
                    //     "collectText":"",
                    //     "collect":false,
                    //     "collage":true,
                    //     "isShow":true
                    // }
                break
                case 1005:
                    console.log('拼团中')
                    isShowGroupBuy = true
                    dispatch("getGroupBuyDetail",groupData.groupBuyId)
                    // toolsObject = {
                    //     "originPrice":'',
                    //     "groupPrice":'',
                    //     "collageText":"立即邀请好友拼团",
                    //     "collectText":"",
                    //     "collect":false,
                    //     "collage":true,
                    //     "isShow":true
                    // }
                break
                case 1007:
                    console.log('集赞成功未领取')
                    isShowGroupBuy = false
                    toolsObject = {
                        "originPrice":'',
                        "groupPrice":'',
                        "collageText":"",
                        "collectText":"集赞成功未领取",
                        "collect":true,
                        "collage":false,
                        "isShow":true
                    }
                break
                case 1008:
                    console.log('集赞成功已领取')
                    isShowGroupBuy = false
                    toolsObject = {
                        "originPrice":'',
                        "groupPrice":'',
                        "collageText":"",
                        "collectText":"集赞成功已领取",
                        "collect":true,
                        "collage":false,
                        "isShow":true
                    }                
                break
                case 1009:
                    console.log('集赞中')
                    isShowGroupBuy = false
                    toolsObject = {
                        "originPrice":'',
                        "groupPrice":'',
                        "collageText":"",
                        "collectText":"集赞中",
                        "collect":true,
                        "collage":false,
                        "isShow":true
                    }                 
                break
            }
            const groupBuyId = groupData.groupBuyId
            commit('bindOrderObject',{toolsObject,groupBuyId,isShowGroupBuy,userAccessStatus})
            commit('bindCollectLikeId',praiseData.collectLikeId)

        },
        //获取拼团详情
        async getGroupBuyDetail({commit,dispatch},groupBuyId) {
            const result = await getGroupBuyDetail({'groupBuyId':groupBuyId})
            console.log('获取拼团详情成功')
            console.log(result)
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
            let toolsObject = null
            let headerType = 0
            let isShowGroupBuy = true
            switch(orderStatus){
                case 1201:
                break
                case 1204:
                    //拼团失败
                    //显示原价购买和我要开团
                    headerType = 102
                    toolsObject = {
                        "originPrice":'',
                        "groupPrice":'',
                        "collageText":"我要开团",
                        "collectText":"",
                        "collect":false,
                        "collage":true,
                        "isShow":true
                    }
                break
                case 1203:
                    //拼团成功
                    //显示我要学习
                    headerType = 101
                    toolsObject = {
                        "originPrice":'',
                        "groupPrice":'',
                        "collageText":"我要学习",
                        "collectText":"",
                        "collect":false,
                        "collage":true,
                        "isShow":true
                    }
                break
                case 1202:
                //拼团中&&开团人  显示  邀请好友拼团
               
                    if(isOwner){
                        headerType = 100
                        toolsObject = {
                            "originPrice":'',
                            "groupPrice":'',
                            "collageText":"立即邀请好友拼团",
                            "collectText":"",
                            "collect":false,
                            "collage":true,
                            "isShow":true
                        }
                    }
                //拼团中&& 参团人 && 如果拼团已满 && 当前用户已完成购买 && 存在其他人未完成支付  "立即邀请好友拼团"
                    if(!isOwner&&isFullStaff&&achievePayment&&!isAllPay){
                        headerType = 103
                        toolsObject = {
                            "originPrice":'',
                            "groupPrice":'',
                            "collageText":"立即邀请好友拼团",
                            "collectText":"",
                            "collect":false,
                            "collage":true,
                            "isShow":true
                        }
                    }
                //拼团中&&参团人&&当前拼团未满&&当前用户完成支付   按钮显示:"邀请好友拼团"
                if (!isOwner && !isFullStaff && achievePayment){
                        headerType = 100
                        toolsObject = {
                            "originPrice":'',
                            "groupPrice":'',
                            "collageText":"立即邀请好友拼团",
                            "collectText":"",
                            "collect":false,
                            "collage":true,
                            "isShow":true
                        }
                }
                //拼团中&&参团人&&当前拼团未满&&当前用户未调起支付   按钮显示:"参与拼团"
                if(!isOwner && !isFullStaff && !achievePayment && currUserStatus == 0){
                        headerType = 100
                        toolsObject = {
                            "originPrice":'',
                            "groupPrice":'',
                            "collageText":"参与拼团",
                            "collectText":"",
                            "collect":false,
                            "collage":true,
                            "isShow":true
                        }
                }
                //拼团中&&参团人&&当前拼团未满&&当前用户调起支付未支付完成   按钮显示:"继续支付"
                if(!isOwner && !isFullStaff && !achievePayment && currUserStatus == 2601){
                        headerType = 100
                        toolsObject = {
                            "originPrice":'',
                            "groupPrice":'',
                            "collageText":"继续支付",
                            "collectText":"",
                            "collect":false,
                            "collage":true,
                            "isShow":true
                        }  
                }
                //拼团中&&参团人&&当前拼团已满&&当前用户未完成支付&&当前用户不在拼团用户列表中  按钮显示"我要开团"
                if(!isOwner && isFullStaff && !achievePayment && !isGroupCurrent){
                        headerType = 103
                        toolsObject = {
                            "originPrice":'',
                            "groupPrice":'',
                            "collageText":"我要开团",
                            "collectText":"",
                            "collect":false,
                            "collage":true,
                            "isShow":true
                        }  
                }
                //拼团中&&参团人&&当前拼团已满&&当前用户未完成支付&&当前用户在拼团用户列表中  按钮显示"继续支付"
                if(!isOwner && isFullStaff && !achievePayment && isGroupCurrent){
                        headerType = 103
                        toolsObject = {
                            "originPrice":'',
                            "groupPrice":'',
                            "collageText":"继续支付",
                            "collectText":"",
                            "collect":false,
                            "collage":true,
                            "isShow":true
                        }                     
                }
                break
            }
            console.log('更新状态条 + =',toolsObject)
           
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
                'isOwner':isOwner,
                'isSixGroup':isSixGroup
            }) 
        },

        //验证是否完成了公众号授权
        async checkoutAuthorrization({dispatch},payload){
            const result = await wechatSubscribed()
            console.log('是否关注公众号')
            console.log(result)
            if(result && result==1){
                dispatch('checkoutShowTeleDialog',payload)
            }else{
                //跳转去关注公众号
                window.location.href = "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzA4Mzg3NjE2Mg==&scene=126#wechat_redirect"
            }
        },

        //验证是否弹出手机号输入框
        async checkoutShowTeleDialog({dispatch,commit},payload){
            let telephone = window.localStorage.getItem('telephone')
            console.log('本地存储的手机号 = ',telephone)
            if(!telephone){
                const result = await getMyUserInfo()
                if(result==null) return
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
                    console.log('弹出手机号收集框')
                    commit('bindIsShowMobileDialog',true)
                }
            }else {
                if(payload.payType == 3){
                    //发起集赞
                    let params = {
                        courseId: payload.courseId
                    }
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
        async unlockCourse({dispatch},payload) {
            const result = await unlockCourse(payload)
            console.log('原价购买成功')
            console.log(result)
            if(result == null) return
            dispatch("getPayment",{result,payType:0})
        },
        //发起拼团
        async startGroupBuy({dispatch},payload) {
            const result = await startGroupBuy(payload)
            console.log('发起拼团成功')
            console.log(result)
            if(result == null) return
            dispatch("getPayment",{result,payType:1})
        },
        //参与拼团
        async joinGroupBuy({dispatch},payload) {
            const result = await joinGroupBuy(payload)
            console.log('参与拼团成功')
            console.log(result)
            if(result == null) return
            dispatch('getPayment',{result,payType:2})
        },
        //发起集赞
        async startCollectLike({dispatch},payload) {
            const result = await startCollectLike(payload)
            console.log('发起集赞成功')
            if (result == null) return
            dispatch('updateFatherData')
        },
        //领取集赞
        async getCollectLike({commit},payload) {
            const result = await getCollectLike(payload)
            console.log('领取集赞成功')
            console.log(result)
            dispatch('updateFatherData')
        },
        //调起微信支付
        async getPayment({commit,dispatch},{result,payType}){
           //微信网页开发支付接口
           let result0= await wxConfig({'url' : window.location.href})
           let config = result0.js_config
           wx.config({
                debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: config.appid, // 必填，企业号的唯一标识，此处填写企业号corpid
                timestamp:config.timestamp , // 必填，生成签名的时间戳
                nonceStr: config.nonceStr, // 必填，生成签名的随机串
                signature: config.signature,// 必填，签名，见附录1
                jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2 
           })
            // dispatch('wxPayment',{
            //     timestamp: result.timestamp,
            //     nonceStr: result.nonceStr, // 支付签名随机串，不长于 32 位
            //     package: result.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
            //     signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
            //     paySign: result.paySign, // 支付签名
            //     success: function (res) {
            //         // 支付成功后的回调函数
            //         console.log("支付成功"); 
            //         console.log(payType)
            //         switch(payType){
            //             case 0:
            //                 console.log('原价购买支付成功~~~')
            //                 commit('bindAchieveOriginBuy',true)
            //             break
            //             case 1:
            //                 console.log('发起拼团支付成功~~~')
            //                 //调起拼团详情
            //                 dispatch('getGroupBuyDetail',result.groupBuyId)
            //             break
            //             case 2:
            //                 console.log('参与拼团支付成功~~~')
            //                 //调起拼团详情
            //                 dispatch('getGroupBuyDetail',result.groupBuyId)
            //             break
            //         }
                   
            //     },
            //     fail : function (errmsg) {
            //         console.log(errmsg)
            //     }
            // })      
            wx.ready(function(){
                console.log(result)
                    wx.chooseWXPay({
                        timestamp: result.timestamp,
                        nonceStr: result.nonceStr, // 支付签名随机串，不长于 32 位
                        package: result.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                        signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                        paySign: result.paySign, // 支付签名
                        success: function (res) {
                            // 支付成功后的回调函数
                            console.log("支付成功"); 
                            console.log(payType)
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
                        fail : function (errmsg) {
                            console.log(errmsg)
                        },
                        complete : function (res) {
                            if(res.errMsg == "chooseWXPay:cancel" ) {
                                console.log('支付取消')
                            } 
                        }

                    }); 
           })
        },
        
        //从新获取专栏详情接口,刷新父组件显示
        async updateFatherData({commit,dispatch,state}){
            dispatch('videoColumnDetail/getVideoColumnDetail',{"courseId" : state.courseId},{root:true})
        },
    }
}

export default groupManager

import { wxConfig,getGroupBuyDetail,startGroupBuy,joinGroupBuy,startCollectLike,getCollectLike } from '../../services/groupBuyAPi.js'
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
    },
    getters:{
        //专栏头图
        profilePic(state,getters,{ videoColumnDetail }) {
            return videoColumnDetail.profilePic
        },
        //专栏ID
        courseId(state,getters,{ videoColumnDetail }) {
            return videoColumnDetail.courseId
        },
        toolsObject(state,getters,{ videoColumnDetail }) {
            return videoColumnDetail.toolsObject
        },
        isShowGroupBuy(state,getters,{ videoColumnDetail }) {
            return videoColumnDetail.isShowGroupBuy
        },
        headerType(state,getters,{ videoColumnDetail }){
            return videoColumnDetail.headerType
        },
        praiseData(state,getters,{ videoColumnDetail }){
            return videoColumnDetail.praiseData
        },
        userAccessStatus(state,getters,{ videoColumnDetail }){
            return videoColumnDetail.userAccessStatus
        }
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
        },

    },
    actions:{
        //获取拼团详情
        async  getGroupBuyDetail({commit,dispatch},groupBuyId) {
            const result = await getGroupBuyDetail({'groupBuyId':groupBuyId})
            console.log('获取拼团详情成功')
            console.log(result)
            if(result == null) return
            //1.获取当前订单状态
            let orderStatus = result.userAccessStatus;
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
            const countTime = result.sysTime - (result.createTime + result.duration * 60 * 60 * 1000);

            let toolsObject = null
            let headerTye = 0
            switch(orderStatus){
                case -3:
                //拼团失败
                //显示原价购买和我要开团
                    headerType = 102
                    toolsObject = {
                        "originPrice":'',
                        "groupPrice":'',
                        "collageText":"",
                        "collectText":"我要开团",
                        "collect":true,
                        "collage":false,
                        "isShow":true
                    }
                break
                case 1003:
                //拼团成功
                //显示我要学习
                    headerType = 101
                    toolsObject = {
                        "originPrice":'',
                        "groupPrice":'',
                        "collageText":"",
                        "collectText":"我要学习",
                        "collect":true,
                        "collage":false,
                        "isShow":true
                    }
                break
                case 1005:
                //拼团中&&开团人  显示  邀请好友拼团
                    if(isOwner){
                        headerType = 100
                        toolsObject = {
                            "originPrice":'',
                            "groupPrice":'',
                            "collageText":"",
                            "collectText":"立即邀请好友拼团",
                            "collect":true,
                            "collage":false,
                            "isShow":true
                        }
                    }
                //拼团中&& 参团人 && 如果拼团已满 && 当前用户已完成购买 && 存在其他人未完成支付  "立即邀请好友拼团"
                    if(!isOwner&&isFullStaff&&achievePayment&&!isAllPay){
                        headerType = 103
                        toolsObject = {
                            "originPrice":'',
                            "groupPrice":'',
                            "collageText":"",
                            "collectText":"立即邀请好友拼团",
                            "collect":true,
                            "collage":false,
                            "isShow":true
                        }
                    }
                //拼团中&&参团人&&当前拼团未满&&当前用户完成支付   按钮显示:"邀请好友拼团"
                if (!isOwner && !isFullStaff && achievePayment){
                        headerType = 100
                        toolsObject = {
                            "originPrice":'',
                            "groupPrice":'',
                            "collageText":"",
                            "collectText":"立即邀请好友拼团",
                            "collect":true,
                            "collage":false,
                            "isShow":true
                        }
                }
                //拼团中&&参团人&&当前拼团未满&&当前用户未调起支付   按钮显示:"参与拼团"
                if(!isOwner && !isFullStaff && !achievePayment && currUserStatus == 0){
                        headerType = 100
                        toolsObject = {
                            "originPrice":'',
                            "groupPrice":'',
                            "collageText":"",
                            "collectText":"参与拼团",
                            "collect":true,
                            "collage":false,
                            "isShow":true
                        }
                }
                //拼团中&&参团人&&当前拼团未满&&当前用户调起支付未支付完成   按钮显示:"继续支付"
                if(!isOwner && !isFullStaff && !achievePayment && currUserStatus == 2601){
                         headerType = 100
                        toolsObject = {
                            "originPrice":'',
                            "groupPrice":'',
                            "collageText":"",
                            "collectText":"继续支付",
                            "collect":true,
                            "collage":false,
                            "isShow":true
                        }  
                }
                //拼团中&&参团人&&当前拼团已满&&当前用户未完成支付&&当前用户不在拼团用户列表中  按钮显示"我要开团"
                if(!isOwner && isFullStaff && !achievePayment && !isGroupCurrent){
                        headerType = 103
                        toolsObject = {
                            "originPrice":'',
                            "groupPrice":'',
                            "collageText":"",
                            "collectText":"我要开团",
                            "collect":true,
                            "collage":false,
                            "isShow":true
                        }  
                }
                //拼团中&&参团人&&当前拼团已满&&当前用户未完成支付&&当前用户在拼团用户列表中  按钮显示"继续支付"
                if(!isOwner && isFullStaff && !achievePayment && isGroupCurrent){
                        headerType = 103
                        toolsObject = {
                            "originPrice":'',
                            "groupPrice":'',
                            "collageText":"",
                            "collectText":"继续支付",
                            "collect":true,
                            "collage":false,
                            "isShow":true
                        }                     
                }
                break
            }

            commit('videoColumnDetail/updateToolsObject',toolsObject,{root:true})

            //9.整理拼团用户数组
            let topList = []
            let botList = []            
            let userList = result.userList
            
            if(result.personCount > 3) {
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
                "userListBot" : botList || []
            }) 
        },
        //发起拼团
        async startGroupBuy({dispatch},payload) {
            //1.判断是否弹出手机号收集框和是否关注公众号
            const result = await startGroupBuy(payload)
            console.log('发起拼团成功')
            console.log(result)
            //支付
            if(result == null) return
            dispatch("getPayment",result)

            //拼团详情
            // dispatch('getGroupBuyDetail',result.groupBuyId)
        },
        //参与拼团
        async joinGroupBuy({dispatch},payload) {
            const result = await joinGroupBuy(payload)
            console.log('参与拼团成功')
            console.log(result)
            dispatch('updateFatherData')
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
        },
        //调起微信支付
        async getPayment({commit,dispatch},result){
           //微信网页开发支付接口
           let result111= await wxConfig({'url' : window.location.href})
           console.log("嫩不能走到这里")
           console.log(result111)
            wx.ready(function(){
                console.log('走到这里了~~~')
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
                            //调起拼团详情
                            dispatch('getGroupBuyDetail',result.groupBuyId)
                        },
                        fail : function (errmsg) {

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
        async updateFatherData({commit,dispatch,getters}){
            // dispatch('videoColumnDetail/getVideoColumnDetail',{"courseId" : getters.courseId},{root:true})
            // commit('bindCollectLikeId',result.id)
        }
    }
}

export default groupManager

import { wxConfig,getGroupBuyDetail,startGroupBuy,joinGroupBuy,startCollectLike,getCollectLike } from '../../services/groupBuyAPi.js'
const groupManager = {
    namespaced: true,
    state:{
        userList:[],     //拼团成员列表
        leavePerson:0,   //拼团剩余名额
        countDownTime:0, //倒计时剩余时长
        collectLikeId:0  //集赞ID
    },
    getters:{
        //专栏头图
        profilePic(state,getters,{ videoColumnDetail }) {
            return videoColumnDetail.profilePic
        },
        //专栏ID
        courseId(state,getters,{ videoColumnDetail }) {
            // console.log("==========****=====")
            // console.log(videoColumnDetail.courseId)
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
            state.userList = payload.userList
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
          
            //更新页面
            //1.获取当前订单状态
            let orderStatus = 0;
            //2.判断是开团人还是参团人
            let owner = true;
            var currentUserId = '';//拿到当前用户ID
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
            const countTime = result.createTime + result.duration * 60 * 60 * 1000 - result.sysTime;
            commit('bindGroupHeaderData',{
                "leavePerson" : personNum,
                "countDownTime" : countTime,
                "userList" : result.userList
            }) 
        },
        //发起拼团
        async startGroupBuy({dispatch},payload) {
            //1.判断是否弹出手机号收集框和是否关注公众号
            const result = await startGroupBuy(payload)
            console.log('发起拼团成功')
            console.log(result)
            //支付
            //拼团详情
            dispatch('getGroupBuyDetail',result.groupBuyId)

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
        // //调起微信支付
        // async getPayment({commit,dispatch},{timestamp,nonceStr,package,paysign}){
        //    //微信网页开发支付接口
        //             wx.chooseWXPay({
        //                 timestamp: timestamp,
        //                 nonceStr: nonceStr, // 支付签名随机串，不长于 32 位
        //                 package: package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
        //                 signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
        //                 paySign: paySign, // 支付签名
        //                 success: function (res) {
        //                     // 支付成功后的回调函数
        //                     console.log("支付成功"); 
        //                 },
        //                 fail : function (errmsg) {

        //                 },
        //                 complete : function (res) {
        //                     if(res.errMsg == "chooseWXPay:cancel" ) {

        //                     } 
        //                 }

        //             }); 
        // },
        
        //从新获取专栏详情接口,刷新父组件显示
        async updateFatherData({commit,dispatch,getters}){
            dispatch('videoColumnDetail/getVideoColumnDetail',{"courseId" : getters.courseId},{root:true})
            commit('bindCollectLikeId',result.id)
        }
    }
}

export default groupManager
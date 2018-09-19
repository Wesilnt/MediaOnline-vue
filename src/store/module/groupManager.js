
import { getgroupBuyDetail,startGroupBuy,joinGroupBuy,startCollectLike,getCollectLike } from '../../services/groupBuyAPi.js'
const groupManager = {
    namespaced: true,
    state:{
        userList:[]
    },
    getters:{
        //专栏头图
        profilePic(state,getters,{ videoColumnDetail }) {
            return videoColumnDetail.profilePic
        },
        //专栏ID
        courseId(state,getters,{ videoColumnDetail }) {
            return videoColumnDetail.courseId
        }
    },
    mutations:{

    },
    actions:{
        //获取拼团详情
        async  getGroupBuyDetail({commit},payload) {
            const result = await getGroupBuyDetail(payload)
            console.log('获取拼团详情成功')
            console.log(result)
            //1.获取当前订单状态
            
            //2.判断是开团人还是参团人
            //3.计算当前拼团是否已满
            //计算剩余拼团名额
            //4.当前用户是否完成支付
            //5.拼团中其他成员是否完成支付
            //6.当前用户是否在拼团列表中
            //7.获取当前用户的支付状态
            //8.计算倒计时
        },
        //发起拼团
        async startGroupBuy({commit},payload) {
            const result = await startGroupBuy(payload)
            console.log('发起拼团成功')
            console.log(result)
        },
        //参与拼团
        async joinGroupBuy({commit},payload) {
            const result = await joinGroupBuy(payload)
            console.log('参与拼团成功')
            console.log(result)
        },
        //发起集赞
        async startCollectLike({commit},payload) {
            const result = await startCollectLike(payload)
            console.log('发起集赞成功')
            console.log(result)
        },
        //领取集赞
        async getCollectLike({commit},payload) {
            const result = await getCollectLike(payload)
            console.log('领取集赞成功')
            console.log(result)
        },
    }
}

export default groupManager
<template>
    <div class="cl-tools-navbar">
        <div class="cl-sound">
            <img src="../assets/images/onlinecourse-tabbar-try.png">
            <label>试听</label>
        </div>
        <div class="cl-left-line"></div>
        <div class="cl-item-origin" v-show="btn_origin.isShow">
            <div class="cl-origin-price">$19.9</div>
            <div class="cl-origin-info">原价购买</div>
        </div>
        <div class="cl-action-btn" v-show="btn_group.isShow || btn_prise.isShow">
            <div class="cl-groupbtn" v-show="btn_group.isShow">
                <div class="cl-groupbtn-price">$9.9</div>
                <div class="cl-groupbtn-info">三人团</div>
            </div>
            <div class="cl-praisebtn" v-show="btn_prise.isShow">
                    <div class="cl-praisebtn-price">$9.9</div>
                <div class="cl-praisebtn-info">集赞换</div>
            </div>
        </div>
    </div>

    
</template>

<script>
    export default {

        data(){
            return {
                isAccessPrise : 0,
                isGoingPrise : 0, 
                isAccessPay : 0, 
                isSuccessPraise : 0,
                btn_group: {
                    title: "拼团购买",
                    openType: "none",
                    isShow: true
                },

                btn_origin: {
                    title: "原价购买",
                    openType: "none",
                    isShow: true
                },

                btn_prise: {
                    title: "发起集赞",
                    openType: "none",
                    isShow: true
                }, 
                datas:{
                    authorBriefIntro:"",
                    availLessonCount:1,
                    briefIntro:"威风威",
                    buyCount:0,
                    canView:0,
                    categoryList:[],
                    collectLikeDuration:null , //集赞时长
                    collectLikePersonCount:null ,//集赞人数
                    collectLikeTemplateId:null , //集赞模板Id
                    commentCount:0,
                    coverPic:"http://qiniu.shbaoyuantech.com/FvqzWWGRqnhcNRPWVCMESMiHy2gL",
                    createTime:"2018-07-30 10:25:20",
                    descPicList:null,
                    description:null,
                    fitFor:null,
                    groupBuyDuration:null,
                    groupBuyPersonCount:null,
                    groupBuyPrice:null,
                    groupBuyTemplateId:null,
                    id:"54877938872483840",
                    lastModifyTime:"2018-08-02 11:52:28",
                    lessonCount:11,
                    name:"测试43",
                    outline:"",
                    outlinePic:null,
                    price:0.01,
                    profilePic:"",
                    sort:0,
                    status:"1502",
                    userAccessStatus:0 ,//-1:退款 0:没有购买和集赞行为 1001 单购成功 1003 拼团成功 1005 拼团中 1007 集赞成功未领取 1008集赞成功已领取 1009 积攒中
                    userBought:0,
                    viewCount:217  
                },
                mounted() {
                        var result = this.data
                        var btn1 = this.btn_group
                        var btn2 = this.btn_origin
                        var btn3 = this.btn_prise
                        //是否允许集赞
                        result.collectLikeTemplateId != null || result.userAccessStatus == 1007 || result.userAccessStatus == 1008 || result.userAccessStatus == 1009 ? this.isAccessPrise = true : this.isAccessPrise = false
                        //是否处在集赞中
                        result.userAccessStatus == 1009 ? this.isGoingPrise = true : this.isGoingPrise = false
                        //是否支付完成
                        result.userAccessStatus == 1001 || result.userAccessStatus == 1003 || result.userAccessStatus == 1005 ? this.isAccessPay = true : this.isAccessPay = false
                        //是否集赞完成
                        result.userAccessStatus == 1007 || result.userAccessStatus == 1008 ? this.isSuccessPraise = true : this.isSuccessPraise = false
                        //是否隐藏拼团按钮,
                        var groupBuyPrice = result.groupBuyPrice
                        btn1.isShow = !(groupBuyPrice == null || result.price == 0 || this.isAccessPay || this.isGoingPrise || this.isSuccessPraise || result.userAccessStatus == -1)
                        //是否隐藏原价购买按钮
                        btn2.isShow = !(result.price == 0 || this.isAccessPay || this.isGoingPrise || this.isSuccessPraise || result.userAccessStatus == -1)
                        //是否隐藏集赞按钮
                        btn3.isShow = !(!this.isAccessPrise || this.isAccessPay || result.userAccessStatus == -1 || result.userAccessStatus == 1008)


                        //显示集赞按钮,文案为发起集赞
                        if (result.userAccessStatus == 0) {
                            btn3.title = "发起集赞"
                            btn3.openType = "getUserInfo"
                        }
                        //显示集赞按钮,文案为您已发起集赞,请点击前往
                        if (this.isGoingPrise) {
                            btn3.title = "您已发起集赞,请点击前往"
                            btn3.openType = "none"
                        }
                        //显示集赞按钮,文案为已完成集赞,点击领取
                        if (result.userAccessStatus == 1007) {
                            btn3.title = "已完成集赞,点击领取"
                            btn3.openType = "none"
                        }
                },
            }
        }
    }
</script>

<style scoped>
.member-container {
    background-color: cyan;
}  
.cl-tools-navbar {
    position: fixed;
    bottom: 0px;
    width: 100%;
    height: 120px;
    background-color: #fff;
    display: flex;
    flex-direction: row;
    padding: 20px;
    box-sizing: border-box;
    justify-content: space-between;
    border-top: 1px solid lightgray;
    z-index: 999;
}
.cl-sound {
   width: 50px;
   background-color: #fff;
   display: flex;
   flex-direction: column;
   justify-content: space-between; 
}
.cl-sound img {
    align-self: center;
    width: 40px;
    height: 40px;
}
.cl-sound label {
    font-size: 20px;
    text-align: left;
    margin-top: 6px;
    color: rgb(105, 105, 105)
}
.cl-left-line {
    width: 1px;
    background-color: lightgray;
    margin-left: 28px;
}
.cl-item-origin {
    text-align: center;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    margin-left: 48px;
    flex-grow: 1;
    justify-content: space-between;
}
.cl-origin-price {
    color: rgb(255, 163, 47);
    text-align: center;
    font-size: 16px;
}
.cl-origin-info {
    color: rgb(105, 105, 105);
    text-align: center;
    font-size: 20px;
}
.cl-action-btn {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-grow: 1;
    align-items: center;
    width: 400px;
    height: 80px;
    border-radius: 60px;
    box-shadow: 0 0 16px rgb(229, 218, 207);
    overflow: hidden;
    margin-left: 56px;
}
.cl-groupbtn {
    text-align: center;
    background: linear-gradient(to right, rgb(254,202,0) 0, rgb(254, 149, 2) 100%);
    flex-grow: 1;
    height: 80px;
}
.cl-groupbtn-price {
    font-size: 30px;
    color: white;
}
.cl-groupbtn-info {
    font-size: 30px;
    color: white;
}
.cl-praisebtn {
    text-align: center;
    background: linear-gradient(to right,rgb(254, 119, 0) 0,rgb(255, 79, 5) 100%);
    flex-grow: 1;
    height: 80px;
}
.cl-praisebtn-price {
    font-size: 30px;
    color: white;
}
.cl-praisebtn-info {
    font-size: 20px;
    color: white;
}
</style>


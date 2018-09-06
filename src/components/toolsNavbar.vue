<template>
    <div class="cl-tools-navbar">
        <div class="cl-sound">
            <img src="../assets/images/onlinecourse-tabbar-try.png">
            <label>试听</label>
        </div>
        <div class="cl-left-line"></div>
        <div class="cl-originbtn" v-show="btn_origin.isShow">
            <div class="cl-origin-price" v-show="btn_origin.isshowprice">{{btn_origin.price}}</div>
            <div class="cl-origin-info">{{btn_origin.title}}</div>
        </div>
        <div class="cl-action-btn" v-show="btn_group.isShow || btn_prise.isShow">

            <div class="cl-groupbtn" v-show="btn_group.isShow">
                <div class="cl-groupbtn-price" v-show="btn_group.isshowprice">{{btn_group.price}}</div>
                <div class="cl-groupbtn-info" :class="{active : !btn_group.isshowprice}">{{btn_group.title}}</div>
            </div>

            <div class="cl-praisebtn" v-show="btn_prise.isShow">
                <div class="cl-praisebtn-price" v-show="btn_prise.isshowprice">{{btn_prise.price}}</div>
                <div class="cl-praisebtn-info" :class="{active1 : !btn_prise.isshowprice}">{{btn_prise.title}}</div>
            </div>
        </div>
    </div>

    
</template>

<script>
    export default {
        name:'toolsNavbar',
        props:['btnstate'],
        data(){
            return {

                btn_origin: {
                    title: "原价购买",
                    openType: "none",
                    isShow: true,
                    price:0,
                    btnOriginClass:'',
                    isshowprice:true
                },

                btn_group: {
                    title: "拼团购买",
                    openType: "none",
                    isShow: true,
                     price:0,
                    btnGroupClass:'',
                    isshowprice:true
                },

                btn_prise: {
                    title: "发起集赞",
                    openType: "none",
                    isShow: true,
                     price:0,
                    btnPraiseClass:'',
                    isshowprice:true
                } 

     
            }
        },
        mounted() {
            switch (this.btnstate) {
                case 0 : //显示拼团购买,原价购买,发起集赞(默认显示)
                    this.btn_origin = { title: "原价购买",price:'$19.9', openType: "none", isShow: true, btnOriginClass:'',isshowprice:true}
                    this.btn_group = { title: "三人团",price:'$19.9', openType: "none", isShow: true, btnGroupClass:'',isshowprice:true}
                    this.btn_prise = { title: "集赞换",price:'$19.9', openType: "none", isShow: true, btnPraiseClass:'',isshowprice:true}                                                            
                    break
                case 1 : //显示原价购买
                    this.btn_origin = { title: "原价购买", price:'$19.9',openType: "none", isShow: false, btnOriginClass:'',isshowprice:true}
                    this.btn_group = { title: "原价购买",price:'$19.9', openType: "none", isShow: true, btnGroupClass:'',isshowprice:true}
                    this.btn_prise = { title: "集赞换", price:'$19.9',openType: "none", isShow: false, btnPraiseClass:'',isshowprice:true} 
                    break
                case 2 : //显示原价购买,发起集赞
                    this.btn_origin = { title: "原价购买",price:'$19.9', openType: "none", isShow: true, btnOriginClass:'',isshowprice:true}
                    this.btn_group = { title: "三人团", price:'$19.9',openType: "none", isShow: false, btnGroupClass:'',isshowprice:true}
                    this.btn_prise = { title: "集赞换", price:'$19.9',openType: "none", isShow: true, btnPraiseClass:'',isshowprice:true} 
                    break
                case 3 : //显示原价购买,我要拼团
                    this.btn_origin = { title: "原价购买",price:'$19.9', openType: "none", isShow: true, btnOriginClass:'',isshowprice:true}
                    this.btn_group = { title: "三人团",price:'$19.9', openType: "none", isShow: true, btnGroupClass:'',isshowprice:true}
                    this.btn_prise = { title: "集赞换",price:'$19.9', openType: "none", isShow: false, btnPraiseClass:'',isshowprice:true} 
                    break
                case 4 : //显示您已发起集赞,请点击前往
                    this.btn_origin = { title: "",price:'', openType: "none", isShow: false, btnOriginClass:'',isshowprice:true}
                    this.btn_group = { title: "您已发起集赞,请点击前往",price:'', openType: "none", isShow: true, btnGroupClass:'',isshowprice:false}
                    this.btn_prise = { title: "",price:'', openType: "none", isShow: false, btnPraiseClass:'',isshowprice:true} 
                    break
                case 5 : //显示我要开团
                    this.btn_origin = { title: "",price:'', openType: "none", isShow: false, btnOriginClass:'',isshowprice:true}
                    this.btn_group = { title: "我要开团", price:'',openType: "none", isShow: true, btnGroupClass:'',isshowprice:false}
                    this.btn_prise = { title: "",price:'', openType: "none", isShow: false, btnPraiseClass:'',isshowprice:true} 
                    break
                case 6 : //显示继续支付
                    this.btn_origin = { title: "", price:'$19.9',openType: "none", isShow: false, btnOriginClass:'',isshowprice:true}
                    this.btn_group = { title: "", price:'$19.9',openType: "none", isShow: false, btnGroupClass:'',isshowprice:true}
                    this.btn_prise = { title: "继续支付", price:'$19.9',openType: "none", isShow: true, btnPraiseClass:'',isshowprice:true} 
                    break
                case 7 : //显示参与拼团
                    this.btn_origin = { title: "原价购买", price:'$19.9',openType: "none", isShow: false, btnOriginClass:'',isshowprice:true}
                    this.btn_group = { title: "三人团", price:'$19.9',openType: "none", isShow: false, btnGroupClass:'',isshowprice:true}
                    this.btn_prise = { title: "参与拼团", price:'19',openType: "none", isShow: true, btnPraiseClass:'',isshowprice:false} 
                    break
                case 8 : //显示我要学习
                    this.btn_origin = { title: "原价购买",price:'$19.9', openType: "none", isShow: false, btnOriginClass:'',isshowprice:true}
                    this.btn_group = { title: "我要学习",price:'$19.9', openType: "none", isShow: true, btnGroupClass:'',isshowprice:false}
                    this.btn_prise = { title: "集赞换", price:'$19.9',openType: "none", isShow: false, btnPraiseClass:'',isshowprice:true} 
                    break
                case 9 : //显示已完成集赞,点击领取
                    this.btn_origin = { title: "原价购买",price:'$19.9', openType: "none", isShow: false, btnOriginClass:'',isshowprice:true}
                    this.btn_group = { title: "已完成集赞,点击领取",price:'$19.9', openType: "none", isShow: true, btnGroupClass:'',isshowprice:false}
                    this.btn_prise = { title: "集赞换", price:'$19.9',openType: "none", isShow: false, btnPraiseClass:'',isshowprice:true} 
                    break     
            }  
        }
    }
</script>

<style lang='scss' scoped>
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
    font-size: 10px;
    text-align: left;
    margin-top: 6px;
    color: rgb(105, 105, 105)
}
.cl-left-line {
    width: 2px;
    background-color: gray;
    margin-left: 28px;
}
.cl-originbtn {
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
    align-items: center;
}

.cl-groupbtn-price {
    font-size: 30px;
    color: white;
}
.cl-groupbtn-info {
    font-size: 20px;
    color: white;
    &.active {
        height: 80px;
        line-height: 80px;
    }
}

.cl-praisebtn {
    text-align: center;
    background: linear-gradient(to right,rgb(254, 119, 0) 0,rgb(255, 79, 5) 100%);
    flex-grow: 1;
    height: 80px;
    align-items: center;
}
.cl-praisebtn-price {
    font-size: 30px;
    color: white;
}
.cl-praisebtn-info {
    font-size: 20px;
    color: white;
    &.active1 {
        height: 80px;
        line-height: 80px;
    }
}
</style>


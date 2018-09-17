<template>
    <div class="groupBuy-container">
        <div class="groupBuy-usericon">
            <div class="qhht-flex groupBuy-usericon-top">
                <div class="groupBuy-usericon-item">
                    <div class="groupBuy-usericon-manager">团长</div>
                </div>
                <div class="groupBuy-usericon-item"></div>
            </div>
            <div class="qhht-flex groupBuy-usericon-bot">
                <div class="groupBuy-usericon-item"></div>
                <div class="groupBuy-usericon-item"></div>
                <div class="groupBuy-usericon-item"></div>
                <div class="groupBuy-usericon-item"></div>
            </div>
        </div>
        <div class="groupBuy-info">剩余<span>2</span>个名额</div>
        <div class="groupBuy-countDown-container">
            <CountDown></CountDown>
        </div>
        <div class="groupBuy-deadline">距离截止时间</div>
        <div class="groupBuy-circleline"></div>
        <div class="groupBuy-banner">
            <div class="groupBuy-circleline" v-show="true"></div>
            <span class="groupBuy-banner-bottom">99人已购买</span>
        </div>
    </div>
</template>

<script>
import CountDown from '../../../components/CountDown'
export default {
    name:'GroupHeader',
    components:{
        CountDown
    }
}
</script>


<style lang="scss" scoped>
.groupBuy-container {
    background-color: white;
    text-align: center;
}
//头像部分
.groupBuy-usericon {
    width:100%;
}
.groupBuy-usericon-manager {
    margin-left: 60px;
    width: 64px;
    height: 36px;
    text-align: center;
    line-height: 32px;
    color: white;
    font-size: 20px;
    border-radius: 18px;
    border:2px solid white;
    background-color: rgb(236, 93, 76);
    box-sizing: border-box;
}
.groupBuy-usericon-top {
    // background-color:green;
    padding: 30px 231px 40px;
    justify-content: center;
    box-sizing: border-box;
    .groupBuy-usericon-item{
        &:not(:last-child){
            margin-right: 48px
        }
    }
}
.groupBuy-usericon-bot {
    // background-color: red;
    justify-content: center;
    padding:0 63px;
    .groupBuy-usericon-item{
        &:not(:last-child){
            margin-right: 48px
        }
    }
}
.groupBuy-usericon-item {
    width: 120px;
    height: 120px;
    background-color: rgb(250, 219, 162);
    border-radius: 50%;
}
.groupBuy-info {
    font-size: 32px;
    color: rgb(77, 77, 77); 
    margin: 30px 0 40px;
    span {
       font-size: 40px;
       color: rgb(255, 163, 47);
    }
}
.groupBuy-countDown-container {
    // background-color: cyan;
    width: 100%;
    height: 48px;
}
.groupBuy-deadline {
    font-size: 24px;
    color: rgb(204, 204, 204);
    margin:16px 0 10px;
}
.groupBuy-banner {
    width: 100%;
    height: 300px;
    background-color: rgb(198, 72, 172);
    padding: 0 40px;
    box-sizing: border-box;
    text-align: left;
    position: relative;

    span {
        position: absolute;
        bottom: 20px;
        right: 40px;
        font-size: 28px;
        color: red;
    }
}
.groupBuy-circleline {
    position: absolute;
    width: 112%;
    height: 40px;
    border-radius: 0 0 50% 50%;
    background-color: white;
    margin-top: -16px;
    margin-left: -6%;
}

</style>



<template>
    <div class="video-comment-container">
        <div class="video-comment-usericon">
            <!-- <img src=""> -->
        </div>
        <div class="video-comment-userinfo">
            <div class="video-userinfo-top">
                <div class="video-userinfo-top-left">
                    <span class="video-comment-nickname">古风流</span>
                    <span class="video-comment-comTime">08-08</span>
                </div>
                <div class="video-comment-praise">
                    <img :src="isPraise ? praiseHighlight : praiseNormal" @click="onClickPraise">
                    <span>1314</span>
                </div>
            </div>
            <div class="video-comment-detail">
                此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论
                此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论
                此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论
                此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论
                此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论
                此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论
            </div>
            <div class="video-comment-total">全部</div>
            <div class="video-comment-replay">
                <span class="video-comment-replay-name">伍智回复古风流:</span>
                名画为什么这么值钱名画为什么这么值钱名画为什么这么值钱?
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            praiseNormal:require('../assets/images/onlinecourse_praise_highlight.png'),
            praiseHighlight:require('../assets/images/onlinecourse_praise_normal.png'),
            isPraise:false
        }
    },
    methods:{
        onClickPraise(){
            this.isPraise = !this.isPraise
        }
    }  
}
</script>

<style lang="scss" scoped>
.video-comment-container {
    width: 100%;
    display: flex;
    flex-direction: row;
}
.video-comment-usericon {
   width: 80px;
   height: 80px;
   border-radius: 50%;
   background-color: red; 
   margin-top:40px;
   margin-right: 32px;
   
}
.video-comment-userinfo {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top:48px;
    flex: 1;
    text-align: left;
}
.video-userinfo-top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 24px;
}
.video-userinfo-top-left {
    display: flex;
    flex-direction: row;
    align-items: center;
}
.video-comment-nickname {
    color: rgb(128, 128, 128);
    font-size: 32px; 
    margin-right: 24px;
}
.video-comment-comTime {
    color: rgb(178, 178, 178);
    font-size: 22px; 
}
.video-comment-praise {
    display: flex;
    flex-direction: row;
    align-items: center;
}
.video-comment-praise img {
    height: 40px;
    width: 40px;
}
.video-comment-praise label {
    font-size: 28px;
    color: rgb(255, 163, 47);
}
.video-comment-detail {
    height: 100%;
    font-size: 28px;
    color: rgb(51, 51, 51);
    margin-bottom: 8px;
}
.video-comment-total {
    font-size: 28px;
    color:rgb(255, 149, 33);
    text-align: right;
}
.video-comment-replay {
    margin:20px;
    background-color: rgba(247, 247, 247, 0.5);  
    color: rgb(51, 51, 51);
    font-size: 28px;
}
.video-comment-replay-name {
    font-size: 28px;
    color: rgb(128, 128, 128);
}
</style>



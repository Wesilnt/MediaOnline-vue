<template>
    <div class="cl-courseIntroduce">
        <div class='foldbase' :class=" isFold ? 'fold' : 'extend'" @click="foldFn">
            <p>
                
                主讲人伍智,国学一级教师,代表作蹒跚集累计销量数百万册.
            主讲人伍智,国学一级教师,代表作蹒跚集累计销量数百万册.
            主讲人伍智,国学一级教师,代表作蹒跚集累计销量数百万册.
            主讲人伍智,国学一级教师,代表作蹒跚集累计销量数百万册.
            主讲人伍智,国学一级教师,代表作蹒跚集累计销量数百万册.
            主讲人伍智,国学一级教师,代表作蹒跚集累计销量数百万册.
            主讲人伍智,国学一级教师,代表作蹒跚集累计销量数百万册.
                
            
            </p>
        </div>
        <div class="arrow-icon"><img :src="isFold ? imgUp: imgDown" @click="foldFn"></div>
    </div>
</template>

<script>
    export default {
        name:'CourseIntroduce',
        data(){
            return {
                isFold: true,
                imgUp : require('../assets/images/onlinecourse_arrow_down.png'),
                imgDown : require('../assets/images/onlinecourse_arrow_up.png')
            }
        },
        methods:{
            foldFn() {
               
                this.isFold = !this.isFold
                console.log('123')
            }
        }
    }
</script>

<style lang='scss' scoped>
.cl-courseIntroduce {
    background-color: #fff;

    .foldbase {
        width: 100%;
        background-color: white;
        transition: height .3s linear;
    }
}

.foldbase p {
    // padding: 0 20px;
    font-size: 30px;
    word-wrap:break-word;
}
.fold {
  height: 250px;
  overflow: hidden;
}
.extend {
  height: auto;
  overflow: auto;
}

.arrow-icon {
  position: relative;
  width: 100%;
  height: 120px;
  background:linear-gradient(  
    to bottom,   
    rgba(255,255,255,0.2) 10%,   
    rgba(255,255,255,0.4) 25%,   
    rgba(255,255,255,0.6) 30%,   
    rgba(255,255,255,0.8) 90%,     
    rgba(255,255,255,1) 100%);  
  margin-top: -40px;
}
.arrow-icon img {
  position: absolute;
  width: 50px;
  height: 50px;
  bottom:20px;
  left:50%;
  margin-left: -25px;
}
</style>


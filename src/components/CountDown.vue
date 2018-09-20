<template>
    <div class="qhht-flex countDown-container">
        <span class="time-number">{{times[0]}}</span>
        <span class="time-symbol">:</span>
        <span class="time-number">{{times[1]}}</span>
        <span class="time-symbol">:</span>
        <span class="time-number">{{times[2]}}</span>
    </div>
</template>

<script>
import {startCountDown} from '../utils/utils'
export default {
    name:'CountDown',
    props:['duration'],
    data(){
     return{ 
       countdown:null,
       times:['00','00','00'],}
    },
    created(){
     this.countdown=  startCountDown(this.duration,times=> this.times = times)
    },
    methods:{
      
    },
    beforeDestroy(){
      if(this.countdown) clearInterval(this.countdown)
    }
}
</script>


<style lang="scss" scoped>
.countDown-container {
    flex-direction: row;
    justify-content: center;
}
.time-number {
    width:64px;
    height: 48px;
    background-color: rgb(250, 219, 162);
    border-radius: 8px;
    font-size: 36px;
    color: white;
    text-align: center;
}
.time-symbol {
    background-color:white;
    font-size: 36px;
    color: black;
    text-align: left;
    margin:0 9px;
}
</style>


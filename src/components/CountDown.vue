<template>
    <div class="qhht-flex countDown-container">
        <span class="time-number">23</span>
        <span class="time-symbol">:</span>
        <span class="time-number">27</span>
        <span class="time-symbol">:</span>
        <span class="time-number">05</span>
    </div>
</template>

<script>
export default {
    name:'CountDown'
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


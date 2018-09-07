<template>
    <div>
        <van-swipe :auto="2000">
            <van-swipe-item v-for="(list,index) in images" :key="index">
                <img class="swiperImg" :src="list.url" :alt="list.desc" >
            </van-swipe-item>
        </van-swipe>
    </div>
</template>

<script>
export default {
  props: ['images']
}
</script>

<style lang='less' scoped>
.swiperImg {
  width: 100%;
  height: 46.7vw;
 
}
</style>

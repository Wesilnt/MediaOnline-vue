<template>
    <div class="swiper-wrapper">
        <van-swipe :auto="2000">
            <van-swipe-item v-for="(list,index) in images" :key="index" @click="routerToDetail">
                <img class="swiperImg" :src="list.url" :alt="list.desc" >
            </van-swipe-item>
        </van-swipe>
    </div>
</template>

<script>
export default {
  props: ['images'],
    methods:{
        routerToDetail(){
            this.$router.push({ path: `/user/${userId}` })
        }
    }
}
</script>

<style lang='less' scoped>
.swiper-wrapper {
  margin-bottom: 28px;
}
.swiperImg {
  width: 100%;
  height: 46.7vw;
}
</style>

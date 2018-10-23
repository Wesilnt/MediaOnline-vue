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

</style>

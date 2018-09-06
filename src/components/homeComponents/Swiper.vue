<template>
    <div>
        <mt-swipe :auto='3000'>
            <mt-swipe-item v-for="(list,index) in images" :key='index'>
                <img :src='list.url' :alt='list.desc' >
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
export default {
  props: ['images']
}
</script>

<style lang='less' scoped>
.mint-swipe {
  width: 100%;
  height: 350px;
  img {
    width: 100%;
    height: 350px;
  }
}
</style>

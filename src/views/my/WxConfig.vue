<template>
    <div class="btn-wrapper">
        <van-button type="default" size="large" @click="wxConfig">config</van-button>
        <van-button type="primary" size="large">主要按钮</van-button>
        <van-button type="warning" size="large">警告按钮</van-button>
        <van-button type="danger" size="large">危险按钮</van-button>
    </div>
</template>

<script>
import { wxConfig } from '../../utils/wxConfig'
export default {
  name: 'wxConfig',
    methods:{
        wxConfig:()=>{
            wxConfig()
        }
    }
}
</script>

<style scoped>
    .btn-wrapper{
        margin: 24px;
    }
    .van-button{
        margin-bottom: 12px;
    }
</style>

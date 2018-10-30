<template>
    <div>
        <VideoList v-if="columnType === 'onlineCourse'" />
        <VisionList v-if="columnType === 'onlineVision'" />      
        <Readings v-if="columnType === 'reading'"/>
    </div>
</template>

<script>
import VideoList from './onlineCourse/VideoList'
import VisionList from './onlineVision/VisionList'
import Readings from './readings/Readings'
export default {
    name:'ColumnList',
    data(){
        return{
            columnType:this.$route.params.columnType,
        }
    },
    components:{
        VideoList,
        VisionList,
        Readings
    }
}
</script>

<style lang="scss" scoped>

</style>
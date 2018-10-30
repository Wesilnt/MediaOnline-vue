<template>
    <div>
        <!-- <SkeletonFullScreen  v-if="renderLoading"/> -->
        <!-- <VisionDetail v-if="columnType === 'onlineVision'" /> -->
        <videoColumnDetail v-if="columnType === 'onlineCourse' || columnType === 'onlineVision'" />      
        <BookDetail v-if="columnType === 'reading'"/>
    </div>
</template>

<script>
import videoColumnDetail from './onlineCourse/videoColumnDetail'
import VisionDetail from './onlineVision/VisionDetail'
import BookDetail from './readings/BookDetail'

export default {
    name:'ColumnDetail',
    data(){
        return{
            columnType:this.$route.params.columnType,
        }
    },
    components:{
        videoColumnDetail,
        VisionDetail,
        BookDetail
    },
}
</script>

<style lang="scss" scoped>

</style>



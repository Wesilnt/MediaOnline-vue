<template>
    <div>
        <VisionDetail v-if="columnType === '1003'" />
        <videoColumnDetail v-if="columnType === '1005'" />      
        <BookDetail v-if="columnType === '1007'"/>
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
            columnType:this.$route.params.columnType
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



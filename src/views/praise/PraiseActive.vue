<template>
    <div class="praise-active">
        <!-- <div v-for="(item,i) of picList" :key="i" class="active-item">
            <img :src="item">
        </div> -->
        <div class="active-item" v-lazy:background-image="`${introBgUrl}?imageView2/1/format/jpg`" :style="{marginBottom:!isNewUser?'48px':'0px'}"></div>
        <div class="help-btn" @click="toHelp">为TA助力，免费领取《{{courseName}}》
        </div>
    </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState,mapMutations, mapActions, mapGetters } = createNamespacedHelpers('praiseData')
export default {
  data() {
    return {
      columnType:this.$route.params.columnType,
      courseId: this.$route.params.courseId,
      collectLikeId: this.$route.params.collectLikeId,
      startUserName: this.$route.query.startUserName,
      startAvatar: this.$route.query.startAvatar,
      isNewUser:false
    }
  },
  computed: { ...mapState(['userId','introBgUrl', 'courseName','praiseDetail','isPraised']) },
  created() {
    let response = this.checkStatus({ collectLikeId: this.collectLikeId,columnType:this.columnType,startUserName:this.startUserName,startAvatar:this.startAvatar })
    if(response)response.then(()=>{
       this.isNewUser = this.userId == this.praiseDetail.starterUid||this.isPraised
       if(this.isNewUser) this.toHelp()
    })
  },
  methods: {
    ...mapMutations(['destroyInterval','bindColumnType']),
    ...mapActions(['checkStatus','getUserByToken','getCollectDetail']),
    toHelp() {
      this.$router.replace({
        name: 'Praise',
        params: { 
                  columnType:this.columnType,
                  courseId: this.courseId, 
                  collectLikeId: this.collectLikeId 
              },
          query:{
              startUserName:this.startUserName,
              startAvatar:this.startAvatar
          }
      })
    }
  },
  beforeDestroy(){
    this.destroyInterval()
  }
}
</script>
<style lang="scss" scoped>
.active-item { 
  width: 100%; 
  background-size: 100%;
}
.help-btn {
  background-color: rgb(255, 163, 47);
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  border: 0px solid transparent;
  border-radius: 0;
  color: white;
  padding: 10px 0;
  font-size: 30px;
  outline: none;
  height: 96px;
  line-height: 96px;
}
</style>

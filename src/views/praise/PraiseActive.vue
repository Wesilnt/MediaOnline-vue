<template>
    <div class="praise-active">
        <div v-for="(item,i) of picList" :key="i" class="active-item">
            <img :src="item">
        </div>
        <div class="help-btn" @click="toHelp">
            为TA助力，免费领取《{{courseName}}》
        </div>
    </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState,mapMutations, mapActions, mapGetters } = createNamespacedHelpers('praise')
export default {
  data() {
    return {
      courseId: this.$route.params.courseId,
      collectLikeId: this.$route.params.collectLikeId
    }
  },
  computed: { ...mapState(['userId','picList', 'courseName','praiseDetail','isPraised']) },
  created() {
    let response = this.checkoutAuthorrization({ collectLikeId: this.collectLikeId })
    if(response)response.then(()=>{
       if(this.userId == this.praiseDetail.starterUid||this.isPraised){
         this.toHelp()
       }
    })
    // this.checkStatus({ collectLikeId: this.collectLikeId }) 
    // this.getCollectDetail({ collectLikeId: this.collectLikeId })
    // .then(()=>{
    //    if(this.userId == praiseDetail.starterUid||this.isPraised){
    //      this.toHelp()
    //    }
    // })
  },
  methods: {
    ...mapMutations(['destroyInterval']),
    ...mapActions(['checkoutAuthorrization','checkStatus','getUserByToken','getCollectDetail']),
    toHelp() {
      this.$router.replace({
        name: 'Praise',
        params: { courseId: this.courseId, collectLikeId: this.collectLikeId },
        replace:true
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
  display: flex;
  flex-direction: column;
  width: 100%;
  img {
    width: 100%;
  }
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

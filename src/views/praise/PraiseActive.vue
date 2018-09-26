<template>
    <div class="praise-active">
        <div v-for="(item,i) of picList" :key="i" class="active-item">
            <img :src="item">
        </div>
        <div class="help-btn" @click="toHelp">
            为TA助力，免费领取{{courseName}}
        </div>
    </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions, mapGetters } = createNamespacedHelpers('praise')
export default {
  data() {
    return {
      courseId: this.$route.params.courseId,
      collectLikeId: this.$route.params.collectLikeId
    }
  },
  computed: { ...mapState(['picList', 'courseName']) },
  created() {
    this.checkStatus({ collectLikeId: this.collectLikeId })
  },
  methods: {
    ...mapActions(['checkStatus']),
    toHelp() {
      this.$router.push({
        name: 'Praise',
        params: { courseId: this.courseId, collectLikeId: this.collectLikeId }
      })
    }
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

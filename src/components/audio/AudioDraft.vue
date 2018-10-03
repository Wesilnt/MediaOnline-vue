<template>
    <div class="detail-container">
      <div class="draft-content" v-html="draftContent.manuscript"/>
    </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapState } = createNamespacedHelpers('audiotaskData/audioData')
export default {
  data() {
    return {
      lessonId: this.$route.params.lessonid
    }
  },
  computed: {
    ...mapState(['draftContent'])
  },
  created() {
    this.getAudioDesc(this.lessonId)
  },
  methods: {
    ...mapActions(['getAudioDesc'])
  }
}
</script>
<style lang='scss'>
.detail-container {
  font-size: 32px;
  color: rgb(51, 51, 51);
  padding: 0 40px;

  .detail-text {
    line-height: 56px;
    word-break: break-all;
    word-wrap: break-word;
    word-spacing: 2px; /*no*/
    letter-spacing: 2px; /*no*/
    margin: 60px 0;
    box-sizing: content-box;
  }
  img {
    width: 100%;
    margin: 40px 0;
  }
}
</style>

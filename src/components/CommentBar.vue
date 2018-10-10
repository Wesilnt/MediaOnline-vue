<template>
    <van-popup
            v-model="showPop"
            position="bottom"
            class="popup-comment"
            overlay-class="popup-comment-modal"
            @click-overlay="closePopup"
            :lazy-render="false"
    >
       
        <div class="qhht-flex commentBar-wrapper" >
            <a class="qhht-icon commentBar-btn" :style="{backgroundImage:`url('${iconLeft}')`}" @click="toggleRecord"></a>

            <div class="commentBar-inputer" >
                <div class="voiceRecord" ref="voiceRecord"  v-show="record">
                    录音测试
                </div>
                <textarea v-show="!record" v-focus ref="textarea" @input="checkRows" @keyup.enter="closePopup" :rows="rows" class="commentBar-textarea"  placeholder="输入评论" autofocus></textarea>
            </div>
            <a class="qhht-icon commentBar-btn" :style="{backgroundImage:`url('${iconRight}')`}" @click="closePopup"></a>
        </div>
    </van-popup>
</template>

<script>
import { mapActions } from 'vuex'
import default_left_icon from '../assets/images/audio_cmt_speak.png'
import default_right_icon from '../assets/images/audio_cmt_text.png'

export default {
  name: 'CommentBar',
  props: {
    show: {
      default: false
    },
    iconLeft: {
      default: default_left_icon
    },
    iconRight: {
      default: default_right_icon
    }
  },
  data: function() {
    return {
      value: '',
      showPop: false,
      rows: 1,
      record: false,
      recordTime: 0,
      touchStartTime: 0
    }
  },
  directives: {
    focus: function(el) {
      el.focus()
    }
  },
  watch: {
    show: function(show) {
      this.showPop = show
    }
  },
  methods: {
    ...mapActions(['registerWxConfig']),
    handleRegisterWxConfig: function() {
      const { fullPath } = this.$route
      this.registerWxConfig({
        fullPath,
        jsApiList: [
          'startRecord',
          'stopRecord',
          'onVoiceRecordEnd',
          'playVoice',
          'pauseVoice',
          'stopVoice',
          'onVoicePlayEnd',
          'uploadVoice',
          'translateVoice'
        ]
      })
    },
    checkRows: function(el) {
      const { target } = el
      let inputerWidth = 0
      for (let codePoint of target.value) {
        const code = codePoint.codePointAt()
        if (code >= 19968 && code <= 40869) {
          inputerWidth += 2
        } else {
          inputerWidth += 1
        }
      }
      if (this.rows !== 3 && inputerWidth >= 31) this.rows = 3
      if (this.rows !== 1 && inputerWidth < 31) this.rows = 1
    },
    closePopup: async function() {
      const { textarea } = this.$refs
      const { value } = textarea
      this.$emit('toggle', false, value ? value : undefined)
      textarea.value = ''
    },
    toggleRecord() {
      this.record = !this.record
    },
    touchstart() {
      console.log('start')
      wx.startRecord()
      this.touchStartTime = new Date()
    },
    touchend() {
      console.log('end')
      this.recordTime = new Date() - this.touchStartTime
      console.log(this.recordTime)
      wx.stopRecord({
        success: function(res) {
          const { localId } = res
          wx.playVoice({
            localId // 需要播放的音频的本地ID，由stopRecord接口获得
          })
        }
      })
    }
  },
  mounted() {
    this.handleRegisterWxConfig()
    window.addEventListener('contextmenu', function(e) {
      e.preventDefault()
    })
    console.log(this.$refs.voiceRecord)
    this.$refs.voiceRecord.addEventListener('touchstart', this.touchstart)
    this.$refs.voiceRecord.addEventListener('touchend', this.touchend)
  }
}
</script>

<style lang="less">
.popup-comment {
  position: fixed;
  left: 50%;
  bottom: 0;
  width: 100%;
  background: transparent;
}
.popup-comment-modal {
  background: transparent;
}
.commentBar-wrapper {
  height: 100%;
  width: 100%;
  padding: 0 24px;
  background-color: #fff;
  border: none;
  border-top: 1px solid #d4d4d4;
}
.commentBar-btn {
  width: 60px;
  height: 60px;
}
.commentBar-inputer {
  padding: 12px 24px;
  flex-grow: 1;
}
.commentBar-textarea {
  width: 100%;
  border: none;
  min-height: 32px;
  border-bottom: 1px solid #ddd;
  margin-bottom: -12px;
  font-size: 30px;
  padding: 6px 12px;
  /*background: #ddd;*/
}
.voiceRecord {
  border-radius: 80px;
  line-height: 80px;
  background-color: #20c997;
  color: #fff;
  text-align: center;
  user-select: none;
  -webkit-touch-callout: none;
}
</style>

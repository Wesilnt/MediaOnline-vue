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
            <a class="qhht-icon commentBar-btn" :style="{backgroundImage:`url('${record?iconInputer:iconSpeaker}')`}" @click="toggleRecord"></a>
            <div class="commentBar-inputer" >
                <div class="voiceRecord" :class="{'voiceRecord-touched':touched}" ref="voiceRecord"  v-show="record">
                   {{touched?'松开 结束':'按住 说话'}}
                    <span class="voiceRecord-progress" :style="{width:`${recordProgress}%`}">{{recordTime}}</span>
                </div>
                <textarea v-show="!record" v-focus ref="textarea" @input="checkRows" @keyup.enter="closePopup" :rows="rows" class="commentBar-textarea"  placeholder="写评论" autofocus></textarea>
            </div>
            <a v-show="(!record || recordTime>0) && !touched" class="qhht-icon commentBar-btn" :style="{backgroundImage:`url('${iconSubmit}')`}" @click="submit"></a>
            <!--<a class="commentBar-submit" @click="closePopup">发送</a>-->
        </div>
    </van-popup>
</template>

<script>
import default_speaker_icon from '../assets/images/audio_cmt_speak.png'
import default_inputer_icon from '../assets/images/audio_cmt_text.png'
import default_submit_icon from '../assets/images/comment-submit.png'

const MAXRECORD = 60
let inter = null
let touchStartTime = 0
export default {
  name: 'CommentBar',
  props: {
    show: {
      default: false
    },
    iconSpeaker: {
      default: default_speaker_icon
    },
    iconInputer: {
      default: default_inputer_icon
    },
    iconSubmit: {
      default: default_submit_icon
    }
  },
  data: function() {
    return {
      value: '',
      showPop: false,
      rows: 1,
      record: false,
      touched: false,
      recordTime: 0
    }
  },
  directives: {
    focus: function(el) {
      el.focus()
    }
  },
  computed: {
    recordProgress: function() {
      return (this.recordTime / MAXRECORD) * 100
    }
  },
  watch: {
    show: function(show) {
      this.showPop = show
    }
  },
  methods: {
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
    closePopup: function() {
      this.$emit('toggle', false)
    },
    submit: function() {
      const { textarea } = this.$refs
      const { value } = textarea
      if (this.record && this.recordTime === 0) {
        return this.$toast('请录入语音')
      }
      if (!this.record && !value) {
        return this.$toast('请输入内容')
      }
      this.$emit('toggle', false, this.record ? this.recordTime : value)
      textarea.value = ''
      this.recordTime = 0
    },
    toggleRecord() {
      this.record = !this.record
    },
    intervalRocrdTime() {
      this.recordTime = 0
      inter = setInterval(() => {
        this.recordTime++
      }, 1000)
    },
    touchstart() {
      this.intervalRocrdTime()
      this.touched = true
      wx.startRecord()
    },
    touchend() {
      clearInterval(inter)
      this.touched = false
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
.qhht-icon {
  &.commentBar-btn {
    width: 56px;
    height: 56px;
  }
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
.commentBar-submit {
  width: 96px;
  padding: 4px 0;
  text-align: center;
  border-radius: 12px;
  background-color: #4caf50;
  color: #fff;
}
.voiceRecord {
  position: relative;
  border-radius: 72px;
  line-height: 72px;
  background-color: #20c997;
  color: #fff;
  text-align: center;
  overflow: hidden;
  user-select: none;
  -webkit-touch-callout: none;
  .voiceRecord-progress {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0,0,0,.18);
  }
  &.voiceRecord-touched {
    background-color: #1da176;
  }
}
</style>

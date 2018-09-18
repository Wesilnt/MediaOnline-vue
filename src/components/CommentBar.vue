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
            <a class="qhht-icon commentBar-btn" :style="{backgroundImage:`url('${iconLeft}')`}"></a>
            <div class="commentBar-inputer">
                <textarea v-focus ref="textarea" @input="checkRows" :rows="rows" class="commentBar-textarea"  placeholder="输入评论" autofocus></textarea>
            </div>
            <a class="qhht-icon commentBar-btn" :style="{backgroundImage:`url('${iconRight}')`}" @click="closePopup"></a>
        </div>
    </van-popup>
</template>

<script>
import default_left_icon from '../assets/audio_cmt_speak.png'
import default_right_icon from '../assets/audio_cmt_text.png'

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
      rows: 1
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
    checkRows: function(el) {
      const { target } = el
      let inpuerWidth = 0
      for (let codePoint of target.value) {
        const code = codePoint.codePointAt()
        if (code >= 19968 && code <= 40869) {
          inpuerWidth += 2
        } else {
          inpuerWidth += 1
        }
      }
      if (this.rows !== 3 && inpuerWidth >= 31) this.rows = 3
      if (this.rows !== 1 && inpuerWidth < 31) this.rows = 1
    },
    closePopup: async function() {
      const { textarea } = this.$refs
      const { value } = textarea
      this.$emit('toggle', false, value ? value : undefined)
      textarea.value = ''
    }
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
</style>

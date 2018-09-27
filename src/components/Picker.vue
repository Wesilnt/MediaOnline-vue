<template>
    <van-popup v-model="isShow" position="bottom" >
        <van-picker
                show-toolbar
                :columns="columns"
                @confirm="onConfirm"
                @cancel="onCancel"
        />
    </van-popup>
</template>

<script>
import default_left_icon from '../assets/audio_cmt_speak.png'
import default_right_icon from '../assets/audio_cmt_text.png'

export default {
  name: 'Picker',
  props: {
    columns: {
      default: []
    },
    isShow: {
      default: false
    }
  },
  data: function() {
    return {}
  },
  methods: {
    onConfirm(value, index) {
      this.$emit('toggle', value)
    },
    onCancel() {
      console.log("cancel")
      this.$emit('changePicker', false)
    }
  }
}
</script>

<style lang="less">
.van-picker {
  height: 250px;
}
.van-hairline--top-bottom van-picker__toolbar {
    padding-bottom: 10px;
}
.van-picker__cancel {
    margin: 5px 10px 0px 10px;
    border-radius: 5px;
    background-color: white;
    color:#ffa32f;
    border: 0.3px solid #ffa32f;
}
.van-picker__confirm {
    background-color: #ffa32f;
    margin: 5px 10px 0px 0px;
    padding-bottom: 5px;
    border-radius: 5px;
    border-radius: 5px;
    color:white;

}
.van-picker__columns {
    overflow: hidden;
}
.van-picker-column {
    overflow: visible;
}
.van-picker-column__item {
  width: 100vw;
}
</style>

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
        default:[]
      },
      isShow: {
        default: false
      }
    },
    data: function() {
      return {
      }
    },
    methods: {
      onConfirm(value, index) {
        this.$emit('toggle', value)
      },
      onCancel() {
        this.$emit('changePicker', false)
      }
    }
  }
</script>

<style lang="less">
    .van-picker {
        height: 250px;
    }
    .van-picker-column__item {
        width: 100vw

    }
    .van-picker-column{
        overflow: visible;
    }

</style>

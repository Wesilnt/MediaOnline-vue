<template xmlns="http://www.w3.org/1999/html">
    <div>
        <div class="record-head">

            <div class="last-record-text">最近学习</div>

                <img class="head-left-icon" src="../../assets/images/onlinecourse_arrow_down.png"/>
            <div>
                <img class="head-right-icon" src="../../assets/images/my_sys_menu.png"/>
            </div>
        </div>

        <div v-for="item in list" :key="item.name">
            <div class="record-item">
                <img src="" class="avatar"/>

                <div class="div-content">
                    <div class="name">{{item.name}}</div>
                    <div class="content">{{item.readto}}</div>
                    <div class="content">{{item.updateto}}</div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Purchase',
  components: {
    // NavBar
  },
  data: function() {
    return {
      list: [
        {
          name: '中华五千年（上）1',
          readto: '播放至：018 夏商周 | 王位应该传给谁',
          updateto: '播放至：080 夏商周 | 王位应该传给谁'
        },
        {
          name: '中华五千年（上）2',
          readto: '播放至：018 夏商周 | 王位应该传给谁',
          updateto: '播放至：080 夏商周 | 王位应该传给谁'
        },
        {
          name: '中华五千年（上）3',
          readto: '播放至：018 夏商周 | 王位应该传给谁',
          updateto: '播放至：080 夏商周 | 王位应该传给谁'
        },
        {
          name: '中华五千年（上）4',
          readto: '播放至：018 夏商周 | 王位应该传给谁',
          updateto: '播放至：080 夏商周 | 王位应该传给谁'
        }
      ]
    }
  },
  methods: {}
}
</script>

<style scoped>
.record-head {
  padding: 20px;
  display: flex;
  flex-direction: row;
}

.head-left-icon {
  width: 30px;
  height: 30px;
  margin: 30px 20px 20px 20px;
}

.head-right-icon {
  width: 42px;
  height: 39px;
  margin: 30px 30px 0px 0px;
  position: absolute;
  right: 30px;
}

.last-record-text {
  padding: 20px 8px 0px 0px;
  font-size: 36px;
  color: #3e3e53;
}

.record-item {
  width: 100%;
  height: 300px;
  padding: 30px;
  display: flex;
  flex-direction: row;
  border-top: 1px solid #ddd;
}
.avatar {
  width: 150px;
  height: 200px;
  background-color: #fde7e7;
  border-radius: 12px;
  margin: 30px 0px 0px 0px;
}
.div-content {
  flex-grow: 1;
  padding: 20px;
}

.name {
  padding: 6px 0px 0px 0px;
  font-size: 28px;
  color: #57668f;
}

.content {
  font-size: 28px;
  color: #111111;
  padding: 20px 30px 22px 0px;
}

.img-more {
  width: 34px;
  height: 6px;
  margin: 59px 30px 0px 0px;
  /*position: absolute;*/
  /*right: 30px;*/
}
</style>

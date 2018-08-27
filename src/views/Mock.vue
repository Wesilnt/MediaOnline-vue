<template>
  <div class="home">
    <h1>Mock</h1>
    <p>此处引入 <a href="https://jsonplaceholder.typicode.com">https://jsonplaceholder.typicode.com</a>做例，fetch数据，处理vuex Action异步函数</p>
    <div class="mock-container"  :class="{loading:loading}">
      <div class="navbar" >
        <div v-for="item in tabs" :key="item" class="nav" :class="{activeBar:show===item}" @click="toggleBar(item)">
          {{item}}
        </div>
      </div>
      <div class="bar-container">
        <div v-for="item in tabs" :key="item" class="list" :class="{active:show===item}">
            <template v-if="show === 'photo'">
              <div v-for="listItem in photoList" :key="listItem.id" class="photoWraper">
                <div class="photo_img">
                  <img :src="listItem.thumbnailUrl" :alt="listItem.title">
                </div>
                <h4 class="photo_title">{{listItem.title}}</h4>
              </div>
            </template>
            <template v-else-if="show === 'post'">
              <div v-for="listItem in postList" :key="listItem.id">
                <h3>{{listItem.id}}.{{listItem.title}}</h3>
                <h5>{{listItem.body}}</h5>
              </div>
            </template>
            <template v-else>
              <div v-for="listItem in albumList" :key="listItem.id"><h4 class="photo_title">{{listItem.title}}</h4></div>
            </template>
        </div>
      </div>

    </div>
  </div>

</template>

<script>
// @ is an alias to /src
import { createNamespacedHelpers } from "vuex";
const {
  mapState,
  mapMutations,
  mapGetters,
  mapActions
} = createNamespacedHelpers("mocker");

export default {
  name: "mock",
  data: function() {
    return {
      tabs: ["photo", "album", "post"],
      show: "photo"
    };
  },
  computed: {
    ...mapState(["postList", "albumList", "photoList", "loading"])
  },
  created() {
    this.$store.dispatch("mocker/queryList", {
      type: `${this.show}List`
    });
  },
  methods: {
    ...mapActions(["queryList"]),
    toggleBar: function(show) {
      this.show = show;
      this.queryList({
        type: `${show}List`
      });
    }
  }
};
</script>

<style  lang="scss">
img {
  display: inline-block;
  width: 100%;
}
.mock-container {
  position: relative;
  margin: 24px 10%;
  overflow: hidden;
  border-radius: 4px;
  background: #f7f7f7;
  min-height: 320px;
  &:before {
    display: none;
    content: "loading";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding-top: 200px;
    background: rgba(255, 255, 255, 0.8);
    font-size: 24px;
    font-weight: 900;
    color: #000;
    text-align: center;
  }
  &.loading{
    &:before{
      display: block;
    }
  }
}
.navbar {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
}
.nav {
  flex-grow: 1;
  text-align: center;
  padding: 12px;
  cursor: pointer;
  color: #666;
  background: rgba(255, 235, 59, 0.34901960784313724);
  transition: all 0.4s cubic-bezier(0.1, 0.38, 0.49, -0.06);
  &.activeBar {
    color: #fff;
    background: #ffc107;
  }
}
.bar-container {
  padding: 24px;
}
.list {
  display: none;
  justify-content: space-between;
  align-items: center;
}
.active {
  display: initial;
}
.photoWraper {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
}
.photo_img {
  width: 64px;
}
</style>

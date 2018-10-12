<template>
    <section>
        <div class="lazy-img-most skeleton-giant" v-lazy:background-image="null"></div>
        <div  v-for="row in 3" :key="row">
            <div class="skeleton-container">
                <i class="qhht-icon skeleton-avatar" v-lazy:background-image="null"></i>
                <div class="skeleton-paragraphs" >
                    <p  class="skeleton-header skeleton-paragraph active">
                    </p>
                    <p v-for="p in 3" :key="p" class="skeleton-paragraph active"></p>
                </div>
            </div>
        </div>
        <div class="qhht-flex skeleton-grid">
            <i v-for="item in 4" class="qhht-icon skeleton-grid-item"  v-lazy:background-image="null"></i>
        </div>
    </section>
</template>
<script>
/*全屏展位图 无数据或者加载数据时使用 */
export default {
  name: 'SkeletonFullScreen'
}
</script>
<style scoped lang="less">
@color: #e0e0e0;
.skeleton-container {
  display: flex;
  padding: 24px 32px;
  border-radius: 4px;
  overflow: hidden;
  background-color: #fff;
}
.skeleton-giant {
  height: 360px;
    margin-bottom: 20px;
  background: #fff center no-repeat;
}
.skeleton-avatar {
  width: 160px;
  height: 200px;
  border-radius: 8px;
  margin-right: 32px;
}
.skeleton-paragraphs {
  flex-grow: 1;
  padding-top: 16px;
}
.skeleton-paragraph {
  height: 18px;
  margin-bottom: 20px;
  background: @color;
  border-radius: 4px;
  &:last-child {
    margin-bottom: 0;
    width: 60%;
  }
  .skeleton-header& {
    width: 140px;
    margin-bottom: 32px;
  }
}
.active {
  background: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 37%, #f2f2f2 63%);
  animation: ant-skeleton-loading 1.4s ease infinite;
  background-size: 400% 100%;
}
.skeleton-grid {
  flex-wrap: wrap;
  padding: 24px;
  &-item {
    width: 20vw;
    height: 20vw;
  }
}
@keyframes ant-skeleton-loading {
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}
</style>

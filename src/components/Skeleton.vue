<template>
    <section v-if="loading">
        <div  v-for="row in rows" :key="row">
            <div class="skeleton-container">
                <i class="qhht-icon skeleton-avatar" :class="{active:active}"></i>
                <div class="skeleton-paragraphs" >
                    <p  class="skeleton-header">
                        <slot>
                        <div class="skeleton-paragraph" :class="{active:active}"></div>
                    </slot>
                    </p>
                    <p v-for="p in paragraphs" :key="p" class="skeleton-paragraph" :class="{active:active}"></p>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
/*展位图 无数据或者加载数据时使用 */
export default {
  name: 'Skeleton',
  props: {
    active: {
      // 是否有动画
      default: false,
      type: Boolean
    },
    avatar: {
      //  是否显示头像
      default: true,
      type: Boolean
    },
    loading: {
      default: false, // 是否展示展位图
      type: Boolean
    },
    rows: {
      default: 3 // Skeleton个数
    },
    paragraphs: {
      default: 4 // 段落数
    }
  }
}
</script>
<style scoped lang="less">
@color: #e0e0e0;
.skeleton-container {
  display: flex;
  padding: 32px;
  margin-bottom: 40px;
  border-radius: 4px;
  overflow: hidden;
  background-color: #fff;
}
.skeleton-avatar {
  background-color: @color;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  margin-right: 32px;
}
.skeleton-paragraphs {
  flex-grow: 1;
}
.skeleton-header {
  margin-bottom: 20px;
  width: 60%;
  font-size: 30px;
  font-weight: 700;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #c3c3c3;
  .skeleton-paragraph {
    width: 40%;
  }
}
.skeleton-paragraph {
  height: 24px;
  margin-bottom: 20px;
  background: @color;
  border-radius: 4px;
  &:last-child {
    margin-bottom: 0;
    width: 60%;
  }
}
.active {
  background: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 37%, #f2f2f2 63%);
  animation: ant-skeleton-loading 1.4s ease infinite;
  background-size: 400% 100%;
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

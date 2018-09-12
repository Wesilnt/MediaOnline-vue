<template>
    <section>
        <div v-for="row in rows" :key="row">
            <div class="skeleton-container">
                <i class="qhht-icon skeleton-avatar"></i>
                <div class="skeleton-paragraph">
                    <p v-for="row in rows" :key="row"></p>
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
      default: true,
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
      default: 3, // 是否展示展位图
      type: Number
    },
      paragraphs: {
          default: 4, // 是否展示展位图
          type: Number
      },
  }
}
</script>
<style scoped lang="less">
@color: #d0d0d0;
.skeleton-container {
  display: flex;
  padding: 32px;
  margin-bottom: 40px;
  background-color: #fff;
}
.skeleton-avatar {
  background-color: @color;
  width: 64px;
  height: 64px;
  border-radius: 50%;
}
</style>

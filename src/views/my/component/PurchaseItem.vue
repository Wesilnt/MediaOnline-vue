<template>
  <div class="purchase-item">
    <div class="qhht-flex">
      <h3 class="purchase-item-title">{{title}}</h3>
      <span @click="displayMore">{{list.length > 3 ? '已展示全部': `查看全部${total}个`}}</span>
    </div>
    <ul :class="{'display-grid':grid}">
      <li v-for="item in list" :key="item.id" class="qhht-flex purchase-list-cell" @click="routerToDetail(item)">
        <div class="purchase-item-avatar"  v-lazy:background-image="item.coverPic || item.coverPicV "></div>
        <dl class="purchase-item-text">
          <dt class="purchase-list-cell-title">{{item.name}}</dt>
          <dd class="purchase-list-cell-info">播放至：{{item.lastViewLessonTitle}}</dd>
          <dd class="purchase-list-cell-info">更新至：{{item.newestLessonTitle}}</dd>
        </dl>
      </li>
    </ul>
  </div>

</template>
<script>
import { columnType } from '../../../utils/config'
export default {
  name: 'PurchaseItem',
  props: ['type', 'title', 'total', 'list', 'grid'],
  methods: {
    onItemClick() {
      if (this.type === '1003' || this.type === '1007') {
        this.$router.push({
          path: '/home/visionDetail/' + this.purchase - item.id
        })
      } else {
        this.$router.push({
          name: 'videoCourseDetail',
          params: { lessonId: this.purchase - item.id }
        })
      }
    },
    routerToDetail({ id }) {
      this.$router.push({ path: `/${columnType[this.type]}${id}` })
    },
    displayMore() {
      if (this.list.length > 3) {
        this.$emit('toggle', {currentType: this.type, currentPage: 1, pageSize: 3})
      } else {
        this.$emit('toggle', {currentType: this.type, currentPage: 1, pageSize: 100 })
      }
    },
  }
}
</script>
<style lang="less" scoped>
.purchase-item {
  padding: 30px;
  letter-spacing: 1px;
  background: #fff;
  margin-top: 18px;
  &-title {
    font-size: 36px;
    color: #3e3e53;
  }
  &-avatar {
    width: 150px;
    height: 200px;
    border-radius: 8px;
    background: #f6f6f6 center/100% no-repeat;
    /*transition: all .1s linear;*/
  }
  &-text {
    flex-grow: 1;
    margin-left: 20px;
  }
}
.purchase-list-cell {
  margin-top: 40px;
  &-title {
    font-size: 28px;
    margin-bottom: 24px;
    max-width: 520px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #333;
    & + dd {
      margin-bottom: 30px;
    }
  }
  &-info {
    margin: 0;
  }
}
.display-grid {
  display: flex;
  flex-wrap: wrap;
  .purchase-list-cell {
    display: block;
    margin-right: 51px;
    &:nth-child(3n) {
      margin-right: 0;
    }
    &-title {
      margin: 0;
      max-width: 196px;
      font-weight: normal;
    }
    &-info {
      display: none;
    }
  }
  .purchase-item {
    &-avatar {
      width: 196px;
      height: 257px;
    }
    &-text {
      margin: 0;
      margin-top: 20px;
    }
  }
}
</style>

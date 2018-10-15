<template>
    <section>
        <div class="purchase-nodata" v-if="noPurChaseData">
            <i class="qhht-icon purchase-nodata-icon"></i>
            <p class="purchase-nodata-warn">亲，您还没有购买</p>
        </div>
        <div v-else class="purchase">
            <div class="qhht-flex purchase-item purchase-head" @click="handleSortToggle">
                <div class="purchase-head-btn-sort">{{purchaseSortType[orderBy]}}</div>
                <i class="purchase-head-btn-listDisplay" :class="{gridDisplay:isGridDisplay}" @click="handleMenuToggle"></i>
            </div>
            <PurchaseItem  v-for="list in Object.entries(lists)" :key="list[0]" :title="purchaseQueryType[list[0]]" :total="totalCounts[list[0]]" :list="list[1]" :grid="isGridDisplay" :type="list[0]" v-on:toggle="toggle"/>
        </div>
    </section>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import PurchaseItem from './component/PurchaseItem'
import { purchaseQueryType, purchaseSortType } from '../../utils/config'
import {log} from "../../store/module/typeData";
const { mapState, mapActions, mapGetters } = createNamespacedHelpers(
  'myPurchaseData'
)
export default {
  name: 'Purchase',
  components: {
    PurchaseItem
  },
  data: function() {
    return {
      purchaseQueryType,
      purchaseSortType,
      orderBy: Object.keys(purchaseSortType)[0],
      isGridDisplay: false
    }
  },
  watch: {
    orderBy: {
      handler: 'getAllPurchase',
      immediate: true
    }
  },
  computed: {
    ...mapState(['lists', 'totalCounts', 'loading']),
    ...mapGetters(['noPurChaseData'])
  },
  methods: {
    ...mapActions(['queryListItem']),
    getAllPurchase: function() {
      const { orderBy } = this
      Object.keys(purchaseQueryType).forEach(type => {
        this.queryListItem({ orderBy, type, currentPage:1, pageSize:3 })
      })
    },
    toggle: function({currentType, currentPage, pageSize}) {
      const { orderBy } = this
      Object.keys(purchaseQueryType).forEach(type => {
        if(type === currentType) {
          this.queryListItem({orderBy, type, currentPage, pageSize})
        }
      })
    },
    handleSortToggle: function() {
      this.orderBy = this.orderBy === 'lastLearn' ? 'lastBought' : 'lastLearn'
    },
    handleMenuToggle: function() {
      // 横竖显示切换
      this.isGridDisplay = !this.isGridDisplay
    },
  }
}
</script>

<style scoped lang="less">
.purchase {
  background: #f4f4f4;
  color: #666;
  &-head {
    padding: 20px 30px;
    font-size: 28px;
    font-weight: bolder;
    background: white;
    border-bottom: 1px solid #e3e3e3;
    &-btn-sort {
      width: 150px;
      background: url('../../assets/images/arrow_down.png') right
        center/30px no-repeat;
    }
    &-btn-listDisplay {
      display: inline-block;
      width: 60px;
      height: 30px;
      background: url('../../assets/images/my_menu_list.png') right center/30px
        no-repeat;
      &.gridDisplay {
        background-image: url('./../../assets/images/my_menu_grid.png');
      }
    }
  }
  &-container {
    background: white;
    margin-top: 18px;
    padding: 0px 0px 40px 0px;
    &-head {
      font-size: 44px;
      font-weight: bold;
      padding: 40px 0px 40px 30px;
    }
  }
  &-nodata {
    height: 100vh;
    text-align: center;
    color: #949aaa;
    &-icon {
      width: 180px;
      height: 200px;
      margin-top: 180px;
      background-image: url('../../assets/images/my_data_empty.png');
    }
    &-warn {
      margin: 40px 0;
    }
  }
}
.list {
  flex-wrap: wrap;
  padding: 30px;
}
</style>

<template>
    <div class="transfer-detail">
        <!--布局-->
        <main class="transfer-content">
            <h4 class="transfer-content-title">
                <hr class="title-line">
                2018
                <hr class="title-line">
            </h4>
            <ul class="transfer-content-list">
                <li class="transfer-content-item" v-for="item of transferList" :key="item.id">
                    <aside>{{item.datetime | formatDuring}}</aside>
                    <aside class="item-text">
                        {{item.isAdd?'+':'-'}} <span>{{item.profit.toFixed(2)}}</span>元
                    </aside>
                </li>
            </ul>
        </main>

        <!--底部描述-->
        <footer class="transfer-detail-footer" @click="onLoadMore">
            <p v-show="isLoading">加载中</p>
            <p v-show="!isLoading">{{finished?'无更多转账明细':'查看更多'}}</p>
        </footer>

    </div>
</template>

<script>
    import { createNamespacedHelpers } from 'vuex'
    const { mapState, mapActions } = createNamespacedHelpers('distributionData')
    export default {
        data() {
            return {}
        },
        created() {
            this.getTransferDetail();
        },
        filters: {
            formatDuring: date => {
                let mss = new Date(date)
                let month = mss.getMonth()
                let day = mss.getDate()
                return `${month < 9 ? '0' + month : month}月${day < 9 ? '0' + day : day}日`
            }
        },
        computed: { ...mapState(['isDistributor', 'transferList', 'isLoading', 'finished']) },
        methods: {
            ...mapActions(['getTransferDetail', 'onDestroy']),
            onLoadMore() {
                if(!this.isLoading && !this.finished){
                    //TODO 分页加载
                }
            }
        },
        beforeDestroy() {
            this.onDestroy();
        }
    };
</script>

<style lang="less" scoped>
    .transfer-detail {
        font-size: 26px;
        text-align: center;
        color: #808080;
        &-footer {
            font-size: 24px;
            color: #cccccc;
        }
    }

    .transfer-content {
        margin: 40px 0;
        font-size: 26px;
        color: #333333;
        &-title {
            display: inline-flex;
            align-items: center;
            color: #808080;
            margin-bottom: 40px;
            font-weight: 500;
            .title-line {
                margin: auto 32px;
                width: 48px;
                border: 0;
                height: 1px; /*no*/
                background-color: #e3e3e3;
            }
        }
        &-list {
            text-align: left;
        }
        &-item {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            margin: 0 30px 56px;
        }
        .item-text span {
            color: #ffa32f;
        }
    }
</style>
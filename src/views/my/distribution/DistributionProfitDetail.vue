<template>
    <div class="distribution-profit">
        <!--头部-->
        <header class="distribution-profit-header" @click="toTransferDetail">
            <h4>累计收益 (元)</h4>
            <h3 class="profit-coin">{{totalIncome&&totalIncome.toFixed(2)}}<i></i></h3>
            <dd>包含待结算{{noSettlement&&noSettlement.toFixed(2)}}元</dd>
        </header>

        <!--布局-->
        <main class="profit-main">
            <ul class="profit-main-list">
                <li v-for="item of profitList" :key="item.id">
                    <h4 v-if="item.showYear" class="profit-main-title">
                        <hr class="title-line">
                        2018
                        <hr class="title-line">
                    </h4>
                    <section class="profit-main-item">
                        <aside class="item-left">
                            <i v-lazy:background-image="`${item.customerUrl}?imageView2/1/w/100/h/100/format/jpg/q/50`"></i>
                            <div class="item-left-content">
                                <p>{{item.customerNickName}} </p>
                                <p class="item-text bottom"> {{item.createTime | formatDuring}} </p>
                            </div>
                        </aside>
                        <aside class="item-right">
                            <p class="item-text">收益：<span>{{item.scaleAmount.toFixed(2)}}</span>元</p>
                            <p class="item-text bottom">成交额： <span>{{item.orderAmount.toFixed(2)}}</span>元</p>
                        </aside>
                    </section>
                </li>
                <div class="profit-main-more" @click="onLoadMore">
                    <p v-show="isLoading">加载中</p>
                    <p v-show="!isLoading">{{finished?'无更多收益明细':'查看更多'}}</p>
                </div>
            </ul>
        </main>

    </div>
</template>

<script>
    import { createNamespacedHelpers } from 'vuex'
    const { mapState, mapActions } = createNamespacedHelpers('myData/distributionData')
    export default {
        data() {
            return {};
        },
        created() {
            this.getDistributorInfo({ useCache: true })
            this.getProfitList(true)
        },
        filters: {
            formatDuring: date => {
                let mss = new Date(date)
                let year = mss.getFullYear()
                let month = mss.getMonth()
                let day = mss.getDate()
                return `${year}年${month < 9 ? '0' + month : month}月${day < 9 ? '0' + day : day}日`
            }
        },
        computed: { ...mapState(['isDistributor', 'totalIncome', 'noSettlement', 'profitList', 'isLoading', 'finished']) },
        methods: {
            ...mapActions(['getProfitList', 'onDestroy', 'getDistributorInfo']),
            //转账明细
            toTransferDetail() {
                this.$router.push({ name: 'DistributionTransferDetail' })
            },
            onLoadMore() {
                if (this.isLoading || this.finished) return
                setTimeout(() => this.getProfitList(false), 300)
            }
        },
        beforeDestroy() {
            this.onDestroy()
        }
    };
</script>

<style lang="less" scoped>
    .distribution-profit {
        text-align: center;
        dd {
            margin: 0;
        }
        /*头部*/
        &-header {
            width: 100%;
            background-color: #FFA32F;
            font-size: 28px;
            color: #ffffff;
            padding: 56px 0;
            line-height: 28px;
            h3 {
                position: relative;
                align-items: center;
                margin: 24px 0;
                font-size: 60px;
                line-height: 60px;
            }
            i {
                position: absolute;
                right: 30px;
                width: 14px;
                height: 24px;
                top: 50%;
                margin-top: -12px;
                background: url("../../../assets/images/ic_arrow_white.png") center/100% no-repeat;
            }
        }
        /*内容*/
        .profit-main {
            margin-bottom: 40px;
            font-size: 26px;
            color: #333333;
            li + li {
                border-top: 1px solid #e3e3e3; /*no*/
            }
            &-title {
                display: inline-flex;
                align-items: center;
                color: #808080;
                margin: 40px 0;
                font-weight: 500;
                align-self: center;
                .title-line {
                    margin: auto 32px;
                    width: 48px;
                    border: 0;
                    height: 1px; /*no*/
                    background-color: #e3e3e3;
                }
            }
            &-list {
                margin: auto;
                padding: 0 30px;
            }
            &-item {
                width: 100%;
                box-sizing: content-box;
                display: inline-flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
            }
            &-item p {
                font-size: 26px;
                line-height: 26px;
            }
            .item-left {
                display: inline-flex;
                flex-direction: row;
                align-items: center;
                text-align: left;
                i {
                    margin: 28px 0;
                    display: inline-block;
                    width: 88px;
                    height: 88px;
                    border-radius: 50%;
                    background-size: 100%;
                    background-repeat: no-repeat;
                }
                &-content {
                    margin-left: 24px;
                }
            }
            .item-right {
                text-align: right;
            }
            .item-text {
                color: #808080;
            }
            .item-text.bottom {
                margin-top: 24px;
            }
            .item-text span {
                color: #ffa32f;
            }
            &-more {
                margin-top: 40px;
                text-align: center;
                color: #737373;
                margin-bottom: 40px;
            }
        }
    }
</style>
<template>
    <div class="wallet">
        <!--头部-->
        <header class="wallet-header">
            <section class="wallet-header-section">
                <span class="wallet-header-money">{{coinNum && coinNum.toFixed(2)}}<small>书币</small></span>
                <span class="wallet-header-tip">书币在购买时可直接抵扣现金哦</span>
            </section>
            <div class="wallet-header-rules" @click="toRulesDetail">规则明细</div>
        </header>
        <!--标签-->
        <label class="wallet-label">书币明细</label>
        <hr/>
        <!--书币列表-->
        <ul class="wallet-list">
            <li class="wallet-item" v-for="item of coinRecords">
                <div class="wallet-item-section">
                    <span class="wallet-item-title">{{bookCoinChannel[item.channel].title}}</span>
                    <span class="wallet-item-time">{{item.createTime|formatYMD}}</span>
                </div>
                <span class="wallet-item-number">{{`${item.coinNum.toFixed(2)}`}}</span>
            </li>
            <div class="wallet-list-more" @click="onLoadMore">
                <p v-show="isLoading">加载中</p>
                <p v-show="!isLoading">{{finished?'无更多收益明细':'查看更多'}}</p>
            </div>
        </ul>
    </div>
</template>

<script>
    import {  mapState , mapActions  } from 'vuex'
    import {bookCoinChannel} from '../../utils/config'
    export default {
        data() {
            return { bookCoinChannel }
        },
        computed:{...mapState(['coinNum','coinRecords', 'isLoading', 'finished'])},
        created(){
         this.getBookCoinInfo()
        },
        methods:{
            ...mapActions(['getBookCoinInfo','getCoinRecord']),
            toRulesDetail(){
                this.$router.push({name:"BookCoinRules"})
            },
            onLoadMore() {
                if (!this.isLoading && !this.finished)  this.getCoinRecord()
            }
        }
    };
</script>

<style lang="less" scoped>
    .wallet-header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        background-color: #505363;
        &-section {
            padding: 66px 0 66px 40px;
        }
        &-money {
            color: #ffa32f;
            font-size: 40px;
        }
        &-tip {
            display: block;
            font-size: 24px;
            color: #ffffff;
        }
        &-rules {
            background-color: #ffa32f;
            padding: 0 32px 0 30px;
            display: inline-block;
            text-align: center;
            color: #ffffff;
            font-size: 24px;
            line-height: 60px;
            border-bottom-left-radius: 30px;
            border-top-left-radius: 30px;
        }
    }

    hr {
        background-color: #ededed;
        height: 1px;
        border: 0px;
        margin: 0;
    }

    .wallet-label {
        font-size: 28px;
        margin: 36px 40px 28px;
        color: #4d4d4d;
        font-weight: 700;
        line-height: 28px;
    }

    .wallet-list {
        display: flex;
        flex-direction: column;
        &-more {
            margin-top: 40px;
            text-align: center;
            color: #737373;
            margin-bottom: 40px;
        }
    }

    .wallet-item {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        box-sizing: content-box;
        margin: 0 40px;
        border-bottom: 1px solid #ededed;
        &-section{
            display: block;
            padding: 24px 0;
        }
        &-title {
            font-size: 28px;
            color: #333333;
            display: list-item;
            line-height: 28px;
        }
        &-time {
            display: list-item;
            padding-top: 16px;
            font-size: 24px;
            color: #808080;

        }
        &-number {
            font-size: 28px;
            color: #333333;
        }
    }
</style>
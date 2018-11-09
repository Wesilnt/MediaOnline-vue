<template>
    <div class="wallet">
        <!--头部-->
        <header class="wallet-header">
            <section class="wallet-header-section">
                <span class="wallet-header-money">1500.00<small>书币</small></span>
                <span class="wallet-header-tip">书币在购买时可直接抵扣现金哦</span>
            </section>
            <div class="wallet-header-rules" @click="toRulesDetail">规则明细</div>
        </header>
        <!--标签-->
        <label class="wallet-label">书币明细</label>
        <hr/>
        <!--书币列表-->
        <ul class="wallet-list">
            <li class="wallet-item" v-for="item of list">
                <div class="wallet-item-section">
                    <span class="wallet-item-title">{{item.title}}</span>
                    <span class="wallet-item-time">{{item.createTime}}</span>
                </div>
                <span class="wallet-item-number">{{`${item.isIncome?'+':'-'}${item.coin}`}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                list: [{
                    id:1,
                    title:'完善资料',
                    createTime:'2018-08-08 18:38:50',
                    isIncome:1,
                    coin:'20.00'
                }, {
                    id:2,
                    title:'伍老师说历史',
                    createTime:'2018-08-08 15:20:50',
                    isIncome:0,
                    coin:'10.00'
                }, {
                    id:3,
                    title:'完成自测题',
                    createTime:'2018-12-08 09:38:20',
                    isIncome:1,
                    coin:'10.00'
                }, {
                    id:4,
                    title:'好友购买',
                    createTime:'2018-08-08 12:23:50',
                    isIncome:1,
                    coin:'199.00'
                }]
            };
        },
        methods:{
            toRulesDetail(){
                this.$router.push({name:"BookCoinRules"})
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
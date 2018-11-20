<template>
    <div class="rules-container">
        <ul class="rules-list">
            <li class="rules-item" v-for="item of list">
                <h3 class="rules-item-title">{{item.title}}</h3>
                <summary class="rules-item-content" v-html="item.content"></summary>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                list: [
                    {
                        id: 1,
                        title: 'Q1: 什么是书币?',
                        createTime: '2018-08-08 18:38:50',
                        content: '秦汉胡同在线产品内得虚拟货币,书币可以在您购买商品得时候抵扣现金。'
                    },
                    {
                        id: 2,
                        title: 'Q2: 书币怎么获取?',
                        createTime: '2018-08-08 15:20:50',
                        content: '基于秦汉胡同在线公众号中，您的完善资料、邀请好友购买等行为都是您获取书币的渠道。书币获得后的有效期为永久。'
                    },
                    {
                        id: 3,
                        title: 'Q3: 书币怎么使用?',
                        createTime: '2018-12-08 09:38:20',
                        content: '在您购买商品支付的过程中可以用您的书币抵扣现金，抵扣规则为10:1，即10书币抵扣1元现金。'
                    },
                    {
                        id: 4,
                        title: 'Q4: 书币获取规则?',
                        createTime: '2018-08-08 12:23:50',
                        content: '1.完善资料,填写资料的必填选项,获取20书币。<br><br>2.完成自测题,依据答题成绩获取相应奖励书币。<br><br>3.首次关注《秦汉胡同在线》公众号获取50书币。<br><br>4.邀请好友购买,获取好友金额20%的奖励金币。'
                    }]
            }
        },
        methods: {
            toRulesDetail() {
                this.$router.push({ name: '' });
            }
        }
    };
</script>

<style lang="less" scoped>
    .rules-item {
        padding: 24px 46px 36px 30px;
        &-title {
            font-size: 32px;
            color: #333333;
            line-height: 32px;
        }
        &-content {
            word-break: break-all;
            color: #666666;
            font-size: 30px;
            margin-top: 40px;
            margin-left: 65px;
        }
    }
</style>
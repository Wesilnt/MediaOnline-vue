<template>
    <div class="rules-container">
        <ul class="rules-list">
            <li class="rules-item" v-for="item of list">
                <h3 class="rules-item-title">{{item.title}}</h3>
                <summary class="rules-item-content">{{item.content}}</summary>
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
                    title:'Q1: 什么是书币?',
                    createTime:'2018-08-08 18:38:50',
                    content:'秦汉胡同在线产品内得虚拟货币,书币可以在您购买商品得时候抵扣现金。',
                }, {
                    id:2,
                    title:'Q1: 什么是书币?',
                    createTime:'2018-08-08 15:20:50',
                    content:'秦汉胡同在线产品内得虚拟货币。',
                }, {
                    id:3,
                    title:'Q1: 什么是书币?',
                    createTime:'2018-12-08 09:38:20',
                    content:'秦汉胡同在线产品内得虚拟货币,书币可以在您购买商品得时候抵扣现金。',
                }, {
                    id:4,
                    title:'Q1: 什么是书币?',
                    createTime:'2018-08-08 12:23:50',
                    content:'秦汉胡同在线产品内得虚拟货币,书币可以在您购买商品得时候抵扣现金。',
                }]
            };
        },
        methods:{
            toRulesDetail(){
                this.$router.push({name:""})
            }
        }
    };
</script>

<style lang="less" scoped>
     .rules-item{
         padding: 24px 46px 36px 20px;
         &-title{
             font-size: 32px;
             color: #333333;
             line-height: 32px;
         }
         &-content{
             word-break: break-all;
             color: #666666;
             font-size: 30px;
             margin-top: 40px;
             margin-left: 65px;
         }
     }
</style>
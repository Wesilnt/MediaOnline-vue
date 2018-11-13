<template>
    <div class="distribution-grade">
        <!--头部-->
        <header class="grade-header">
            <h3>{{distributionGrades[distributorLevel].grade}}</h3>
            <ul class="grade-header-map">
                <li class="grade-header-level" v-for="level in Object.keys(distributionGrades)">
                    <hr v-if="'1' !== level" class="grade-header-line"/>
                    <div class="grade-header-dot">
                        <label class="grade-header-label">{{distributionGrades[level].grade}}</label>
                        <span v-if="level<=distributorLevel" class="grade-header-active"></span>
                    </div>
                </li>
            </ul>
        </header>
        <!--佣金比-->
        <aside class="grade-aside">
            <div class="grade-aside-container">
                 <span class="grade-aside-img">
                     <i class="grade-aside-icon"></i>
                 </span>
                <p class="grade-aside-text">10%<br>推广佣金比</p>
            </div>
        </aside>
        <div class="grade-divide"></div>
        <!--详情-->
        <main class="grade-introduce">
            <h4 class="grade-introduce-title">
                <hr class="title-line">
                等级规则
                <hr class="title-line">
            </h4>
            <dl class="grade-introduce-item" v-for="level of Object.keys(distributionGrades)">
                <dt class="grade-introduce-grade">{{distributionGrades[level].grade}}</dt>
                <dd class="grade-introduce-detail">
                    <li class="grade-introduce-li">
                        <summary class="grade-introduce-topic">
                            <i class="icon-rule"></i>规则介绍
                        </summary>
                        <p class="grade-introduce-desc">累计推广金与消费总和达{{distributionGrades[level].totalAmount}}元</p>
                    </li>
                    <li class="grade-introduce-li">
                        <summary class="grade-introduce-topic">
                            <i class="icon-legal"></i>权益介绍
                        </summary>
                        <p class="grade-introduce-desc">推广佣金比为{{distributionGrades[level].extensionRatio}}</p>
                    </li>
                </dd>
                <hr>
            </dl>
        </main>
    </div>
</template>

<script>
    import { createNamespacedHelpers } from 'vuex';
    import { distributionGrades } from  '../../../utils/config'

    const { mapState, mapActions } = createNamespacedHelpers('myData/distributionData');
    export default {
        data() {
            return {
                distributionGrades
            };
        },
        computed: { ...mapState(['isDistributor','distributorLevel']) },
        methods: {
        }
    };
</script>

<style lang="scss" scoped>
    .distribution-grade {
        font-size: 28px;
        color: #000000;
        text-align: center;
        i{
            display: inline;
        }
        /*头部信息*/
        .grade-header {
            background-color: #545767;
            padding-top: 56px;
            height: 256px;
            h3 {
                color: #ffffff;
                font-size: 40px;
                line-height: 40px;
            }
            &-map {
                display: flex;
                justify-content: center;
                flex-direction: row;
                align-items: center;
                margin-top: 56px;
            }
            &-level {
                display: flex;
                justify-content: center;
                flex-direction: row;
                align-items: center;
            }
            &-line {
                width: 200px;
                border: 0;
                margin: 0;
                height: 4px;
                background-color: #ffffff;
            }
            &-dot {
                margin: 0 14px;
                position: relative;
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background-color: #ffffff;
            }
            &-active {
                position: absolute;
                background-color: #bea27a55;
                width: 24px;
                height: 24px;
                border-radius: 50%;
                left: -50%;
                top: -50%;
            }
            &-label {
                min-width: 200px;
                position: absolute;
                left: -94px;
                top: 24px;
                color: #bb9c6d;
            }
        }
        /*佣金比信息*/
        .grade-aside {
            background-color: #ffffff;
            text-align: center;
            margin: 20px auto 10px;
            &-container {
                color: #bb9c6d;
                font-size: 20px;
                display: flex;
                justify-content: center;
            }
            &-img {
                background-color: #f2ebe1;
                width: 60px;
                height: 60px;
                border-radius: 50%;
                display: inline-flex;
                justify-content: center;
            }
            &-icon {
                align-self: center;
                display: inline;
                width: 30px;
                height: 33px;
                background: url("../../../assets/images/distribution-coin.png") center/100% no-repeat;
            }
            &-text {
                margin-left: 10px;
            }
        }
        .grade-divide {
            height: 18px;
            width: 100%;
            background-color: #f8f8f8;
            border-bottom: 1px solid #e3e3e3; /*no*/
            border-top: 1px solid #e3e3e3; /*no*/
        }
        /*描述*/
        .grade-introduce {
            padding: 40px 30px;
            hr{
                margin-bottom: 48px;
                border: 0;
                height: 1px;/*no*/
                background-color: #e3e3e3;
            }
            &-title {
                display: inline-flex;
                align-items: center;
                margin-bottom: 48px;
            }
            .title-line {
                margin: auto 32px;
                width: 48px;
                border: 0;
                height: 2px;/*no*/
                background-color: #e3e3e3;
            }
            &-item {
                text-align: left;
            }
            &-grade {
                background-color: #bb9c6d;
                border-radius: 4px;
                color: #ffffff;
                width: 180px;
                line-height: 50px;
                font-size: 28px;
                text-align: center;
            }
            &-detail{
                margin-bottom: 56px;
            }
            &-li{
                margin-top:  40px ;
                list-style: none;
            }
            &-topic{
                display: inline-flex;
                font-size: 32px;
                i{
                    margin-right: 20px;
                }
            }
            &-desc{
                font-size: 28px;
                color: #4d4d4d;
                margin-left: 46px;
            }
            .icon-rule{
                width: 23px;
                background: url("../../../assets/images/ic_distribution_rule.png") center/100% no-repeat;
            }
            .icon-legal{
                width: 23px;
                background: url("../../../assets/images/ic_distribution_legal.png")  center/100% no-repeat;
            }
        }
    }
</style>
<template>
    <div class="distribute">
        <!--头部-->
        <header class="distribute-header">
            <section class="distribute-header-section">
                <span class="distribute-header-icon" :style="{backgroundImage:`url(${avatarUrl})`}"></span>
                <span class="distribute-header-phone">{{mobileNo}}</span>
                <div class="distribute-header-grade" @click="toDistributorUpgrade">
                    <i></i>{{distributorGrades && distributorGrades[`${level}`].grade}}
                </div>
            </section>
            <hr>
            <a class="distribute-header-link" @click="toGradeRule">
                <span>{{`升级到${'1' == distributorInfo.level?'中':'高'}级分销员，推广佣金比高达${'1' == distributorInfo.level?'20%':'35%'}`}}</span>
                <i class="icon arrow-white"></i>
            </a>
        </header>

        <!--收入布局-->
        <main class="distribute-income" @click="toProfitDetail">
            <h4 class="distribute-income-title">累计收益 (元)</h4>
            <h3 class="distribute-income-coin">{{totalIncome&&totalIncome.toFixed(2)}}<i class="icon"></i></h3>
            <dd class="distribute-income-desc">包含待结算{{noSettlement&&noSettlement.toFixed(2)}}元</dd>
        </main>

        <!--底部描述-->
        <footer class="distribute-footer">
            <pre>每月10日 自动转入微信余额</pre>
        </footer>
    </div>
</template>

<script>
    import {distributorGrades} from '../../utils/config'
    import { createNamespacedHelpers } from 'vuex'
    const { mapState, mapActions } = createNamespacedHelpers('myData/distributionData')
    export default {
        data() {
            return {distributorGrades}
        },
        created(){this.getDistributorInfo({useCache:false})},
        computed:{...mapState(['distributorInfo','mobileNo','avatarUrl','level','totalIncome','noSettlement'])},
        methods: {
            ...mapActions(['getDistributorInfo']),
            toDistributorUpgrade() {
            },
            toGradeRule() {
                this.$router.push({ name: 'DistributionGradeRule' })
            },
            toProfitDetail() {
                this.$router.push({ name: 'DistributionProfitDetail' })
            }
        }
    }
</script>

<style lang="less" scoped>
    .distribute {
        display: flex;
        flex-direction: column;
        height: 100vh;
        /**通用样式 i向右箭头  hr 水平线*/
        .icon {
            position: absolute;
            right: 30px;
            width: 14px;
            height: 24px;
            background: url("../../assets/images/arrow_right.png") center/100% no-repeat;
        }
        .icon.arrow-white {
            background: url("../../assets/images/ic_arrow_white.png") center/100% no-repeat;
        }
        hr {
            background-color: rgba(255, 255, 255, 0.1);
            height: 2px;
            border: 0px;
            margin: 0;
        }
        /*头部*/
        &-header {
            display: flex;
            flex-direction: column;
            background-color: #505363;
            &-section {
                display: flex;
                width: 100%;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                padding: 38px 0 40px 30px;
            }
            &-icon {
                width: 104px;
                height: 104px;
                border-radius: 50%;
                color: #ffa32f;
                background-color: #FFD7D7;
                background-size: 100%;
            }
            &-phone {
                flex: 1;
                margin-left: 20px;
                display: block;
                font-size: 28px;
                color: #ffffff;
            }
            &-grade {
                position: relative;
                background-color: #BB9C6D;
                padding: 0 24px 0 60px;
                display: inline-block;
                text-align: center;
                color: #ffffff;
                font-size: 24px;
                line-height: 60px;
                border-bottom-left-radius: 30px;
                border-top-left-radius: 30px;
                i {
                    display: inline-block;
                    position: absolute;
                    width: 20px;
                    height: 24px;
                    left: 24px;
                    top: 50%;
                    margin-top: -14px;
                    background: url("../../assets/images/distribution_grade_icon.png") center/100% no-repeat;
                }
            }
            &-link {
                width: 100%;
                padding: 24px 30px 25px 30px;
                color: #ffffff;
                font-size: 24px;
                display: inline-flex;
                align-items: center;
            }
        }
        /**中间*/
        &-income {
            text-align: center;
            font-size: 28px;
            color: #808080;
            padding-top: 48px;
            padding-bottom: 64px;
            background-color: #ffffff;
            &-coin {
                position: relative;
                margin: 24px 0;
                font-size: 60px;
                color: #ffa32f;
                line-height: 60px;
            }
            dd{
                margin-bottom: 0px;
            }
            &-coin i{
                top: 50%;
                margin-top: -12px;
            }
        }
        /**底部*/
        &-footer {
            padding-top: 24px;
            flex: 1;
            background-color: #ededed;
            font-size: 26px;
            color: #b3b3b3;
            text-align: center;
        }
    }
</style>
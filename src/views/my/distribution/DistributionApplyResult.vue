<template>
    <div class="apply-success">
        <!--头部-->
        <header class="apply-success-header" :style="{backgroundImage:`url(${isDistributor?successIcon:failureIcon})`}">
        </header>

        <!--布局-->
        <article class="apply-success-introduce">
            <p v-if="isDistributor">您已成功申请成为分销员</p>
            <p v-else>您目前的推广金额为<em>{{noSettlement.toFixed(2)}}</em>元，还差<em>{{(200-noSettlement).toFixed(2)}}</em>元就可以成为分销员啦！
            </p>
        </article>

        <!--底部描述-->
        <footer class="apply-success-footer" @click="seeDetail">
            {{isDistributor?'查看详情':'去分享'}}
        </footer>

    </div>
</template>

<script>
    import { createNamespacedHelpers } from 'vuex';
    const { mapState, mapActions,mapGetters } = createNamespacedHelpers('distributionData')
    export default {
        data() {
            return {
                successIcon: require('../../../assets/images/distributor_success.png'),
                failureIcon: require('../../../assets/images/distributor_failure.png'),
            };
        },
        computed: { ...mapState(['isDistributor','distributorInfo']),
                    ...mapGetters(['noSettlement'])},
        methods: {
            seeDetail() {
                if(isDistributor)this.$router.replace({ name: 'distributionCenter' })
            }
        }
    };
</script>

<style lang="less" scoped>
    .apply-success {
        font-size: 28px;
        color: #333333;
        text-align: center;
        em {
            font-style: normal;
            color: #ffa32f;
        }
        /*icon*/
        &-header {
            width: 120px;
            height: 120px;
            margin: 80px auto 0;
            background-repeat: no-repeat;
            background-size: 100%;
        }
        /*描述*/
        &-introduce {
            padding: 40px 80px;
        }
        /*底部按钮*/
        &-footer {
            width: auto;
            margin-top: 8px;
            border: 1px solid #ffa32f; /*no*/
            color: #ffa32f;
            line-height: 96px;
            border-radius: 48px;
            display: inline-flex;
            padding: 0 60px;

        }

    }
</style>
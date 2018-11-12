<template>
    <div class="distribute-apply">
        <!--头部-->
        <header class="apply-header">
            <div class="apply-header-logo"></div>
            <h4 class="apply-header-title">秦汉胡同在线分销员招募书</h4>
        </header>

        <!--布局-->
        <article class="apply-introduce" v-html="'<p>亲爱的用户，欢迎加入我们</p><br><p>我们是秦汉胡同在线得运营团队，竭诚为你的销售工作提供完善得支持。</p><br><p>我们诚挚邀请你加入我们的分销员推广计划，无任何成本即可成为秦汉胡同在线的分销员，一起分享收获的喜悦。你只需要将高品质商品分享推荐给他人，收获他人感谢的同时，挣得属于自己的利润。</p><br><p>1.业绩说明<br>买家通过分销员分享链接完成交易，即算作分销员的业绩。<br><br>2.结算说明<br>买家通过分销员分享的链接完成交易，即算作分销员的业绩。</p>'">

        </article>

        <!--底部描述-->
        <footer class="apply-footer" @click="checkMobile">
            申请成为分销员
        </footer>

        <!--手机号验证-->
        <PhoneDialog v-model='show' @success="becomeDistributor"></PhoneDialog>
    </div>
</template>

<script>
    import { createNamespacedHelpers } from 'vuex';
    const { mapState, mapActions } = createNamespacedHelpers('distributionData');
    import PhoneDialog from '../../components/DialogPhone';

    export default {
        components: { PhoneDialog },
        data() {
            return {
                show: false
            };
        },
        computed: { ...mapState(['isBindMobile', 'isDistributor']) },
        created() {
            // this.getDistributorInfo().then(() => {
            //     if (!this.isDistributor) return;
            //     this.$router.push({ name: 'distributionCenter' });
            // });
        },
        methods: {
            ...mapActions(['getDistributorInfo', 'applyDistributor']),
            //手机号校验, 已校验直接申请分销员
            checkMobile() {
                this.show = !this.isBindMobile
                if (!this.isBindMobile) return
                this.becomeDistributor()
            },
            //申请成为分销员
            becomeDistributor() {
                //preUserId分会长ID
                this.applyDistributor({ preUserId: 0 }).then(() => this.$router.push({ name: 'DistributionApplyResult' }))
            }
        }
    }
</script>

<style lang="less" scoped>
    .distribute-apply {
        /*标题和logo*/
        .apply-header {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            &-logo {
                margin-top: 50px;
                width: 205px;
                height: 120px;
                background: url("../../assets/images/distribution_logo.png") center/100% no-repeat;
            }
            &-title {
                margin-top: 40px;
                font-size: 32px;
                color: #1a1a1a;
            }
        }
        /*分销招募内容描述*/
        .apply-introduce {
            padding: 40px;
        }
        /*底部按钮*/
        .apply-footer {
            color: #ffffff;
            font-size: 32px;
            width: 100%;
            height: 96px;
            line-height: 96px;
            position: fixed;
            text-align: center;
            bottom: 0;
            left: 0;
            background-color: #ffa32f;
        }

    }
</style>
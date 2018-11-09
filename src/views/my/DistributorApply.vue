<template>
    <div class="distribute-apply">
        <!--头部-->
        <header class="apply-header">
            <div class="apply-header-logo"></div>
            <h4 class="apply-header-title">秦汉胡同在线分销招募书</h4>
        </header>

        <!--布局-->
        <article class="apply-introduce" v-html="'<p>亲爱的用户，欢迎加入我们</p><p>我们是秦汉胡同在线得运营团队，竭诚为你的销售工作提供完善得支持</p>'">

        </article>

        <!--底部描述-->
        <footer class="apply-footer" @click="becomeDistributor">
            申请成为分销员
        </footer>

        <!--手机号验证-->
        <PhoneDialog v-model='show' @success="applySuccess"></PhoneDialog>
    </div>
</template>

<script>
    import PhoneDialog from '../../components/DialogPhone';
    export default {
        data() {
            return {
                show: false
            };
        },
        components: { PhoneDialog },
        methods: {
            becomeDistributor() {
                this.show = true;
            },
            applySuccess() {
                // this.$router.push({ name: 'distributionCenter' });
                this.$router.push({ name: 'DistributionApplyResult' });
            }
        }
    };
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
                background: url("../../assets/images/logo.png") center/100% no-repeat;
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
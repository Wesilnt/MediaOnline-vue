<template>
    <div class="clearinghouse">
        <div class="qhht-flex clearinghouse-header">
            <i class="lazy-img-larger clearinghouse-header-img" v-lazy:background-image="payDetail.coverPic"></i>
            <ul class="clearinghouse-header-content">
                <li><h3>{{payDetail.courseName}}</h3></li>
                <li class="van-ellipsis clearinghouse-header-brief">{{payDetail.briefIntro}}</li>
                <li class="qhht-flex">
                    <strong class="clearinghouse-header-price">￥{{payDetail.price}}</strong>
                    <span>共 {{payDetail.lessonCount}} 讲</span>
                </li>
            </ul>
        </div>
        <div v-if="!IS_ONLINE||IS_ONLINE" class="qhht-flex clearinghouse-body" @click="toggleDiscount">
            <span>优惠书币：消耗{{deductionBookCoin}}书币</span>
            <span class="qhht-flex clearinghouse-discount" :class="{checked}">
                <span>-￥{{ deductionAmount }}</span>
                <i class="clearinghouse-check"></i>
            </span>
        </div>
        <div class="clearinghouse-explain">
            您将购买的商品为虚拟内容服务，购买后不支持退订、转让、退换，请斟酌确认。
            <p>购买后可在 “我的——已购清单”内查看。</p>
        </div>
        <div class="clearinghouse-pay" :class="{disabled:payDisabled}" @click="handlePayment">确认支付 ￥
            <Counter :prev="parseFloat(payAmount)" :cur="parseFloat(payAmount)" :key="currentPrice"/>
        </div>
    </div>
</template>

<script>
    import {
        createNamespacedHelpers,
        mapState as rootState,
        mapActions as rootActions
    } from 'vuex';
    import { IS_ONLINE } from '../utils/config';
    import Counter from './Counter';

    const { mapState, mapActions, mapGetters } = createNamespacedHelpers('columnData/payment');
    export default {
        name: 'Payment',
        data() {
            const { courseId, groupBuyId, payType } = this.$route.query;
            return {
                IS_ONLINE,
                checked: false,
                payDisabled: false,
                groupBuyId,
                courseId,
                payType,
                currentPrice: 100,
                prevPrice: 100,
                preUserId:0
            };
        },
        computed: {
            ...mapGetters([
                'courseName',
                'coverPic',
                'briefIntro',
                'groupBuyPrice',
                'price',
                'lessonCount'
            ]),
            ...mapState(['paySucceed']),
            ...rootState(['coinNum', 'deductionOrder', 'deductionProp']),
            deductionBookCoin: function() {
                let totalCoin = this.payDetail.price * this.deductionOrder / this.deductionProp
                return this.coinNum <= totalCoin ? this.coinNum : totalCoin
            },
            deductionAmount: function() {
                return Math.round(this.deductionBookCoin * this.deductionOrder)/ 100
            },
            payAmount: function() {
                let amount = this.checked ? (this.payDetail.price - this.deductionAmount) : this.payDetail.price
                return amount.toFixed(2)
            },
            payDetail: function() {
                const {
                    courseName,
                    coverPic,
                    briefIntro,
                    groupBuyPrice,
                    price: origin,
                    lessonCount
                } = this;
                const payDetail = JSON.parse(sessionStorage.getItem('payDetail'))
                const { payType } = this.$route.params;
                const price = payType === 'groupBuy' ? groupBuyPrice : origin
                return courseName
                    ? {
                        courseName,
                        coverPic,
                        briefIntro,
                        groupBuyPrice,
                        price,
                        lessonCount
                    }
                    : payDetail;
            }
        },
        watch: {
            checked: function(newChecked) {
                this.currentPrice = newChecked ? 80 : this.spen
                this.prevPrice = newChecked ? this.spen : 80
            },
            paySucceed: function(isSucceed) {
                if (isSucceed) {
                    this.$toast('您已支付成功')
                    setTimeout(() => this.$router.go(-1), 400)
                }
            }
        },
        methods: {
            ...mapActions(['unlockCourse', 'joinGroupBuy', 'startGroupBuy']),
            ...rootActions(['getBookCoinInfo']),
            async handlePayment() {
                this.payDisabled = true;
                const preUserIdStr =  sessionStorage.getItem('preUserId')
                const preUserIdJSON = JSON.parse(preUserIdStr || '{}')
                const preUserId = preUserIdJSON.preUserId || 0
                this.preUserId = preUserId
                const payParams = {
                    courseId: this.courseId,              //购买专栏ID
                    useFlag: this.checked,                //是否使用书币
                    preUserId                             //是否来自分销员分享
                }
                if (this.payType === 'groupBuy') {
                    if (this.groupBuyId) {
                        await this.joinGroupBuy({ ...payParams, groupBuyId: this.groupBuyId })
                    } else {
                        await this.startGroupBuy(payParams)
                    }
                }
                if (this.payType === 'origin') {
                    await this.unlockCourse(payParams)
                }
                this.payDisabled = false
            },
            toggleDiscount() {
                this.checked = !this.checked
            }
        },
        created() {
            this.getBookCoinInfo()
        },
        mounted() {
            document.title = '结算中心'
            const {
                courseName,
                coverPic,
                briefIntro,
                groupBuyPrice,
                price,
                lessonCount
            } = this;
            if (courseName) {
                sessionStorage.setItem(
                    'payDetail',
                    JSON.stringify({
                        courseName,
                        coverPic,
                        briefIntro,
                        groupBuyPrice,
                        price,
                        lessonCount
                    })
                );
            }
        },
        destroyed() {
            document.title = '秦汉胡同'
            sessionStorage.setItem('payDetail', null)
        },
        components: {
            Counter
        }
    };
</script>

<style lang="less">
    .clearinghouse {
        position: relative;
        height: 100vh;
        padding-top: 20px;
        background: #f7f7f7;
    }

    .clearinghouse-header {
        margin-bottom: 20px;
        padding: 32px 40px;
        background: #fff;
        &-img {
            width: 136px;
            height: 180px;
            border-radius: 16px;
            background: transparent center/cover no-repeat;
        }
        &-content {
            flex-grow: 1;
            display: flex;
            height: 180px;
            flex-direction: column;
            justify-content: space-around;
            padding: 8px 0;
            margin-left: 32px;
        }
        &--brief {
            max-width: 638px;
        }
        &-price {
            font-size: 30px;
            color: #fea330;
        }
    }

    .clearinghouse-body {
        padding: 30px 40px;
        background-color: #fff;
        font-size: 28px;
    }

    .clearinghouse-discount {
        font-size: 30px;
        color: #b3b3b3;
        transition: color 0.2s ease-in-out;
        &.checked {
            color: #ff4f05;
            font-weight: bold;
            .clearinghouse-check {
                background-color: #ff4f05;
                box-shadow: 0 0 0 2px #ff0f05;
            }
        }
    }

    .clearinghouse-check {
        display: inline-block;
        width: 30px;
        height: 30px;
        border: 6px solid #fff;
        margin-left: 24px;
        box-shadow: 0 0 0 2px #fea330;
        border-radius: 50%;
        background-color: #fff;
        transition: background-color 0.2s ease-in-out;
    }

    .clearinghouse-explain {
        padding: 30px 40px;
        color: #ccc;
        p {
            padding-top: 48px;
        }
    }

    .clearinghouse-pay {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 96px;
        line-height: 96px;
        font-size: 32px;
        text-align: center;
        background-color: #fea330;
        color: #fff;
        &.disabled {
            pointer-events: none;
            background-color: rgba(254, 163, 48, 0.72);
        }
    }
</style>

<template>
    <div ref="dialog" v-show="isDistributor" class="dialog">
        <div v-show="value" class="share-container" @click.self="onCancel">
            <div v-show="showTip" class="indicator-container">
                <div class="indicator-container-icon"></div>
                <p class="indicator-container-title">立即推广给好友吧</p>
                <p class="indicator-container-subtitle">点击屏幕右上角将本页面分享给好友</p>
            </div>
            <transition @after-leave="afterLeave">
                <div v-show="value && isOpen" class="share-content">
                    <p class="share-src">
                        立即分享给好友
                    </p>
                    <p class="share-desc">
                        朋友通过你分享得页面成功购买后，你可获得对应的佣金，佣金可在"分销中心"查看
                    </p>
                    <input style="position: absolute;top:9999px"
                           type="text"
                           id="success_form_input"
                           readonly="readonly"
                           v-model="shareUrl"/>
                    <ul class="share-list">
                        <li v-for="item of shareConfigs"
                            class="share-item"
                            :id="item.ref"
                            :key="item.text"
                            data-clipboard-action="copy"
                            data-clipboard-target="#success_form_input"
                            @click="onShareItem(item)">
                            <div class="share-icon" :style="{backgroundColor: item.fillColor}">
                                <img :src="item.icon" :style="{width: item.width}">
                            </div>
                            <span class="share-label">{{item.text}}</span>
                        </li>
                    </ul>
                    <div class="share-cancel" @click="onCancel">
                        取消
                    </div>
                </div>
            </transition>
        </div>
        <!--分销-->
        <div v-if="true" class="earn-label" @click="openShareDialog">赚</div>
    </div>
</template>
<script>
    import Clipboard from 'clipboard';

    import { distributionShare } from '../../utils/config';
    import { createNamespacedHelpers, mapActions as rootActions, mapState as rootState } from 'vuex';

    const { mapState, mapActions } = createNamespacedHelpers('myData/distributionData');

    export default {
        props: ['value', 'path'],
        data() {
            return {
                shareUrl: `${location.href}`,
                isOpen: true,
                showTip: false,
                shareConfigs: distributionShare,
                clipboardLink: null,
            };
        },
        created() {
            const preUserId = this.$route.query.preUserId;
            const distributor = this.$route.query.distributor;
            if(preUserId && preUserId>0)
            {
                const distributorStr = JSON.stringify({ preUserId });
                sessionStorage.setItem('preUserId', distributorStr)
            }
            if(distributor){
                sessionStorage.setItem('distributor', distributor)
            }
        },
        computed: {
            ...mapState(['isDistributor'])
        },
        watch: {
            value: function(value) {
                this.isOpen = value
            }
        },
        mounted() {
            this.checkDistributor(false).then(() => {
                // if (this.isDistributor) this.$refs.dialog.show()
            });
            this.clipboardLink = new Clipboard('#link');
            this.getUserInfo().then(user =>  this.setWxShare(user));
        },
        methods: {
            ...rootActions(['setWxShareFriend', 'setWxShareZone']),
            ...mapActions(['checkDistributor', 'getUserInfo']),
            onShareItem(item) {
                switch (item.id) {
                    case 0:         //海报分享
                        this.$router.push({ name: 'DistributorPoster', query: { shareUrl: this.shareUrl } });
                        break;
                    case 1:
                    case 2:
                        this.showTip = true;
                        break;
                    case 3:        //分享链接
                        this.clipboardLink.on('success', () => this.$toast('复制成功,快去分享吧'));
                        break
                }
            },
            openShareDialog() {
                this.$emit('input', true);
                this.isOpen = true;
            },
            onCancel() {
                this.isOpen = false;
                this.showTip = false;
                setTimeout(() => this.$emit('input', false), 200)
            },
            afterLeave() {
                this.$emit('close')
            },
            setWxShare(user) {
                // const href = -1 != location.href.indexOf('?')?location.href.split('?')[0]:location.href;
                // const shareHref = `${href}${-1 != href.indexOf('?') ? '&' : '?'}`;
                // const distributor = btoa(encodeURIComponent(JSON.stringify({id:user.id,avatarUrl:user.avatarUrl,nickName:user.nickName})));
                // this.shareUrl = `${shareHref}preUserId=${user.id}&distributor=${distributor}`;
                this.shareUrl =  window.location.href;
                const shareData = {
                    title: '秦汉胡同在线',
                    link:this.shareUrl,
                    desc: '你一定会爱上国学课...',
                    imgUrl: require('../../assets/images/logo.png'),
                };
                console.log('shareLink_title ', shareData);
                this.setWxShareFriend(shareData);
                this.setWxShareZone(shareData)
            }
        }
    };
</script>
<style lang="scss" scoped>
    .dialog {
        border: 0;
        z-index: 106;
    }

    .share-container {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1888;
        width: 100%;
        background-color: rgba(00, 00, 00, 0.5);
        height: 100%;
        .indicator-container {
            color: #ffffff;
            text-align: center;
            display: flex;
            flex-direction: column;
            &-icon {
                align-self: flex-end;
                width: 131px;
                height: 232px;
                float: right;
                margin-top: 20px;
                margin-right: 60px;
                background: url("../../assets/images/share-indicator.png") center/100% no-repeat;
            }
            &-title {
                margin-top: 16px;
                font-size: 40px;
            }
            &-subtitle {
                margin-top: 24px;
                font-size: 28px;
            }
        }
        .share-src {
            font-size: 32px;
            color: #333333;
            margin-top: 56px;
        }
        .share-desc {
            margin-top: 31px;
            font-size: 24px;
            color: #999999;
            padding: 0 110px;
            width: 100%;
            text-align: center;
        }
        .share-content {
            position: fixed;
            background-color: #ffffff;
            width: 100%;
            left: 0;
            bottom: 0;
            display: flex;
            flex-direction: column;
            transition: all 0.2s ease;
            .share-src {
                color: rgb(82, 82, 77);
                text-align: center;
                margin-top: 16px;
            }
            .share-list {
                display: flex;
                flex-direction: row;
                padding-left: 6px;
                margin-top: 56px;
                justify-content: space-around;
            }
            .share-item {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                .share-icon {
                    height: 108px;
                    width: 108px;
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .share-label {
                    margin-top: 20px;
                    color: #52514d;
                    font-size: 24px;
                }
            }
            .share-item :active{
                opacity: 0.6;
            }
        }
        .share-cancel {
            margin-top: 62px;
            height: 98px;
            background-color: #f6f6f6;
            font-size: 32px;
            color: #333333;
            text-align: center;
            line-height: 98px;
        }
    }

    .earn-label {
        right: 30px;
        bottom: 206px;
        position: fixed;
        z-index: 125;
        width: 114px;
        height: 114px;
        border-radius: 50%;
        background-color: #fa7725;
        line-height: 114px;
        text-align: center;
        font-size: 56px;
        color: #ffffff;
        border: 6px solid #ffffff;
        font-weight: 300;
    }

    .v-enter,
    .v-leave-to {
        transform: translateY(100%);
    }

    .v-enter-active,
    .v-leave-active {
        transition: all 0.1s ease;
    }
</style>

<template>
    <div v-show="show" class="share-container" @click.self="onCancel">
        <div v-show="showTip" class="indicator-container">
            <div class="indicator-container-icon"></div>
            <p class="indicator-container-title">立即推广给好友吧</p>
            <p class="indicator-container-subtitle">点击屏幕右上角将本页面分享给好友</p>
        </div>
        <transition @after-leave="afterLeave">
            <div v-show="isOpen" class="share-content">
                <p class="share-src">
                    立即分享给好友
                </p>
                <p class="share-desc">
                    朋友通过你分享得页面成功购买后，你可获得对应的佣金，佣金可在"分销中心"查看
                </p>
                <ul class="share-list">
                    <li v-for="item of shareConfigs" :key="item.text" class="share-item" @click="onShareItem(item)">
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
</template>
<script>
    import { distributionShare } from '../../utils/config';
    import { mapActions, mapState } from 'vuex';

    export default {
        props: ['show', 'postType', 'courseId', 'columnType'],
        data() {
            return {
                isOpen: true,
                showTip: false,
                shareConfigs: distributionShare
            };
        },
        watch: {
            show(value) {
                this.isOpen = value
            }
        },
        computed: {
            ...mapState(['url'])
        },
        methods: {
            ...mapActions(['setWxShareFriend', 'setWxShareZone']),
            onShareItem(item) {
                if (item.id === 'poster') {
                    this.$toast('分享海报');
                }
                if (item.id === 1) {
                    this.showTip = true;
                }
                if (item.id == 2) {
                    this.showTip = true;
                }
                if (item.id == 3) {
                    this.showTip = true;
                }
            },
            toPoster() {
                let postType = postType ? postType : 'default';
                this.$router.push({
                    name: 'SharePoster',
                    params: {
                        courseId: this.courseId,
                        columnType: this.columnType,
                        postType
                    }
                });
            },
            onCancel() {
                this.isOpen = false
                this.showTip = false
            },
            afterLeave(el) {
                this.$emit('close');
            }
        }
    };
</script>
<style lang="scss" scoped>
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

    .v-enter,
    .v-leave-to {
        transform: translateY(100%);
    }

    .v-enter-active,
    .v-leave-active {
        transition: all 0.1s ease;
    }
</style>

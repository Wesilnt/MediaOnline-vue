<template>
    <div class="distributor-poster">
        <main class="distributor-poster-main">
            <canvas ref="canvasId" :width="canvasW" :height="canvasH"/>
            <div class="top-container">
                <img ref="saveImage"/>
                <p>长按分享图片{{test}}</p>
            </div>
        </main>
        <!-- 二维码生成组件 -->
        <vue-qr :logoSrc="imageUrl"
                :logoScale="20* radio"
                :style="{display:'none'}"
                colorDark="#123456"
                colorLight="#ff0000"
                :text="shareUrl"
                error-level="Q"
                :margin="0"
        />
        <div class="loading-container" v-show="isLoading">
            <van-loading color="white"/>
        </div>
    </div>
</template>
<script>
    import VueQr from 'vue-qr';
    import LoadingDialog from '../LoadingDialog.vue';
    import {
        createNamespacedHelpers,
        mapState as rootState,
        mapActions as rootActions
    } from 'vuex';

    const { mapState } = createNamespacedHelpers('shareData');
    export default {
        data() {
            let screenW = document.body.offsetWidth;
            let radio = screenW / 375;
            let canvasW = ((screenW * 2) / 3) * radio;
            let canvasH = ((667 * screenW) / 375 / 2) * radio;
            let centerX = (canvasW / 2) * radio;
            return {
                shareUrl: this.$route.query.shareUrl,
                pixelRatio: 1, //像素比
                radio, //
                canvasW, //canvas宽度
                canvasH, //canvas高度
                centerX, //canvas中心x坐标
                qrcodeWidth: 100, //二维码大小
                qrcodeTop: (canvasH - 50) * 0.382, //二维码Top
                ctx: null,
                canvasData: null,
                isLoading: true,
                imageUrl: require('../../assets/images/logo.png'),
                test:0
            };
        },
        components: { 'loading-dialog': LoadingDialog, VueQr },
        computed: {
            ...rootState(['url', 'columnDetail', 'columnType']),
            ...mapState(['loading', 'poster'])
        },
        created() {
            this.setPosterConfig(); //设置分享地址
        },
        mounted: function() {
            let canvasData = this.$refs.canvasId;
            this.canvasData = canvasData;
            this.ctx = canvasData.getContext('2d');
            this.ctx.mozImageSmoothingEnabled = false;
            this.ctx.webkitImageSmoothingEnabled = false;
            this.ctx.msImageSmoothingEnabled = false;
            this.ctx.imageSmoothingEnabled = false;
            let getPixelRatio = function(context) {
                let backingStore =
                    context.backingStorePixelRatio ||
                    context.webkitBackingStorePixelRatio ||
                    context.mozBackingStorePixelRatio ||
                    context.msBackingStorePixelRatio ||
                    context.oBackingStorePixelRatio ||
                    context.backingStorePixelRatio ||
                    1;
                return (window.devicePixelRatio || 1) / backingStore;
            };
            this.pixelRatio = getPixelRatio(this.ctx);
            //1. 将画布放 屏幕像素比
            this.canvasData.height = this.canvasH * this.pixelRatio;
            this.canvasData.width = this.canvasW * this.pixelRatio;
            //2. 指定绘制上下文, 放大 this.pixelRatio 比例进行绘制所有的内容
            this.ctx.scale(this.pixelRatio, this.pixelRatio);
            //3. 显示画布大小时 按原来大小显示, 这里的用的图片，所以下面两行可以不要
            // this.canvasData.style.height = this.canvasH + 'px'
            // this.canvasData.style.width = this.canvasW + 'px'
            //重新生成图片
            this.drawBottomMap();
            //制定显示大小
            const { saveImage } = this.$refs;
            let bodyHeight = document.body.offsetHeight;
            let scale = 1;
            if (bodyHeight < this.canvasH) scale = bodyHeight / this.canvasH;
            saveImage.style.width = this.canvasW * scale + 'px';
        },
        methods: {
            ...rootActions(['getUserInfo']),
            //設置海報分享地址
            setPosterConfig() {
                // console.log('SharePoster-Link:', this.shareUrl)
            },
            //绘制海报
            drawBottomMap: function() {
                this.getUserInfo()
                    .then(user => this.user = user)
                    .then(() => new Promise(resolve => this.drawBackground(resolve)))
                    .then(() => new Promise(resolve => this.drawTitle(resolve)))
                    .then(() => new Promise(resolve => this.drawDashLine(resolve)))
                    .then(() => new Promise(resolve => this.drawQrcode(resolve)))
                    // .then(() => new Promise(resolve => this.drawHeadImage(resolve)))
                    .then(() => this.drawTip())
                    .then(() =>(this.$refs.saveImage.src = this.canvasData.toDataURL('images/png')))
                    .then(() => (this.isLoading = false), () => (this.isLoading = false))
                    .catch(() => (this.isLoading = false));
            },

            //1. 绘制背景图和颜色
            async drawBackground(resolve) {
                this.ctx.fillStyle = '#ffffff';
                this.ctx.fillRect(0, 0, this.canvasW, this.canvasH);
                this.ctx.save();
                this.ctx.fillStyle = '#FFFFFF';
                this.ctx.globalCompositeOperation = 'source-in';
                this.roundedRect(this.ctx, 0, 0, this.canvasW, this.canvasH, 10);
                this.ctx.restore();
                this.test = '1'
                resolve();
                // let cover = new Image();
                // cover.setAttribute('crossOrigin', 'anonymous');
                //默认专栏海报分享
                // let sharePoster = this.columnDetail.sharePostUrl;
                // //拼团分享海报
                // if ('collage' == this.postType) sharePoster = this.columnDetail.groupBuySharePostUrl;
                // // 集赞分享海报
                // if ('praise' == this.postType) sharePoster = this.sharePostUrl;
                // cover.src = sharePoster;
                // cover.onload = () => {
                //     this.ctx.save();
                //     this.ctx.drawImage(cover, 0, 0, this.canvasW, this.canvasH);
                //     this.ctx.restore();
                //     resolve();
                // }
            },
            //2. 顶部提示
            async drawTitle(resolve) {
                let title = '发现一些好货,邀你一起看看';
                this.ctx.fillStyle = '#262626';
                this.ctx.font = '15px Georgia';
                let textW = this.ctx.measureText(title).width;
                this.ctx.fillText(title, this.centerX - textW / 2, 30);
                resolve();
            },
            //3. 虚线
            async drawDashLine(resolve) {
                this.ctx.save();
                this.ctx.strokeStyle = '#E0E0E0';
                this.ctx.translate(0.5, 0.5);
                this.ctx.lineWidth = 1;
                this.ctx.beginPath();
                this.ctx.setLineDash([6, 3]);
                this.ctx.moveTo(0, 50);
                this.ctx.lineTo(this.canvasW, 50);
                this.ctx.stroke();
                //左半圆
                this.ctx.beginPath();
                this.ctx.fillStyle = '#F5F5F5';
                this.ctx.globalCompositeOperation = 'xor';
                this.ctx.arc(0, 50, 8, 0, Math.PI * 2, true);
                this.ctx.fill();
                //右半圆
                this.ctx.beginPath();
                this.ctx.fillStyle = '#F5F5F5';
                this.ctx.globalCompositeOperation = 'xor';
                this.ctx.arc(this.canvasW, 50, 8, 0, Math.PI * 2, true);
                this.ctx.clip();
                this.ctx.fill();
                this.ctx.restore();
                this.test = '2'
                resolve();
            },
            //4. 绘制二维码
            async drawQrcode(resolve) {
                let top = this.qrcodeTop;
                let width = this.qrcodeWidth;
                let left = this.centerX - width / 2;
                this.test = '2.1' 
                let img = this.$el.children[1].children[0];
                this.test = '2.2'
                // if(img.currentSrc && img.complete){
                //     this.ctx.drawImage(img, left, top, width, width);
                //     resolve();//如果二维码没有加载则走下面的加载回调绘制
                // }
                // let currentSrc = img.currentSrc
                // if ('' !== currentSrc && img.complete) return resolve();//如果二维码没有加载则走下面的加载回调绘制
                img.onload = () => {
                    this.ctx.drawImage(img, left, top, width, width);
                    this.test = '2.3'
                    resolve();
                };
            },
            //5. 绘制头像
            async drawHeadImage(resolve, image = new Image()) {
                const header = image;
                header.setAttribute('crossOrigin', 'anonymous');
                header.src =
                    (this.startAvatar || this.user.avatarUrl) + '?timeStamp=' + Date.now();
                header.onload = () => {
                    // let radius = this.headImageW * this.radio
                    // let x = this.qrcodeLeft * this.radio
                    // let y =  this.qrcodeTop * this.radio
                    // this.ctx.save()
                    // this.ctx.beginPath()
                    // this.ctx.arc(x + this.headImageW / 2, y + this.headImageW / 2, this.headImageW / 2, 0, Math.PI * 2, false)
                    // this.ctx.clip()
                    // this.ctx.drawImage(header, x, y, this.headImageW, this.headImageW)
                    // this.ctx.restore()
                    resolve();
                };
            },
            //6. 绘制二维码提示
            async drawTip() {
                let tip = '长按识别二维码';
                this.ctx.fillStyle = '#262626';
                this.ctx.font = '15px Georgia';
                let textW = this.ctx.measureText(tip).width;
                this.ctx.fillText(tip, this.centerX - textW / 2, this.canvasH - 40);
            },
            //圆角矩形
            roundedRect(ctx, x, y, width, height, radius) {
                ctx.save();
                ctx.beginPath();
                ctx.moveTo(x, y + radius);
                ctx.lineTo(x, y + height - radius);
                ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
                ctx.lineTo(x + width - radius, y + height);
                ctx.quadraticCurveTo(
                    x + width,
                    y + height,
                    x + width,
                    y + height - radius
                );
                ctx.lineTo(x + width, y + radius);
                ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
                ctx.lineTo(x + radius, y);
                ctx.quadraticCurveTo(x, y, x, y + radius);
                ctx.fill();
                ctx.restore();
            }
        }
    };
</script>
<style lang="scss" scoped>
    .distributor-poster {
        &-main {
            position: relative;
            width: 100%;
            height: 100vh;
            canvas {
                height: 100%;
                width: 100%;
                display: none;
            }
            .top-container {
                z-index: 99;
                top: 0;
                left: 0;
                position: absolute;
                height: 100%;
                width: 100%;
                display: inline-flex;
                text-align: center;
                background-color: rgba(33, 33, 33, 0.5);
            }
            .top-container img {
                z-index: 999;
                top: 0;
                margin: auto;
                height: auto;
                display: block;
                width: 100%;
                background-size: 100%;
            }
            .top-container p {
                z-index: 1000;
                width: 100%;
                left: 0;
                font-size: 30px;
                position: absolute;
                color: #808080;
                text-align: center;
                color: white;
                bottom: 30px;
            }
        }
    }
</style>

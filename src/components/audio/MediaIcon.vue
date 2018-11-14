<template>
    <div v-show="forceHidenFloat&&showFloat"
         ref="mediaIcon"
         class="media-icon-container"
         :class="{animation: dragableAnim}"
         :style="{left:x,top:y}"
         @click="goPlaying">


        <van-circle
                class="circle_container"
                v-model="progress"
                color="#FFCD7D"
                size="15vw"
                layer-color="#fff"
                :speed="1"
                :clockwise="true"
                :stroke-width="70"
                :rate="1">
            <div class="image-icon-container"
                 v-lazy:background-image="`${coverPic}?imageView2/1/w/100/h/100/format/jpg/q/50`">
                <div class="icon-mask"></div>
                <img :src="`${this.isPlaying?require('../../assets/images/audio_play_play.png')
                                   :require('../../assets/images/icon_pause.png')}`" class="play-icon">
            </div>
        </van-circle>
    </div>
</template>
<script>
    import { openAudioDetail } from '../../utils/config';
    import { createNamespacedHelpers } from 'vuex';

    const {
        mapState,
        mapActions,
        mapMutations
    } = createNamespacedHelpers('audiotaskData');
    export default {
        data() {
            return {
                _canvas: null,
                _ctx: null,
                windowWidth: window.screen.width,
                windowHeight: window.screen.height,
                x: window.screen.width - 74 - 12 + 'px',
                y: ((window.screen.height - 68) * 3) / 4 + 'px',
                width: 68,
                height: 68,
                startX: 48,
                startY: 16,
                startTime: 0,
                outRingWidth: 6,
                progressgWidth: 4,
                progress: 0,
                tempX: window.screen.width - 74 - 12 + 'px',
                tempY: ((window.screen.height - 68) * 3) / 4 + 'px',
                dragable: true,             //是否可以拖拽
                dragableAnim: true
            };
        },
        computed: {
            ...mapState([
                'isPlaying',
                'currentTime',
                'maxTime',
                'audioId',
                'coverPic',
                'forceHidenFloat',
                'showFloat',
                'courseId',
                'courseName',
                'columnType'
            ])
        },
        created() {
            this.initAudio();
        },
        methods: {
            ...mapMutations(['setFloatButton']),
            ...mapActions(['initAudio']),
            //触摸开始
            _touchStart: function(e) {
                if (!this.dragable) return;
                this.dragableAnim = false;
                this.startTime = new Date().getTime();
                this.startX = e.touches[0].clientX;
                this.startY = e.touches[0].clientY;
                e.preventDefault();
            },
            //触摸移动
            _touchMove: function(e) {
                if (!this.dragable) return;
                let left = e.touches[0].clientX - this.width / 2;
                let top = e.touches[0].clientY - this.width / 2;
                left = left < 0 ? 0 : left;
                top = top < 0 ? 0 : top;
                let maxLeft = this.windowWidth - this.width;
                let maxTop = ((this.windowHeight - this.width) * 3) / 4;
                left = left > maxLeft ? maxLeft : left;
                top = top > maxTop ? maxTop : top;
                this.x = left + 'px';
                this.y = top + 'px';
                e.preventDefault();
            },
            //触摸结束
            _touchEnd: function(e) {
                if (!this.dragable) return;
                let offsetTime = new Date().getTime() - this.startTime;
                let offsetX = e.changedTouches[0].clientX - this.startX;
                let offsetY = e.changedTouches[0].clientY - this.startY;
                if (offsetTime < 800 && Math.abs(offsetX) < 50 && Math.abs(offsetY) < 50) {
                    this.goPlaying();
                }
                e.preventDefault();
            },
            goPlaying() {
                openAudioDetail(this, { courseId: this.courseId, columnType: this.columnType, lessonId: this.audioId });
            }
        },
        mounted() {
            this.$refs.mediaIcon.addEventListener('touchstart', this._touchStart, true);
            this.$refs.mediaIcon.addEventListener('touchmove', this._touchMove, true);
            this.$refs.mediaIcon.addEventListener('touchend', this._touchEnd, true);
        },
        watch: {
            isPlaying: function(value) {
                return value;
            },
            currentTime: function(value) {
                this.progress = (value * 100) / this.maxTime;
                return value;
            },
            $route(to, from) {
                this.setFloatButton(!to.name || (to.name && !to.name.includes('AudioPlay')));
                if (!this.showFloat) return;
            }
        }
    };
</script>

<style lang="scss" scoped>
    .media-icon-container {
        position: fixed;
        width: 136px;
        height: 136px;
        z-index: 99999;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: white;
        border-radius: 50%;
        border: 12px solid #ffffff;
        box-shadow: 0 0 12px #e0e0e0;
        .image-icon-container {
            position: absolute;
            left: 6px;/*no*/
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100px;
            height: 100px;
            border-radius: 50%;
            top: 6px;
            background-size: 100%;
            background-repeat: no-repeat;
        }
        .icon-mask {
            border-radius: 50%;
            background-color: rgba(43, 43, 43, 0.3);
            width: 100%;
            height: 100%;
        }
        .play-icon {
            position: absolute;
            top:50%;
            margin-top: -16px;
            height: 32px;
            width: 28px;
        }
    }

    .animation {
        transition: all 0.5s linear;
    }
</style>

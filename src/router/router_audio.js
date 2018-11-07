/** @format */

const AudioPlay = () =>
  import(/* webpackChunkName: "index" */ '../components/audio/AudioPlay.vue') //音频-播放
const AudioCmts = () =>
  import(/* webpackChunkName: "index" */ '../components/audio/AudioCmts.vue') //音频-评论
const AudioDraft = () =>
  import(/* webpackChunkName: "index" */ '../components/audio/AudioDraft.vue') //音频-文稿
export default [
  {
    // path: '/audio/audioplay/:id',
    path: '/audio/:columnType/:courseId/:lessonId',
    name: 'AudioPlay',
    component: AudioPlay,
    meta: {
      keepAlive: false // 需要被缓存
    }
  },
  {
    path: '/audio/:columnType/:courseId/:lessonId/commentlist',
    name: 'AudioCmts',
    component: AudioCmts
  },
  {
    path: '/audio/:columnType/:courseId/:lessonId/audiodraft',
    name: 'AudioDraft',
    component: AudioDraft
  }
]

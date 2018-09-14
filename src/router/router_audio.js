import AudioPlay from '../components/audio/AudioPlay.vue' //音频-播放
import AudioCmts from '../components/audio/AudioCmts.vue' //音频-评论
import AudioDraft from '../components/audio/AudioDraft.vue' //音频-文稿
export default[
  {
    path: '/audio/audioplay',
    name: 'AudioPlay',
    component: AudioPlay
  },
  {
    path: '/audio/audiocmts/:lessonid',
    name: 'AudioCmts',
    component: AudioCmts
  },
  {
    path: '/audio/audiodraft/:lessonid',
    name: 'AudioDraft',
    component: AudioDraft
  },
]
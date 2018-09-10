//在线课程相关接口
import { stringify } from 'qs'
import request from '../utils/request'

/** GET */
//获取专栏列表
// export async function getColumns(params) {
//     return request(`/index/getCourseSimpleBOList?${stringify(params)}`);
// }
export async function getColumns(params) {
  return request(`/course/courseSimpleList?${stringify(params)}`)
}

// 获取视频专栏信息
export async function getVideoColumnDetail(params) {
  return request(`/course/detail?${stringify(params)}`)
}
// 获取视频课程详情
export async function getVideoLessonDetail(params) {
  return request(`/lesson/lessonDetail?${stringify(params)}`)
}

// TODO 日后删除
export async function getQuestionList(params) {
  return [
    {
      id: '67684240862478337',
      lessonId: '65858188804620288',
      question: '萤火虫为什么可以发光？',
      optA: '会就会呗',
      optB: '有电就有光',
      optC: '不知道',
      optD: '玩具呗',
      rightOpt: 'C',
      optAPct: '20',
      optBPct: '80',
      optCPct: '5',
      optDPct: '10',
      createTime: 1535970781000,
      lastModifyTime: 1536478713000
    },
    {
      id: '69814662434127873',
      lessonId: '65858188804620288',
      optAPct: '20',
      optBPct: '80',
      optCPct: '5',
      optDPct: '10',
      question: '动物最有代表性的习惯和行为',
      optA: '蜻蜓点水',
      optB: '鲤鱼跳龙门',
      optC: '喜鹊报喜',
      optD: '一山不容二虎',
      rightOpt: 'A',
      createTime: 1536478713000,
      lastModifyTime: 1536478713000
    },
    {
      id: '69814662488653825',
      lessonId: '65858188804620288',
      optAPct: '20',
      optBPct: '80',
      optCPct: '5',
      optDPct: '10',
      question: '为什么有些人在车上阅读时会感觉不舒服？',
      optA: '　晕动症是在身体有移动感时产生的',
      optB: '当你读书时，眼睛没有看到移动，这让大脑产生混乱',
      optC: '一些人便感觉不舒服',
      optD: '如果晕车的话，就向窗外看去',
      rightOpt: 'A',
      createTime: 1536478713000,
      lastModifyTime: 1536478713000
    }
  ]

  return request(`/lesson/lessonDetail?${stringify(params)}`)
}

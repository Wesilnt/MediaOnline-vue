import { stringify } from 'qs'
import request from '../utils/request'

const _bannerList = [
  {
    clickUrl: '#',
    desc: 'nhwc',
    url: 'http://dummyimage.com/1745x492/f1d65b'
  },
  {
    clickUrl: '#',
    desc: 'hxrj',
    url: 'http://dummyimage.com/1745x492/40b7ea'
  },
  {
    clickUrl: '#',
    desc: 'rsdh',
    url: 'http://dummyimage.com/1745x492/e3c933'
  }
]

const _freeList = [
  {
    title: '为什么抱元科技没有食堂？',
    type: '文学'
  },
  {
    title: '名画为什么这么值钱？',
    type: '艺术'
  }
]

const _newMessageCount = 2

const _visionList = [
  {
    id: 1,
    url: 'http://dummyimage.com/1745x492/f1d65b',
    title: '中华五千年',
    desc: '听历史故事，涨人生见识',
    author: '伍智·国学教师',
    price: '99.00',
    count: 100,
    fit: '4-6岁儿童'
  },
  {
    id: 2,
    url: 'http://dummyimage.com/1745x492/f1d65b',
    title: '中华五千年',
    desc: '听历史故事，涨人生见识',
    author: '伍智·国学教师',
    price: '99.00',
    count: 100,
    fit: '4-6岁儿童'
  },
  {
    id: 3,
    url: 'http://dummyimage.com/1745x492/f1d65b',
    title: '中华五千年',
    desc: '听历史故事，涨人生见识',
    author: '伍智·国学教师',
    price: '99.00',
    count: 100,
    fit: '4-6岁儿童'
  }
]

const _videoList = [
  {
    id: 4,
    url: 'http://dummyimage.com/1745x492/f1d65b',
    title: '中华五千年',
    desc: '听历史故事，涨人生见识',
    author: '伍智·国学教师',
    price: '99.00',
    count: 100
  },
  {
    id: 5,
    url: 'http://dummyimage.com/1745x492/f1d65b',
    title: '中华五千年',
    desc: '听历史故事，涨人生见识',
    author: '伍智·国学教师',
    price: '99.00',
    count: 100
  },
  {
    id: 6,
    url: 'http://dummyimage.com/1745x492/f1d65b',
    title: '中华五千年',
    desc: '听历史故事，涨人生见识',
    author: '伍智·国学教师',
    price: '99.00',
    count: 100
  }
]

const _bookList = [
  {
    url: 'http://dummyimage.com/1745x492/40b7ea',
    title: '小麦的故事',
    isNew: false,
    price: 4.99
  },
  {
    url: 'http://dummyimage.com/1745x492/40b7ea',
    title: '小麦的故事',
    isNew: false,
    price: 4.99
  },
  {
    url: 'http://dummyimage.com/1745x492/40b7ea',
    title: '小麦的故事',
    isNew: false,
    price: 4.99
  },
  {
    url: 'http://dummyimage.com/1745x492/40b7ea',
    title: '小麦的故事',
    isNew: false,
    price: 4.99
  },
  {
    url: 'http://dummyimage.com/1745x492/40b7ea',
    title: '小麦的故事',
    isNew: false,
    price: 4.99
  },
  {
    url: 'http://dummyimage.com/1745x492/40b7ea',
    title: '小麦的故事',
    isNew: false,
    price: 4.99
  },
  {
    url: 'http://dummyimage.com/1745x492/40b7ea',
    title: '小麦的故事',
    isNew: false,
    price: 4.99
  },
  {
    url: 'http://dummyimage.com/1745x492/40b7ea',
    title: '小麦的故事',
    isNew: false,
    price: 4.99
  },
  {
    url: 'http://dummyimage.com/1745x492/40b7ea',
    title: '小麦的故事',
    isNew: false,
    price: 4.99
  }
]

export function getFreeList(cb) {
  setTimeout(() => cb(_freeList), 100)
}
export function getNewMessageCount(cb) {
  setTimeout(() => cb(_newMessageCount), 100)
}
export function getVisionList(cb) {
  setTimeout(() => cb(_visionList), 100)
}
export function getVideoList(cb) {
  setTimeout(() => cb(_videoList), 100)
}
export function getBookList(cb) {
  setTimeout(() => cb(_bookList), 100)
}
export async function getBannerList(params) {
  return request(`/index/bannerList?${stringify(params)}`)
}

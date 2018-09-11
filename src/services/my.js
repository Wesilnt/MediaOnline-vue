import { stringify } from 'qs';
import request from '../utils/request';
/*  *****我的**** */

/*export async function queryPhotos(params) {
    return request.post('/photos', params);
}*/
/* 我的拼团 */
export async function queryMyPuzzleList(params) {
  // return request.post('/photos', params);
  console.log(params)
  return [
    {
      id: '1',
      time: new Date(),
      title: '中华五千年（上）',
      description: '听历史故事，涨人生见识',
      totalPrice: '99.00',
      totalLessons: '100',
      price: '9.9',
      url:
        'http://img.zcool.cn/community/01867b56b02cf432f875520fad3d02.jpg@1280w_1l_2o_100sh.jpg',
      status: '1'
    },
    {
      id: '2',
      time: new Date(),
      title: '中华五千年（上）',
      description: '听历史故事，涨人生见识',
      totalPrice: '99.00',
      totalLessons: '100',
      price: '9.9',
      url:
        'http://img.zcool.cn/community/01867b56b02cf432f875520fad3d02.jpg@1280w_1l_2o_100sh.jpg',
      status: '2'
    },
    {
      id: '3',
      time: new Date(),
      title: '中华五千年（上）',
      description: '听历史故事，涨人生见识',
      totalPrice: '99.00',
      totalLessons: '100',
      price: '9.9',
      url:
        'http://img.zcool.cn/community/01867b56b02cf432f875520fad3d02.jpg@1280w_1l_2o_100sh.jpg',
      status: '-1'
    }
  ]
}

//意见反馈
export async function postFeedback(params) {
  return request.post('/feedback/feedbackContent', params);
}

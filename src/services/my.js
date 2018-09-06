/*  *****我的**** */

/*export async function queryPhotos(params) {
    return request.post('/photos', params);
}*/
/* 我的拼团 */
export async function queryMyPuzzleList(params) {
    // return request.post('/photos', params);
    console.log(params);
    return [{
        id:'1',
        time:new Date(),
        title:'中华五千年（上）',
        description:'听历史故事，涨人生见识',
        totalPrice:'99.00',
        totalLessons:'100',
        price:'9.9',
        status:'1'
    },{
        id:'2',
        time:new Date(),
        title:'中华五千年（上）',
        description:'听历史故事，涨人生见识',
        totalPrice:'99.00',
        totalLessons:'100',
        price:'9.9',
        status:'2'
    },{
        id:'3',
        time:new Date(),
        title:'中华五千年（上）',
        description:'听历史故事，涨人生见识',
        totalPrice:'99.00',
        totalLessons:'100',
        price:'9.9',
        status:'-1'
    }]
}

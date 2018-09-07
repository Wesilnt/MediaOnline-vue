const { NODE_ENV } = process.env

// mock数据网站 可测试接口
// /posts       100条
// /comments    500条
// /albums      100条
// /photos      5000条
// /todos       200条
// users        10条
/*参考地址 https://github.com/typicode/jsonplaceholder#how-to*/

let api = 'https://xcx.test.shbaoyuantech.com:30000'
//  api = "https://jsonplaceholder.typicode.com";

if (NODE_ENV === 'production') {
  api = 'https://xcx.shbaoyuantech.com'
}
export default api

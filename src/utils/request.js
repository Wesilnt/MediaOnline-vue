import 'whatwg-fetch'
import { Toast } from 'vant'
import api from '../api/api'
import { isUrl, json2formData } from './utils'
import { getAccessToken, getRefreshToken, setAccessToken, getExpireTime, setExpireTime, getUserInfo, setUserInfo } from './userAuth'
import { stringify } from 'querystring';
import { get } from 'https';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
}

function checkStatus(url, response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }

  const errortext = codeMessage[response.status] || response.statusText
  const error = new Error(errortext)
  error.url = response.url
  error.name = response.status
  error.response = response
  Toast.fail({
    duration: 4000, // 持续展示 toast
    message: response.error
  })
  console.error('返回错误状态码' + error)
  console.dir(error)
  console.error('接口名称  ' + url)
  throw error
}

const checkResponseCode = (url, response) => {
  if (typeof response.code === 'undefined') {
    return response
  }
  if (response.code == 0) {
    return response.data || response
  }

  const errorText = response.message || response.error || response.code
  const error = new Error(errorText)
  error.name = 'code-error'
  error.response = response
  error.code = response.code

  // 1002: token过期 需重新申请
  if (response.code === 1002) error.name = 401
  // 1001: token无效 需退出重新登录
  if (response.code === 1001) error.name = '401-logout'
  Toast.fail({
    duration: 4000, // 持续展示 toast
    message: response.error
  })
  // toast.fail(response.error);
  console.error('返回响应错误' + error)
  console.dir(error)
  console.error('接口名称  ' + url)
  throw error
}
function GetRequestCode() {
  var url = location.search; //获取url中"?"符后的字符串
  var theRequest = new Object();
  if (url.indexOf("?") != -1) {
    var str = url.substr(1);
    str = str.split("&");
    for (var i = 0; i < str.length; i++) {
      theRequest[str[i].split("=")[0]] = (str[i].split("=")[1]);
    }
  }
  return theRequest;
}


export async function getToken() {

  const bodyData = json2formData({ 'originUrl': 'http://t.shbaoyuantech.com/' })
  let result = await request('/auth/wechat/get-wechat-auth-link', { method: 'POST', body: bodyData }, false)
  console.log(result)
if(getCookie('COOKIE_TOKEN_KEY_CNONLINE') != null){
  console.log(getCookie('COOKIE_TOKEN_KEY_CNONLINE'))
  setAccessToken(getCookie('COOKIE_TOKEN_KEY_CNONLINE'))
}else{
  window.location.href = result.wechatAuthUrl;
}

}
function getCookie(name)
{          //匹配字段
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    
   
    if(arr=document.cookie.match(reg))
 
        return (arr[2]).replace("\"","");
    else
        return null;
}
/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
function request(url, options, needToken = true) {
  // const accessToken = getAccessToken();

  var accessToken;

  // const refreshToken = getRefreshToken()
  const baseURI = isUrl(url) ? '' : api
  var defaultOptions;
  if (needToken) {
    console.log('走了token')
    // accessToken = '9009f5f8-e2bc-4cb0-98d9-721b32153c56'
    // accessToken = getAccessToken()
    accessToken = getCookie('COOKIE_TOKEN_KEY_CNONLINE')
    console.log(accessToken)
    defaultOptions = {
      // credentials: 'include',
      // mode: 'no-cors',
      // formData: false,
      headers: {
        Authorization: `Bearer ${btoa(accessToken)}`
      }
    }
  } else {
    console.log('走了没token')
    defaultOptions = {
    }
  }
  const newOptions = { ...defaultOptions, ...options }
  if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...newOptions.headers
      }
      // if (newOptions.headers['Content-Type'] !== 'application/octet-stream') {
      //   newOptions.body =json2formData(newOptions.body)
      // }
    }
  }
  console.log(newOptions);
  debugger
  return fetch(`${baseURI}${url}`, newOptions)
    .then(checkStatus.bind(this, url))
    .then(response => {
      if (newOptions.method === 'DELETE' || response.status === 204) {
        return response.text()
      }
      return response.json()
    })
    .then(checkResponseCode.bind(this, url))
    .catch(e => {
      // const { dispatch } = store;
      const status = e.name
      if (status === '401-logout') {
        Toast.fail('401-logout')
        // dispatch({ type: "login/logout" });
      }
      if (status === 401) {
        if (!accessToken) {
          Toast.fail('no accessToken')
          /*dispatch({
                      type: "login/logout"
                    });
                    return;*/
        }

        /* dispatch({
                  type: "login/refreshToken",
                  payload: {
                    refreshToken,
                    accessToken
                  }
                });*/
        return
      }
      if (status === 403) {
        Toast.fail('403')
        // dispatch(routerRedux.push("/exception/403"));
        return
      }
      if (status <= 504 && status >= 500) {
        Toast.fail('500')
        // dispatch(routerRedux.push('/exception/500'));
        return
      }
      if (status >= 404 && status < 422) {
        Toast.fail('404')
        // dispatch(routerRedux.push("/exception/404"));
      }
    })
}

request.post = (url, body) => {
  const bodyData = json2formData(body)
  return request(url, { method: 'POST', body: bodyData })
}

export default request

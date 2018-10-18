
import {getColumnDetail} from '../api/accessTokenApi'

export default{
  //获取专栏详情
  async getColumnDetail({commit,state}, {courseId,columnType,useCache = false}) { 
    if(columnType)commit('bindColumnType',{columnType})
    if(!courseId||-1 == courseId) return null
    let cacheId = state.columnDetail && state.columnDetail.id 
    if(cacheId && cacheId === courseId && useCache) return state.columnDetail
    const result = await getColumnDetail({courseId})   
    commit('bindCurrentColumn', {columnDetail:result})
    return result
  }
}
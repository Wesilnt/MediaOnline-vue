import { getColumnDetail } from '../api/accessTokenApi'
import {ColumnType} from "../utils/config"

export default {
  //获取专栏详情
  async getColumnDetail({ commit, state },{ courseId, columnType, useCache = false}) {
    console.log("全局：columnType",columnType)
    if (columnType) commit('bindColumnType', { columnType })
    if (!courseId || -1 == courseId) return null
    let cacheId = state.columnDetail && state.columnDetail.id
    if (cacheId && cacheId === courseId && useCache) return state.columnDetail
    const result = await getColumnDetail({ courseId })
    commit('bindCurrentColumn', { columnDetail: result })
    return result
  }
}

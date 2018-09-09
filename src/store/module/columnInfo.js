import { getColumns } from '../../services/columns.js'

const columnInfo = {
    namespaced: true, // 设置命名空间 ，保持数据独立性
    state: {
        columnHeaderImage : '',       //专栏头图
        columns : [],                 //专栏数组
        columnOriginData : null,       //接口返回数据
    },
    mutations: {
        addColumns(state,payload) {
            state.columnOriginData = payload
            state.columns = payload.courseInfo.result
            state.columnHeaderImage = payload.bannerPic
        }
    },
    actions:{
       async getColumnList ({ commit },{ type,pageSize }) {            
            //获取视频列表数据
            const currentPage = 1
            const result = await getColumns({ type, pageSize, currentPage })
            console.log(result)
            commit('addColumns',result)
        }
    }
}
export default columnInfo;
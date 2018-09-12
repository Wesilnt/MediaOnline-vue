import { getReadingsList, getBookDetail, getSingleSetList } from '../../services/readingsApi'
export default {
    namespaced: true,
    state: {
        bannerPic: {}, //专栏头图
        bookList: [], //书列表 
        bookDetail: {}, //书详情
        singleSetList: [] //单集列表
    },
    mutations: {
        getReadingsList(state, res) {
            state.bannerPic = res.bannerPic
            state.bookList = res.courseInfo.result
        },
        getBookDetail(state, res) {
            state.bookDetail = res
        },
        getSingleSetList(state, res) {
            state.singleSetList = res.result
        }
    },
    actions: {
        //读书会-书列表
        async getReadingsList({ commit }) {
            const res = await getReadingsList({ type: 1007, currentPage: 1, pageSize: 10 })
            console.log(res)
            commit("getReadingsList", res)
        },
        //书详情
        async getBookDetail({ commit }, params) {
            const res = await getBookDetail(params)
            console.log(res)
            commit("getBookDetail", res)
        },
        //书单集列表
        async getSingleSetList({ commit }, params) {
            const res = await getSingleSetList(params)
            console.log(res)
            commit("getSingleSetList", res)
        }
    },
    getters: {
        //获取
        getBookIntroduce:function(state) {
          console.log(state)
            return {
                name: state.bookDetail.name,                         //单集名称
                coverPic: state.bookDetail.coverPic,                 //封面图
                profilePic: state.bookDetail.profilePic,             //介绍图
                authorBriefIntro:state.bookDetail.authorIntro,       //作者介绍
                radioIntro:state.bookDetail.commentatorIntro,        //播讲者介绍  
                description:state.bookDetail.description,            //内容介绍
            }
        }
    }
}
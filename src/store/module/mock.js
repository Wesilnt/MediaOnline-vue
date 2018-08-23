import { decrement, increment, log } from "./type";
import { queryAlbums, queryPhotos, queryPosts } from "../../services/mock";

const mocker = {
  namespaced: true, // 设置命名空间 ，保持数据独立性
  state: {
    postList: [],
    albumList: [],
    photoList: [],
    loading: false
  },
  mutations: {
    // 必须为同步函数
    saveList(state, payload) {
      const { data } = payload;
      const { type, list } = data;
      console.log(list);
      state[type] = list;
    },
    toggleLoading(state, payload) {
      state.loading = payload.loading;
    }
  },
  actions: {
    // 可为异步函数
    async queryList({ dispatch, commit, state }, payload) {
      const { type } = payload;
      let response = "";
      await commit("toggleLoading", {
        loading: true
      });
      if (type === "postList") {
        response = await queryPosts();
      } else if (type === "albumList") {
        response = await queryAlbums();
      } else {
        response = await queryPhotos();
      }
      await commit({
        type: "saveList",
        data: {
          type,
          list: response
        }
      });
      commit("toggleLoading", {
        loading: false
      });
    }
  }
};
export default mocker;

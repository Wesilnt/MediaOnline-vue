import {getFreezoneList, } from '../../services/commentApi'
export default {
  namespaced:true,
  state: {
      
  },
  mutations: {
   
  },
  actions: {
     async getFreezoneList(){
       const res = await getFreezoneList()
     }
  }
}
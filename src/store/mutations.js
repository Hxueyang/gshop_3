import {
  SAVE_ADDRESS,
  SAVE_STORAGE,
  SAVE_SHOPLIST,
  SAVE_USERINFO,
  SAVE_TOKEN
} from './mutations-type.js'
export default {
  [SAVE_ADDRESS](state,address) {
    state.address = address 
  },
  [SAVE_STORAGE](state,storage) {
    state.storage = storage 
  },
  [SAVE_SHOPLIST](state,shopList) {
    state.shopList = shopList 
  },
  [SAVE_USERINFO](state,userInfo) {
    state.userInfo = userInfo
  },
  [SAVE_TOKEN] (state,token) {
    state.token = token
  }
}
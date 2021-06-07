import {
  SAVE_ADDRESS ,
  SAVE_STORAGE,
  SAVE_SHOPLIST,
  SAVE_USERINFO,
  SAVE_TOKEN
} from './mutations-type.js'
import {
  getAddress,
  getStorage,
  getShopList,
} from '../api'

export default {
  async getAddressAction({commit}) {
    let result = await getAddress(40.1003,116.36867)
    !!(result.code===0) && commit(SAVE_ADDRESS,result.data)
  },
  async getStorageAction({commit}) {
    let result = await getStorage()
    !!(result.code===0) && commit(SAVE_STORAGE,result.data)
  },
  async getShopListAction({commit}) {
    let result = await getShopList(40.1003,116.36867)
    !!(result.code===0) && commit(SAVE_SHOPLIST,result.data)
  },
  async getUserInfoAction({commit},user) {
    // 保存token
    commit(SAVE_TOKEN,user.token)
    // token保存到本地
    localStorage.setItem('token_key', user.token)
    delete user.token
    // 
    commit(SAVE_USERINFO,user)
  }
}
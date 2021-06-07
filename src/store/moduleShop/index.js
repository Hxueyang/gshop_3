import Vue from 'vue'
import {
  SAVE_SHOPS,
  ADD_FOOD_COUNT,
  SUB_FOOD_COUNT,
  CLEAR_SHOP_CART
} from '../mutations-type.js'
import {
  getShops
} from '../../api'
const state = {
  initMoudule: '模块化出石化',
  shops: {} ,// 获取商家的详细数据
  shopCartDatas: []
}

const mutations = {
  [SAVE_SHOPS](state,shops) {
    state.shops = shops 
  },
  [ADD_FOOD_COUNT](state,{food}) {
    if(food.count>0) {
      food.count++
      console.log(222);
    } else {
      // vm.$set( target, propertyName/index, value )
      Vue.set(food,'count',1)
      state.shopCartDatas.push(food)
    }
  },
  [SUB_FOOD_COUNT](state,{food}) {
    if (food.count>0) {
      food.count--
    }
  },
  [CLEAR_SHOP_CART](state) {
    if (state.shopCartDatas) {
      state.shopCartDatas.forEach((food)=>{
        food.count = 0
      })
      state.shopCartDatas = []
    }
  },
}

const actions = {
  async getShopsAction({commit}) {
    let result = await getShops()
    !!(result.code===0) && commit(SAVE_SHOPS,result.data)
  },
  changeFoodCount({commit},{isAdd,food}) {
    if (isAdd) {
      commit(ADD_FOOD_COUNT,{food})
    } else {
      commit(SUB_FOOD_COUNT,{food})
    }
  }
}

const getters = {
  amountCount() {
    return state.shopCartDatas.reduce((pre,next)=>{
      pre+=next.count
      return pre
    },0)
    
  },
  amountPrice() {
    return state.shopCartDatas.reduce((pre,next)=>{
      pre+=next.price*next.count
      return pre
    },0)
  },
}

export default {
  state,
  mutations,
  actions,
  getters
}

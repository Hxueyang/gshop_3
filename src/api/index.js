import ajax from './ajax'

// 1、根据经纬度获取位置详情 http://localhost:4000/position/40.10038,116.36867
// export const getAddress = (longitude,latitude)=> ajax({
//   url: '/position',
//   params: {
//     latitude,
//     longitude
//   }
// })
export const getAddress = (longitude,latitude) => ajax({
  url: `/position/${longitude},${latitude}`
})

// 2.获取食品分类列表 http://localhost:5000/index_category
export const getStorage = () => ajax({
  url:'/index_category'
})
// 3. 获取商品列表 http://localhost:4000/shops
export const getShopList = (longitude,latitude)=>ajax({
  url: '/shops',
  params: {
    longitude,
    latitude
  }
})

// 3、根据经纬度获取商铺列表
// export const getShopList = (latitude,longitude) => ajax({
//   url: '/shops',
//   params: {
//     latitude,
//     longitude
//   }
// })
// 4. 获取商家详细数据
export const getShops = () => ajax({
  url: '/shopdata',
})

// 5. 获取一次性验证码 http://localhost:4000/captcha
export const sendCaptcha = () => ajax({
  url: '/captcha',
})

// 6、发送短信验证码 /sendcode
export const sendCode = (phone)=> ajax({
  url: '/sendcode',
  params: {
    phone
  }
}) 

      
// 7、手机号验证码登陆  http://localhost:5000/login_sms
export const loginWithPhone = ({phone,code}) => ajax({
  url: '/login_sms',
  method: 'POST',
  data: {
    phone,
    code
  }
})

// 8.用户名密码登陆 http://localhost:5000/login_pwd
export const loginWithUsername = ({username,pwd,captcha}) => ajax({
  url: '/login_pwd',
  method: 'POST',
  data:{
    name: username,
    pwd,
    captcha
  }
})
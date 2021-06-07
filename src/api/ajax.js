// import axios from 'axios'
// import qs from 'qs'

// // 创建axios实例
// const instance = axios.create({
//   baseURL:'api'
// })

// instance.interceptors.request.use((config)=>{
//   config.data = qs.stringify(config.data)
//   return config
// })

// instance.interceptors.response.use(
//   response => response.data,
//   error => {
//     console.log(error.message);
//     return new Promise(() => {})
//   }
// )
// export default instance
import axios from 'axios'
import qs from 'qs'
// 1. 生成Axios的伪实例, instance 不是真正的new Axios,但是拥有axios 市里的所有属性和方法
const instance = axios.create({
  baseURL: 'api'
})
// 2. 添加请求拦截器 理解: 即将要发送请求的时候, 将请求拦截下来，对当前的请求批量处理， 如： 天啊及taken, 修改请求参数
instance.interceptors.request.use(config => {
  // 1). config包含当前请求的所有请求信息: method, url, data

  // 2) 修改post请求的请求参数格式: 默认的参数格式是json对象格式{a:xxx,b:yyy}, 当前服务器处理的是url-encoding,
 //  如: a=xxx&b=yyy
 config.data = qs.stringify(config.data)  // json对象格式 --- >url-encoding形式
 // 3) 携带token的方式： 1. cookie 2. 请求参数 3. 请求头[authorization]
  // 判断当前的请求是否需要携带token
 return config
})

// 3. 设置响应拦截器
instance.interceptors.response.use(
  response => response.data,
  error => {
    console.log(error.message);
    return new Promise(() => {})
  }
)
export default instance

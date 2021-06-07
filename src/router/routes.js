// import MSite from '../pages/MSite/MSite.vue'
// import Search from '../pages/Search/Search.vue'
// import Older from '../pages/Older/Older.vue'
// import Profile from '../pages/Profile/Profile.vue'
// import Shop from '../pages/Shop/Shop.vue'
// import Goods from '../pages/Shop/Goods/Goods.vue'
// import Rating from '../pages/Shop/Rating/Rating.vue'
// import Info from '../pages/Shop/Info/Info.vue'
// import Login from '../pages/Login/Login.vue'


// 缓存路由组件
const MSite = () => import('../pages/MSite/MSite.vue')
const Search = () => import('../pages/Search/Search.vue')
const Older = () => import('../pages/Older/Older.vue')
const Profile = () => import('../pages/Profile/Profile.vue')
const Shop = () => import('../pages/Shop/Shop.vue')
const Goods = () => import('../pages/Shop/Goods/Goods.vue')
const Rating = () => import('../pages/Shop/Rating/Rating.vue')
const Info = () => import('../pages/Shop/Info/Info.vue')
const Login = () => import('../pages/Login/Login.vue')
export default [
  {
    path: '/msite',
    component: MSite,
    meta: {
      isShowFooter: true
    }
  },
  {
    path: '/search',
    component:Search,
    meta: {
      isShowFooter: true
    }
  },
  {
    path: '/older',
    component: Older,
    meta: {
      isShowFooter: true
    }
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      isShowFooter: true
    }
  },
  {
    path:'/login',
    component: Login,
    meta: {
      isShowFooter: false
    }
  },
  {
    path: '/shop',
    component: Shop,
    children: [
      {
        path: '/shop/goods',
        component: Goods
      },
      {
        path: '/shop/rating',
        component: Rating
      },
      {
        path: '/shop/info',
        component: Info
      },
      {
        path: '/shop',
        redirect: '/shop/goods'
      }
    ]
  },
  // 路由重定向
  {
    path: '/',
    redirect: 'msite'
  }
]
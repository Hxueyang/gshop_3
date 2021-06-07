<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper">
        <ul ref="leftUI">
          <li class="menu-item" v-for="(good,index) in goods" :key="index" :class="{current: navIndex===index}" @click="changeNavIndex(index)">
            <!-- <img class="icon" :src="good.icon"> -->
            <span class="text bottom-border-1px">{{good.name}}</span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper">
        <ul ref="rightUI">
          <li class="food-list-hook" v-for="(good,index) in goods" :key="index"   >
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food,index) in good.foods" :key="index">
                <div class="icon">
                  <img width="57" height="57"
                      :src="food.image">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span></div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"></CartControl>
                  </div>
                </div>
              </li>
            </ul>
          </li>
          <li class="food-list food-list-hook">
            <h1 class="title">香浓甜粥</h1>
            <ul>
              <li class="food-item bottom-border-1px">
                <div class="icon">
                  <img width="57" height="57" src="http://fuss10.elemecdn.com/6/72/cb844f0bb60c502c6d5c05e0bddf5jpeg.jpeg?imageView2/1/w/114/h/114">
                </div>
                <div class="content">
                  <h2 class="name">红枣山药粥</h2>
                  <p class="desc">红枣山药糙米粥,素材包</p>
                  <div class="extra">
                    <span class="count">月售17份</span>
                    <span>好评率100%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥29</span>
                    <span class="old">￥36</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    CartControl组件
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <ShopCart></ShopCart>
</div>

</template>

<script>
import ShopCart from '../../../components/ShopCart/ShopCart'
import {mapState} from 'vuex'
import CartControl from '../../../components/CartControl/CartControl'
import BScroll from '@better-scroll/core'
export default {
  name: 'Goods',
  data() {
    return {
      scrollY:0, //  滚动的距离
      tops: [] // 获取每个li的高度
    }
  },
  components: {
    CartControl,
    ShopCart
  },
  mounted() {
    if (this.goods) {
      this._initScroll(),
      this._initScroll()
    }
    
  },
  computed: {
    ...mapState({
      goods: state => state.moduleShop.shops.goods
    }),
    navIndex() {
      let {scrollY,tops} = this
      let index  = tops.findIndex((top,index) => { return  tops[index] <= scrollY && tops[index+1] > scrollY});
      // scrollToElement(el, time, offsetX, offsetY, easing)
      // if (this.left && index!==this.index) {
      //   this.index=index
      //   this.left.scrollToElement(this.$refs.leftUI.children[index],100)
      //   // console.log(111);
      // }
      if (this.left) {
        // console.log(currentIndex,index);
        this.left.scrollToElement(this.$refs.leftUI.children[index],1000)
        // console.log(111);
      }
      return  index
    }
  },
  methods: {
      _initScroll() {
        if (this.left || this.right) {
           this.left.on('refresh')
           this.right.on('refresh')
        } else  {
          let scrollY
          this.left = new BScroll('.menu-wrapper', {
            // ...... 详见配置项
            startY: true,
            probeType: 2,
            click: true
          }),
            this.right = new BScroll('.foods-wrapper', {
            // ...... 详见配置项
            startY: true,
            probeType: 2,
            click: true
          })
          this.right.on('scroll', ({y}) => {
            scrollY = Math.abs(y)
            this.scrollY = scrollY
          })
        }
        
      },
      _initTop() {
        let lis = Array.from(this.$refs.rightUI.children)
        let tops = [0]
        lis.reduce((pre,next)=>{
          pre+=next.clientHeight
          tops.push(pre)
          return pre
        },0)
        this.tops = tops
      },
      changeNavIndex(index) {       
        this.scrollY = this.tops[index] 
        this.right.scrollTo(0, -this.scrollY, 1000)
      }
  },
  watch: {
    goods() {
      this.$nextTick(()=>{
        this._initScroll(),
        this._initTop()
      })
    }
  }

}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 225px
    bottom: 46px
    // height calc(100vh-224px)
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        bottom-border-1px(#ccc)
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>

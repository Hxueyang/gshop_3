<template>
  <div id="footerContainer">
    <div class="footerItem" @click="goPath('/msite')" :class="{active: $route.path==='/msite'}">
      <i class="iconfont iconhome"></i>
      <span>首页</span>
    </div>
     <div class="footerItem" @click="goPath('/search')" :class="{active: $route.path==='/search'}">
      <i class="iconfont iconsearch" ></i>
      <span>搜索</span>
    </div>
     <div class="footerItem" @click="goPath('/older')" :class="{active: $route.path==='/older'}">
      <i class="iconfont iconsuggest"></i>
      <span>订单</span>
    </div>
     <div class="footerItem" @click="goPath('/profile')" :class="{active: $route.path==='/profile'}">
      <i class="iconfont iconuser-filling"></i>
      <span>我的</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FooterGuide',
  data() {
    return {
    }
  },
  methods: {
    goPath(path) {
      // 判断是否在当前路径
      !(path===this.$route.path)&& this.$router.push(path)
    }
  },
}
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  #footerContainer
    display flex
    top-border-1px(#ccc)
    position fixed
    left 0
    bottom 0
    width 100%
    height 50px
    text-align center
    background-color #fff
    .footerItem
      flex 1
      display flex 
      flex-direction column
      height 50px
      &.active
        color $green
      .iconfont
        line-height 30px
        font-size 24px
</style>
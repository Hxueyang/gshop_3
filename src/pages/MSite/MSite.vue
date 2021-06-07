<template>
 <div class="on">
      <section class="msite">
        <!--首页头部-->
        <HeaderGuide :title="address?address.name:'定位中...'">
          <span class="header_search" slot="left">
            <i class="iconfont iconsearch"></i>
          </span>
          <span class="header_login" slot="right">
            <span class="header_login_text">登录|注册</span>
          </span>
        </HeaderGuide>
        <!--首页导航-->
        
        <nav class="msite_nav">
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(storages,index) in newStorage" :key="index">
                <div class="link_to_food" v-for="(storage,index) in storages" :key="index">
                  <div class="food_container">
                    <img :src="`https://fuss10.elemecdn.com/${storage.image_url}`">
                  </div>
                  <span>{{storage.title}}</span>
                </div> 
              </div>
            </div>
            <!-- Add Pagination -->
            <div class="swiper-pagination"></div>
          </div>
        </nav>
        <!--首页附近商家-->
        <ShopList/>
      </section>
    </div>
</template>

<script>
import ShopList from '../../components/ShopList/ShopList'
import {mapState} from 'vuex'
import _ from 'lodash'
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'
export default {
  name: 'MSite',
  components: {
    ShopList
  },
  computed: {
    ...mapState({
      address: state => state.address
    }),
     ...mapState({
      storage: state => state.storage
    }),
     newStorage() {
      return _.chunk(this.storage, 8)
    }
  },
  mounted() {
    this.$store.dispatch('getAddressAction')
    this.$store.dispatch('getStorageAction')
  },
  watch: {
    newStorage() {
      this.$nextTick(()=>{
        new Swiper('.swiper-container', {
        autoplay:true,
        pagination: {
        el: '.swiper-pagination',
        },
        scrollbar: {
        el: '.swiper-scrollbar',
        },

      });
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "../../common/stylus/mixins.styl"
&.msite  //首页
          width 100%
          .msite_nav
            bottom-border-1px(#e4e4e4)
            margin-top 45px
            height 200px
            background #fff
            .swiper-container
              width 100%
              height 100%
              .swiper-wrapper
                width 100%
                height 100%
                .swiper-slide
                  display flex
                  flex-wrap wrap
                  .link_to_food
                    width 25%
                    .food_container
                      display block
                      width 100%
                      text-align center
                      padding-bottom 10px
                      font-size 0
                      img
                        display inline-block
                        width 50px
                        height 50px
                    span
                      display block
                      width 100%
                      text-align center
                      font-size 13px
                      color #666
              /deep/.swiper-pagination
                >span.swiper-pagination-bullet-active
                  background #02a774

        
</style>
<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="iconfont iconbaseline-remove-px" @click="updataFoodCount(false)" v-show="food.count>0"></div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="iconfont iconAdd" @click="updataFoodCount(true)"></div>
</div>
</template>

<script>
export default {
  name: 'CartContent',
  props: {
    food: {
      type: Object,
      required: true
    }
  },
  methods: {
    updataFoodCount(isAdd) {
      this.$store.dispatch('changeFoodCount',{isAdd,food: this.food})
    }
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
.cartcontrol
  font-size: 0
  .iconbaseline-remove-px
    padding 2px
    color $green
    &.move-enter-active, &.move-leave-active 
      transition: all .5s; 
    &.move-enter, &.move-leave-to
      transform translateX(20px) rotate(180deg)
      opacity: 0;
  .cart-count
    display: inline-block
    width: 14px
    text-align: center
    font-size: 14px
    color: rgb(147, 153, 159)
    margin 0 8px
  .iconAdd
    padding: 2px
    color $green
  .iconfont
    display: inline-block
    border 2px solid $green
    border-radius 50%
    font-size 10px
</style>

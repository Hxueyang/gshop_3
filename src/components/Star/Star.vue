<template>
  <div class="star" :class="'star-'+size">
    <span class="star-item" :class="item" v-for="(item,index) in classes" :key="index"></span>
  </div>
</template>

<script>
export default {
  name:'Star',
  props: {
    rating: {
      type: Number,
      required: true,
      default: 5
    },
    size: {
      type: Number
    }
  },
  computed: {
    classes() {
      let {rating} = this
      // rating = 3.2
      let result = []
      // 计算全星
      let classOn = Math.floor(rating)
      for (let i = 0; i < classOn; i++) {
        result.push('on')
      }
      // 计算半星
      (rating-classOn )>0 && result.push('half')     
      // 剩下就是没星
      while(result.length<5) {
        result.push('off')
      }
      return result
    }
    
  }
}
</script>

<style lang="stylus" scoped>
@import "../../common/stylus/mixins.styl"
.star //2x图 3x图
                            float left
                            font-size 0
                            .star-item
                              display inline-block
                              background-repeat no-repeat
                            &.star-48
                              .star-item
                                width 20px
                                height 20px
                                margin-right 22px
                                background-size 20px 20px
                                &:last-child
                                  margin-right: 0
                                &.on
                                  bg-image('../../common/images/stars/star48_on')
                                &.half
                                  bg-image('../../common/images/stars/star48_half')
                                &.off
                                  bg-image('../../common/images/stars/star48_off')
                            &.star-36
                              .star-item
                                width 15px
                                height 15px
                                margin-right 6px
                                background-size 15px 15px
                                &:last-child
                                  margin-right 0
                                &.on
                                  bg-image('../../common/images/stars/star36_on')
                                &.half
                                  bg-image('../../common/images/stars/star36_half')
                                &.off
                                  bg-image('../../common/images/stars/star36_off')
                            &.star-24
                              .star-item
                                width 10px
                                height 10px
                                margin-right 3px
                                background-size 10px 10px
                                &:last-child
                                  margin-right 0
                                &.on
                                  bg-image('../../common/images/stars/star24_on')
                                &.half
                                  bg-image('../../common/images/stars/star24_half')
                                &.off
                                  bg-image('../../common/images/stars/star24_off')
</style>
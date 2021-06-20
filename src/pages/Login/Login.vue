<template>
  <div class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on: !isShowUserLogin}" @click="isShowUserLogin=false">短信登录</a>
          <a href="javascript:;" :class="{on: isShowUserLogin}" @click="isShowUserLogin=true">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form>
            <!-- 手机号密码登录 -->
          <div :class="{on:!isShowUserLogin}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone" v-validate="'required|phone'" name="phone">
              <span style="color: red;" v-show="errors.has('phone')">{{ errors.first('phone') }}</span>
              <button :disabled="!rightPhone" class="get_verification" :class="{right:rightPhone}" @click.prevent="getCode">{{countDownTime>0?countDownTime + "s以后可以重新获取":'获取验证码'}}</button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code" v-validate="'required|code'" name="code">
              <span style="color: red;" v-show="errors.has('code')">{{ errors.first('code') }}</span>
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <!-- 用户名密码登录 -->
          <div :class="{on:isShowUserLogin}">
            <section>
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="username" v-validate="'required'" name="username">
                <span style="color: red;" v-show="errors.has('username')">{{ errors.first('username') }}</span>
              </section>
              <section class="login_verification">
                <input :type="isShowPwd?'tel':'password'" maxlength="8" placeholder="密码" v-model="pwd" v-validate="'required'" name="pwd">
                 <span style="color: red;" v-show="errors.has('pwd')">{{ errors.first('pwd') }}</span>
                <div class="switch_button "  @click="toggleMsg" :class="isShowPwd?'on':'off'">
                  <div class="switch_circle" :class="{right:isShowPwd}"></div>
                  <span class="switch_text">{{isShowPwd?'abc':'...'}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha" v-validate="'required'" name="captcha">
                 <span style="color: red;" v-show="errors.has('captcha')">{{ errors.first('captcha') }}</span>
                <img class="get_verification" src="../../common/images/captcha.svg" alt="captcha" ref="captcha" @click="getCaptcha">
              </section>
            </section>
          </div>
          <button class="login_submit" @click.prevent="login">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <span href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont iconjiantou"></i>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data() {
      return {
        isShowUserLogin: false,  // 是否是用户名登录
        isShowPwd: false ,// 是否显示密码
        countDownTime: 0 ,// 倒计时
        phone: '',
        code: '',
        username: '',
        pwd: '',
        captcha: ''
      }
    },
    computed: {
       // 检测手机号
      rightPhone() {
        // return /^[1][3,5,6,7,8,9][0~9]{9}&/.test(this.phone)
        return /^1[3|4|5|7|8][0-9]{9}$/.test(this.phone)
      },
    },
    mounted() {
      this.getCaptcha()
    },
    methods: {
      // 获取一次向验证码
      getCaptcha() {
        this.$refs.captcha.src = 'http://localhost:5000/captcha?time=' + new Date()
      },
      // 操作密码
      toggleMsg() {
        this.isShowPwd = !this.isShowPwd
      },
      // 获取验证码
      async getCode() {
        this.countDownTime = 5
        let clearIntervalId = setInterval(()=>{
          this.countDownTime--
          this.countDownTime === 0 && clearInterval(clearIntervalId)
        },1000)
        // 发送短信验证码
        let result = await this.$API.sendCode(this.phone)
        console.log(result);
        if (result.code===0) {
          alert('短信发送成功')
        } else {
          alert('短信发送失败')
        }
      },
      // 登录
      async login() {
        let {isShowUserLogin,phone,code,username,pwd,captcha} = this
        let names = isShowUserLogin?['username','pwd','captcha']:['phone','code']
        // console.log(names);
        const success = await this.$validator.validateAll(names) // 对指定的所有表单项进行验证
        // console.log(success);
        let result
        // 前端验证
        if (success) {
          // 后端验证
          if (isShowUserLogin) {
            console.log(111);
            result = await this.$API.loginWithUsername({username,pwd,captcha})
            console.log(result);
            if (result.code===1) {
              alert('用户名/密码/验证码出错了')
              this.captcha = ''
              this.getCaptcha()
            }
          } else {
            result = await this.$API.loginWithPhone({phone,code})
            if(result.code===1) {
              alert('手机号/验证码出错了')
              this.code = ''
            }
            console.log(result);
          }
          // 对成功的数据进行统一处理
          if(result.code===0) {
            this.$router.replace('/profile')
            // 把用户的数据存起来
            this.$store.dispatch('getUserInfoAction',result.data)
          }
        } else {
          alert('验证失败')
        }
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.right
                  color black
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                //transform translateX(27px)
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.right
                    transform translateX(27px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>

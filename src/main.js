import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: [
      '^pages/index/main',
      'pages/logs/main',
      'pages/trending/main',
      'pages/favorite/main',
      'pages/my/main'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#2196f3',
      navigationBarTitleText: 'Github',
      navigationBarTextStyle: '#fff'
    },
    tabBar: {
      list: [{
        pagePath: 'pages/index/main',
        text: '首页',
        iconPath: 'static/images/ic_all_inclusive.png',
        selectedIconPath: 'static/images/ic_all_inclusive_selected.png'
      }, {
        pagePath: 'pages/trending/main',
        text: '趋势',
        iconPath: 'static/images/ic_trending_up.png',
        selectedIconPath: 'static/images/ic_trending_up_selected.png'
      }, {
        pagePath: 'pages/favorite/main',
        text: '喜欢',
        iconPath: 'static/images/ic_stars.png',
        selectedIconPath: 'static/images/ic_stars_selected.png'
      }, {
        pagePath: 'pages/my/main',
        text: '我的',
        iconPath: 'static/images/ic_perm_identity.png',
        selectedIconPath: 'static/images/ic_perm_identity_selected.png'
      }]
    }
  }
}

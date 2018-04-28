<template>
  <view class="trending">
    <view class="select-wrapper">
      <picker 
        @change="handleSelect('time', $event)"
        :range="timeList"
        :value="timeIndex"
        :range-key="name">
        {{timeList[timeIndex].name}}
        <img class="arrow" src="../../../static/images/ic_keyboard_arrow_down.png" alt="">
      </picker>
      <picker 
        @change="handleSelect('lang', $event)"
        :range="langList"
        :value="langIndex">
        {{langList[langIndex]}}
        <img class="arrow" src="../../../static/images/ic_keyboard_arrow_down.png" alt="">
      </picker>
    </view>
    <view class="scroll-view">
      <view 
        class="scroll-view-wrapper"
      >
        <scroll-view scroll-y>
            <view :id="lang" class="scroll-view-item">
              <trend 
                :repo="repo" 
                v-for="repo in data" 
                :key = "repo.fullName"
                @onFavorite="toggleFavorite"
              />
            </view>
        </scroll-view>
      </view>
    </view>
  </view>
</template>

<script>
import trend from '@/components/trend'
import { FLAG_STORAGE } from '@/utils/constants'
import { getTrendingByTime } from '@/utils/api'
import TrendingUtil from '@/utils/trendingUtil'
import ActionUtils from '@/utils/actionUtils'
import FavoriteDao from '@/utils/favoriteDao'

const favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_trending)

export default {
  data: {
    langList: ['All', 'Go', 'CSS', 'Erlang'],
    timeList: [{
      name: '今日趋势',
      value: 'daily'
    }, {
      name: '本周趋势',
      value: 'weekly'
    }, {
      name: '本月趋势',
      value: 'monthly'
    }],
    timeIndex: 0,
    langIndex: 0,
    time: 'daily',
    lang: 'All',
    name: 'name',
    data: []
  },

  components: {
    trend
  },

  watch: {
    lang (newLang, oldLang) {
      if (newLang !== oldLang) {
        this.initData()
      }
    },
    time (newTime, oldTime) {
      if (newTime !== oldTime) {
        this.initData()
      }
    }
  },

  methods: {
    bindViewTap () {
      const url = '../logs/main'
      wx.navigateTo({ url })
    },
    handleSelect (type, ev) {
      const value = ev.mp.detail.value
      console.log(value)
      if (type === 'time') {
        this.timeIndex = value
        this.time = this.timeList[value].value
      }
      if (type === 'lang') {
        this.langIndex = value
        this.lang = this.langList[value]
      }
    },
    initData () {
      getTrendingByTime(this.lang, this.time)
      .then(res => {
        const result = TrendingUtil.htmlToRepo(res)
        console.log(result)
        this.data = result
      })
    },
    toggleFavorite (item, isFavorite) {
      console.log(item)
      ActionUtils.onFavorite(favoriteDao, item, isFavorite, FLAG_STORAGE.flag_trending)
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
    this.initData()
  }
}
</script>

<style scoped>
.trending {
  width: 100%;
  height: 100%;
}

.select-wrapper {
  display: flex;
  height: 30px;
  justify-content: space-between;
  align-items: center;
  background-color: #2196f3;
  color: #FFF;
  font-size: 14px;
  padding: 0 20px;
}

.scroll-view {
  width: 100%;
  height: 100%;
  position: relative;
  background: #e7eaef;
}

scroll-view {
  background: #e7eaef;
  margin-top: 10px;
}

.scroll-view .scroll-view-wrapper{
  display: flex;
}

.scroll-view-item{
  display: inline-block;
  width: 100%;
}

.arrow {
  width: 16px;
  height: 16px;
  vertical-align: middle;
}

</style>

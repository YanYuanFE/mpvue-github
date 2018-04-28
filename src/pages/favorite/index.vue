<template>
  <view class="container">
    <view class="tab-bar">
      <view
        v-for="(tab, key) in tabs"
        :key="tab"
        class="tab"
        :class="{'tab-active': activeTab === key}"
        :style="{width: stv.windowWidth/tabs.length + 'px'}"
        @tap="handlerTabTap(key)"
      >
        <text>{{tab}}</text>
      </view>
      <view
        :style="{width: stv.lineWidth + 'px', left: stv.offset/tabs.length+'px'}"
        class="underline"
        :class="{'withAnimate': !stv.tStart}"
        >
      </view>
    </view>
    <view class="scroll-view">
      <view 
        class="scroll-view-wrapper" 
        :class="{'withAnimate': !stv.tStart}"
        :style="{left: -stv.offset+'px'}"
        @touchstart="handlerStart"
        @touchmove="handlerMove"
        @touchcancel="handlerCancel"
        @touchend="handlerEnd"
      >
        <view
          v-for="(item, index) in flags"
          :key="item"
          class="one-scene"
          :style="{width: stv.windowWidth + 'px'}">
          <scroll-view scroll-y>
            <view :id="item" class="scroll-view-item">
              <favorite :flag="item" />
            </view>
          </scroll-view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import favorite from '@/components/favorite'
import { FLAG_STORAGE } from '@/utils/constants'

export default {
  data: {
    tabs: ['Popular', 'Trending'],
    flags: [FLAG_STORAGE.flag_popular, FLAG_STORAGE.flag_trending],
    stv: {
      windowWidth: 0,
      lineWidth: 0,
      offset: 0,
      tStart: false
    },
    activeTab: 0
  },

  components: {
    favorite
  },

  methods: {
    initTab () {
      try {
        let tabs = this.tabs
        var res = wx.getSystemInfoSync()
        this.windowWidth = res.windowWidth
        this.stv.lineWidth = this.windowWidth / tabs.length
        this.stv.windowWidth = res.windowWidth
        this.tabsCount = tabs.length
      } catch (e) {
        console.log(e)
      }
    },
    handlerTabTap (index) {
      this._updateSelectedPage(index)
    },
    _updateSelectedPage (page) {
      let { stv } = this
      this.activeTab = page
      this.stv.offset = stv.windowWidth * page
    },
    handlerStart (e) {
      console.log(e)
      let { clientX, clientY } = e.mp.touches[0]
      this.startX = clientX
      this.tapStartX = clientX
      this.tapStartY = clientY
      this.stv.tStart = true
      this.tapStartTime = e.timeStamp
    },
    handlerMove (e) {
      let { clientX } = e.mp.touches[0]
      let stv = this.stv
      let offsetX = this.startX - clientX
      this.startX = clientX
      stv.offset += offsetX
      if (stv.offset <= 0) {
        this.stv.offset = 0
      } else if (stv.offset >= stv.windowWidth * (this.tabsCount - 1)) {
        this.stv.offset = stv.windowWidth * (this.tabsCount - 1)
      }
    },
    handlerCancel (e) {
      console.log(e)
    },
    handlerEnd (e) {
      let { clientX, clientY } = e.mp.changedTouches[0]
      let endTime = e.timeStamp
      let { stv, activeTab, tapStartTime, tapStartX, tapStartY, tabsCount } = this
      let { offset, windowWidth } = stv
      if (endTime - tapStartTime <= 300) {
        if (Math.abs(tapStartY - clientY) < 50) {
          if (tapStartX - clientX > 5) {
            if (activeTab < tabsCount - 1) {
              this.activeTab = ++activeTab
            }
          } else {
            if (activeTab > 0) {
              this.activeTab = --activeTab
            }
          }
          this.stv.offset = stv.windowWidth * activeTab
        } else {
          let page = Math.round(offset / windowWidth)
          if (activeTab !== page) {
            this.activeTab = page
          }
          this.stv.offset = stv.windowWidth * page
        }
      } else {
        let page = Math.round(offset / windowWidth)
        if (activeTab !== page) {
          this.activeTab = page
        }
        this.stv.offset = stv.windowWidth * page
      }
      this.stv.tStart = false
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
    this.initTab()
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}

.withAnimate {
  transition: all 100ms ease;
  -webkit-transform: translate3d(0, 0, 0);
  -moz-transform: translate3d(0, 0, 0);
  -ms-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -ms-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-perspective: 1000;
  -moz-perspective: 1000;
  -ms-perspective: 1000;
  perspective: 1000;
}

.tab-bar {
  position: relative;
  display: flex;
  font-size: 30rpx;
  color: #ffffff;
  background-color: #2196f3;
  width: 100%;
}

.tab-bar .tab-active {
  color: #ffffff;
}

.tab-bar .tab {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 16rpx;
  padding-bottom: 20rpx;
}

.tab-bar .underline {
  position: absolute;
  bottom: 0;
  height: 6rpx;
  background-color: #ffffff;
}

.scroll-view {
  width: 100%;
  height: 100%;
  position: relative;
  background: #e7eaef;
}

scroll-view {
  background: #e7eaef;
}

.scroll-view .scroll-view-wrapper{
  position: absolute;
  top: 0;
  bottom: 0;
  display: flex;
}

.scroll-view-item{
  display: inline-block;
  width: 100%;
}

</style>

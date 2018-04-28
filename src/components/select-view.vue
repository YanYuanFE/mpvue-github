<template>
  <view class="select-container">
    <view
      @tap="toggleSelect"
      class="selected">
      <text class="text">{{selected}}</text>
      <image class="image" src="../../static/images/ic_keyboard_arrow_down.png" />
    </view>
    <view class="select-wrapper" v-if="showDrop">
      <block v-for="item in list" :key="item.name">
        <view class="select-item" @tap="select(item)">
          {{item.name}}
        </view>
      </block>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    list: Array,
    default: []
  },
  data: {
    showDrop: false,
    selected: 'Trending Today'
  },
  methods: {
    toggleSelect () {
      this.showDrop = !this.showDrop
    },
    select (item) {
      this.showDrop = true
      this.selected = item.name
      this.$emit('select', item)
    }
  }
}
</script>

<style>
.cell-container {
  background-color: #FFF;
  padding: 10px;
  margin: 0 5px 10px;
  border: 1px solid #dddd;
  border-radius: 4px;
  box-shadow: gray;
  box-sizing: border-box;
  overflow: hidden;
}

.title {
  font-size: 16px;
  margin-bottom: 2px;
  color: #212121;
  flex: 1;
}

.description {
  font-size: 14px;
  margin-bottom: 2px;
  color: #757575;
  white-space: pre-wrap;
}

.row {
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  display: flex;
}

img {
  width: 22px;
  height: 22px;
}

.star {
  justify-content: space-between;
  flex-direction: row;
  display: flex;
}

.count {
  color: forestgreen;
}
</style>

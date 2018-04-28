<template>
  <view class="cell-container">
    <view>
      <text class="title">{{repo.full_name}}</text>
    </view>
    <view>
      <text class="description">{{repo.description}}</text>
    </view>
    <view class="row">
      <view class="row">
        <text>Author:</text>
        <img class="img" :src="repo.owner.avatar_url"/>
      </view>
      <view class="star">
        <text>Star:</text>
        <text class="count">{{repo.stargazers_count}}</text>
      </view>
      <img :src="favoriteIcon" alt="" class="img" @click="toggleFavorite">
    </view>
  </view>
</template>

<script>
export default {
  props: {
    repo: Object,
    default: ''
  },
  computed: {
    favoriteIcon () {
      return this.repo.isFavorite ? '../../static/images/ic_grade.png' : '../../static/images/ic_star_outline.png'
    }
  },
  methods: {
    toggleFavorite () {
      // this.repo.isFavorite = !this.repo.isFavorite
      console.log(this.repo)
      this.$emit('onFavorite', this.repo, !this.repo.isFavorite)
    }
  }
}
</script>

<style scoped>
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
  color: #2196f3;
}
</style>

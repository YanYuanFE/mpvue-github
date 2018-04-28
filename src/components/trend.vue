<template>
  <view class="trending-container">
    <view class="cell-container">
      <text class="title">{{repo.fullName}}</text>
    </view>
    <view>
      <text class="description">{{repo.description}}</text>
    </view>
    <view class="row">
      <view class="row-flex">
        <text class="author">Built by:</text>
        <img class="img"
          v-for="(avatar, avatarIndex) in repo.contributors"
          :key="avatar"
          :src="avatar"/>
      </view>
      <img :src="favoriteIcon" alt="" class="img" @tap="toggleFavorite">
    </view>
  </view>
</template>

<script>
export default {
  props: {
    repo: {
      type: Object,
      default: ''
    }
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
.trending-container {
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

.row-flex {
  display: flex;
  align-items: center;
}

.author {
  font-size: 14px;
  margin-bottom: 2px;
  color: '#757575';
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

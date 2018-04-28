<template>
  <view class="popular-wrapper">
    <popular
      v-for="item in data"
      :key="item.id"
      :repo="item"
      @onFavorite="toggleFavorite"
      />
  </view>
</template>

<script>
import { getPopularRepo } from '../utils/api'
import popular from './popular'
import { FLAG_STORAGE } from '@/utils/constants'
// import TrendingUtil from '@/utils/trendingUtil'
import ActionUtils from '@/utils/actionUtils'
import FavoriteDao from '@/utils/favoriteDao'

const favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_popular)
export default {
  props: {
    repo: String,
    default: ''
  },
  data () {
    return {
      data: []
    }
  },
  components: {
    popular
  },
  created () {
    getPopularRepo(this.repo)
      .then(result => {
        this.data = result.items
      })
  },
  methods: {
    toggleFavorite (item, isFavorite) {
      console.log(item)
      ActionUtils.onFavorite(favoriteDao, item, isFavorite, FLAG_STORAGE.flag_popular)
    }
  }
}
</script>

<style scoped>
.popular-wrapper {
  margin-top: 10px;
}
</style>

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
import ProjectModel from '@/utils/projectModel'
import Utils from '@/utils/utils'

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
        this.list = result.items
        this.getFavoriteKeys()
      })
  },
  methods: {
    toggleFavorite (item, isFavorite) {
      console.log(item, isFavorite)
      ActionUtils.onFavorite(favoriteDao, item, isFavorite, FLAG_STORAGE.flag_popular)
      this.getFavoriteKeys()
    },
    getFavoriteKeys () {
      favoriteDao.getFavoriteKeys().then((keys) => {
        console.log(keys)
        if (keys.length) {
          this.favoriteKeys = keys
        }
        this.flushFavoriteState()
      })
    },
    flushFavoriteState () {
      let projectModels = []
      this.list.forEach((item) => {
        const {full_name, description, owner, stargazers_count, id} = item
        const props = {full_name, description, owner, stargazers_count, id}
        projectModels.push(new ProjectModel({...props, isFavorite: Utils.checkFavorite(item, this.favoriteKeys)}))
      })
      this.data = projectModels
      console.log(this.data)
    }
  }
}
</script>

<style scoped>
.popular-wrapper {
  margin-top: 10px;
}
</style>

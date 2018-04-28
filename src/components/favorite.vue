<template>
  <view class="favorite-container">
    <block v-if="isPopularTab">
      <view>
        <popular 
          :repo="item" 
          v-for="item in list" 
          :key="item.fullName"
          @onFavorite="toggleFavorite"/>
      </view>
    </block>
    <block v-else>
      <view>
        <trend 
          :repo="item" 
          v-for="item in list" 
          :key="item.fullName"
          @onFavorite="toggleFavorite"/>
      </view>
    </block>
  </view>
</template>

<script>
import FavoriteDao from '@/utils/favoriteDao'
import { FLAG_STORAGE } from '@/utils/constants'
import popular from './popular'
import trend from './trend'
export default {
  data () {
    return {
      list: []
    }
  },
  props: {
    flag: {
      type: String,
      default: ''
    }
  },
  computed: {
    isPopularTab () {
      return this.flag === FLAG_STORAGE.flag_popular && this.list.length
    }
  },
  methods: {
    toggleFavorite () {
      // this.repo.isFavorite = !this.repo.isFavorite
      console.log(this.repo)
      this.$emit('onFavorite', this.repo, !this.repo.isFavorite)
    },
    loadData () {
      this.favoriteDao = new FavoriteDao(this.flag)
      this.favoriteDao.getAllItems().then((items) => {
        this.list = items
        console.log(this.list)
      })
    }
  },
  created () {
    this.loadData()
  },
  components: {
    popular,
    trend
  }
}
</script>

<style scoped>
.favorite-container {
  width: 100%;
  height: 100%;
  margin-top: 10px;
}
</style>

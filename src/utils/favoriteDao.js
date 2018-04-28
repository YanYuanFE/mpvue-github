const FAVORITE_KEY_PREFIX = 'favorite_'

export default class FavoriteDao {
  constructor (flag) {
    this.flag = flag
    this.favoriteKey = FAVORITE_KEY_PREFIX + flag
  }

  /**
   * 收藏项目,保存收藏的项目
   * @param key 项目id
   * @param value 收藏的项目
   * @param callback
   */
  saveFavoriteItem (key, value, callback) {
    wx.setStorage({
      key: key,
      data: value,
      success: this.updateFavoriteKeys(key, true)
    })
  }
  /**
   * 更新Favorite key集合
   * @param isAdd true 添加,false 删除
   * **/
  updateFavoriteKeys (key, isAdd) {
    let self = this
    var favoriteKeys = []
    wx.getStorage({
      key: this.favoriteKey,
      success: function (res) {
        if (res) {
          favoriteKeys = JSON.parse(res.data)
        }
      },
      complete: function () {
        var index = favoriteKeys.indexOf(key)
        if (isAdd) {
          if (index === -1) favoriteKeys.push(key)
        } else {
          if (index !== -1) favoriteKeys.splice(index, 1)
        }
        wx.setStorageSync(self.favoriteKey, JSON.stringify(favoriteKeys))
      }
    })
  }

  /**
   * 获取收藏的Repository对应的key
   * @return {Promise}
   */
  getFavoriteKeys () {
    console.log(this.favoriteKey)
    return new Promise((resolve, reject) => {
      wx.getStorage({
        key: this.favoriteKey,
        success: function (res) {
          console.log(res)
          try {
            resolve(JSON.parse(res.data))
          } catch (e) {
            reject(e)
          }
        }
      })
    })
  }

  /**
   * 取消收藏,移除已经收藏的项目
   * @param key 项目 id
   */
  removeFavoriteItem (key) {
    wx.removeStorage({
      key: key,
      success: function (res) {
        this.updateFavoriteKeys(key, false)
      }
    })
  }

  /**
   * 获取所有收藏的项目
   * @return {Promise}
   */
  getAllItems () {
    return new Promise((resolve, reject) => {
      this.getFavoriteKeys().then((keys) => {
        console.log(keys)
        var items = []
        if (keys) {
          try {
            const items = this.getAllFavorite(keys)
            resolve(items)
          } catch (e) {
            reject(e)
          }
        } else {
          resolve(items)
        }
      }).catch((e) => {
        reject(e)
      })
    })
  }

  getAllFavorite (keys) {
    return keys.map((key) => {
      const item = wx.getStorageSync(key)
      return JSON.parse(item)
    })
  }
}

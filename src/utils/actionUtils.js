import { FLAG_STORAGE } from './constants'

export default class ActionUtils {
  static onFavorite (favoriteDao, item, isFavorite, flag) {
    const key = flag === FLAG_STORAGE.flag_trending ? item.fullName : item.id.toString()

    if (isFavorite) {
      favoriteDao.saveFavoriteItem(key, JSON.stringify(item))
    } else {
      favoriteDao.removeFavoriteItem(key)
    }
  }
}

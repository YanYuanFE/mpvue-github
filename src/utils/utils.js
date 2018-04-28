export default class Utils {
  /**
  * 检查该Item是否被收藏
  * **/
  static checkFavorite (item, items) {
    const index = items.findIndex((repo) => {
      let id = item.id ? item.id : item.fullName
      return id.toString() === repo
    })
    return index > -1
  }
}

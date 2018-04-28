import request from './request'

export function getPopularRepo (repo) {
  return request.get(`https://api.github.com/search/repositories?q=${repo}&sort=stars`)
}

export function getTrendingByTime (language, time) {
  return request.get(`https://github.com/trending/${language}?since=${time}`)
}

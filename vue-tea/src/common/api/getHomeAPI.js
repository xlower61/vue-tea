import request from '../request'
export const getLyTabAPI = (item) => {
  return request.get(`home_list/data/${item}`)
}

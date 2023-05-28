import request from '../request'
export const getSearchAPI = (item, means) => {
  return request.get(`/goods_list/data`, {
    params: {
      searchName: item,
      ...means
    }
  })
}

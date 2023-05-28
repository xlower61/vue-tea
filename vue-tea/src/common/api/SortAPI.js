import request from '../request'
export const getSortAPI = () => {
  return request.get(`/sort_list/data`)
}

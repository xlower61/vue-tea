import request from '../request'
export const getDetailAPI = (id) => {
  return request.get(`/detail/data/id`, {
    params: {
      id
    }
  })
}

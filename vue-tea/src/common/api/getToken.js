export const getToken = () => {
  let token = JSON.parse(localStorage.getItem('teaUserInfo')).token
  return token
}

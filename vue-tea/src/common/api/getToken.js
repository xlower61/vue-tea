export const getToken = () => {
  if (!JSON.parse(localStorage.getItem('teaUserInfo'))) {
    return null
  } else {
    let token = JSON.parse(localStorage.getItem('teaUserInfo')).token
    return token
  }
}

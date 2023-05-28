module.exports = function getTime(exp) {
  let time = parseInt(new Date().getTime() / 1000)
  if (exp - time < 0) {
    return true //过期返回true
  } else {
    return false
  }
}

export const getAccessToken = () => {
  return localStorage.getItem('BY-ACCESSTOKEN') || ''
}

export const setAccessToken = (token = '') => {
  return localStorage.setItem('BY-ACCESSTOKEN', token)
}

export const getRefreshToken = () => {
  return localStorage.getItem('BY-REFRESHTOKEN') || ''
}

export const setRefreshToken = (token = '') => {
  return localStorage.setItem('BY-REFRESHTOKEN', token)
}

export const getUserId = () => {
  return localStorage.getItem('BY-USERID') || ''
}

export const setUSERID = (userId = '') => {
  return localStorage.setItem('BY-USERID', userId)
}

export const getExpireTime = () => {
  return localStorage.getItem('BY-EXPIRETIME') || ''
}

export const setExpireTime = (expireTime = '') => {
  return localStorage.setItem('BY-EXPIRETIME', expireTime)
}

export const getUserInfo = () => ({
  accessToken: getAccessToken(),
  refreshToken: getRefreshToken(),
  userId: getUserId(),
  expireTime: getExpireTime()
})

export const setUserInfo = info => {
  const { accessToken, refreshToken, userId, expireTime } = info
  setAccessToken(accessToken)
  setRefreshToken(refreshToken)
  setUSERID(userId),
  setExpireTime(expireTime)
}

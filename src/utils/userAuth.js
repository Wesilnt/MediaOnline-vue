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

export const getUserInfo = () => ({
  accessToken: getAccessToken(),
  refreshToken: getRefreshToken(),
  userId: getUserId()
})

export const setUserInfo = info => {
  const { accessToken, refreshToken, userId } = info
  setAccessToken(accessToken)
  setRefreshToken(refreshToken)
  setUSERID(userId)
}

import api from './api'

const URL_PREFIX = process.env.NODE_ENV === 'production' ? '' : '/api'

export function getUserList (params) {
  return api.get(URL_PREFIX + '/application/user/userList', { params })
}

export function updateStatus (params) {
  return api.post(URL_PREFIX + '/application/user/updateStatus', params)
}

export function userEdit (params) {
  return api.post(URL_PREFIX + '/application/user/userEdit', params)
}

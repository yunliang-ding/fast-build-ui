import axios from 'axios'
import qs from 'qs'
const baseUrl = 'http://127.0.0.1:8360'
const get = async (url, params, headers) => {
  try {
    let options = {
      method: 'get',
      url:baseUrl + url,
      params,
      timeout: 60000,
    }
    let response = null
    options.params = {
      ...params
    }
    response = await axios(options)
    return response.data
  } catch (err) {
    return {
      isError: true,
      data: []
    }
  }
}
const post = async (url, params, headers) => {
  try {
    let response = null
    url = baseUrl + url
    response = await axios.post(url, qs.stringify({ ...params }), {
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      validateStatus: (status) => {
        return status >= 200 && status < 501
      }
    })
    return response.data
  } catch (err) {
    return {
      isError: true,
      data: []
    }
  }
}
export {
  get,
  post,
  baseUrl
}

import axios from 'axios'
import { requestBefore, requestError, responseAfter, responseError } from './interceptors'

// http defaults configs
const http = axios.create({
  baseURL: $config.baseURL,
  timeout: 10000,
})

// http interceptors configs
http.interceptors.request.use(requestBefore, requestError)
http.interceptors.response.use(responseAfter, responseError)

export default http

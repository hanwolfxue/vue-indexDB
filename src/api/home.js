/**
 * 与 main 相关的业务接口
 */
import http from '@/utils/http'

export function fetchSomething (data, config) {
  const url = '/fetch'

  return http.post(url, data, config)
}

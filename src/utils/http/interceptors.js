// 请求之前的预处理函数
const requestBefore = request => {
  if (window.localStorage.token) {
    request.headers.common.Authorization = `Bearer ${window.localStorage.token}`
  }
  return request
}

// 请求时出错的处理函数
const requestError = error => Promise.reject(error)

// 请求返回之后的预处理函数：若返回状态码为200，但实际请求未完成，将异常处理统一到错误处理
const responseAfter = response => response.data.success ? response.data : Promise.reject(response)
// 若项目接口无 response.data.success 状态字段，注释上一行，使用下行
// const responseAfter = response => response

// 状态码信息
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
}
// 检查状态
const checkStatus = response => {
  if (response.status >= 400) {
    const errorMessage = codeMessage[response.status] || response.statusText
    alert(`请求错误 ${response.status}: ${errorMessage}`)
  }
}

// 请求返回时出错的处理函数
const responseError = error => {
  if (error && error.response) {
    checkStatus(error.response)
  }
  return Promise.reject(error)
}

export { requestBefore, requestError, responseAfter, responseError }

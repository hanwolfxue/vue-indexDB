// https://cn.vuejs.org/v2/api/#Vue-filter
import Vue from 'vue'

// 将时间戳转化为xxxx-xx-xx xx:xx:xx的时间格式
Vue.filter('datetime', timestamp => {
  function format (number) {
    return number.toString().padStart(2, '0')
  }
  const date = new Date(Number.parseInt(timestamp, 10))
  const YYYY = date.getFullYear()
  const MM = date.getMonth() + 1
  const DD = date.getDate()
  const hh = date.getHours()
  const mm = date.getMinutes()
  const ss = date.getSeconds()
  return `${YYYY}-${format(MM)}-${format(DD)} ${format(hh)}:${format(mm)}:${format(ss)}`
})

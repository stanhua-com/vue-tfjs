// filters/index.js

/**
 * 日期格式化
 * @param {String} time 日期
 * @param {String} reg  日期格式
 */
export function dateFormat(time, reg = 'yyyy-MM-dd HH:mm:ss') {
  if (!time) return ''

  time = String(time).replace(/-/g, '/').replace('T', ' ')
  time = time.substring(0, time.indexOf('.'))
  console.log(time)

  const date = (typeof time === 'string' || typeof time === 'number') ? new Date(time) : time

  console.log(date)

  const map = {}

  map.yyyy = date.getFullYear()
  map.yy = ('' + map.yyyy).substr(2)
  map.M = date.getMonth() + 1
  map.MM = (map.M < 10 ? '0' : '') + map.M
  map.d = date.getDate()
  map.dd = (map.d < 10 ? '0' : '') + map.d
  map.H = date.getHours()
  map.HH = (map.H < 10 ? '0' : '') + map.H
  map.m = date.getMinutes()
  map.mm = (map.m < 10 ? '0' : '') + map.m
  map.s = date.getSeconds()
  map.ss = (map.s < 10 ? '0' : '') + map.s

  return reg.replace(/\byyyy|yy|MM|M|dd|d|HH|H|mm|m|ss|s\b/g, $1 => map[$1])
}

/**
*
* @param {String} date   日期
* @returns 格式化日期为年前、月前、日前、小时前、分钟前、刚刚
*/
export function diffDate(date) {
  date = new Date(date)
  let _diff = new Date - date
  let s = 1000
  let m = s * 60
  let h = m * 60
  let d = h * 24
  let mh = d * 30
  let y = mh * 12
  let str = ''
  if (_diff / s < 60) {
    str = '刚刚'
  }
  else if (_diff / m < 60) {
    str = Math.floor(_diff / m) + '分钟前'
  }
  else if (_diff / h < 24) {
    str = Math.floor(_diff / h) + '小时前'
  }
  else if (_diff / d < 60) {
    str = Math.floor(_diff / d) + '天前'
  }
  else if (_diff / mh < 12) {
    str = Math.floor(_diff / mh) + '月前'
  }
  else if (_diff / y > 1) {
    str = Math.floor(_diff / y) + '年前'
  }
  return str
}

/**
 * 货币格式化
 * @param {String} num
 */
export function moneyFormat(num) {
  return String(num).replace(/(?=((?!\b)\d{3})+$)/g, ',')
}

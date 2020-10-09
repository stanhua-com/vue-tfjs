// utils/index.js

/**
 * 函数去抖
 * @param {Function}  fn  实际要执行的函数
 * @param {Number} delay  延迟时间，也就是阈值，单位是毫秒（ms）
 * @return {Function}
 */
export function debounce(fn, delay) {
  // 定时器，用来 setTimeout
  let timer

  // 返回一个函数，这个函数会在一个时间区间结束后的 delay 毫秒时执行 fn 函数
  return function () {
    // 保存函数调用时的上下文和参数，传递给 fn
    let context = this
    let args = arguments

    // 每次这个返回的函数被调用，就清除定时器，以保证不执行 fn
    clearTimeout(timer)

    // 当返回的函数被最后一次调用后（也就是用户停止了某个连续的操作），
    // 再过 delay 毫秒就执行 fn
    timer = setTimeout(function () {
      fn.apply(context, args)
    }, delay)
  }
}

/**
 * 节流函数
 * @param fn {Function}   实际要执行的函数
 * @param delay {Number}  执行间隔，单位是毫秒（ms）
 * @return {Function}
 */

export function throttle(fn, threshhold) {
  // 记录上次执行的时间
  let last

  // 定时器
  let timer

  // 默认间隔为 250ms
  threshhold || (threshhold = 250)

  // 返回的函数，每过 threshhold 毫秒就执行一次 fn 函数
  return function () {
    // 保存函数调用时的上下文和参数，传递给 fn
    let context = this
    let args = arguments

    let now = +new Date()

    // 如果距离上次执行 fn 函数的时间小于 threshhold，那么就放弃
    // 执行 fn，并重新计时
    if (last && now < last + threshhold) {
      clearTimeout(timer)

      // 保证在当前时间区间结束后，再执行一次 fn
      timer = setTimeout(function () {
        last = now
        fn.apply(context, args)
      }, threshhold)

      // 在时间区间的最开始和到达指定间隔的时候执行一次 fn
    } else {
      last = now
      fn.apply(context, args)
    }
  }
}

/**
 * stream转String
 * @param {Stream} stream
 * @param {Object} options
 */
export function streamToString(stream, options = {}) {
  return new Promise(resolve => {
    let chunks = []
    stream.on('data', chunk => {
      chunks.push(chunk)
    })

    stream.on('end', () => {
      const vString = Buffer.concat(chunks).toString(options.encoding || 'utf8')
      resolve(vString)
    })
    stream.on('error', err => {
      throw err
    })
  })
}

export const trim = function (string) {
  return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '')
}

/**
 * 快速波动均分算法
 * @param {Number} n          剩余数量
 * @param {Number} crest      高位
 * @param {Number} trough     低位
 * @param {Boolean} isInteger 是否是整数
 */
export function waveAverage(n = 5, crest = 4, trough = 4, isInteger = true) {
  // 平均结果
  let list = []
  // 无法进行波动均分，直接返回完全平分
  if (crest > (n - 1) * trough || trough > (n - 1) * crest) {
    return new Array(n).fill(0)
  }
  // 最少需要消除的高度
  let base = 0
  // 波动量
  let wave = 0
  // 高位
  let high = crest
  // 低位
  let low = -trough
  // 累计量
  let sum = 0
  // 剩余数量
  let count = n

  while (--count >= 0) {
    // 获取当前的波动量
    if (crest > count * trough - sum) {
      high = count * trough - sum
    }
    if (trough > count * crest + sum) {
      low = -sum - count * crest
    }
    base = low
    wave = high - low
    // 随机波动量
    let rnd
    if (count > 0) {
      // 随机波动
      rnd = base + Math.random() * (wave + 1)
    }
    else {
      rnd = -sum
    }
    if (isInteger === true) {
      rnd = Math.floor(rnd)
    }
    sum += rnd
    list.push(rnd)
  }
  return list
}

/**
 * 执行代码片段
 * @param {HTMLElement} consoleLogElement  输出元素
 * @param {String} codeSnippet             代码片段
 */
export async function executeCodeSnippet(consoleLogElement, codeSnippet) {
  consoleLogElement.innerText = '';
  var oldLog = console.log
  console.log = function (...values) {
    let logStrs = []
    for (let i = 0; i < values.length; i++) {
      const value = values[i]

      let logStr
      if (value.toString == null) {
        logStr = value
      } else {
        const toStr = value.toString()

        if (toStr === '[object Object]') {
          logStr = JSON.stringify(value, null, 2)
        } else {
          logStr = toStr
        }
        logStrs.push(logStr)
      }
    }
    consoleLogElement.innerHTML += logStrs.join(' ') + '\n'
  }

  function getLineNumber(error) {
    try {
      // firefox
      const firefoxRegex = /eval:(\d+):\d+/;
      if (error.stack.match(firefoxRegex)) {
        const res = error.stack.match(firefoxRegex);
        return parseInt(res[1], 10);
      }

      // chrome
      const chromeRegex = /eval.+:(\d+):\d+/;
      if (error.stack.match(chromeRegex)) {
        const res = error.stack.match(chromeRegex);
        return parseInt(res[1], 10);
      }

    } catch (e) {
      return;
    }

    // We found nothing
    return;
  }

  function reportError(e) {
    var errorMessage = '\n<div class="snippet-error"><em>An error occured';
    var lineNumber = getLineNumber(e);
    if (lineNumber !== undefined) {
      errorMessage += ' on line: ' + lineNumber + '</em>';
    } else {
      errorMessage += '</em>'
    }
    errorMessage += '<br/>';
    errorMessage += '<div class="snippet-error-msg">' + e.message + '</div>';
    errorMessage += '</div>';

    console.log(errorMessage);
  }

  // It is important that codeSnippet and 'try {' be on the same line
  // in order to not modify the line number on an error.
  const evalString = '(async function runner() { try { ' + codeSnippet + '} catch (e) { reportError(e); } })()'

  if (window._tfengine && window._tfengine.startScope) {
    window._tfengine.startScope()
  } else {
    tf.ENV.engine.startScope()
  }

  // this outer try is for errors that prevent the snippet from being parsed.
  try {
    await eval(evalString).catch(function (e) {
      // This catch is for errors within promises within snippets
      reportError(e)
    });

    // new Function(codeSnippet)()
  } catch (e) {
    reportError(e)
  }


  if (window._tfengine && window._tfengine.endScope) {
    window._tfengine.endScope()
  } else {
    tf.ENV.engine.endScope()
  }

  console.log = oldLog
}


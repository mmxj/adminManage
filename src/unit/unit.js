/**
 * Created by webmxj on 2018/3/7.
 */
function removeEmptyString(data) {//将所有的''空字符串转为null
  var type = typeof data;
  if (type == 'object') {
    if (toString.call(data) == '[object Array]') {
      data.forEach(function (items) {
        items = removeEmptyString(items)
      })
    } else {
      for (let items in data) {
        data[items] = removeEmptyString(data[items])
      }
    }
  } else if (data == "") {
    data = null
  }
  return data
}
function enableFlag(data) {//处理enableFlag的值 将它转为汉字和转为数字
  if (data == 0) {
    return "交易禁止"
  } else if (data == 1) {
    return "已生效"
  } else if (data == '交易禁止') {
    return 0
  } else if (data == "已生效") {
    return 1
  }
}
function auditFlag(data) {//处理enableFlag的值 将它转为汉字和转为数字
  if (data === 0) {
    return "待审核"
  } else if (data == 1) {
    return "审核通过"
  } else if (data == 2) {
    return "审核失败"
  } else if (data == '待审核') {
    return 0
  } else if (data == "审核通过") {
    return 1
  } else if (data == "审核失败") {
    return 2
  }
}
export default {
  removeEmptyString,
  enableFlag,
  auditFlag
}

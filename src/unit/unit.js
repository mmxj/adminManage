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
export default {
  removeEmptyString
}

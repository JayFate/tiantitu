//app.js
//可以优化成一行
const table = require("./static/table.js")
const intel_table = require("./static/intel_table.js")
const amd_table = require("./static/amd_table.js")

const format = arr => {
  const len = arr.length
  return arr.slice().map((e, index) => {
    const keys = Object.keys(e).filter(key => e[key].match(/\S/g))
    let entries = Object.entries(e).filter(entry => keys.includes(entry[0]))
    entries = entries.map(entry => [entry[1], entry[0], "blue"])
    const height = (len - index)/97
    let result = {}
    Object.assign(result, {
      times: len - index,
      show: entries.length !== 0,
      entries: entries,
      height: height
    })
    return result
  })
}

const format_table = format(table)
const format_intel_table = format(intel_table)
const format_amd_table = format(amd_table)

App({
  onLaunch: function() {

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
    }

    this.globalData = {
      table: format_table,
      intel_table: format_intel_table,
      amd_table: format_amd_table
    }
  }
})
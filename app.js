/*  
 * 小程序MD5加密算法封装
 * Usage: 
 * 
 *    引入(比如index.js页面引入md5.js):
 *       //pages/index.js
 *       import md5 from 'utils/md5.js';
 * 
 *    调用base64MD5加密:
 *       var encryptedStr = md5('需要加密的字符串');
 */
import md5 from 'utils/md5.js';
const table = require("./static/table.js")
const intel_table = require("./static/intel_table.js")
const amd_table = require("./static/amd_table.js")

const intel_series = ["二代酷睿", "三代酷睿", "四代酷睿", "五六代酷睿", "七代酷睿", "八代酷睿", "九代酷睿", "十代酷睿"]
const amd_series = ["三代锐龙", "二代锐龙", "一代锐龙", "八代APU", "七代APU", "旧APU", "推土机/打桩机", "弈龙/速龙"]

const format = arr => {
  const len = arr.length
  return arr.slice().map((e, index) => {
    const keys = Object.keys(e).filter(key => e[key].match(/\S/g))
    let entries = Object.entries(e).filter(entry => keys.includes(entry[0]))
    return entries.map(entry => {
      return {
        name: entry[1],
        gen: entry[0],
        times: len - index,
        show: entries.length !== 0,
        height: (len - index) / 97,
        num: index + 1,
        type: intel_series.includes(entry[0]) ? "intel" : "amd",
        id: 'id-' + entry[1].replace(/[\s\W-]/g, "")
      }
    })
  }).flat()
}

const format_intel = arr => {
  return arr.slice().filter(e => Object.keys(e).length > 1).map(e => {
    e["处理器型号"] = e["处理器型号"].replace(/^锐龙ThreadRipper/, "线程撕裂者")
    return e
  }).map(e => {
    Object.assign(e, {
      id: 'id-' + e["处理器型号"].replace(/[\s\W-]/g, "")
    })
    return e
  }).map(e => Object.entries(e))
}

const format_table = format(table)
const format_intel_table = format_intel(intel_table)
const format_amd_table = format_intel(amd_table)


App({
  onLaunch: function() {
    this.globalData = {
      table: format_table,
      intel_table: format_intel_table,
      amd_table: format_amd_table
    }
  }
})
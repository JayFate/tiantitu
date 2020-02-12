let table = getApp().globalData.table
let intel_table = getApp().globalData.intel_table
let amd_table = getApp().globalData.amd_table

Page({
  data: {
    table: table,
    intel_table: intel_table,
    amd_table: amd_table,
    inputShowed: false,
    searchResultDatas: "",
    searchData: "",
    inputVal: "",
    scrollId: "id-1",
    contentHeight: 0
  },
  onLoad: function() {
    wx.getSystemInfo({
      success: res => {
        this.setData({
          contentHeight: res.windowHeight + "px"
        });
      }
    })
  },
  showInput: function() {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function() {
    this.setData({
      searchData: [],
      searchResultDatas: [],
      inputVal: ""
    })
  },
  clearInput: function() {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function(e) {
    const value = e.detail.value
    if (value.length == 0) {
      this.setData({
        searchResultDatas: []
      })
      return
    }

    const results = table.filter(e => e.name.match(`${value}`)).slice(0, 99)
    const searchData = results.map(function(e) {
      return {
        key: value,
        name: e.name
      }
    })
    this.setData({
      searchData,
      searchResultDatas: results
    })

  },
  chooseSearchResultAction: function(e) {
    const id = e.currentTarget.dataset.id
    this.setData({
      scrollId: id
    })
  },
  navigate: function(e) {
    const id = e.currentTarget.id
    wx.setStorageSync('navigateId', id)
  }
})
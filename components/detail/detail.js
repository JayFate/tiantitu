Component({
  properties: {
    table: {
      type: Array,
      value: [],
    },
    types: {
      type: String,
      value: "",
    }
  },
  options: {
    styleIsolation: 'shared'
  },
  data: {
    // 这里是一些组件内部数据
    scrollId: '',
    contentHeight: 0
  },
  methods: {
    // 这里是一个自定义方法
    customMethod: function() {}
  },
  attached: function() {
    wx.getSystemInfo({
      success: res => {
        this.setData({
          contentHeight: res.screenHeight + "px"
        });
      }
    })
  },
  pageLifetimes: {
    show: function() {
      const id = wx.getStorageSync('navigateId')
      this.setData({
        scrollId: id
      })
    },
    hide: function() {
      // 页面被隐藏
    },
    resize: function(size) {
      // 页面尺寸变化
    }
  }
})
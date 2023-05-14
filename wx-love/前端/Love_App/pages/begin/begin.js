// pages/begin/begin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code: '',
    username: ''
  },
  inputCode(e){
    this.setData({
      code: e.detail.value
    })
  },
  bindCode(){
    if(!this.data.code){
      wx.showToast({
        title: '请输入恋爱码~',
        duration: 1000,
        icon: 'none'
      })
    }else{
      wx.request({
        url: 'http://127.0.0.1:3000/bindCode',
        method: 'POST',
        data: {
          username: this.data.username,
          code: this.data.code,
          love_code: this.data.love_code
        },
        success: (result) => {
          wx.showToast({
            title: result.data.msg,
            icon: 'none',
            duration: 1000
          })
          setTimeout(() => {
            if(result.data.code == 1){
              let love_id = result.data.love_id
              let love_code = result.data.love_code
              wx.navigateTo({
                url: '/pages/main/main?love_id=' + love_id + '&love_code=' + love_code,
              })
            }
          }, 1000);

        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      username: options.username,
      love_code: options.code
    }) 
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
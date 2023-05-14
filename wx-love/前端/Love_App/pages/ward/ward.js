// pages/ward/ward.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag:0,
    rewardArr: [
      {
        grade: 30,
        content: '双人电影券'
      },
      {
        grade: 50,
        content: '交响乐门票'
      },
      {
        grade: 100,
        content: '五月天门票'
      }
    ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      flag:options.flag,
      love: options.love
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

  },
  back(){
    wx.navigateBack({
      delta: 0
    })
  }
})
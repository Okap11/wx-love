// pages/log_in/log_in.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    password: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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
  inputUsername(e){
    this.setData({
      username: e.detail.value
    })
  },
  inputPassword(e){
    this.setData({
      password: e.detail.value
    })
  },
  register(){
    if( !this.data.username || !this.data.password){
      wx.showToast({
        title: '手机号和密码不能为空！',
        duration: 1500,
        icon: 'none'
      })
    }else{
      wx.request({
        url: 'http://127.0.0.1:3000/register',
        method: 'POST',
        data:{
          username: this.data.username,
          password: this.data.password
        },
        success: (result) => {
          if(result.data.code == 1){
            wx.showToast({
              title: result.data.msg,
              duration: 1000,
              icon: 'none'
            })
            setTimeout(() => {
              wx.navigateTo({
                url: '/pages/log_in/log_in',
              })
            }, 1000);
          }
        }
      })
    }
  }
})
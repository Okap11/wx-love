// pages/log_in/log_in.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    useranme: '',
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
      useranme: e.detail.value
    })
  },
  inputPassword(e){
    this.setData({
      password: e.detail.value
    })
  },
  login(){
    if( !this.data.useranme || !this.data.password){
      wx.showToast({
        title: '用户名或密码不能为空！',
        duration: 1500,
        icon: 'none'
      })
    }else{
      wx:wx.request({
        url: 'http://127.0.0.1:3000/login',
        method: 'POST',
        data: {
          username: this.data.useranme,
          password: this.data.password
        },
        success: (result) =>{
          if(result.data.code == 1){
            if(result.data.love_id){
              let love_id = result.data.love_id
              let love_code = result.data.love_code
              wx.navigateTo({
                url: '/pages/main/main?love_id=' + love_id + '&love_code=' + love_code,
              })
            }else{
              wx.navigateTo({
                url: '/pages/begin/begin?username=' + this.data.useranme + '&code=' + result.data.love_code,
              })
            }
          }else{
            wx.showToast({
              title: '请先注册您的账号~~',
              duration: 1000,
              icon: 'none'
            })
            setTimeout(() => {
              wx.navigateTo({
                url: '/pages/register/register',
              })
            }, 1000);
          }
        }
      })
    }
  }
})
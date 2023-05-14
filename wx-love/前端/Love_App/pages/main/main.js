// pages/main/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag:0,
    myArray: [],
    herArray: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      love_id : options.love_id,
      love_code : options.love_code
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
    wx.request({
      url: 'http://127.0.0.1:3000/getLove',
      method: 'POST',
      data: {
       love_id : this.data.love_id,
       love_code : this.data.love_code
      },
      success: (result) => {
        let data = result.data.data
        let total = 0
        let myScore = 0
        let herScore = 0
        data.forEach(element => {
          if(element.user_id == this.data.love_id){
            this.data.myArray.push(element)
            myScore = myScore + parseInt(element.score)
          }else{
            this.data.herArray.push(element)
            herScore = herScore + parseInt(element.score)
          }
          if(element.score.slice(0,1) == '+'){
            element.img = true
          }else{
            element.img = false
          }
          total = total + parseInt(element.score)
        });
        this.setData({
          myScore: myScore,
          herScore: herScore,
          total: total,
          myArray: this.data.myArray,
          herArray: this.data.herArray
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    this.setData({
      myArray: [],
      herArray: []
    })
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
  },
  change(e){
    if(e.target.dataset.type == 0){
      this.setData({
        flag:0
      })
    }else{
      this.setData({
        flag:1
      })
    }
  },
  next(){
    wx.navigateTo({
      url: '../ward/ward?flag=' + this.data.flag + '&love=' + this.data.total,
    })
  },
  toAdd(e){
    wx.navigateTo({
      url: '/pages/add/add?flag=' + e.target.dataset.flag + '&love_id=' + this.data.love_id + '&love_code=' + this.data.love_code,
    })
  },
  toDetails(e){
    wx.navigateTo({
      url: '/pages/details/details?flag=' + e.target.dataset.flag + '&love_id=' + this.data.love_id + '&love_code=' + this.data.love_code
    })
  }
})
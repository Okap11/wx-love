
Page({
  back(){
    wx.navigateBack({
      delta: 0
    })
  },

  /**
   * 页面的初始数据
   */
  data: {
    titleflag: false,
    contentflag: false,
    selectTime: '' 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      id: options.flag,
      love_id: options.love_id,
      love_code: options.love_code,
    })
    wx.request({
      url: 'http://127.0.0.1:3000/selectEvent',
      method: 'POST',
      data: {
        id: this.data.id
      },
      success: (result) => {
        if(result.data.data[0].love_id == this.data.love_code){
          this.setData({
            flag: true
          })
        }
        if(parseInt(result.data.data[0].score) < 0){
          this.setData({
            isHappy: false
          })
        } else {
          this.setData({
            isHappy: true
          })

        }
        this.setData({
          selectTime: result.data.data[0].created_date,
          title: result.data.data[0].title,
          content: result.data.data[0].content,
          score: result.data.data[0].score
        })
      }
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
  changeTitle(e){
    this.setData({
      titleflag: false,
      title: e.detail.value
    })
  },
  change(e){
    const c = e.target.dataset.c
    if(c == 'title'){
      this.setData({
        titleflag: true
      })
    }
    if(c == 'content'){
      this.setData({
        contentflag: true,
      })
    }
  },
  changeContent(e){
    this.setData({
      content: e.detail.value
    })
  },
  submit(){
    if( !this.data.title || !this.data.content){
      wx.showToast({
        title: '请输入标题和内容！',
        icon: 'none',
        duration: 1000
      })
    }else {
      wx.request({
        url: 'http://127.0.0.1:3000/changeEvent',
        method: 'PUT',
        data: {
          id: this.data.id,
          title: this.data.title,
          content: this.data.content,
        },
        success: (result) => {
          wx.showToast({
            title: result.data.msg,
            icon: 'none',
            duration: 1000
          })
          setTimeout(() => {
            if(result.data.code == 1){
              wx.navigateTo({
                url: '/pages/main/main?love_id=' + this.data.love_id + '&love_code=' + this.data.love_code,
              })
            }
          }, 1000);
        }
      })
    }
  }
})
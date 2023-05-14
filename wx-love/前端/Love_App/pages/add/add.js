// pages/add/add.js
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
    time:'',
    time: false,
    titleflag: false,
    contentflag: false,
    years: [], // 年份数据集合
    months: [], // 月份数据集合
    days: [], // 天数数据集合
    bigMonth: ['01', '03', '05', '07', '08', '10', '12'], // 大月份数据集合
    year: '',
    month: '',
    day: '',
    value: [],
    isDaytime: true, // true：上午；false：下午
    isShowPicker: false, // 选择时间弹窗显示隐藏标识
    selectTime: '' // 默认时间
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const getNowDate = date => {
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      return [year, month,day].map(formatNumber).join('-')
    }
    const formatNumber = n => {
      n = n.toString()
      return n[1] ? n : `0${n}`
    }
    this.setData({
      flag: options.flag,
      love_id: options.love_id,
      love_code: options.love_code,
      selectTime: getNowDate(new Date()) + '上午',
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
  changeTime(){
    this.initPicker()
    this.setData({
      time: true
    })
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
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  initPicker () {
    const date = this.data.selectTime ? new Date(this.data.selectTime.substring(0, 10)) : new Date() // 默认选中日期

    let years = []
    let months = []
    let days = []

    const getYear = date.getFullYear()
    const getMonth = date.getMonth()
    const getDate = date.getDate()

    // 年（取前后20年）
    for (let i = getYear - 20; i <= getYear + 20; i++) {
      years.push(i);
    }

    // 月
    for (let i = 1; i <= 12; i++) {
      months.push(i < 10 ? `0${i}` : i)
    }

    // 日
    for (let i = 1; i <= 31; i++) {
      days.push(i < 10 ? `0${i}` : i)
    }

    this.setData({
      years: years,
      months: months,
      days: days,
      year: getYear,
      month: (getMonth + 1) < 10 ? `0${(getMonth + 1)}` : (getMonth + 1),
      day: getDate < 10 ? `0${getDate}` : getDate,
      value: [20, getMonth, getDate - 1]
    })
  },

  // 设置天数
  setDays (day) {
    let temp = [];
    for (let i = 1; i <= day; i++) {
      temp.push(i < 10 ? `0${i}` : i)
    }
    this.setData({
      days: temp,
    })
  },

  // Picker改变事件
  onChangePicker (e) {
    const val = e.detail.value
    const yearStr = this.data.years[val[0]]
    const monthStr = this.data.months[val[1]]
    const datStr = this.data.days[val[2]]
    // 闰年
    if (monthStr == 2) {
      if (yearStr % 4 === 0 && yearStr % 100 !== 0) {
        this.setDays(29);
      } else {
        this.setDays(28);
      }
    } else {
      // 大月
      if (this.data.bigMonth.includes(monthStr)) {
        this.setDays(31)
      } else {
        this.setDays(30)
      }
    }
    this.setData({
      year: yearStr,
      month: monthStr,
      day: datStr,
      isDaytime: !val[3]
    })
  },

  // 取消
  onCancel () {
    this.setData({
      time: false
    })
  },

  // 确定
  onOk () {
    const dateTimeBody = `${this.data.year}-${this.data.month}-${this.data.day}`
    const todays = this.data.isDaytime === true ? '上午' : '下午'
    // TODO: do something...
    this.setData({
      time: false,
      selectTime: `${dateTimeBody} ${todays}`
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
      let score = this.data.flag == 0 ? '+5' : '-1'
      wx.request({
        url: 'http://127.0.0.1:3000/addEvent',
        method: 'POST',
        data: {
          love_code: this.data.love_code,
          love_id: this.data.love_id,
          title: this.data.title,
          content: this.data.content,
          score: score,
          created_date: this.data.selectTime
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
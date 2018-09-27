// miniprogram/pages/login/login.js
import util, { $cloud} from "../../util/util.js"

let app = getApp()

let userToast = $cloud.wxCollection({
  cloudTods: "USER"
})

Page({

  /**
   * 页面的初始数据
   */
  data: {
    message: "",
    userInfoData: ""
  },
  onGetUserInfo(globalData) {
    this.setData({
      userInfoData: globalData.detail
    })
    let userInfo = globalData.detail.userInfo
    this.cloudUserAdd(userInfo)
    console.log(globalData)
  },
  onGetOpenid: function() {
    // 调用云函数
    let that = this;
    util.loginOpenid().then((res) => {
      console.log(res)
      let openid = res.result.openid
      that.setData({
        message: openid
      })
    })
  },
  // 增加用户
  cloudUserAdd(keyUserInfo) {
   
    // const db = wx.cloud.database()
    // const user = db.collection('USER')
    userToast.add({
        // data 字段表示需新增的 JSON 数据
        data: {
          userInfo: keyUserInfo
        }
      })
      .then(res => {
        console.log(res)
      })
  },
  cloudDocGet(){
    $cloud.wxCollectionDoc(userToast, 'W6yUVTARVrVp1rCw', 'update',{
      userInfo :{
        nickName:"你好"
      }
    }).then((res) => {
      console.log('docGet')
      console.log(res.data)
    })
   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 获取用户信息
    let that = this
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                userInfoData: res
              })
              that.cloudUserAdd(res.userInfo)
            }
          })
         
        }
      }
    })

    this.onGetOpenid()
    this.cloudDocGet()
   
    // const testDB = wx.cloud.database({
    //   env: 'test-a3f415'
    // })
    // testDB.collection('USER').doc('W6yUVTARVrVp1rCw').get().then(res => {
    //   // res.data 包含该记录的数据
    //   console.log(res.data)
    // })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
// let app = getApp()

// console.log(app)

let serverId = 'test-a3f415'

class cloudComponents {
  // 初始化
  wxCloudInit(keyEnv, keyTraceUser = true) {
    wx.cloud.init({
      env: keyEnv,
      traceUser: keyTraceUser
    })
  }
  // 选择环境 不传参数默认test,
  wxCloudDatabase(keyEnv) {
    keyEnv = keyEnv || serverId
    let cloudDB = wx.cloud.database({
      env: keyEnv
    })
    return cloudDB
  }
  // 指定集合
  wxCollection(keyObject) {
    let cloudDB = keyObject.cloudDB || serverId
    let cloudTods = keyObject.cloudTods
    let toastDB = this.wxCloudDatabase(cloudDB).collection(cloudTods)
    return toastDB
  }
  // doc
  wxCollectionDoc(keyCollection, keyDoc, DocType, keyDocTypeObj) {
    console.log(DocType)
    keyDocTypeObj = keyDocTypeObj || {}

    if (DocType === 'get') {
      return new Promise((resove, reject) => {
        keyCollection.doc(keyDoc).get({
          data:keyDocTypeObj
        }).then((res) => {
          resove(res)
        }).catch(err => {
          reject(err)
        })
      })
    } else if (DocType === 'remove') {
      return new Promise((resove, reject) => {
        keyCollection.doc(keyDoc).remove({
          data:keyDocTypeObj
        }).then((res) => {
          resove(res)
        }).catch(err => {
          reject(err)
        })
      })
    } else if (DocType === 'update') {
      return new Promise((resove, reject) => {
        keyCollection.doc(keyDoc).update({
          data: keyDocTypeObj
        }).then((res) => {
          resove(res)
        }).catch(err => {
          reject(err)
        })
      })
    }else{
      return {
        message:"传入错的参数"
      }
    }
  }
}


const $cloud = new cloudComponents()

function loginOpenid() {
  let that = this;
  return new Promise((resove, reject) => {
    wx.cloud.callFunction({
      name: 'login',
      data: {},
    }).then(res => {
      console.log('[云函数] [login] user openid: ', res.result.openid)

      if (getApp().globalData.openid) {
        getApp().globalData.openid = res.result.openid
      }
      console.log('123')
      resove(res)
    }).catch(err => {
      reject(err)
      console.error('[云函数] [login] 调用失败', err)
    })
  })
}

module.exports = {
  $cloud: $cloud,
  loginOpenid: loginOpenid
}
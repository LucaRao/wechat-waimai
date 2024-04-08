var app = getApp();
import { DownloadImage } from '../../utils/commonApi'
import {
  supabase
} from '../../lib/supabase'
Page({
	data: {},
	onLoad: function () {
	},
	onShow: function () {
		this.setData({
			userInfo: app.globalData.userInfo
		});
  },
    // 更新头像
    async onChooseAvatar(e) {
      let { avatarUrl } = e.detail;
      let that = this;
      wx.getImageInfo({
        src: avatarUrl, // 图片路径，必须是本地路径，可以相对路径或绝对路径
        success: async function (res) {
          const file = { fileType: "image", width: res.width, height: res.height, tempFilePath: avatarUrl }
          const fileExt = avatarUrl.split('.').pop()
          const fileName = `${Math.random()}.${fileExt}`
          const filePath = `${fileName}`
          app.globalData.userInfo.user_metadata.avatar = await DownloadImage(filePath)
          let { error: uploadError } = await supabase.storage
            .from('avatars')
            .upload(filePath, file)
          if (uploadError) {
            throw uploadError
          }
          const { data, error } = await supabase.auth.updateUser({
            data: { avatar: app.globalData.userInfo.user_metadata.avatar }
          })
          if (error) {
            wx.showToast({
              title: error.message || error.error_description,
              duration: 1500,
              icon:'none'
            });
          } else {
            wx.showToast({
              title: '修改成功',
              duration: 1500
            });
          }
        }
      })
    },
});


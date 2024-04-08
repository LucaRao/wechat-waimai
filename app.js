import {
  supabase
} from './lib/supabase'
App({
	onLaunch: function () {
		console.log('App Launch')
		var self = this;
		var rd_session = wx.getStorageSync('rd_session');
		console.log('rd_session', rd_session)
		if (!rd_session) {
			self.login();
		} else {
			wx.checkSession({
				success: function () {
					// 登录态未过期
					console.log('登录态未过期')
					self.rd_session = rd_session;
				},
				fail: function () {
					//登录态过期
					self.login();
				}
			})
		}
	},
	onShow: function () {
		console.log('App Show')
	},
	onHide: function () {
		console.log('App Hide')
	},
	globalData: {
		hasLogin: false,
	},
	rd_session: null,
	login: function() {
		var self = this;
		wx.login({
			success: async function (res) {
        const { data:{user}, error } = await supabase.auth.signInWithWechat({code:res.code})
          self.globalData.userInfo = user
					self.rd_session = user;
					self.globalData.hasLogin = true;
					wx.setStorageSync('rd_session', self.rd_session);
			}
		});
	},
})

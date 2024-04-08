var app = getApp();
var waimai = require('../../comm/script/fetch')
import {
  supabase
} from '../../lib/supabase'
Page({
	data: {
		filterId: 1,
		address: '定位中…',
		banners: [],
		icons: [],
		shops: []
	},
	onLoad: function () {
    var self = this;
    waimai.fetchBanners.call(self)
    waimai.fetchIcons.call(self)
    waimai.fetchShopList.call(self)
				self.setData({
          address: '武汉'
        });
			
		
	},
	onShow: function () {
	},
	onScroll: function (e) {
		if (e.detail.scrollTop > 100 && !this.data.scrollDown) {
			this.setData({
				scrollDown: true
			});
		} else if (e.detail.scrollTop < 100 && this.data.scrollDown) {
			this.setData({
				scrollDown: false
			});
		}
	},
	tapSearch: function () {
		wx.navigateTo({url: 'search'});
	},
	toNearby: function () {
		var self = this;
		self.setData({
			scrollIntoView: 'nearby'
		});
		self.setData({
			scrollIntoView: null
		});
	},
	tapFilter: function (e) {
		switch (e.target.dataset.id) {
			case '1':
				this.data.shops.sort(function (a, b) {
					return a.id > b.id;
				});
				break;
			case '2':
				this.data.shops.sort(function (a, b) {
					return a.sales < b.sales;
				});
				break;
			case '3':
				this.data.shops.sort(function (a, b) {
					return a.distance > b.distance;
				});
				break;
		}
		this.setData({
			filterId: e.target.dataset.id,
			shops: this.data.shops
		});
	},
	tapBanner: function (e) {
		var name = this.data.banners[e.target.dataset.id].name;
		wx.showModal({
			title: '提示',
			content: '您点击了“' + name + '”活动链接，活动页面暂未完成！',
			showCancel: false
		});
	}
});


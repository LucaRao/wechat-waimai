var app = getApp();
var waimai = require('../../comm/script/fetch')
Page({
	data: {
		filterId: 1,
		searchWords: '',
		placeholder: '烤鸭',
		shops: []
	},
	onLoad: function () {
    var self = this;
    waimai.fetchShopList.call(self)
		self.setData({
      address: '武汉'
    });
	},
	onShow: function () {
		//this.setData({
		//	showResult: false
		//});
	},
	inputSearch: function (e) {
		this.setData({
			searchWords: e.detail.value
		});
	},
	doSearch: function() {
		this.setData({
			showResult: true
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
	}
});


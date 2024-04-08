import {
  supabase
} from '../../lib/supabase'
var message = require('../../component/message/message')

// 获取banner列表
async function fetchBanners(cb) {
  var that = this
  message.hide.call(that)
  try {
    let {
      data: shop_banners,
      error
    } = await supabase
      .from('shop_banners')
      .select('*');
    if (shop_banners.length > 0) {
      that.setData({
        banners: shop_banners
      })
    }
  } catch (error) {
    message.show.call(that, {
      content: '网络开小差了',
      icon: 'offline',
      duration: 3000
    })
    typeof fail_cb == 'function' && fail_cb()
  }
}


// 获取icons列表
async function fetchIcons(cb) {
  var that = this
  message.hide.call(that)
  try {
    let {
      data: shop_icons,
      error
    } = await supabase
      .from('shop_icons')
      .select('*');
    if (shop_icons.length > 0) {
      that.setData({
        icons: shop_icons
      })
    }
  } catch (error) {
    message.show.call(that, {
      content: '网络开小差了',
      icon: 'offline',
      duration: 3000
    })
    typeof fail_cb == 'function' && fail_cb()
  }
}

// 获取店铺列表
async function fetchShopList(cb) {
  var that = this
  message.hide.call(that)
  try {
    let {
      data: shops_list,
      error
    } = await supabase
      .from('shops_list')
      .select('*');
    if (shops_list.length > 0) {
      that.setData({
        shops: shops_list
      })
    }
  } catch (error) {
    message.show.call(that, {
      content: '网络开小差了',
      icon: 'offline',
      duration: 3000
    })
    typeof fail_cb == 'function' && fail_cb()
  }
}
// 获取店铺详情
async function fetchShopdetail(id, cb) {
  var that = this
  message.hide.call(that)
  try {
    let {
      data: shops_list,
      error
    } = await supabase
      .from('shops_list')
      .select('*').eq('id', id);
    if (shops_list.length > 0) {
      that.setData({
        shop: shops_list[0]
      })
    }
  } catch (error) {
    message.show.call(that, {
      content: '网络开小差了',
      icon: 'offline',
      duration: 3000
    })
    typeof fail_cb == 'function' && fail_cb()
  }
}
// 获取商品
async function fetchGoods(cb) {
  var that = this
  message.hide.call(that)
  try {
    let {
      data: goods,
      error
    } = await supabase
      .from('goods')
      .select('*');
    if (goods.length > 0) {
      const good_s = transformData(goods)
      that.setData({
        goods: good_s
      })
    }
  } catch (error) {
    message.show.call(that, {
      content: '网络开小差了',
      icon: 'offline',
      duration: 3000
    })
    typeof fail_cb == 'function' && fail_cb()
  }
}
// 获取商品列表
async function fetchGoodLists(cb) {
  var that = this
  message.hide.call(that)
  try {
    let {
      data: goodsList,
      error
    } = await supabase
      .from('goodsList')
      .select('*');
    if (goodsList.length > 0) {
      goodsList.forEach(i => {
        i.goods = JSON.parse(i.goods)
      })
      that.setData({
        goodsList: goodsList,
        classifySeleted: goodsList[0].id
      })
    }
  } catch (error) {
    message.show.call(that, {
      content: '网络开小差了',
      icon: 'offline',
      duration: 3000
    })
    typeof fail_cb == 'function' && fail_cb()
  }
}

// 下单
async function sendTemplate(count,list, cb) {
  var that = this
  message.hide.call(that)
  try {
    const {
      data:order_lists,
      error
    } = await supabase
      .from('order_lists')
      .insert([{count:count,list:list,user_id:wx.getStorageSync('rd_session').id}])
      .select()
    if (order_lists.length>0) {
			wx.showModal({
        showCancel: false,
        title: '恭喜',
        content: '订单发送成功！下订单过程顺利完成，本例不再进行后续订单相关的功能。',
        success: function(res) {
          if (res.confirm) {
            wx.navigateBack();
          }
        }
      })
    }
  } catch (error) {
    message.show.call(that, {
      content: '网络开小差了',
      icon: 'offline',
      duration: 3000
    })
    typeof fail_cb == 'function' && fail_cb()
  }
}

function transformData(data) {
  // 创建一个空对象用于存储转换后的数据
  const transformedData = {};
  // 遍历原始数据数组，并将每个对象以'id'作为键存储到新对象中
  data.forEach(obj => {
    transformedData[obj.id] = obj;
  });
  // 返回转换后的数据对象
  return transformedData;
}
module.exports = {
  fetchBanners: fetchBanners,
  fetchIcons: fetchIcons,
  fetchShopList: fetchShopList,
  fetchGoods: fetchGoods,
  fetchGoodLists: fetchGoodLists,
  fetchShopdetail: fetchShopdetail,
  sendTemplate: sendTemplate
}
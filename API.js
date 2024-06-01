

const host = 'http://centralapi.yamibuy.net';

const api = {
    imgHost: 'https://cdn.yamibuy.net',

    //search接口
    // search: `${host}/ec-search/v2/pc/search?keywords=[#keywords]&page_index=[#pageIndex]&page_size=[#pageSize]`,
    search: `${host}/item/query_list_v2?keyword=[#keywords]&page=[#pageIndex]&pageSize=[#pageSize]`,

    // 添加购物车
    addCart: `${host}/so/cart/addCartList`,
    // 查询购物车
    queryCart: `${host}/so/cart/queryCart`,
    // 删除购物车
    deleteCartList: `${host}/so/cart/deleteCartList`,
    // 更新购物车
    updateCart: `${host}/so/cart/updateCart`,
    // 订单结算
    checkoutOrder: `${host}/so/order/checkoutOrder`,
    //提交订单
    submitOrder: `${host}/so/order/submitOrder`,

    

}

export default api
$(function () {
    let productNav = ''
    getCategories('PRODUCT').done(val => {
        let canReqest = true
        let index = 0
        while(canReqest && index < val.length) {
            let item = val[index]
            canReqest = false
            getArticleList({
                articleClass: 'PRODUCT',
                categoryId: item.id
            }).done(value => {
                canReqest = true
                index++
                let str = `<div class="item">
                            <div class="title" data-categoryId='${item.id}'>${item.name}</div>`
                value.content.forEach(itemData => {
                    str += `<div class="list"  onclick="location.href='./product.html?categoryId=${itemData.categoryId}&id=${itemData.id}'" data-id='${itemData.id}' data-categoryId='${itemData.categoryId}'>${itemData.title}</div>`
                })
                str += '</div>'
                $('#productList').append(str)
                productNav += str
            })
        }
        
    })
    getCompany().done(val => {
        let html = `<div class="base-info clearfix">
                    <div class="col-xs-12 col-md-4 text-center">
                        <img src="image/dw.png" width="20" alt="">
                        ${val.address}
                    </div>
                    <div class="col-xs-12 col-md-4 text-center">
                        <img src="image/dh.png" width="20" alt="">
                        ${val.tel}
                    </div>
                    <div class="col-xs-12 col-md-4 text-center">
                        <img src="image/yx.png" width="20" alt="">
                        ${val.email}
                    </div>
                </div>
                <div class="copyright">
                    ${val.icp}
                </div>`
        let contactInfo = `<div>电话：${val.tel} </div>
                    <div>邮箱：${val.email}</div>
                    <div>地址：${val.address}</div>`        
        $('#companyInfo').html(html)
        $('#know-about').html(val.summary)
        $('#contact').html(contactInfo)
        $('#contactDesc').html(contactInfo)
        if (window.BMap) {
            var map = new BMap.Map("allmap");    // 创建Map实例
            var point = new BMap.Point(val.longitude, val.latitude)
            map.centerAndZoom(point, 17);  // 初始化地图,设置中心点坐标和地图级别
            //添加地图类型控件
            var marker = new BMap.Marker(point);  // 创建标注
            map.addOverlay(marker);               // 将标注添加到地图中
            marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
                     // 设置地图显示的城市 此项是必须设置的
            map.enableScrollWheelZoom(true);  
            var top_left_control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT});// 左上角，添加比例尺
            var top_left_navigation = new BMap.NavigationControl();  //左上角，添加默认缩放平移控件
            var top_right_navigation = new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL}); //右上角，仅包含平移和缩放按钮
            map.addControl(top_left_control);        
            map.addControl(top_left_navigation);     
            map.addControl(top_right_navigation);  
        }
        
    })
    setDownload()
});
const setDownload = function() {
    getCategories('DOWNLOAD').done(val => {
        let canReqest = true
        let index = 0
        while(canReqest && index < val.length) {
            let item = val[index]
            canReqest = false
            getArticleList({
                articleClass: 'DOWNLOAD',
                categoryId: item.id
            }).done(value => {
                canReqest = true
                index++
                let str = `<div class="col-xs-12 col-md-4 ">
                    <div class="title">${item.name}</div>
                    <div class="list clearfix">`
                value.content.forEach(itemData => {
                    str += `<div class="col-md-6"><a href="${itemData.summary}">${itemData.title}</a></div>`
                })
                str += `</div>
                </div>`
                $('#download-list').append(str)
            })
        }
        val.forEach(item => {
            
        })
    })
}
function getUrlQuery () {
  let url = decodeURI(location.href)
  let hash;
  let myJson = {};
  let hashes = url.slice(url.indexOf('?') + 1).split('&');
  for (let i = 0; i < hashes.length; i++) {
    hash = hashes[i].split('=');
    myJson[hash[0]] = hash[1];
  }
  return myJson;
}


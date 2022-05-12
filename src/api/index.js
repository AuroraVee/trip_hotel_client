import request from './request'
import qs from 'qs'

//获取某个酒店的详情信息
export function reqHotelDetail() {
  return request({
    url: '/hotel-detail',
    method: 'get',
  })
}

//获取某个酒店所有房间的详情信息
export function reqHotelRoomDetail() {
  return request({
    url: '/hotel-room-detail',
    method: 'get',
  })
}

//更新酒店房间顺序
export function updateRoomList(data) {
  return request({
    url: '/hotel-room-detail',
    method: 'post',
    data: { list: data },
  })
}

//获取某个酒店的所有图片
export function reqHotelPicture() {
  return request({
    url: '/hotel-picture',
    method: 'get',
  })
}

//获取页面的主题配置
export function reqTheme() {
  return request({
    url: '/theme',
    method: 'get',
  })
}

/**
 *
 * @returns
 */
//上传自定义主题色配置
export function updateTheme(color, type) {
  return request({
    url: `/theme/${type}`,
    method: 'post',
    params: { color },
  })
}

//获取组件配置
export function reqLayoutOrder() {
  return request({
    url: '/order',
    method: 'get',
  })
}

//将新配置上传到服务器
export function updateLayoutOrder(data, type = 'column') {
  return request({
    url: `/order/${type}`,
    method: 'post',
    data: { order: data },
  })
}

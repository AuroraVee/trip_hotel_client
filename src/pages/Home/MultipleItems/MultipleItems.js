import React from 'react'
import Slider from 'react-slick'
import { reqHotelPicture } from '../../../api'
import { useState, useEffect } from 'react'
import { message, Image } from 'antd'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export default function MultipleItems() {
  const [picture, setPicture] = useState([])

  useEffect(() => {
    getData()
  }, [])

  async function getData() {
    const res = await reqHotelPicture()
    if (res.code === 200) {
      if (res.data.length < 5) {
        setPicture(res.data)
      } else {
        setPicture(res.data.slice(0, 5))
      }
    } else {
      message.error('获取酒店图片失败！')
    }
  }

  const settings = {
    //详细的设置请查看官方API
    dots: true, //圆点显示（false隐藏）
    infinite: true, //无限的环绕内容
    autoplay: true, //自动播放，速度默认为（3000毫秒）
    speed: 500, //自动播放速度（毫秒）
    slidesToShow: 1, //在一帧中显示3张卡片
    slidesToScroll: 3, //一次滚动3张卡片
  }

  return (
    <div style={{ marginBottom: '1px' }}>
      <Slider {...settings}>
        {picture.map((item) => {
          return (
            <div key={item.picture_id}>
              <Image src={item.large_url} height={170} width={'100%'}></Image>
            </div>
          )
        })}
        {/* <div>
          <img src={logo1} alt="" width="100%" height="170" />
        </div>
        <div>
          <img src={logo2} alt="" width="100%" height="170" />
        </div>
        <div>
          <img src={logo3} alt="" width="100%" height="170" />
        </div> */}
      </Slider>
    </div>
  )
}

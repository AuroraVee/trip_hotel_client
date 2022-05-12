import React from 'react'
import {
  LeftOutlined,
  EllipsisOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons'
import Config from '../../../component/Config'
import './style.css'

export default function Header() {
  const name = '北京丽都维景酒店'
  return (
    <div className="homeHeader">
      <div className="header_left">
        <LeftOutlined />
      </div>
      <div className="header_center">{name}</div>
      <div className="header_right">
        <Config />
      </div>
    </div>
  )
}

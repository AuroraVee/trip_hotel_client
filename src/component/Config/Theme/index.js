import React from 'react'
import { useEffect, useState } from 'react'
import { Button, message } from 'antd'
import { reqTheme, updateTheme } from '../../../api'
import { SketchPicker } from 'react-color'
import './style.css'

export default function Theme() {
  const [color, setColor] = useState('#fff')
  const [allColor, setAllColor] = useState([])

  const handleChangeComplete = async (color) => {
    setColor(color.hex)
    await update(color.hex, false)
    setAllColor((pre) => [...pre, color.hex])
  }

  const update = async (color, isClick = true) => {
    //设置整个页面的背景色
    document.getElementsByClassName(
      'home_style',
    )[0].style.backgroundColor = color
    let res
    if (isClick) {
      res = await updateTheme(color, 'update')
    } else {
      res = await updateTheme(color, 'add')
    }

    if (res.code === 200) {
      message.success('背景色修改成功')
    } else {
      message.error('背景色修改失败')
    }
  }

  useEffect(() => {
    reqTheme().then((res) => {
      if (res.code === 200) {
        setAllColor(res.data.choices)
        setColor(res.current)
      }
    })
  }, [])

  return (
    <div className="theme">
      <p>默认选项:</p>
      <div className="theme-item">
        {allColor.map((c, index) => {
          return (
            <button
              style={{ backgroundColor: c, textAlign: 'center' }}
              key={index}
              onClick={() => update(c)}
              className="theme-item-button"
            ></button>
          )
        })}
      </div>
      <div>
        <p>自定义：</p>
        <SketchPicker color={color} onChangeComplete={handleChangeComplete} />
      </div>
    </div>
  )
}

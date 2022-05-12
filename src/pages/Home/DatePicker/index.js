import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { LeftOutlined, RightOutlined, CalendarFilled } from '@ant-design/icons'
import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'
import isToday from 'dayjs/plugin/isToday'
import localeData from 'dayjs/plugin/localeData'
import 'dayjs/locale/zh-cn'
import DatePopover from './DatePopover'
import './DatePicker.css'

dayjs.locale('zh-cn')
dayjs.extend(isoWeek)
dayjs.extend(isToday)
dayjs.extend(localeData)

export default function DatePicker(props) {
  console.log('DatePicker开始渲染')
  // 本周七天的日期对象数组
  const getThisWeek = () => {
    return Array.from({ length: 7 }).map((item, index) => {
      return activeDate.isoWeekday(index + 1)
    })
  }

  // 当前选中的日期
  const [activeDate, setDate] = useState(dayjs())
  const [thisWeek, setWeek] = useState(getThisWeek())
  // 判断是否为选择的日期
  const isActive = (item) => item.date() === activeDate.date()
  const [anchorEl, setAnchorEl] = useState(null)
  const [dialogVisible, setVisible] = useState(false)

  useEffect(() => {
    setWeek(getThisWeek())
  }, [activeDate])

  const toToday = () => {
    // 跳转至今天
    setDate(dayjs())
    setWeek(getThisWeek())
  }

  const toLastWeek = () => {
    // 显示上一周日期
    const lastWeek = thisWeek.map((item, index) => {
      return dayjs(item).isoWeekday(index - 6)
    })
    setDate(dayjs(activeDate).subtract(7, 'd'))
    setWeek(lastWeek)
  }

  const toNextWeek = () => {
    // 显示下一周日期
    const nextWeek = thisWeek.map((item, index) => {
      return dayjs(item).isoWeekday(index + 8)
    })
    setDate(dayjs(activeDate).add(7, 'd'))
    setWeek(nextWeek)
  }

  const showDatePopover = () => {
    const datePickerTarget = document.getElementById('date-picker')
    setAnchorEl(datePickerTarget)
    setVisible(!dialogVisible)
  }

  return (
    <div className="picker_style">
      <div className="date-picker">
        {/* 上翻按钮 */}
        <Button size="small" onClick={toLastWeek}>
          <LeftOutlined fontSize="12px" />
        </Button>
        {/* 七天日期 */}
        {thisWeek.map((item) => {
          return (
            <div
              className="weekday"
              key={item}
              size="small"
              onClick={() => {
                setDate(item)
              }}
            >
              <span className="text-sm">
                {item.isToday() ? '今' : item.date()}
              </span>
            </div>
          )
        })}
        {/* 下翻按钮 */}
        <Button size="small" onClick={toNextWeek}>
          <RightOutlined fontSize="12px" />
        </Button>
        {/* 当前选中日期对应星期几 */}
        <Button
          variant="text"
          onClick={showDatePopover}
          className="date_button"
        >
          {`${activeDate.month() + 1}月${activeDate.date()}日 ${
            activeDate.isToday()
              ? '今天'
              : activeDate.localeData().weekdays(dayjs(activeDate))
          }`}
        </Button>
      </div>
      <DatePopover
        activeDate={activeDate}
        setDate={setDate}
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        dialogVisible={dialogVisible}
      ></DatePopover>
    </div>
  )
}

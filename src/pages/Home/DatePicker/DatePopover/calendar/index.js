import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'
import {
  LeftOutlined,
  RightOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined,
} from '@ant-design/icons'
import './calendar.css'

import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'
dayjs.extend(isoWeek)

const weekDayArr = ['一', '二', '三', '四', '五', '六', '七']
// 获取本月的一号

Calendar.propTypes = {
  activeDate: PropTypes.object,
  setDate: PropTypes.func,
}
export default function Calendar(props) {
  const { activeDate, setDate } = props

  const [first, setFirstDate] = useState(activeDate.date(1))

  const firstNumber = first.day()
    ? first.day(1)
    : dayjs(first).subtract(1, 'day').day(1)

  const dateArr = Array.from({ length: 42 }).map((item, index) => {
    return dayjs(firstNumber).add(index, 'day')
  })

  const toOtherMonth = (to) => {
    // 跳转到其他月份
    const lastMonthFirstDate = first.month(first.month() + to).date(1)
    setFirstDate(lastMonthFirstDate)
  }

  const toOtherYear = (to) => {
    // 跳转到其他月份
    const lastYearFirstDate = first.year(first.year() + to).date(1)
    setFirstDate(lastYearFirstDate)
  }

  const dateClass = (date) => {
    if (date.isSame(activeDate, 'day')) {
      return 'bg-primary'
    } else {
      if (date.isToday()) {
        return 'text-primary font-bold'
      }
      if (date.month() !== first.month()) {
        return 'text-gray-300'
      }
    }
  }
  return (
    <div className="date_dialog">
      <div className="dialog_title">
        <Button
          onClick={() => {
            toOtherYear(-1)
          }}
          className="title_button"
        >
          <DoubleLeftOutlined fontSize="small" />
        </Button>
        <Button onClick={() => toOtherMonth(-1)} className="title_button">
          <LeftOutlined fontSize="small" />
        </Button>

        <div className="title_text">
          {first.year()}年 {first.month() + 1}月
        </div>

        <Button onClick={() => toOtherMonth(1)} className="title_button">
          <RightOutlined fontSize="small" />
        </Button>
        <Button
          onClick={() => {
            toOtherYear(1)
          }}
          className="title_button"
        >
          <DoubleRightOutlined fontSize="small" />
        </Button>
      </div>
      <div className="dialog_body">
        {weekDayArr.map((item) => {
          return (
            <div className="dialog_week" key={item}>
              {item}
            </div>
          )
        })}
        {dateArr.map((item, index) => {
          return (
            <div
              className="dialog_day"
              key={index}
              onClick={() => {
                setDate(item)
              }}
            >
              {item.date()}
            </div>
          )
        })}
      </div>
    </div>
  )
}

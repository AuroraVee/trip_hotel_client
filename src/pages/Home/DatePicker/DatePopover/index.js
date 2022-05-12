import React from 'react'
import PropTypes from 'prop-types'
import { Popover } from 'antd'
import Calendar from './calendar'
import './calendar/calendar.css'

DatePopover.propTypes = {
  anchorEl: PropTypes.object,
  setAnchorEl: PropTypes.func,
  activeDate: PropTypes.object,
  setDate: PropTypes.func,
}

export default function DatePopover(props) {
  console.log('DatePopover渲染')
  const { anchorEl, setAnchorEl, activeDate, setDate, dialogVisible } = props
  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <div>
      {dialogVisible ? (
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <div className=" p-3">
            <Calendar activeDate={activeDate} setDate={setDate}></Calendar>
          </div>
          {/* </Drawer> : "" */}
        </Popover>
      ) : (
        ''
      )}
    </div>
  )
}

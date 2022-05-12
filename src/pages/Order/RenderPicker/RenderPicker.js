import React, { useState } from 'react'
import { Picker, Button } from 'antd-mobile'

export default function RenderPicker(props) {
  const { getOrderNum } = props
  const [visible, setVisible] = useState(false)
  const [value, setValue] = useState([])
  const [orderNum, setOrderNum] = useState(1)
  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '96vw',
        }}
        onClick={() => {
          setVisible(true)
        }}
      >
        <span style={{ display: 'inline-block' }}>购买数量</span>
        <span style={{ display: 'inline-block', fontWeight: '600' }}>
          <Picker
            columns={[
              [
                { label: '1', value: 1 },
                { label: '2', value: 2 },
                { label: '3', value: 3 },
                { label: '4', value: 4 },
                { label: '5', value: 5 },
              ],
            ]}
            visible={visible}
            onClose={() => {
              setVisible(false)
            }}
            value={value}
            onConfirm={
              // setValue
              (value) => {
                setValue(value)
                getOrderNum(orderNum)
              }
            }
            onSelect={(val, extend) => {
              console.log('onSelect', val, extend.items)
              setOrderNum(val)
            }}
            title="购买数量"
          >
            {(items) => {
              if (items.every((item) => item === null)) {
                return '1'
              } else {
                return items.map((item) => item?.label ?? '1')
              }
            }}
          </Picker>
          份
        </span>
        <span style={{ display: 'inline-block', fontSize: '2vw' }}>
          每单最多买5份，每人最多买5份
          <svg
            t="1652182225096"
            className="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="15869"
            width="12"
            height="12"
          >
            <path
              d="M289.301454 938.361551c8.958022 8.93551 24.607444 7.868201 34.877345-2.312672l405.886217-403.662573c5.846148-5.780657 8.581446-13.271258 8.314363-20.306488 0.331551-7.080256-2.423189-14.637372-8.270361-20.463054L324.178799 87.966471c-10.269901-10.225899-25.875321-11.248182-34.877345-2.322905-8.960069 8.946766-7.936763 24.451902 2.334161 34.666544l393.880789 391.68068L291.635615 903.68375C281.364691 913.908626 280.341385 929.423995 289.301454 938.361551z"
              p-id="15870"
              fill="#8a8a8a"
            ></path>
          </svg>
        </span>
      </div>
    </>
  )
}

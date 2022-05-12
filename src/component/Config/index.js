import React, { useState, useEffect } from 'react'
import { Drawer, Button, Tabs } from 'antd'
import {
  SettingOutlined,
  AppstoreOutlined,
  MailOutlined,
} from '@ant-design/icons'
import { withRouter } from 'react-router-dom'

import Theme from './Theme'
import ComponentLayout from './ComponentLayout'

const { TabPane } = Tabs

const Config = (props) => {
  const [visible, setVisible] = useState(false)
  const [current, setCurrent] = React.useState('theme')
  // useEffect(() => {
  //   props.history.push('/home/theme')
  // }, [])
  const items = [
    {
      label: (
        <span>
          <MailOutlined /> 修改主题色
        </span>
      ),
      key: 'theme',
      layout: <Theme />,
    },
    {
      label: (
        <span>
          <AppstoreOutlined />
          修改布局
        </span>
      ),
      key: 'layout',
      layout: <ComponentLayout activeKey={current} />,
    },
  ]

  const showDrawer = () => {
    setVisible(true)
  }

  const onClose = () => {
    setVisible(false)
  }

  const changeHandler = (key) => {
    setCurrent(key)
  }

  return (
    <>
      <Button onClick={showDrawer} icon={<SettingOutlined />} size="small">
        配置
      </Button>
      <Drawer
        title="配置背景色和布局"
        placement="right"
        onClose={onClose}
        visible={visible}
      >
        <Tabs onChange={changeHandler} activeKey={current}>
          {items.map((item) => {
            return (
              <TabPane tab={item.label} key={item.key}>
                {item.layout}
              </TabPane>
            )
          })}
        </Tabs>
      </Drawer>
    </>
  )
}

export default withRouter(Config)

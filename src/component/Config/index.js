import React, { useState, useEffect } from 'react'
import { Drawer, Button, Menu } from 'antd'
import {
  SettingOutlined,
  AppstoreOutlined,
  MailOutlined,
} from '@ant-design/icons'
import { Switch, Route } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

import Theme from './Theme'
import ComponentLayout from './ComponentLayout'

const items = [
  {
    label: '修改主题色',
    key: 'theme',
    icon: <MailOutlined />,
  },
  {
    label: '修改布局',
    key: 'layout',
    icon: <AppstoreOutlined />,
  },
]

const Config = (props) => {
  const [visible, setVisible] = useState(false)
  const [current, setCurrent] = React.useState('theme')
  useEffect(() => {
    props.history.push('/home/theme')
  }, [])

  const showDrawer = () => {
    setVisible(true)
  }

  const onClose = () => {
    setVisible(false)
  }

  const onClick = (e) => {
    //路由跳转
    const { key } = e
    switch (key) {
      case 'theme': {
        props.history.push('/home/theme')
        break
      }
      case 'layout': {
        props.history.push('/home/order')
        break
      }
      default:
        break
    }

    setCurrent(e.key)
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
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
        />
        <Switch>
          <Route path="/home/theme" component={Theme}></Route>
          <Route path="/home/order" component={ComponentLayout}></Route>
        </Switch>
      </Drawer>
    </>
  )
}

export default withRouter(Config)

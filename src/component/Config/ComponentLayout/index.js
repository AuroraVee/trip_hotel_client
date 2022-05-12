import React from 'react'
import { useEffect, useState } from 'react'
import { Tree, message } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import PubSub from 'pubsub-js'
import { reqLayoutOrder, updateLayoutOrder } from '../../../api'

export default function ComponentLayout(props) {
  const [treeData, setTreeData] = useState([])
  useEffect(() => {
    getData()

    let subId = PubSub.subscribe('changeLayoutFromHome', function () {
      if (props.activeKey === 'layout') {
        getData()
      }
    })

    return () => {
      PubSub.unsubscribe(subId)
    }
  }, [])

  const getData = () => {
    //从服务器上取出布局配置，用tree的形式展示
    reqLayoutOrder().then((res) => {
      if (res.code === 200) {
        setTreeData(res.data)
      }
    })
  }

  const onDrop = (info) => {
    //console.log(info);
    //确认放置节点
    const dropKey = info.node.key
    const dragKey = info.dragNode.key

    //拖动的是房间item节点，但是接收的不是同类型的，直接返回
    if (Number(dragKey) && !Number(dropKey) && dropKey !== 'roomList') {
      message.info(`${info.node.title}组件不可以接收${info.dragNode.title}组件`)
      return
    }

    const dropPos = info.node.pos.split('-')
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1])

    const loop = (data, key, callback) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data)
        }
        if (data[i].children) {
          loop(data[i].children, key, callback)
        }
      }
    }
    const data = [...treeData]

    // Find dragObject
    let dragObj
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1)
      dragObj = item
    })

    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, (item) => {
        item.children = item.children || []
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj)
      })
    } else if (
      (info.node.children || []).length > 0 && // Has children
      info.node.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, (item) => {
        item.children = item.children || []
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj)
        // in previous version, we use item.children.push(dragObj) to insert the
        // item to the tail of the children
      })
    } else {
      let ar
      let i
      loop(data, dropKey, (item, index, arr) => {
        ar = arr
        i = index
      })
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj)
      } else {
        ar.splice(i + 1, 0, dragObj)
      }
    }

    const type = Number(dragObj.key) ? 'roomItem' : 'column'
    updateLayoutOrder(data).then((res) => {
      if (res.code === 200) {
        message.success('布局修改成功')

        if (type === 'roomItem') {
          PubSub.publish('changeItemsLayout')
        } else {
          PubSub.publish('changeLayout', data)
        }

        setTreeData(data)
      } else {
        message.error('布局修改失败，请重试')
      }
    })
  }

  return (
    <Tree
      showLine
      draggable
      onDrop={onDrop}
      switcherIcon={<DownOutlined />}
      autoExpandParent
      treeData={treeData}
      style={{ marginTop: '10px' }}
    />
  )
}

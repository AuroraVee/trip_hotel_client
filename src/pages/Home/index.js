import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import PubSub from 'pubsub-js'
import { useEffect, useState } from 'react'
import DatePicker from './DatePicker'
import RoomList from './RoomList'
import Header from './Header'
import Detail from './Detail'
import MultipleItems from './MultipleItems/MultipleItems'
import MovableItem from '../../component/MovableItem'
import { reqLayoutOrder, updateLayoutOrder } from '../../api'
import { message } from 'antd'
import './Home.css'

export default function Home() {
  const [layout, setLayout] = useState([])

  useEffect(() => {
    reqLayoutOrder().then((res) => {
      if (res.code === 200) {
        setLayout(res.data)
      }
    })

    let id = PubSub.subscribe('changeLayout', function (_, config) {
      setLayout(config)
    })

    return () => {
      PubSub.unsubscribe(id)
    }
  }, [])

  const moveCardHandler = (dragIndex, hoverIndex) => {
    const dragItem = layout[dragIndex] //{title,key}

    if (dragItem) {
      setLayout((prevState) => {
        const coppiedStateArray = [...prevState]
        //交互两个ITEM在数组中的位置

        // remove item by "hoverIndex" and put "dragItem" instead
        //由被删除的元素组成的一个数组。如果只删除了一个元素，则返回只包含一个元素的数组。如果没有删除元素，则返回空数组。
        const prevItem = coppiedStateArray.splice(hoverIndex, 1, dragItem)
        //在hoverIndex位置的item删除，插入dragItem

        // remove item by "dragIndex" and put "prevItem" instead
        coppiedStateArray.splice(dragIndex, 1, prevItem[0])

        return coppiedStateArray
      })
      updateDataInServe()
    }
  }

  const updateDataInServe = () => {
    updateLayoutOrder(layout).then((res) => {
      if (res.code === 200) {
        message.success('布局修改成功')
      } else {
        message.error('布局修改失败，请重试')
      }
    })
  }

  return (
    <div className="home_style">
      <Header />
      <DndProvider backend={HTML5Backend}>
        {layout.map((obj, index) => {
          switch (obj.title) {
            case 'hotelPhoto': {
              return (
                <MovableItem
                  index={index}
                  moveCardHandler={moveCardHandler}
                  key={obj.key}
                >
                  <MultipleItems />
                </MovableItem>
              )
            }
            case 'hotelDetail': {
              return (
                <MovableItem
                  index={index}
                  moveCardHandler={moveCardHandler}
                  key={obj.key}
                >
                  <Detail />
                </MovableItem>
              )
            }
            case 'choseTime': {
              return (
                <MovableItem
                  index={index}
                  moveCardHandler={moveCardHandler}
                  key={obj.key}
                >
                  <DatePicker />
                </MovableItem>
              )
            }
            case 'roomList': {
              return (
                <MovableItem
                  index={index}
                  moveCardHandler={moveCardHandler}
                  key={obj.key}
                >
                  <RoomList />
                </MovableItem>
              )
            }
          }
        })}
      </DndProvider>
    </div>
  )
}

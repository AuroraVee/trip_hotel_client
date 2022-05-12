import { List, Button, Image, Card } from 'antd'
import React, { useState, useEffect } from 'react'
import { reqHotelRoomDetail, updateRoomList } from '../../../api'
import { withRouter } from 'react-router-dom'
import Taocan from '../../../component/Taocan'
import MovableItem from './../../../component/MovableItem/index'
import { message } from 'antd'
import PubSub from 'pubsub-js'
import { format } from '../../../utils'

function RoomList(props) {
  const name = '北京丽都维景酒店'

  const [list, setList] = useState([])
  const [Loading, setLoading] = useState(false)
  const [date, setDate] = useState(null)

  const taocan = {
    live: { title: '住', content: '双床房/晚' },
    eat: { title: '食', content: '早餐成人2份/天+餐饮礼遇二选一1份' },
    play: { title: '享', content: '儿童乐园1小时畅玩1份+租用儿童挖沙玩具1份' },
  }

  useEffect(() => {
    getData()

    let subID = PubSub.subscribe('changeItemsLayout', () => {
      getData()
    })

    let dateID = PubSub.subscribe('updateDate', (_, date) => {
      setDate(format(date))
    })

    return () => {
      PubSub.unsubscribe(subID)
      PubSub.unsubscribe(dateID)
    }
  }, [])

  async function getData() {
    setLoading(true)
    let res = await reqHotelRoomDetail()
    if (res.code === 200) {
      setList(res.data)
    }
    setLoading(false)
  }

  function goOrder(roomItem) {
    taocan.live.content = `${roomItem.base_room_name}/晚`
    props.history.push('/order', {
      hotelName: name,
      taocan,
      roomItem,
      leaveDate: date,
    })
  }

  async function moveItemHandler(dragIndex, hoverIndex) {
    const dragItem = list[dragIndex] //{title,key}

    if (dragItem) {
      const coppiedStateArray = [...list]
      //交互两个ITEM在数组中的位置

      // remove item by "hoverIndex" and put "dragItem" instead
      //由被删除的元素组成的一个数组。如果只删除了一个元素，则返回只包含一个元素的数组。如果没有删除元素，则返回空数组。
      const prevItem = coppiedStateArray.splice(hoverIndex, 1, dragItem)
      //在hoverIndex位置的item删除，插入dragItem

      // remove item by "dragIndex" and put "prevItem" instead
      coppiedStateArray.splice(dragIndex, 1, prevItem[0])

      setList(coppiedStateArray)

      const res = await updateRoomList(coppiedStateArray)
      if (res.code === 200) {
        message.success('房间布局修改成功')
      } else {
        message.error('房间布局修改失败')
      }
    }
  }

  return (
    <List
      style={{ padding: 1 }}
      split={false}
      rowKey="base_room_id"
      className="demo-loadmore-list"
      loading={Loading}
      itemLayout="vertical"
      dataSource={list}
      renderItem={(item, index) => (
        <List.Item style={{ width: '100%', padding: 2 }}>
          <MovableItem
            index={index}
            key={item.base_room_id}
            moveCardHandler={moveItemHandler}
            type="roomItem"
            name={item.base_room_name}
          >
            <Card bodyStyle={{ borderRadius: '10px', padding: 5 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ marginLeft: 10 }}>
                  <Image src={item.images.split(';')[0]} width={110}></Image>
                </div>
                <div
                  style={{ textAlign: 'left', width: 200, flex: '0 1 auto' }}
                >
                  <p
                    style={{
                      fontSize: 'medium',
                      fontStyle: 'bold',
                    }}
                  >
                    {item.base_room_name}
                  </p>
                  <p
                    style={{
                      color: 'red',
                      fontSize: 'medium',
                    }}
                  >
                    {item.min_price}
                  </p>
                  <Button
                    type="primary"
                    onClick={() => {
                      goOrder(item)
                    }}
                  >
                    预定
                  </Button>
                </div>
              </div>
              {/* <Taocan taocan={taocan}></Taocan> */}
            </Card>
          </MovableItem>
        </List.Item>
      )}
    />
  )
}
//

export default withRouter(RoomList)

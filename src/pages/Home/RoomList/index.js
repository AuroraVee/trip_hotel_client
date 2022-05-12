import { List, Button, Image, Card } from 'antd'
import React, { useState, useEffect } from 'react'
import { UpOutlined, DownOutlined } from '@ant-design/icons'
import { reqHotelRoomDetail } from '../../../api'
import { withRouter } from 'react-router-dom'
import Taocan from '../../../component/Taocan'

function RoomList(props) {
  const name = '北京丽都维景酒店'

  const [list, setList] = useState([])
  const [Loading, setLoading] = useState(false)

  const taocan = {
    live: { title: '住', content: '双床房/晚' },
    eat: { title: '食', content: '早餐成人2份/天+餐饮礼遇二选一1份' },
    play: { title: '享', content: '儿童乐园1小时畅玩1份+租用儿童挖沙玩具1份' },
  }

  useEffect(() => {
    getData()
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
    })
  }

  return (
    <List
      split={false}
      rowKey="base_room_id"
      className="demo-loadmore-list"
      loading={Loading}
      itemLayout="vertical"
      dataSource={list}
      pagination={{
        onChange: (page) => {
          console.log(page)
        },
        pageSize: 2,
      }}
      renderItem={(item) => (
        <List.Item style={{ width: '100%', padding: 2 }}>
          <Card bodyStyle={{ borderRadius: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <Image src={item.images.split(';')[0]} width={110}></Image>
              </div>
              <div>
                <p style={{ fontSize: 'medium', fontStyle: 'bold' }}>
                  {item.base_room_name}
                </p>
                <p style={{ color: 'red', fontSize: 'medium' }}>
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
            <Taocan taocan={taocan}></Taocan>
          </Card>
        </List.Item>
      )}
    />
  )
}
//

export default withRouter(RoomList)

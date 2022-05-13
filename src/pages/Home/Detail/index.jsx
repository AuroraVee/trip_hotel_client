import React from 'react'
import PubSub from 'pubsub-js'
import { useEffect, useState } from 'react'
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  RedEnvelopeFilled,
  CaretRightFilled,
} from '@ant-design/icons'
import { format } from '../../../utils'
import '../Home.css'
import Taocan from '../../../component/Taocan'

// export default function Detail() {
//   const [detail, setDetail] = useState({})

//   useEffect(() => {
//     getData()
//   }, [])

//   async function getData() {
//     let res = await reqHotelDetail()
//     if (res.code === 200) {
//       setDetail(res.data[0])
//     }
//   }

//   const hotelDetail = () => {
//     //跳转路由
//   }

//   return (
//     <Card style={{ width: '100%' }}>
//       <div className="item">
//         <Row>
//           <Col span={24}>
//             <h4>{detail.name}</h4>
//           </Col>
//         </Row>
//         <Row>
//           <Col span={14}>
//             <span>{detail.open_year + '年开业'}</span>
//             &nbsp;&nbsp;
//             <span>{detail.grade}</span>
//           </Col>
//           <Col span={10} className="item-right">
//             <LinkButton onClick={hotelDetail}> 详情/设施&gt;</LinkButton>
//           </Col>
//         </Row>
//       </div>
//       <div className="item">
//         <Row>
//           <Col span={14}>
//             <span>评分</span>
//             <Rate disabled defaultValue={detail.total_score} allowHalf />
//           </Col>
//           <Col span={10} className="item-right">
//             <LinkButton onClick={hotelDetail}>
//               {' '}
//               {detail.comment_total + '评论>'}
//             </LinkButton>
//           </Col>
//         </Row>
//       </div>
//       <div className="item">
//         <Row>
//           <Col span={19}>
//             <span>{detail.area + ' | ' + detail.address}</span>
//           </Col>
//           <Col span={5} className="item-right">
//             地图周边
//           </Col>
//         </Row>
//       </div>
//     </Card>
//   )
// }

export default function Detail() {
  const [date, setDate] = useState(null)
  useEffect(() => {
    let subID = PubSub.subscribe('updateDate', (_, date) => {
      //console.log(date)
      setDate(format(date))
    })

    return () => {
      PubSub.unsubscribe(subID)
    }
  }, [])

  const taocan = {
    live: { title: '住', content: '双床房/晚' },
    eat: { title: '食', content: '早餐成人2份/天+餐饮礼遇二选一1份' },
    play: { title: '享', content: '儿童乐园1小时畅玩1份+租用儿童挖沙玩具1份' },
  }

  return (
    <div style={{ padding: 3 }}>
      <div className="discountbox">
        <div className="box1">
          <div className="price">
            <div id="font">￥2699</div>
            <div>2晚</div>
            <div>
              <s>￥4599</s>
            </div>
          </div>
          <div>
            <div className="discount">
              <RedEnvelopeFilled
                style={{ fontSize: '16px', color: '#F65E59' }}
              />
              优惠1900
              <CaretRightFilled
                style={{ fontSize: '16px', color: '#F66258' }}
              />
            </div>
          </div>
        </div>
        <div className="sale">已售14份</div>
      </div>
      <Taocan taocan={taocan} />
      <div className="box3">
        <div className="green">
          <CheckCircleOutlined
            style={{ fontSize: '16px', color: '#319273', padding: '4px' }}
          />
          过期退 随时退 全额退
        </div>
        <div className="process">
          <ExclamationCircleOutlined
            style={{ fontSize: '16px', color: '#323232', padding: '4px' }}
          />
          {`至少提前1天预约${date ? ',有效期到' + date + '离店' : ''}`}
        </div>
      </div>
    </div>
  )
}

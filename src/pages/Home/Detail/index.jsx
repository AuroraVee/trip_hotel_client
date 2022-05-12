import React, { useEffect, useState } from 'react'
import { Card, Row, Col, Rate } from 'antd'
import '../Home.css'
import { reqHotelDetail } from '../../../api'
import LinkButton from '../../../component/LinkButton'
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  RedEnvelopeFilled,
  CaretRightFilled,
} from '@ant-design/icons'
import { Button } from 'antd'

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
  return (
    <>
      <div className="box1">
        <div className="price">
          <div id="font">￥2699</div>
          <div>2晚</div>
          <div>
            <s>￥4599</s>
          </div>
          <div style={{ width: '200px' }}>
            <div className="discount">
              <RedEnvelopeFilled
                style={{ fontSize: '16px', color: '#F65E59' }}
              />{' '}
              优惠1900{' '}
              <CaretRightFilled
                style={{ fontSize: '16px', color: '#F66258' }}
              />
            </div>
          </div>
        </div>
        <div className="sale">已售14份</div>
      </div>
      <div className="box3">
        <div className="green">
          <CheckCircleOutlined style={{ fontSize: '16px', color: '#319273' }} />{' '}
          过期退 随时退 全额退
        </div>
        <div className="process">
          <ExclamationCircleOutlined
            style={{ fontSize: '16px', color: '#323232' }}
          />{' '}
          至少提前1天预约，有效期到2022年6月30日离店
        </div>
      </div>
    </>
  )
}

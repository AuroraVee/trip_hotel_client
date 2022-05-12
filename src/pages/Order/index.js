import React, { useState } from 'react'

import { Card, Input } from 'antd-mobile'
import styles from './Order.module.css'
import RenderPicker from './RenderPicker/RenderPicker'
import Taocan from '../../component/Taocan'

export default function Order(props) {
  const { taocan, hotelName, roomItem, leaveDate } = props.location.state

  const [orderNum, setOrderNum] = useState(1)
  const [phoneNum, setPhoneNum] = useState('')

  //返回上页
  const back = () => props.history.go(-1)

  const getOrderNum = (value) => {
    console.log(value)
    setOrderNum(value[0])
  }

  return (
    <div className={styles.orderPage}>
      <div className={styles.header}>
        <div className={styles.back} onClick={back}>
          <svg
            t="1652101849211"
            className="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="3346"
          >
            <path
              d="M328.555136 515.587823l364.265028-364.265028c20.07399-20.049007 20.07399-52.553369 0-72.577393-20.024024-20.049007-52.528386-20.049007-72.577393 0L220.992263 477.971128c-20.024024 20.024024-20.024024 52.528386 0 72.577393 1.578929 1.578929 3.383306 2.83188 5.112534 4.160179 0.300796 0.325779 0.526243 0.701724 0.827039 1.027503l389.877663 389.877663c19.57293 19.57293 51.300418 19.57293 70.873148 0s19.57293-51.300418 0-70.873148L328.555136 515.587823z"
              p-id="3347"
              fill="#ffffff"
            ></path>
          </svg>
        </div>
        填写订单
      </div>
      <div className={styles.hotelInfoBg}></div>
      <div className={styles.hotelInfo}>
        <div className={styles.hotelName}>{hotelName}</div>
        {/* 套餐内容 */}
        <Taocan taocan={taocan} />
        <div className={styles.singlePrice}>{`￥${roomItem.min_price}/份`}</div>
        <hr style={{ color: '#e6e6e6', opacity: '0.2', marginBottom: '3vw' }} />
        <div className={styles.ctgLine}>
          <span className={styles.tip}>
            <svg
              t="1652167629866"
              className="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="6743"
              width="14"
              height="14"
            >
              <path
                d="M486.4 630.4c-19.2 19.2-48 19.2-67.2 3.2l-137.6-131.2-32 35.2 137.6 131.2c38.4 35.2 96 35.2 134.4-3.2l281.6-297.6-35.2-32L486.4 630.4z"
                p-id="6744"
                fill="#0e932e"
              ></path>
              <path
                d="M512 51.2c-252.8 0-460.8 204.8-460.8 460.8s204.8 460.8 460.8 460.8 460.8-204.8 460.8-460.8S764.8 51.2 512 51.2zM512 924.8c-227.2 0-412.8-185.6-412.8-412.8s185.6-412.8 412.8-412.8 412.8 185.6 412.8 412.8S739.2 924.8 512 924.8z"
                p-id="6745"
                fill="#0e932e"
              ></path>
            </svg>
            过期退
          </span>
          <span className={styles.tip}>
            <svg
              t="1652167668827"
              className="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="7147"
              width="14"
              height="14"
            >
              <path
                d="M486.4 630.4c-19.2 19.2-48 19.2-67.2 3.2L281.6 502.4l-32 35.2 137.6 131.2c38.4 35.2 96 35.2 134.4-3.2L803.2 368 768 336 486.4 630.4z"
                fill="#2aa515"
                p-id="7148"
              ></path>
              <path
                d="M512 51.2C259.2 51.2 51.2 256 51.2 512S256 972.8 512 972.8 972.8 768 972.8 512 764.8 51.2 512 51.2z m0 873.6C284.8 924.8 99.2 739.2 99.2 512S284.8 99.2 512 99.2 924.8 284.8 924.8 512 739.2 924.8 512 924.8z"
                fill="#2aa515"
                p-id="7149"
              ></path>
            </svg>
            随时退
          </span>
          <span className={styles.tip}>
            <svg
              t="1652168106368"
              className="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="8291"
              width="14"
              height="14"
            >
              <path
                d="M533.333333 96c229.76 0 416 186.24 416 416S763.093333 928 533.333333 928 117.333333 741.76 117.333333 512 303.573333 96 533.333333 96z m0 64C338.922667 160 181.333333 317.589333 181.333333 512S338.922667 864 533.333333 864 885.333333 706.410667 885.333333 512 727.744 160 533.333333 160z m32 116.608v220.992l163.2 144.554667-42.410666 47.893333-184.789334-163.626667v-249.813333h64z"
                fill="#1677FF"
                p-id="8292"
              ></path>
            </svg>
            至少提前1天预约
          </span>
        </div>
        <div className={styles.ctgLine}>
          <span className={styles.tip}>
            <svg
              t="1652168896068"
              className="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="10062"
              width="14"
              height="14"
            >
              <path
                d="M863.232 129.024h-160.768v-25.6c0-15.872-12.8-28.672-28.672-28.672H351.744c-15.872 0-28.672 12.8-28.672 28.672v25.6H162.304c-15.872 0-28.672 12.8-28.672 28.672v700.928c0 15.872 12.8 28.672 28.672 28.672h700.416c16.384 0 28.672-12.8 29.184-28.672v-701.44c0-15.36-12.8-28.16-28.672-28.16z m-482.816 2.56H645.12v48.128H380.416v-48.128zM829.44 824.32H196.096V190.976h126.976v17.408c0 15.872 12.8 28.672 28.672 28.672h322.048c15.872 0 28.672-12.288 28.672-28.672v-17.408H829.44V824.32z"
                fill="#2c2c2c"
                p-id="10063"
              ></path>
              <path
                d="M731.136 411.648c0 8.704-3.072 16.384-9.216 23.04l-243.2 242.688c-12.8 12.8-32.768 12.8-45.568 0l-130.048-130.048c-12.8-12.8-12.8-32.768 0-45.568s32.768-12.8 45.568 0L455.68 608.256l219.648-219.648c12.8-12.8 32.768-12.8 45.568 0 6.656 6.656 9.728 14.336 10.24 23.04z"
                fill="#2c2c2c"
                p-id="10064"
              ></path>
            </svg>
            有效期到{leaveDate}离店
          </span>
        </div>
        <div className={styles.ctgLine}>
          <span className={styles.lastTip}>
            <svg
              t="1652169166586"
              className="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="15007"
              width="14"
              height="14"
            >
              <path
                d="M511.333 127.333c51.868 0 102.15 10.144 149.451 30.15 45.719 19.337 86.792 47.034 122.078 82.321 35.287 35.286 62.983 76.359 82.321 122.078 20.006 47.3 30.15 97.583 30.15 149.451s-10.144 102.15-30.15 149.451c-19.337 45.719-47.034 86.792-82.321 122.078-35.286 35.287-76.359 62.983-122.078 82.321-47.3 20.006-97.583 30.15-149.451 30.15s-102.15-10.144-149.451-30.15c-45.719-19.337-86.792-47.034-122.078-82.321-35.287-35.286-62.983-76.359-82.321-122.078-20.006-47.3-30.15-97.583-30.15-149.451s10.144-102.15 30.15-149.451c19.337-45.719 47.034-86.792 82.321-122.078 35.286-35.287 76.359-62.983 122.078-82.321 47.301-20.006 97.583-30.15 149.451-30.15m0-64c-247.424 0-448 200.576-448 448s200.576 448 448 448 448-200.576 448-448-200.576-448-448-448z"
                fill=""
                p-id="15008"
              ></path>
              <path
                d="M543.334 576h-64.001l-31.246-320.047h128.025z"
                fill=""
                p-id="15009"
              ></path>
              <path
                d="M512.099 702.965m-40 0a40 40 0 1 0 80 0 40 40 0 1 0-80 0Z"
                fill=""
                p-id="15010"
              ></path>
            </svg>
            酒店当地时间2022年7月1日-2022年8月31日、2022年10月1日-2022年10月7日不适用
          </span>
        </div>
      </div>

      <div className={styles.orderMenu}>
        <div className={styles.selectNum}>
          <RenderPicker getOrderNum={getOrderNum}></RenderPicker>
        </div>
        <div className={styles.phoneInfo}>
          <span className={styles.area}>
            大陆手机&nbsp;
            <svg
              t="1652186192742"
              className="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="16216"
              width="12"
              height="12"
            >
              <path
                d="M902.488017 292.831348 510.795057 686.71316l-391.68068-393.880789c-10.214642-10.270924-25.719778-11.294231-34.666544-2.334161-8.925277 9.002025-7.902994 24.607444 2.322905 34.877345l403.651316 405.930219c5.824659 5.847172 13.381775 8.601912 20.463054 8.270361 7.03523 0.267083 14.525831-2.468215 20.306488-8.314363l403.662573-405.886217c10.180873-10.269901 11.248182-25.919323 2.312672-34.877345C928.228261 281.537118 912.712893 282.560424 902.488017 292.831348z"
                p-id="16217"
                fill="#515151"
              ></path>
            </svg>
          </span>
          <div className={styles.phoneNum}>
            <span className={styles.areaNum}>+86</span>
            <Input
              value={phoneNum}
              onChange={(val) => {
                setPhoneNum(val)
              }}
              placeholder="用于接收订单信息"
              clearable
            />
          </div>
        </div>
      </div>

      {/* 预定须知 */}
      <div className={styles.orderTips}>
        <Card title="预定须知">
          <div className={styles.tipHead}>预约信息</div>
          <div className={styles.tipContent}>
            请至少提前1天在线预约 <br />
            联系电话：0855-3348228
          </div>
          <div className={styles.tipHead}>使用有效期</div>
          <div className={styles.tipContent}>
            有效期为酒店当地时间2022年4月22日-2022年12月31日离店
          </div>
          <div className={styles.tipHead}>不适用日期</div>
          <div className={styles.tipContent}>
            酒店当地时间2022年7月1日-2022年8月31日、2022年10月1日-2022年10月7日不适用
          </div>
          <div className={styles.tipHead}>取消及退款政策</div>
          <div className={styles.tipContent}>
            下单后若未预约酒店，可随时取消订单，预约成功后不可取消和修改 <br />
            多晚连住/可拆分入住产品，仅支持整券全退，使用部分晚数，剩下未入住晚数不支持退款
          </div>
          <div className={styles.tipHead}>发票信息</div>
          <div className={styles.tipContent}>发票由商家提供</div>
          <div className={styles.tipHead}>特别说明</div>
          <div className={styles.tipContent}>
            退房时间为酒店当地时间12点前 <br />
            如果用户存在倒卖、恶意囤单等违规行为，携程有权取消订单并处以订单金额100%的罚款。
            <br />
            预约酒店高峰时段可能有预约不上的风险，建议您提前预约，具体以酒店确认信息为准
          </div>
          <div className={styles.tipHead}>服务提供方</div>
          <div className={styles.tipContent}>
            预订服务由携程旗下上海赫程国际旅行社有限公司及其分公司提供、住宿及其他服务具体由酒店或供应商提供。
          </div>
        </Card>
      </div>
      {/* 底部 */}
      <div className={styles.bottomtext}>
        点击去支付代表您已阅读并同意<a href=" ">《预售产品预订须知》</a>
      </div>
      <div className={styles.footer}>
        {/* <Button color='warning'>去支付</Button> */}
        <div style={{ marginTop: '3vw' }}>
          订单总额
          <span style={{ color: 'orange' }}> ￥</span>
        </div>
        <span style={{ fontSize: '8vw', color: 'orange', fontWeight: '600' }}>
          {roomItem.min_price * orderNum}
        </span>
        <div className={styles.payButton}>去支付</div>
      </div>
    </div>
  )
}

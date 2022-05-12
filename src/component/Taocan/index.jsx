import React from 'react'
import styles from '../../pages/Order/Order.module.css'

export default function Taocan(props) {
  const { taocan } = props

  return (
    <div className={styles.package}>
      <div className={styles.more}>
        套餐详情
        <svg
          t="1652165582045"
          className="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="3531"
          width="14"
          height="14"
        >
          <path
            d="M289.301454 938.361551c8.958022 8.93551 24.607444 7.868201 34.877345-2.312672l405.886217-403.662573c5.846148-5.780657 8.581446-13.271258 8.314363-20.306488 0.331551-7.080256-2.423189-14.637372-8.270361-20.463054L324.178799 87.966471c-10.269901-10.225899-25.875321-11.248182-34.877345-2.322905-8.960069 8.946766-7.936763 24.451902 2.334161 34.666544l393.880789 391.68068L291.635615 903.68375C281.364691 913.908626 280.341385 929.423995 289.301454 938.361551z"
            p-id="3532"
            fill="#8a8a8a"
          ></path>
        </svg>
      </div>
      <div className={styles.ctgLine}>
        <span className={styles.categoryLogo}>{taocan.live.title}</span>
        {taocan.live.content}
      </div>
      <div className={styles.ctgLine}>
        <span className={styles.categoryLogo}> {taocan.eat.title}</span>
        {taocan.eat.content}
      </div>
      <div className={styles.ctgLine} style={{ marginBottom: 0 }}>
        <span className={styles.categoryLogo}>{taocan.play.title}</span>
        {taocan.play.content}
      </div>
    </div>
  )
}

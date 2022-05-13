# 酒店详情页

## 1.trip_hotel_client 

客服端的实现

功能：展示Home组件、展示订购页

## 2.trip_hotel_server 

服务器

- 框架: express

- 酒店数据:
  ctrip_hotels_base_rooms.xls
  ctrip_hotels_details.xls
  ctrip_hotels_pictures.xls

- 技术:
  json → lowdb-node
  excel → node-xlsx

## 3.背景色/布局自定义配置

### 3.1背景色

- 服务端:
  theme.json → 已保存的背景色、当前选择的背景色

- 前端:
  选项 → button 展示
  自定义 → react-color 颜色选择器

- 交互操作: 更新 json 文件、更新指定类名组件的背景

### 3.2 组件布局

- 服务端: order.json → 树形结构 title/key/children

- 前端: 拖动画面组件、拖动树形组件

- 交互操作:
  拖动画面组件 → 更新 json/通知 tree 组件
  拖动树形组件 → 更新 json/通知 Home 组件/RoomList
  如果拖动 roomItem → 更新房间的 Excel 文件/json

- 技术: react-dnd 对 react 组件做进一步封装

## 遇到的问题和疑问

**Q1: 团队合作如何做好响应式布局？样式冲突？**

**Q2: 函数式组件 ref 拿不到组件内部的函数，是否有方法让父组件在需要的时候去获取子组件的数据？**
**(消息发布订阅实现组件通信跟组件的渲染顺序有关)**

**Q3: Promise 异步操作用 await 接收，所有外层函数都需要用 async 标识？**

**Q4: 各个第三方模板版本冲突？**

**Q5: 定时器用到了 requestAnimationFrame，然后点击取消无法停止该函数的回调？**

## 项目总结

- bug: 同一个组件原地拖拽还是会走流程，设置 Index 判断会报错

- 不足:
  背景色目前只修改了顶层 DIV，各个组件的还没改
  react-dnd 不支持触摸屏，应该改用 react-beautiful-dnd

# 使用方法

1.服务端

```javascript
npm install //安装依赖
node app.js //运行
```

2.打开客户端

```javascript
npm install //安装依赖
npm run start //运行
```

# 演示效果

![酒店配置效果展示](readme/酒店配置效果展示.gif)
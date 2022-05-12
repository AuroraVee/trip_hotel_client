import React from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { useRef } from 'react'

const MovableItem = ({
  index,
  moveCardHandler,
  children,
  name,
  type = 'column',
}) => {
  const ref = useRef(null)

  const [{ isOver }, drop] = useDrop({
    accept: type,
    drop: () => ({ name, index, type }), //接收容器暴露给拖拽对象的属性
    hover(item, monitor) {
      //将项目悬停在组件上时调用。
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      // Time to actually perform the action
      //moveCardHandler(dragIndex, hoverIndex)
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })

  const [{ isDragging }, drag] = useDrag({
    item: { index, type, name },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      //获取拖拽对象所处容器的数据

      if (dropResult) {
        const { index } = dropResult
        // if (item.name === name) {
        //   return
        // }
        //放下拖拽对象后，重新调整数据所在的列，从而引起页面变化
        // if (item.index === index) {
        //   return
        // }
        moveCardHandler(item.index, index)
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0.4 : 1
  //调整样式

  const getBackgroundColor = () => {
    if (isOver) {
      return 'rgb(188,251,255)'
    } else {
      return ''
    }
  }

  drag(drop(ref))

  return (
    <div
      ref={ref}
      className="movable-item"
      style={{ opacity, backgroundColor: getBackgroundColor() }}
    >
      {children}
    </div>
  )
}

export default MovableItem

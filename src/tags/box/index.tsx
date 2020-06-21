import * as React from "react"
import './index.less'
class Box extends React.Component {
  props: {
    style: any,
    attr: any,
    event: any,
    targetKey: any,
    active: boolean,
    onClick: any,
    onDrag: any,
    onDragStart: any,
    resizeKey: any,
    canResize:any,
    setResizeKey: any
  }
  tagBoxNode: any
  render() {
    const {
      style,
      attr,
      event,
      targetKey,
      active,
      onClick,
      onDrag,
      onDragStart,
      resizeKey,
      canResize,
      setResizeKey
    } = this.props
    let subAttr = JSON.parse(JSON.stringify(attr)) // deep
    delete subAttr.style // 删除这个属性
    delete subAttr.label // 删除这个属性
    return <div
      id={targetKey}
      ref={(node) => { this.tagBoxNode = node }}
      className={active ? 'fast-ui-box-active' : 'fast-ui-box'}
      onMouseMove={ // 鼠标移动到右下显示 nwse-resize
        (e) => {
          let { left, top } = this.tagBoxNode.getBoundingClientRect()
          if (active &&
            e.pageX >= parseInt(style.width) + left - 5 &&
            e.pageX <= parseInt(style.width) + left + 5 &&
            e.pageY >= parseInt(style.height) + top - 5 &&
            e.pageY <= parseInt(style.height) + top + 5
          ) {
            setResizeKey(targetKey) // 设置这个组件可调整大小
          } else {
            !canResize && setResizeKey(null) // 关闭, 正在调整不能关闭
          }
        }
      }
      style={{
        left: parseInt(style.left) - 1,
        top: parseInt(style.top) - 1,
        width: parseInt(style.width) + 2,
        height: parseInt(style.height) + 2,
        zIndex: style['z-index'],
        cursor: resizeKey === targetKey ? 'nwse-resize' : 'move'
      }}
      onClick={
        (e) => {
          e.stopPropagation()
          onClick(targetKey)
        }
      }
    >
      <div
        key={Math.random()}
        style={style}
        {...subAttr}
        {...event}
        draggable={resizeKey !== targetKey}
        onDrag={
          (event) => {
            onDrag(event, targetKey)
          }
        }
        onDragStart={
          (event) => {
            onDragStart(event, targetKey)
            event.dataTransfer.setData('data', JSON.stringify({
              key: targetKey,
              pageX: event.pageX,
              pageY: event.pageY
            }))
          }
        }>
        {attr.label}
      </div>
    </div>
  }
}
export {
  Box
}

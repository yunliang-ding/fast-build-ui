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
    onDragStart:any
  }
  render() {
    const { style, attr, event, targetKey, active, onClick, onDrag, onDragStart } = this.props
    let subAttr = JSON.parse(JSON.stringify(attr)) // deep
    delete subAttr.style // 删除这个属性
    delete subAttr.label // 删除这个属性
    return <div
      className={active ? 'fast-ui-box-active' : 'fast-ui-box'}
      style={{
        left: parseInt(style.left) - 1,
        top: parseInt(style.top) - 1,
        width: parseInt(style.width) + 2,
        height: parseInt(style.height) + 2,
        zIndex: style['z-index']
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
        draggable={true}
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

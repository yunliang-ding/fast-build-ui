import * as React from "react"
import './index.less'
class Box extends React.Component {
  props: {
    style: any,
    attr: any,
    event: any,
    targetKey: any,
    children: any,
    active: boolean,
    onClick: any
  }
  render() {
    const { style, attr, event, targetKey, children, active, onClick } = this.props
    return <div
      className={active ? 'fast-ui-box-active' : 'fast-ui-box'}
      style={{
        left: Number(style.left) - 1,
        top: Number(style.top) - 1,
        width: Number(style.width) + 2,
        height: Number(style.height) + 2
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
        {...attr}
        {...event}
        draggable={true}
        onDragStart={
          (event) => {
            event.dataTransfer.setData('data', JSON.stringify({
              key: targetKey,
              pageX: event.pageX,
              pageY: event.pageY
            }))
          }
        }>
        {children}
      </div>
    </div>
  }
}
export {
  Box
}

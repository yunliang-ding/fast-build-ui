import * as React from "react"
import { observer, inject } from 'mobx-react'
import './index.less'
@inject('UI', 'Html')
@observer
class Canvas extends React.Component {
  props: any
  appCanvasNode: any
  getCanvasStyle = () => {
    const { typeList } = this.props.UI
    let param = typeList.find(_item => _item.use)
    return param.style
  }
  render() {
    const { addTag, setTagPosition } = this.props.Html
    const style = this.getCanvasStyle()
    return <div
      ref={(node) => { this.appCanvasNode = node }}
      style={style}
      className='app-canvas'
      onDrop={
        (event) => {
          event.preventDefault()
          let { left, top } = this.appCanvasNode.getBoundingClientRect()
          let { pageX, pageY, key, component } = JSON.parse(event.dataTransfer.getData('data'))
          if (key === null) { // push
            const { style: { width, height } } = component
            addTag(component, event.pageX - left - (width / 2), event.pageY - top - (height / 2))
          } else {
            setTagPosition(key, event.pageX - pageX, event.pageY - pageY)
          }
        }
      } onDragOver={
        (ev) => {
          ev.preventDefault()
        }
      }
    >
      {this.props.children}
    </div>
  }
}
export {
  Canvas
}
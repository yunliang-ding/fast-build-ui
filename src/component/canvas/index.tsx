import * as React from "react"
import { observer, inject } from 'mobx-react'
import { toJS } from 'mobx'
import { DashedLine, DrawBox } from '../index'
import './index.less'
@inject('UI', 'Tags')
@observer
class Canvas extends React.Component {
  props: any
  appCanvasNode: any
  getCanvasStyle = () => {
    const { typeList } = this.props.UI
    let param = toJS(typeList).find(_item => _item.use)
    return param.style
  }
  render() {
    const {
      addTag,
      setTagPosition,
      clearActive,
      dashedLine,
      draw,
      startDraw,
      drawing,
      endDraw,
      resizeKey,
      canResize,
      setCanResize,
      resizeMoveing,
      resizeFinished
    } = this.props.Tags
    const style = this.getCanvasStyle()
    if (draw) {
      style.cursor = 'crosshair' // 开启划线
    }
    return <div
      ref={(node) => { this.appCanvasNode = node }}
      style={style}
      className='app-canvas'
      onClick={clearActive}
      onMouseDown={
        (event) => {
          let { left, top } = this.appCanvasNode.getBoundingClientRect()
          if (draw) {
            startDraw(event.pageX - left, event.pageY - top)
          }
          if(resizeKey){
            setCanResize(true)
          }
        }
      }
      onMouseMove={
        (event) => {
          let { left, top } = this.appCanvasNode.getBoundingClientRect()
          if (draw) {
            drawing(event.pageX - left, event.pageY - top)
          } else if (resizeKey && canResize) {
            resizeMoveing(resizeKey, event.pageX - left, event.pageY - top)
          }
        }
      }
      onMouseUp={
        (e) => {
          endDraw(e)
          let { left, top } = this.appCanvasNode.getBoundingClientRect()
          resizeFinished(resizeKey, e.pageX - left, e.pageY - top)
        }
      }
      onDrop={
        (event) => {
          event.preventDefault()
          let { left, top } = this.appCanvasNode.getBoundingClientRect()
          let { pageX, pageY, key, component } = JSON.parse(event.dataTransfer.getData('data'))
          if (key === null) { // push
            const { style: { width, height } } = component
            component.style.left = event.pageX - left - (width / 2)
            component.style.top = event.pageY - top - (height / 2)
            addTag(component)
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
      {
        dashedLine && <DashedLine style={dashedLine.style} key={dashedLine.key} />
      }
      {
        draw && <DrawBox />
      }
    </div>
  }
}
export {
  Canvas
}
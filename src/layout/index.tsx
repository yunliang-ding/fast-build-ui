import * as React from "react"
import './index.less'
import { Box } from '../tags/index'
import { observer, inject } from 'mobx-react'
import { toJS } from 'mobx'
import SplitPane from 'react-split-pane'
@inject('Html', 'Component')
@observer
class Layout extends React.Component {
  props: any
  siderMenu = () => {
    let component = toJS(this.props.Component)
    return Object.keys(component).map(key => {
      return <div
        className='app-sider-item'
        draggable={true}
        onDragStart={
          (event) => {
            event.dataTransfer.setData('data', JSON.stringify({
              key: null,
              pageX: event.pageX,
              pageY: event.pageY,
              component: component[key]
            }))
          }
        }
      >
        <i className='iconfont icon-cebianlan'></i>
        <div className='app-sider-item-name'>{component[key].name}</div>
      </div>
    })
  }
  render() {
    const { tags, addTag, setTagPosition } = this.props.Html
    return <div className='app-layout'>
      <SplitPane
        split="vertical"
        step={10}
        defaultSize='300px'
        minSize={40}
        maxSize='50%'
        onDragStarted={() => (document.body.style.cursor = 'col-resize')}
        onDragFinished={
          () => {
            document.body.style.cursor = 'auto'
          }
        }
      >
        <div className='app-layout-left'>
          <div className='app-sider'>
            {
              this.siderMenu()
            }
          </div>
          <div className='expand-toggle'>
            <i className='iconfont icon-jiantou2'></i>
          </div>
        </div>
        <div
          className='app-layout-right'
          onDrop={
            (event) => {
              event.preventDefault()
              let { pageX, pageY, key, component } = JSON.parse(event.dataTransfer.getData('data'))
              if (key === null) { // push
                addTag(component, event.pageX - pageX, event.pageY - pageY)
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
          {
            tags.map(item => {
              return <Box {...item} />
            })
          }
        </div>
      </SplitPane>
    </div>
  }
}
export {
  Layout
}
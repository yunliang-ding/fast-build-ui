import * as React from "react"
import './index.less'
import { Canvas, Console } from 'component'
import { Box } from '../tags/index'
import { observer, inject } from 'mobx-react'
import { toJS } from 'mobx'
import SplitPane from 'react-split-pane'
@inject('Html', 'Component', 'UI')
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
    const { tags, setTagActive } = this.props.Html
    const { expandToggle, expand } = this.props.UI
    return <div className='app-layout'>
      <SplitPane
        split="vertical"
        step={10}
        size={expand ? 300 : 40}
        minSize={40}
        maxSize={300}
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
          <div className='expand-toggle' onClick={expandToggle}>
            <i className={expand ? 'iconfont icon-icon-jiantouzuo' : 'iconfont icon-jiantou2'}></i>
          </div>
        </div>
        <div className='app-layout-right'>
          <Canvas>
            {
              tags.map(item => {
                return <Box {...item} onClick={
                  (key) => {
                    setTagActive(key)
                  }
                } />
              })
            }
          </Canvas>
          <Console placement='bottom' />
        </div>
      </SplitPane>
    </div>
  }
}
export {
  Layout
}
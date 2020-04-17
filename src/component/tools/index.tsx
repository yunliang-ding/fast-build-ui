import * as React from "react"
import { observer, inject } from 'mobx-react'
import './index.less'
@inject('Tags', 'UI')
@observer
class Tools extends React.Component {
  props: any
  render() {
    const { expandTools, expandToolsToggle } = this.props.UI
    const { setDraw } = this.props.Tags
    return <div className='app-tools' onClick={
      () => {
        expandToolsToggle()
      }
    }>
      <i className={expandTools ? 'iconfont icon-jia icon-jia-open' : 'iconfont icon-jia'} />
      {
        expandTools && <div className='app-tools-items' onClick={
          (e) => {
            e.stopPropagation()
          }
        }>
          <div className='app-tools-items-item' onClick={
            () => {
              setDraw()
            }
          }>
            <i className='iconfont icon-huizhi' />
          </div>
          <div className='app-tools-items-item' onClick={
            () => {
            }
          }>
            <i className='iconfont icon-remove' />
          </div>
          <div className='app-tools-items-item' onClick={
            () => {
            }
          }>
            <i className='iconfont icon-text' />
          </div>
        </div>
      }
    </div>
  }
}
export {
  Tools
}

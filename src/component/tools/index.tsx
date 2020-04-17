import * as React from "react"
import { observer, inject } from 'mobx-react'
import './index.less'
@inject('Tags')
@observer
class Tools extends React.Component {
  props: any
  render() {
    const { setDraw } = this.props.Tags
    return <div className='app-tools' onClick={
      () => {
        setDraw()
      }
    }>
      <i className='iconfont icon-jia' />
    </div>
  }
}
export {
  Tools
}

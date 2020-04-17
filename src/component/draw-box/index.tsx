import * as React from "react"
import { observer, inject } from 'mobx-react'
import './index.less'
@inject('Tags')
@observer
class DrawBox extends React.Component {
  props: any
  render() {
    const { drawStyle } = this.props.Tags
    return <div style={drawStyle} className='app-draw-box' key={drawStyle.key} />
  }
}
export {
  DrawBox
}

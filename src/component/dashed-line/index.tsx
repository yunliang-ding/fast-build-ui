import * as React from "react"
import './index.less'
class DashedLine extends React.Component {
  props: {
    style: any
  }
  render() {
    const { style } = this.props
    return <div style={style} className='dashed-line' />
  }
}
export {
  DashedLine
}

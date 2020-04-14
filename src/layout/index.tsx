import * as React from "react"
import './index.less'
import { Box } from '../tags/index'
import { observer, inject } from 'mobx-react'
@inject('Html')
@observer
class Layout extends React.Component {
  props: any
  render() {
    return <div
      className='app'
      onDrop={
        (event) => {
          event.preventDefault()
          let { pageX, pageY } = JSON.parse(event.dataTransfer.getData('data'))
          this.props.Html.setTagPosition(event.pageX - pageX, event.pageY - pageY)
        }
      } onDragOver={
        (ev) => {
          ev.preventDefault()
        }
      }
    >
      <Box {...this.props.Html.tags} />
    </div>
  }
}
export {
  Layout
}
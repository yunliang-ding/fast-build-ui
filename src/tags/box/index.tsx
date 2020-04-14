import * as React from "react"
class Box extends React.Component {
  props: { style: any; attr: any; event: any; key: any; children: any }
  render() {
    const { style, attr, event, key, children } = this.props
    return <div key={Math.random()} style={style}  {...attr} {...event} draggable={true} onDragStart={
      (event) => {
        event.dataTransfer.setData('data', JSON.stringify({
          key,
          pageX: event.pageX,
          pageY: event.pageY
        }))
      }
    }>
      {children}
    </div>
  }
}
export {
  Box
}

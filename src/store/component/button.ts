class Button {
  name: string
  style: any
  attr: any
  event: any
  children: any
  constructor() {
    this.name = '按钮'
    this.children = 'Button'
    this.style = {
      color: '#fff',
      background: '#1890ff',
      width: 100,
      height: 40,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'fixed',
      fontSize: 12,
      left: 0,
      top: 0 
    }
    this.attr = {
      className: 'yui-btn'
    }
    this.event = {
      onClick: () => {
        console.log(1234)
      }
    }
  }
}
const button = new Button()
export {
  button
}

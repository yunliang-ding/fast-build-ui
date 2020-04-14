import { observable, action, useStrict, toJS } from 'mobx'
useStrict(true)
class Html {
  @observable tags = {
    style: {
      color: '#fff',
      background: '#1890ff',
      width: 100,
      height: 40,
      left: '0',
      top: '0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      fontSize: 12
    },
    key: Math.random(),
    attr: {
      className: 'yui-btn'
    },
    event: {
      onClick: () => {
        console.log(1234)
      }
    },
    children: 'hello world!'
  }

  @action setTagPosition = (left, top) => {
    this.tags.style.left = parseInt(this.tags.style.left) + left + 'px'
    this.tags.style.top = parseInt(this.tags.style.top) + top + 'px'
    this.tags = {...this.tags} // render
  }
}
const html = new Html()
export {
  html
}

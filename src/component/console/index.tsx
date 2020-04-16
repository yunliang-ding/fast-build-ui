import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { MonacoEdit } from '../index'
import './index.less'
const mapping = {
  'style': '样式',
  'attr': '属性',
  'event': '事件'
}
@inject('UI')
@observer
class Console extends React.Component {
  props: any
  state = {
    tab: 'style',
    tabList: ['style', 'attr', 'event'],
    code: '',
    language: ''
  }
  constructor(props) {
    super(props)
    this.state.code = props.style.code
    this.state.language = props.style.language
  }
  render() {
    const { tabList, tab } = this.state
    const { expandConsoleToggle, expandConsole } = this.props.UI
    return <div className='app-console' style={{
      bottom: expandConsole ? 0 : -300
    }}>
      <div className='app-console-expand' onClick={expandConsoleToggle}>
        <i className={expandConsole ? 'iconfont icon-xialadown' : 'iconfont icon-xiala1'}></i>
      </div>
      <div className='app-console-header'>
        {
          tabList.map(item => {
            return <div
              className={item === tab ? 'app-console-header-item-active' : 'app-console-header-item'}
              onClick={
                () => {
                  this.setState({
                    tab: item,
                    code: this.props[item].code,
                    language: this.props[item].language
                  })
                }
              }
            >
              {mapping[item]}
            </div>
          })
        }
      </div>
      <div className='app-console-code'>
        <MonacoEdit
          options={{
            theme: 'vs-dark',
            language: this.state.language,
            value: this.state.code
          }}
        />
      </div>
    </div>
  }
}
export {
  Console
}
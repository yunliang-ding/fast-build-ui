import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { MonacoEdit } from '../index'
import './index.less'
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
    return <div className='app-console'>
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
              {item}
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
import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { MonacoEdit } from '../index'
import './index.less'
const parse = require('style-to-object')
const toStyleString = require('to-style').string
const mapping = {
  'style': 'Element',
  'attr': 'Attribute',
  // 'event': 'Event'
}
const mappingLanguage = {
  'style': 'css',
  'attr': 'json',
  'event': 'javascript'
}
@inject('UI', 'Tags')
@observer
class Console extends React.Component {
  props: any
  state = {
    tab: 'style',
    tabList: ['style', 'attr']
  }
  constructor(props) {
    super(props)
  }
  stringifyCss = (cssObject) => {
    return 'element{\n\t' + toStyleString(cssObject).replace(new RegExp(';', 'g'), ';\n\t') + '\n}'
  }
  parseCss = (cssString) => {
    return parse(cssString.replace('{', '').replace('}', ''))
  }
  render() {
    const { tabList, tab } = this.state
    const { expandConsoleToggle, expandConsole } = this.props.UI
    const { tags, setTabValue } = this.props.Tags
    const tag = tags.find(item => {
      return item.active
    })
    let code = ''
    if (tag) {
      if (tab === 'style') {
        code = this.stringifyCss(tag[tab])
      } else if (tab === 'attr') {
        code = JSON.stringify(tag[tab], null, 2)
      } else if (tab === 'event') {
        code = JSON.stringify(tag[tab], null, 2).replace(/\"/g, '')
      }
    }
    return <div className='app-console' style={{
      bottom: expandConsole ? 0 : -300
    }}>
      <div className='app-console-expand' onClick={() => { expandConsoleToggle() }}>
        <i className={expandConsole ? 'iconfont icon-xialadown' : 'iconfont icon-xiala1'}></i>
      </div>
      <div className='app-console-header'>
        {
          tabList.map(item => {
            return <div
              className={item === tab ? 'app-console-header-item-active' : 'app-console-header-item'}
              onClick={
                () => {
                  if (item !== tab) {
                    this.setState({
                      tab: item
                    })
                  }
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
          theme='vs-dark'
          language={mappingLanguage[tab]}
          value={code}
          onChange={
            (value) => {
              try {
                let code = ''
                if (tab === 'style') {
                  code = this.parseCss(value.replace('element', ''))
                } else if (tab === 'attr') {
                  code = JSON.parse(value)
                }
                setTabValue(tab, code)
              } catch (e) {
                console.log('parseCss error', e)
              }
            }
          }
        />
      </div>
    </div>
  }
}
export {
  Console
}
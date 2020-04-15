import * as React from "react"
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'
import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution'
import './index.less'
const option: any = {
  selectOnLineNumbers: true,
  automaticLayout: true,
  fontSize: 12,
  tabSize: 2,
  minimap: {
    enabled: false
  }
}
class MonacoEdit extends React.Component {
  monacoNode: HTMLElement;
  props: any;
  constructor(props) {
    super(props)
  }
  init = (dom, options): void => {
    let editorMonaco = monaco.editor.create(dom, Object.assign(options, option))
    editorMonaco.onDidChangeModelContent(() => { // onChange 事件
      console.log(editorMonaco.getValue())
    })
  }
  componentDidMount() {
    this.init(this.monacoNode, this.props.options)
  }
  render() {
    return <div
      className={`app-monaco-editor`}
      ref={(node) => { this.monacoNode = node }}
    />
  }
}
export { MonacoEdit }
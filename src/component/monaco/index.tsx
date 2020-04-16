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
  editorMonaco: any
  constructor(props) {
    super(props)
  }
  componentWillReceiveProps(props) {
    monaco.editor.setModelLanguage(this.editorMonaco.getModel(), props.language)
    this.editorMonaco.setValue(props.value)
  }
  init = (dom, options): void => {
    this.editorMonaco = monaco.editor.create(dom, Object.assign(options, option))
    this.editorMonaco.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S, () => { // ctrl + s
      this.props.onChange(this.editorMonaco.getValue())
    })
  }
  componentDidMount() {
    this.init(this.monacoNode, { ...this.props })
  }
  render() {
    return <div
      className={`app-monaco-editor`}
      ref={(node) => { this.monacoNode = node }}
    />
  }
}
export { MonacoEdit }
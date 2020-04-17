import { observable, action, useStrict } from 'mobx'
useStrict(true)
class UI {
  @observable typeList = [{
    use: true, // 默认PC
    platform: 'pc',
    style: {}
  }, {
    use: true,
    platform: 'app',
    style: {
      width: 400,
      height: '80%',
      top: '10%',
      position: 'absolute',
      boxShadow: '0 0 5px 1px #131212',
      left: `calc(50% - 225px)`
    }
  }]
  @action setTypeList = (index, key, value) => {
    this.typeList[index][key] = value
  }
  @observable expand = true
  @action expandToggle = (expand?: boolean) => {
    this.expand = expand !== undefined ? expand : !this.expand
  }
  @observable expandConsole = false
  @action expandConsoleToggle = (expandConsole?: boolean) => {
    this.expandConsole = expandConsole !== undefined ? expandConsole : !this.expandConsole
  }
  @observable expandTools = true
  @action expandToolsToggle = (expandTools?: boolean) => {
    this.expandTools = expandTools !== undefined ? expandTools : !this.expandTools
  }
}
const ui = new UI()
export {
  ui
}

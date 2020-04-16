import { observable, action, useStrict, toJS } from 'mobx'
import { ui } from '../ui/index'
useStrict(true)
class Html {
  @observable tags = []
  @action addTag = (component:any, left, top) => {
    component.targetKey = Math.random()
    this.tags.push({...component})
    this.setTagPosition(component.targetKey, left, top)
  }
  @action setTagActive = (key) => {
    this.tags.forEach(item => {
      item.active = item.targetKey === key
    })
    ui.expandConsoleToggle(true) // 呼起调试控制台
    this.tags = [...this.tags] // render
  }
  @action clearActive = () => {
    this.tags.forEach(item => {
      item.active = false
    })
    ui.expandConsoleToggle(false) // 关闭调试控制台
    this.tags = [...this.tags] // render
  }
  @action setTabValue = (tab, value) => {
    let tag = this.tags.find(item => item.active)
    tag[tab] = value
    this.tags = JSON.parse(JSON.stringify(this.tags)) // render
  }
  @action setTagPosition = (key, left, top) => {
    let tag = this.tags.find(item => item.targetKey === key)
    tag.style.left = Number(tag.style.left) + left < 0 ? 0 : Number(tag.style.left) + left
    tag.style.top = Number(tag.style.top) + top < 0 ? 0 : Number(tag.style.top) + top
    this.tags = [...this.tags] // render
  }
}
const html = new Html()
export {
  html
}

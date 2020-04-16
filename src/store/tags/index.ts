import { observable, action, useStrict, toJS } from 'mobx'
import { ui } from '../ui/index'
useStrict(true)
class Tags {
  @observable tags = []
  @observable dashedLine: any = null
  @observable initDashedLine: any = {}
  @action setInitDashedLine = (x: number, y: number) => {
    this.initDashedLine.x = x
    this.initDashedLine.y = y
  }
  @action addTag = (component: any, left, top) => {
    component.targetKey = Math.random()
    this.tags.push({ ...component })
    this.setTagPosition(component.targetKey, left, top)
  }
  @action setTagActive = (key) => {
    let tag = this.tags.find(item => item.active)
    if (tag === undefined || tag.targetKey !== key) {
      this.tags.forEach(item => {
        item.active = item.targetKey === key
      })
      this.tags = [...this.tags] // render
    }
    ui.expandConsoleToggle(true) // 呼起调试控制台
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
    tag.style.left = parseInt(tag.style.left) + left < 0 ? 0 : parseInt(tag.style.left) + left
    tag.style.top = parseInt(tag.style.top) + top < 0 ? 0 : parseInt(tag.style.top) + top
    if (this.dashedLine != null) {
      this.dashedLine.style.top && (tag.style.top = this.dashedLine.style.top)
      this.dashedLine.style.left && (tag.style.left = this.dashedLine.style.left)
      this.dashedLine = null // clear
    }
    this.tags = [...this.tags] // render
  }
  @action setDashedLine = (x: number, y: number, key) => {
    let currentTag = this.tags.find(item => item.targetKey === key)
    this.tags.forEach(tag => {
      if (tag.style.top === y + (currentTag.style.top - this.initDashedLine.y) && key !== tag.targetKey) { // 显示水平方向测量
        this.dashedLine = {
          key: Math.random(),
          style:{
            top: tag.style.top,
            left: 0,
            width: '100%'
          }
        }
      }
    })
  }
}
const tags = new Tags()
export {
  tags
}

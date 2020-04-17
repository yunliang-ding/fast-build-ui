import { observable, action, useStrict, toJS } from 'mobx'
import { ui } from '../ui/index'
useStrict(true)
class Tags {
  @observable tags = []
  @observable dashedLine: any = null
  @observable initDashedLine: any = {}
  @observable draw: any = false
  @observable drawStyle: any = {}
  @action setDraw = (draw?: boolean) => {
    this.draw = draw !== undefined ? draw : !this.draw
  }
  @action setInitDashedLine = (x: number, y: number) => {
    this.initDashedLine.x = x
    this.initDashedLine.y = y
  }
  @action addTag = (component: any) => {
    component.targetKey = Math.random()
    this.tags.push({ ...component })
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
    this.tags.forEach(item => item.active = false)
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
          style: {
            top: tag.style.top,
            left: 0,
            width: '100%'
          }
        }
      }
      if (tag.style.left === x + (currentTag.style.left - this.initDashedLine.x) && key !== tag.targetKey) { // 显示垂直方向测量
        this.dashedLine = {
          key: Math.random(),
          style: {
            left: tag.style.left,
            top: 0,
            height: '100%'
          }
        }
      }
    })
  }
  @action startDraw = (x: number, y: number) => {
    if (this.draw) { // 设置初始位置
      this.drawStyle.left = x
      this.drawStyle.top = y
      this.drawStyle = { ...this.drawStyle } // render
    }
  }
  @action drawing = (x: number, y: number) => {
    if (this.draw) {
      this.drawStyle.width = Math.abs(x - this.drawStyle.left)
      this.drawStyle.height = Math.abs(y - this.drawStyle.top)
      this.drawStyle.key = Math.random()
    }
  }
  @action endDraw = () => {
    if (this.draw) {
      this.addTag({ // 开始生成一个tag
        style: {
          color: '#fff',
          background: '#333',
          width: this.drawStyle.width,
          height: this.drawStyle.height,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'fixed',
          fontSize: 12,
          left: this.drawStyle.left,
          top: this.drawStyle.top
        },
        attr: {
          className: 'yui-btn',
          label: 'Box'
        }
      })
      this.draw = false // 结束绘制
      this.drawStyle = {} // reset
    }
  }
}
const tags = new Tags()
export {
  tags
}

import { observable, action, useStrict, toJS } from 'mobx'
useStrict(true)
class Html {
  @observable tags = []
  @action addTag = (component:any, left, top) => {
    component.targetKey = Math.random()
    this.tags.push({...component})
    this.setTagPosition(component.targetKey, left, top)
  }
  @action setTagPosition = (key, left, top) => {
    let tag = this.tags.find(item => item.targetKey === key)
    tag.style.left = tag.style.left + left < 0 ? 0 : tag.style.left + left
    tag.style.top = tag.style.top + top < 0 ? 0 : tag.style.top + top
    this.tags = [...this.tags] // render
  }
}
const html = new Html()
export {
  html
}

class Compile{
  constructor(el, vm){
    this.$vm = vm
    this.$el = document.querySelector(el)
    // 获取所有的子元素
    this.$fragment = this.nodeToFragment(this.$el)
    this.compileElement(this.$fragment)
    this.$el.appendChild(this.$fragment)
  }
  nodeToFragment(el){
    let fragment = document.createDocumentFragment()
    let child
    while(child = el.firstChild){
      fragment.appendChild(child)
    }
    return fragment
  }
  compileElement(el){
    let childNodes = el.childNodes
    Array.from(childNodes).forEach(node=>{
      let text = node.textContent
      // 简单的正则匹配{{}}
      let reg = /\{\{(.*)\}\}/
      if(this.isElementNode(node)){
        // 如果是一个标签
        this.compile(node)
      }else if(this.isTextNode(node) && reg.test(text)){
        // 文本节点 并且包含{{}}
        this.compileText(node,RegExp.$1)
        // this.compileText(node,)
      }
      if(node.childNodes &&  node.childNodes.length){
        this.compileElement(node)
      }
    })
  }
  compileText(node, key){
    console.log('文本替换 并且可以收集依赖',node, key)
    this.text(node, this.$vm, key)
  }
  compile(node){
    let attrs = node.attributes
    Array.from(attrs).forEach(attr=>{
      const attrName = attr.name
      const key = attr.value
      if(this.isVueDirective(attrName)){
        // 是vue的属性
        console.log('vue的变量',attrName)
        // 过滤到k-
        // k-text
        // k-model
        // k-html
        const dir = attrName.slice(2)
        if(this[dir]){
          this[dir](node, this.$vm, key)
        }

      }
      if(this.isVueEvent(attrName)){
        console.log('vue的事件绑定',attrName)
        // @click ==> click
        let action = attrName.substring(1)
        this.eventHander(node, this.$vm, key, action)
        // 如果是绑定的事件
      }
    })
    // 标签比较复杂 在这里统一做
  }
  eventHander(node, vm, key, action){
    const fn = vm.$options.methods && vm.$options.methods[key]
    node.addEventListener(action, fn.bind(vm), false)
  }
  text(node, vm, key){
    this.update(node, vm, key ,'text')
  }

  html(node, vm, key){
    this.update(node, vm, key ,'html')
  }
  model(node, vm, key){
    this.update(node, vm, key ,'model')
    // 双向绑定  做数据修改
    node.addEventListener('input', e=>{
      const newValue = e.target.value
      vm[key] = newValue
    })

  }

  update(node, vm, key, dir){
      const fn = this[dir+"Updater"]
      fn && fn(node,vm[key])
      // 实际的更新操作
      // 自动添加依赖
      new Watcher(vm, key, value=>{
        fn && fn(node, value)
      })
  }

  textUpdater(node, value){
    node.textContent = value
  }
  htmlUpdater(node, value){
    node.innerHTML = value
  }
  modelUpdater(node, value){
    node.value = value
  }
  isVueDirective(name){
    return name.indexOf('k-')==0
  }
  isVueEvent(name){
    return name.indexOf('@')==0
  }
  isElementNode(node){
    return node.nodeType==1
  }
  isTextNode(node){
    return node.nodeType==3
  }
}
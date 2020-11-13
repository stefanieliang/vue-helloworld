class Compile {
  constructor(el, vm) {
    this.$el = document.querySelector(el);
    this.$vm = vm;
    // 获取所有子元素
    this.$fragment = this.nodeToFragment(this.$el);
    this.compile(this.$fragment);
    this.$el.appendChild(this.$fragment)
  }

  nodeToFragment(node) {
    let fragment = document.createDocumentFragment();
    let child;

    // 获取第一个节点 node.firstChild
    while (child = node.firstChild) {
      // appendChild 是转移，从 node 转移到 fragment
      fragment.appendChild(child)
    }
    // console.log('node', node)
    // console.log('fragment', fragment)
    return fragment;
  }

  compile(fragment) {
    // 获取 fragment.childNodes
    let childNodes = fragment.childNodes;
    Array.from(childNodes).forEach(node => {
      if (this.isElementNode(node)) {
        // 编译元素节点
        this.compileElement(node)
      } else if (this.isTextNode(node) && /\{\{(.*)\}\}/.test(node.textContent)) {
        // 编译文本节点
        this.compileText(node, RegExp.$1)
      }
      // 递归自调用
      if (node.childNodes && node.childNodes.length) {
        this.compile(node);
      }

    })
  }

  // 编译文本节点 {{xx}}
  compileText(node, key) {
    this.text(node, this.$vm, key)
  }

  // 编译元素节点 <div d-text="xx" @click="clickHandler"></div>
  compileElement(node) {
    // node.attributes 获取标签特性
    let attrs = node.attributes
    Array.from(attrs).forEach(attr => {
      let attrName = attr.name; // d-text @click
      let key = attr.value; // xx  clickHandler

      if (this.isVueDirective(attrName)) {
        let dir = attrName.substr(2) //text
        this[dir](node, this.$vm, key);

      } else if (this.isVueEvent(attrName)) {
        let action = attrName.substr(1) // click
        this.eventHandler(node, this.$vm, key, action)
      }
    })
  }

  // 处理元素指令  开始
  text(node, vm, key) {
    this.updater(node, vm, key, 'text')
  }

  html(node, vm, key) {
    this.updater(node, vm, key, 'html')
  }

  model(node, vm, key) {
    this.updater(node, vm, key, 'model')
    // 实现双向数据绑定
    node.addEventListener('input', e => {
      vm[key] = e.target.value
    }, false)
  }

  // 通知视图更新 && 自动收集依赖
  updater(node, vm, key, dir) {
    let fn = this[dir + 'Updater'];
    fn && fn(node, vm[key]);

    new Watcher(vm, key, value => {
      fn && fn(node, value)
    })
  }

  textUpdater(node, value) {
    node.textContent = value;
  }

  htmlUpdater(node, value) {
    node.innerHTML = value
  }

  modelUpdater(node, value) {
    node.value = value;
  }
  // 处理元素指令  结束


  // 处理事件
  eventHandler(node, vm, key, action) {
    let fn = vm.$options.methods && vm.$options.methods[key];
    node.addEventListener(action, fn.bind(vm), false)
  }

  isVueDirective(name) {
    return name.indexOf("d-") == 0
  }

  isVueEvent(name) {
    return name.indexOf("@") == 0
  }

  // nodeType == 1 是元素节点
  isElementNode(node) {
    return node.nodeType == 1;
  }

  // nodeType == 3 是文本节点
  isTextNode(node) {
    return node.nodeType == 3;
  }
}

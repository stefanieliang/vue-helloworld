class Compile {
  constructor(el, vm) {
    this.$el = document.querySelector(el);
    this.$vm = vm;
    // 获取所有子元素
    this.$fragment = this.nodeToFragment(this.$el);
    this.compileElement(this.$fragment);
    this.$el.appendChild(this.$fragment)
  }

  nodeToFragment(node) {
    let fragment = document.createDocumentFragment();
    let child;

    // 获取第一个节点 node.firstChild
    while (child = node.firstChild) {
      // append 是转移，从 node 转移到 fragment
      fragment.append(child)
    }
    // console.log('node', node)
    // console.log('fragment', fragment)
    return fragment;
  }

  compileElement(fragment) {
    // 获取 fragment.childNodes
    console.log(1)
    let childNodes = fragment.childNodes;
    Array.from(childNodes).forEach(node => {
      console.log(node, node.nodeType)
      if (this.isElementNode(node)) {
        // 编译元素节点
        this.compileElement(node)
      } else if (this.isTextNode(node)) {
        // 编译文本节点
        this.compileText(node)
      }

    })
  }
  compileElement(node) {

  }

  compileText(node) {

  }

  isElementNode(node) {
    // nodeType == 1 是元素节点
    return node.nodeType == 1;
  }

  isTextNode(node) {
    // nodeType == 3 是文本节点
    return node.nodeType == 3;
  }
}

class DVue {
  constructor(options) {
    this.$options = options;
    this.$data = options.data;
    this.$methods = options.methods

    this.observe(this.$data);
    // new Watcher();
    new Compile(options.el, this)
  }

  observe(data) {
    if (!data || typeof data !== 'object') {
      return
    }
    Object.keys(data).forEach(key => {
      this.proxyData(key)

      this.defineReactive(data, key, data[key])
    })
  }

  defineReactive(obj, key, value) {

    // 这里可以遍历对象
    this.observe(value);

    let dep = new Dep();
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        Dep.target && dep.addSubs(Dep.target)
        return value;
      },
      set(newVal) {
        if (newVal == value) {
          return
        }
        value = newVal;
        dep.notify()
      }
    })
  }

  proxyData(key) {
    Object.defineProperty(this, key, {
      enumerable: true,
      configurable: true,
      get() {
        return this.$data[key]
      },
      set(newVal) {
        this.$data[key] = newVal;
      }
    })
  }
}

// 依赖收集器
class Dep {
  constructor() {
    // 观察者 列表
    this.subs = []
    Dep.target = null;
  }

  // 添加观察者 watcher
  addSubs(sub) {
    console.log("依赖收集~~~")
    this.subs.push(sub)
  }

  // 通知依赖更新
  notify() {
    this.subs.forEach(v => {
      v.update()
    })
  }
}


// 监听器
class Watcher {
  constructor(vm, key, cb) {
    this.vm = vm;
    this.key = key;
    this.cb = cb;
    this.value = this.get()
  }
  get() {
    // 收集依赖
    Dep.target = this
    // 读数据了，自动收集了依赖
    let value = this.vm[this.key]
    Dep.target = null
    return value
  }
  update() {
    this.value = this.get()
    this.cb.call(this.vm, this.value)
  }
}

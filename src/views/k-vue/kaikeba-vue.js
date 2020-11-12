


// {{name}}
// {{2+1}}
// {{age*3}}
// {{age|filter}}
// 遍历 识别+ 识别* 识别|查找filter
// 依赖收集小朋友
class Dep{
  constructor(){
    // 里面都是监听器
    this.deps = []
  }
  addDep(dep){
    // 添加依赖
    
    this.deps.push(dep)
  }
  notify(){
    // 通知更新
    // console.log(this.deps)
    this.deps.forEach(dep=>{
      // 遍历
      // 执行更新函数
      dep.update()
    })
  }
}
Dep.target = null
// 监听器小朋友
class Watcher{
  constructor(vm, key, cb){
    this.vm = vm
    this.cb = cb
    this.key = key
    this.value = this.get()
    // Dep的target设置为监听器

  }
  get(){
    // 收集依赖
    Dep.target = this
    // 读数据了，自动收集了依赖
    let value = this.vm[this.key]
    Dep.target = null
    return value
  }
  update(){
    this.value = this.get()
    this.cb.call(this.vm, this.value)
    // 实际更新的函数
    // console.log('视图想更新~~ 监听器收到')
  }
}
class KVue{
  constructor(options){
    this.$options = options
    this.$data = options.data
    this.observer(this.$data)
    // new Watcher()
    // console.log('模拟render，出发name的getter',this,name)
    if(options.el){
      this.$compile = new Compile(options.el, this)
    }
    if(options.created){
      options.created.call(this)
    }
    // 设置$data数据在this上的依赖
  }
  observer(data){

    Object.keys(data).forEach(key=>{
      this.proxyData(key)
      this.defineReactive(data,key,data[key])
    })
  }
  defineReactive(obj, key, val){
    // 新建一个依赖
    // 每一个key一个依赖收集的小朋友
    const dep = new Dep()
    Object.defineProperty(obj,key,{
      get(){
        // 收集依赖 addDep
        // console.log('收集依赖')
        Dep.target && dep.addDep(Dep.target)
        return val
      },
      set(newVal){
        
        val = newVal
        // console.log('通知依赖去更新')
        dep.notify()
        // 通知依赖去更新
        // 依赖.notify
      }
    })
  }
  proxyData(key){
    Object.defineProperty(this, key,{
      get(){
        return this.$data[key]
      },
      set(val){
        this.$data[key] = val
      }
    })
  }
}
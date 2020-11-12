import Vue from 'vue'
import Main from './Main.vue'

Main.newInstance = props => {
  const Instance = new Vue({
    data () {
      return props || {}
    },
    render (h) {
      return h(Main)
    }

  })

  const comp = Instance.$mount()
  document.body.appendChild(comp.$el)

  const main = Instance.$children[0]

  return {
    add (options) {
      main.add(options)
    }
  }
}

export default Main

import main from './src/main'

let instance

function getInstance () {
  instance = instance || main.newInstance()
  return instance
}

function info (options) {
  const ins = getInstance()
  ins.add(options)
}

export default {
  info
}

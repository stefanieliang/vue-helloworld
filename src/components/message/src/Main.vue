<!-- 提示框 -->
<template>
  <div role="alert">
    <div class="container" v-for="item in messages" :key="item.id">
      <div class="icon">+{{ item.id }}</div>
      <div class="content">{{ item.content }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return { messages: [] }
  },

  created () {
    this.id = 0
  },

  methods: {
    add (options) {
      const id = 'id_' + this.id++
      this.messages.push({ ...options, id: id })
      const { duration, content } = options
      const timer = setTimeout(() => {
        this.del(this.id)
      }, duration)
    },
    del (id) {
      const array = [...this.messages]
      for (let index = 0; index < array.length; index++) {
        const element = array[index]
        if (element.id === id) {
          this.messages.splice(index, 1)
        }
      }
    }
  }
}
</script>
<style lang='less' scoped>
</style>

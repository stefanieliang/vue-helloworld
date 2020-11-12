<!-- 自定义消息弹框 -->
<template>
  <div>
    <button @click="handelClick">消息</button> |
    <button @click="handelMessage">message</button> |
  </div>
</template>

<script>
export default {
  components: {},

  data() {
    return {};
  },

  computed: {},

  methods: {
    // [自定义组件]消息弹框
    handelClick() {
      this.$notice.info({
        duration: 60 * 60,
        content: "消息",
      });
    },
    // [自定义组件]消息弹框
    handelMessage() {
      this.$message.info({
        duration: 2,
        content: "消息",
      });
    },
  },
};
</script>
<style lang='less' scoped>
</style>

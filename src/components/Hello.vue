<template>
  <div>
    <button @click="helloHandler">say hi</button>
    <button @click="waHandler">say wa</button>
    <br />
    {{ content }}
    <slot name="other"></slot>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  // 必须有 name
  name: "hello",
  props: {
    content: {
      type: String,
      default: "Hello",
    },
  },
  methods: {
    helloHandler(e) {
      this.$emit("hello", e);
    },
    waHandler(e) {
      this.$emit("wa", e);
    },
  },
};
</script>

<!-- create api 弹框 -->
<template>
  <div><button @click="showHello">show hello</button> |</div>
</template>

<script>
export default {
  components: {},

  data() {
    return {};
  },

  computed: {},

  methods: {
    // createAPI
    showHello() {
      // 直接调用
      // 传入配置对象，默认传入的所有对象全部当作 props 传入组件
      // 除了在调用 createAPI 时传入了 events ,这里对应的就是
      // on{event name}会被当做时间回调处理
      const instance = this.$createHello(
        {
          content: "这是我的 hello 组件",
          onHello(e) {
            console.log("点击了 我的 hello 组件 say hi", e);
          },
          onWa(e) {
            console.log("点击了 我的 hello 组件 say wa", e);
          },
        },

        (creatElement) => {
          return [
            creatElement(
              "p",
              {
                slot: "other",
              },
              "other content"
            ),
          ];
        }
      );

      console.log("instance,,", instance);

      // 通过 Vue 组件的 $on 也是可以监听的，看使用场景
      instance.$on("hello", (e) => {
        const $dialog = this.$createDialog({
          type: "confirm",
          content: "点击确定关闭当前实例",
          icon: "cubeic-alert",
        });

        $dialog.show();

        $dialog
          .$on("confirm", () => {
            // 销毁实例
            instance.remove();
          })
          .$on("cancel", () => {
            console.log("cancel");
          });
      });
    },
  },
};
</script>
<style lang='less' scoped>
</style>

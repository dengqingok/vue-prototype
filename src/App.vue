<template>
  <ul class='rootApp'>

    <!-- 主界面 -->
    <li class='ui-main'>
      <router-view></router-view>
    </li>

    <!-- 弹框界面 -->
    <li class='ui-dialog'>
      <div class="view shade">
        <!-- 统一遮罩 -->
      </div>
      <div class="view" v-for='(dialog,index) in $store.state.dialogs' :key="index">
        <component v-bind:is="all_dialog[dialog.id]" v-bind:data="dialog.data"></component>
      </div>
    </li>

  </ul>
</template>
<script>
// 引入弹框页面
import dialogs from "./htmls/lazy-load-dialog";

export default {
  data() {
    return {
      // 全部弹框
      all_dialog: dialogs
    };
  },
  components: dialogs
};
</script>
<style lang="scss" scoped>
.rootApp {
  // 弹框界面
  & > .ui-dialog {
    & > .view {
      position: fixed;
      left: 0;
      top: 0;
      width: 100vw;
      height: 100vh;
      z-index: 1;
      &:last-child {
        z-index: 3;
      }
      &.shade {
        z-index: 2;
        background-color: rgba(0, 0, 0, 0.4);
        &:first-child:last-child {
          display: none;
        }
      }
    }
  }
}
</style>

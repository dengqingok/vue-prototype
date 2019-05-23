<template>
  <div class="tradesys-view">
      主界面
  </div>
</template>
<script>
export default {
  beforeCreate() {
    // 如果没有登录，返回登录页面
    if (!this.$store.state.islogin) {
      this.$router.push({ path: "/login" });
    }
  }
};
</script>

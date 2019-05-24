<template>
    <div class="login-view">
        <form autocomplete="off" name="loginForm" v-transfer>
            <div>
                <label for="username" v-input-check="[username,'required']">
                    用户名
                </label>
                <input type="text" v-model="username" @keypress.enter="$nextFocus($event.target)" name='username' id='username' autocomplete="off">
            </div>
            <div>
                <label for="password" v-input-check="[password,'required']">
                    密码
                </label>
                <input type="password" v-model="password" @keypress.enter="$nextFocus($event.target)" name='password' id='password' autocomplete="off">
            </div>
            <input type="button" @click="doLogin" value="登录" class='btn_submit'>
        </form>
    </div>
</template>
<script>
// 引入store管理方法
import { update_store_state, clean_store_state } from "../service/store";

import '../style/login.scss';

export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  created() {
    clean_store_state();
  },
  methods: {
    // 登录提交
    doLogin() {
      // 获取表单错误信息获取对象
      let ERROR = this.$error("loginForm");
      // 使用错误对象判断表单是否合法
      if (!ERROR.isValiadte()) {
        let first = ERROR.first();
        this.alert(first.$error, "校验失败", function() {
          first.$el.focus();
        });
      } else {
        this.$store.state.islogin = true;
        this.$router.push({ path: "/trade" });

        // 更新数据
        update_store_state();

        this.alert("欢迎您，游客！");
      }
    }
  }
};
</script>

<template>
    <div class="trade-view">
        <div class="pages">
            <div class="page" v-if='nav.page==1'>
                <!-- 录入页面 -->
                <form name="inputForm" v-transfer autocomplete="off">
                    <ul class="shift-nav">
                        <li @click='nav.shift=1' :class="{ active:nav.shift==1}">基本信息</li>
                        <li @click='nav.shift=2' :class="{ active:nav.shift==2}">订单信息</li>
                        <li @click='nav.shift=3' :class="{ active:nav.shift==3}">补充内容</li>
                    </ul>
                    <div class='shifts'>
                        <!-- 碎片页面一 -->
                        <div class="shift" v-show='nav.shift==1'>

                            <ul class="item-nav">
                                <li @click='nav.item=1' :class="{ active:nav.item==1}">身份信息</li>
                                <li @click='nav.item=2' :class="{ active:nav.item==2}">会员信息</li>
                            </ul>
                            <div class="items">
                                <!-- 块一 -->
                                <div class="item" v-show='nav.item==1'>

                                    <div class="container">
                                        <div class="row">
                                            <div class="col-lg-3 col-md-4 col-sm-6">
                                                <label>
                                                    姓名
                                                </label>
                                                <input type="text" name="姓名" v-model='params.name' @keypress.enter="$nextFocus($event.target)" v-input-check="[params.name,'required']">
                                            </div>
                                            <div class="col-lg-3 col-md-4 col-sm-6">
                                                <label>
                                                    性别
                                                </label>
                                                <input type="text" name="性别" @keypress.enter="$nextFocus($event.target)">
                                            </div>
                                            <div class="col-lg-3 col-md-4 col-sm-6">
                                                <label>
                                                    身份证号
                                                </label>
                                                <input type="text" name="身份证号" v-model='params.idCard' @keypress.enter="$nextFocus($event.target)" v-input-check="[params.idCard,'required']">
                                            </div>
                                            <div class="col-lg-3 col-md-4 col-sm-6">
                                                <label>
                                                    居中城市
                                                </label>
                                                <input type="text" name="居中城市" @keypress.enter="$nextFocus($event.target)">
                                            </div>
                                            <div class="col-lg-3 col-md-4 col-sm-6">
                                                <label>
                                                    职业
                                                </label>
                                                <input type="text" name="职业" @keypress.enter="$nextFocus($event.target)">
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <!-- 块二 -->
                                <div class="item" v-show='nav.item==2'>

                                    <div class="container">
                                        <div class="row">
                                            <div class="col-lg-3 col-md-4 col-sm-6">
                                                <label>
                                                    会员卡号
                                                </label>
                                                <input type="text" name="会员卡号" v-model='params.cardNum' @keypress.enter="$nextFocus($event.target)" v-input-check="[params.cardNum,'required']">
                                            </div>
                                            <div class="col-lg-3 col-md-4 col-sm-6">
                                                <label>
                                                    注册时间
                                                </label>
                                                <input type="text" name="注册时间" @keypress.enter="$nextFocus($event.target)">
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                        <!-- 碎片页面二 -->
                        <div class="shift" v-show='nav.shift==2'>

                            <ul class="item-nav">
                                <li @click='nav.item=1' :class="{ active:nav.item==1}">第一页</li>
                                <li @click='nav.item=2' :class="{ active:nav.item==2}">第二页</li>
                            </ul>
                            <div class="items">
                                <!-- 块一 -->
                                <div class="item" v-show='nav.item==1'>

                                    <div class="container">
                                        <div class="row">
                                            <div class="col-lg-3 col-md-4 col-sm-6">
                                                <label>
                                                    订单编号
                                                </label>
                                                <input type="text" name="订单编号" v-model='params.orderNumber' @keypress.enter="$nextFocus($event.target)" v-input-check="[params.orderNumber,'required']">
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <!-- 块二 -->
                                <div class="item" v-show='nav.item==2'>

                                    <div class="container">
                                        <div class="row">
                                            <div class="col-lg-3 col-md-4 col-sm-6">
                                                <label>
                                                    预留手机号码
                                                </label>
                                                <input type="text" name="预留手机号码" v-model='params.phone' @keypress.enter="$nextFocus($event.target)" v-input-check="[params.phone,'required']">
                                            </div>
                                            <div class="col-lg-3 col-md-4 col-sm-6">
                                                <label>
                                                    备注
                                                </label>
                                                <input type="text" name="备注" @keypress.enter="$nextFocus($event.target)">
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                        <!-- 碎片页面三 -->
                        <div class="shift" v-show='nav.shift==3'>
                            <div class="container">
                                <div class="row">
                                    <div class="col-lg-3 col-md-4 col-sm-6">
                                        <label>
                                            补充一
                                        </label>
                                        <input type="text" name="补充一" @keypress.enter="$nextFocus($event.target)">
                                    </div>
                                    <div class="col-lg-3 col-md-4 col-sm-6">
                                        <label>
                                            补充二
                                        </label>
                                        <input type="text" name="补充二" @keypress.enter="$nextFocus($event.target)">
                                    </div>
                                    <div class="col-lg-3 col-md-4 col-sm-6">
                                        <label>
                                            补充三
                                        </label>
                                        <input type="text" name="补充三" @keypress.enter="$nextFocus($event.target)">
                                    </div>
                                    <div class="col-lg-3 col-md-4 col-sm-6">
                                        <label>
                                            补充四
                                        </label>
                                        <input type="text" name="补充四" @keypress.enter="$nextFocus($event.target)">
                                    </div>
                                    <div class="col-lg-3 col-md-4 col-sm-6">
                                        <label>
                                            补充五
                                        </label>
                                        <input type="text" name="补充五" @keypress.enter="$nextFocus($event.target)">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="btn-list">
                        <button type="button" class="btn btn_submit" @click="doSubmit">提 交</button>
                        <button type="button" class="btn btn_exit" @click="exit">退 出</button>
                    </div>
                </form>
            </div>
            <div class="page" v-if='nav.page==2'>
                <!-- 结果页面 -->
                <div class="btn-list">
                    <button type="button" class="btn btn_exit" @click="nav.page=1;nav.shift=1;nav.item=1">返 回</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import "../style/trade.scss";

export default {
  data() {
    return {
      // 导航参数
      nav: {
        page: 1,
        shift: 1,
        item: 1
      },
      // 请求参数
      params: {},
      // 交易结果数据
      result: {}
    };
  },
  methods: {
    // 提交
    doSubmit() {
      let ERROR = this.$error("inputForm");
      let _this = this;
      if (!ERROR.isValiadte()) {
        let first = ERROR.first();
        this.alert(first.$error, "温馨提示", function() {
          _this.$toFocus(first.$el);
        });
      } else {
        this.nav.page = 2;
      }
    },
    // 退出
    exit() {
      let _this = this;
      this.confirm("危险操作", "您确定退出系统吗？", function() {
        _this.$router.push({ path: "/login" });
      });
    }
  },
  beforeCreate() {
    // 如果没有登录，返回登录页面
    if (!this.$store.state.islogin) {
      this.$router.push({ path: "/login" });
    }
  }
};
</script>

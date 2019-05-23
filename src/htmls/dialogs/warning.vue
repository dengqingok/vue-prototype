<template>
    <div class="warning">
        <h2>
            {{data[2]}}
            <span @click="$store.state.closeDialog()">X</span>
        </h2>
        <div>
            <div class='content'>
                {{data[1]}}
            </div>
            <div class='btlist'>
                <input type="button" class='yes' :value="data[3]" @click="$store.state.closeDialog('yes')">
                <input type="button" class='no' :value="data[4]" @click="$store.state.closeDialog('no')" v-if='data[0]=="confirm"'>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  props: ["data"]
};
</script>
<style lang="scss" scoped>
.warning {
  width: 4.2rem;
  margin: auto;
  margin-top: 15%;

  & > h2 {
    background-color: #795548;
    line-height: 0.38rem;
    padding-left: 0.2rem;
    color: #fff;
    border-radius: 0.05rem 0.05rem 0 0;
    font-size: 0.12rem;
    position: relative;
    & > span {
      position: absolute;
      right: 0.2rem;
      font-size: 0.2rem;
      cursor: pointer;
    }
  }
  & > div {
    background-color: #fff;
    border-radius: 0 0 0.05rem 0.05rem;
    line-height: 0.2rem;
    & > div {
      padding: 0.15rem;
      &.content {
        color: #777;
        font-size: 0.12rem;
        max-height: 2rem;
        overflow: auto;
      }
      &.btlist {
        padding-top: 0;
        text-align: right;
        margin-top: 0.1rem;
        & > input {
          width: 0.9rem;
          height: 0.24rem;
          line-height: 0.24rem;
          text-align: center;
          color: #fff;
          border: 0;
          cursor: pointer;
          margin-left: 0.1rem;
          &.no {
            background: #8f6f65;
          }
          &.yes {
            background: #795548;
          }
        }
      }
    }
  }
}
</style>

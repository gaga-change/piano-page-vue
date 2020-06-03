<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
@import url("./public.less");
// 按钮连接
.btn-link {
  color: rgb(51, 153, 234);
  background-color: initial !important;
  text-decoration: none;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  transition: color 0.3s;
  padding: 0;
  border: none;
  margin: 0;

  &[disabled="disabled"] {
    color: #c0c4cc !important;
    cursor: not-allowed !important;
  }
  &:hover {
    color: rgb(3, 138, 248);
  }
}
</style>

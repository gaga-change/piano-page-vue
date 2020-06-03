<template>
  <div v-show="show" class="Empty">
    <span class="iconfont icon-empty" slot="icon" />
    <span class="hint">{{ hint || "暂无数据" }}</span>
  </div>
</template>

<script>
export default {
  props: {
    show: Boolean,
    hint: String
  }
};
</script>

<style lang="less">
.Empty {
  padding: 20px 0;
  text-align: center;
  span.iconfont {
    font-size: 32px;
    color: #909399;
  }
  .hint {
    display: block;
    width: 100%;
    text-align: center;
    font-size: 12px;
    margin: 8px 0px;
  }
}
</style>

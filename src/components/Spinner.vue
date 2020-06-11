<template>
  <div v-if="show" class="SpinnerComponent">
    <mt-spinner type="fading-circle"></mt-spinner>
    <div class="f12 hint mt5">
      加载中....
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: Boolean
  }
};
</script>
<style lang="less">
.SpinnerComponent {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  .hint {
    text-align: center;
    width: 100%;
  }
}
</style>

<template>
  <div>
    <mt-tab-container v-model="active">
      <mt-tab-container-item id="form">
        <mt-cell v-for="n in 10" title="tab-container 1" :key="n"></mt-cell>
      </mt-tab-container-item>
      <mt-tab-container-item id="list">
        <mt-cell v-for="n in 5" title="tab-container 2" :key="n"></mt-cell>
      </mt-tab-container-item>
    </mt-tab-container>
    <mt-tabbar v-model="active">
      <mt-tab-item id="form">
        <span class="iconfont icon-bianxie" slot="icon" />
        请假
      </mt-tab-item>
      <mt-tab-item id="list">
        <span class="iconfont icon-liebiao" slot="icon" />
        请假记录
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: "tab-container1"
    };
  }
};
</script>

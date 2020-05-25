<template>
  <div>
    邀请学生二维码
    <div v-if="qrcodeUrl">
      <img :src="qrcodeUrl" alt="" style="width: 100px" />
    </div>
  </div>
</template>
<script>
import { teacherSelfCode } from "@/api";
export default {
  data() {
    return {
      qrcodeUrl: ""
    };
  },
  created() {
    teacherSelfCode().then(res => {
      if (!res) return;
      this.qrcodeUrl = res.student;
    });
  }
};
</script>

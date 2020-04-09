<template>
  <div class="TeacherForm">
    <!-- <mt-header title="资料填写"></mt-header> -->
    <mt-field
      label="姓名"
      placeholder="请输入姓名"
      v-model="formData.name"
    ></mt-field>
    <mt-field
      label="手机号"
      placeholder="请输入手机号"
      type="tel"
      v-model="formData.phone"
    ></mt-field>
    <mt-field
      label="学校"
      placeholder="请输入学校"
      v-model="formData.school"
    ></mt-field>
    <mt-field
      label="专业"
      placeholder="请输入专业"
      v-model="formData.major"
    ></mt-field>
    <div class="btn-area mt20">
      <mt-button type="primary">提 交</mt-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TeacherForm",
  components: {},
  created() {
    document.title = "资料填写";
  },
  data() {
    return {
      formData: {
        name: "",
        phone: "",
        school: "",
        major: ""
      }
    };
  }
};
</script>
<style lang="less">
.TeacherForm {
  padding: 15px;
  .btn-area {
    button {
      width: 100%;
    }
  }
}
</style>

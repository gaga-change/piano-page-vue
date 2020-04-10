<template>
  <div class="TeacherRegister">
    <div class="info" v-if="!loading && !showForm">
      <template v-if="teacher.status === 0">
        <img src="@/assets/img/warning.png" alt="" />
        <p>正在审核您的资料中...</p>
      </template>
      <template v-else>
        <img src="@/assets/img/success.png" alt="" />
        <p>资料已审核通过</p>
      </template>
      <!-- <img src="../" alt=""> -->
    </div>
    <div class="TeacherForm" v-if="showForm">
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
        <mt-button type="primary" @click.native="submit">提 交</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import { teachersList, teacherRegister } from "@/api";
import { Indicator } from "mint-ui";

export default {
  name: "TeacherRegister",
  components: {},
  data() {
    return {
      formData: {
        name: "",
        phone: "",
        school: "",
        major: ""
      },
      loading: true,
      showForm: false,
      teacher: {}
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.loading = true;
      this.showForm = false;
      this.teacher = {};
      Object.keys(this.formData).forEach(key => {
        this.formData[key] = "";
      });
      Indicator.open();
      /*
    1. 查询是否已注册 
      已注册 - 通过审核
      已注册 - 为通审核
      已注册 - 审核被拒
    */
      const openid = this.$store.state.openid;
      teachersList({ openid }).then(res => {
        Indicator.close();
        this.loading = false;
        if (!res) return;
        if (res.list.length !== 0) {
          const teacher = res.list[0];
          this.teacher = teacher;
          if (teacher.status === 0) {
            // 待审核
          } else if (teacher.status === 1) {
            // 已通过
          } else {
            // 拒绝 重新提交
            this.showForm = true;
          }
        } else {
          // 未提交
          this.showForm = true;
        }
      });
    },
    submit() {
      const params = { ...this.formData };
      params.openid = this.$store.state.openid;
      if (!params.name) {
        this.$toast("请输入姓名");
      } else if (!params.phone) {
        this.$toast("请输入手机号码");
      } else {
        if (this.teacher._id) {
          params._id = this.teacher._id;
        }
        this.$indicator.open();
        teacherRegister(params).then(res => {
          this.$indicator.close();
          if (!res) return;
          this.teacher = res;
          this.showForm = false;
          // this.init();
        });
      }
    }
  },
  beforeDestroy() {
    Indicator.close();
  }
};
</script>
<style lang="less">
.TeacherRegister {
  padding: 15px;
  .info {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align-content: center;
    p {
      width: 100%;
      text-align: center;
    }
  }
  .btn-area {
    button {
      width: 100%;
    }
  }
}
</style>

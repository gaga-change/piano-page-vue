<template>
  <div class="StudentRegister">
    <div class="bg"></div>
    <div>
      <!-- 头部 -->
      <div class="title-area">
        <img
          class="left-img"
          src="@/assets/img/student/register/leftgaga.png"
          alt=""
        />
        <h2>恭喜您！</h2>
        <img
          class="right-img"
          src="@/assets/img/student/register/leftgaga.png"
          alt=""
        />
      </div>
      <!-- 中间 -->
      <div></div>
    </div>
    <div class="info" v-if="!loading && !showForm">
      <template v-if="student.status === 0">
        <img src="@/assets/img/warning.png" alt="" />
        <p>正在审核您的资料中...</p>
      </template>
      <template v-else>
        <img src="@/assets/img/success.png" alt="" />
        <p>资料已审核通过</p>
      </template>
      <!-- <img src="../" alt=""> -->
    </div>
    <div class="StudentForm" v-if="showForm">
      <mt-field
        label="姓名"
        placeholder="请输入您孩子的姓名"
        v-model="formData.name"
      ></mt-field>
      <mt-field
        label="手机号"
        placeholder="请输入手机号"
        type="tel"
        v-model="formData.phone"
      ></mt-field>
      <div class="btn-area mt20">
        <mt-button type="primary" @click.native="submit">提 交</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import { studentsList, studentRegister } from "@/api";
import { Indicator } from "mint-ui";

export default {
  name: "StudentRegister",
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
      student: {}
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.loading = true;
      this.showForm = false;
      this.student = {};
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
      studentsList({ openid }).then(res => {
        Indicator.close();
        this.loading = false;
        if (!res) return;
        if (res.list.length !== 0) {
          const student = res.list[0];
          this.student = student;
          if (student.status === 0) {
            // 待审核
          } else if (student.status === 1) {
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
      if (!params.name) {
        this.$toast("请输入姓名");
      } else if (!params.phone) {
        this.$toast("请输入手机号码");
      } else {
        this.$indicator.open();
        studentRegister(params).then(res => {
          this.$indicator.close();
          if (!res) return;
          this.student = res;
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
@import "../../assets/less/base";

.StudentRegister {
  .bg {
    height: 100vh;
    width: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    background: #7dc0da;
  }
  /*padding: 15px;*/
  .pdd(15, 75, 15, 75);

  .title-area {
    .h(109);
    display: flex;
    .left-img {
      height: 100%;
    }
    .right-img {
      height: 100%;
    }
    h2 {
      flex: 1;
      color: #ff0000;
      .fs(48);
      text-align: center;
    }
  }

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

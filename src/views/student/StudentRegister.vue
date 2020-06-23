<template>
  <div class="StudentRegister">
    <div class="info" v-if="!loading && !showForm">
<!--    <div class="info" v-if="false">-->
      <template v-if="student.status === 0">
        <div class="submit-success">
          <img style="max-width: 100%" :src="submitSuccess" alt="提交成功" />
        </div>
      </template>
      <template v-else>
        <img src="@/assets/img/success.png" alt="" />
        <p>资料已审核通过</p>
      </template>
      <!-- <img src="../" alt=""> -->
    </div>
    <div v-if="showForm">
<!--    <div>-->
      <div class="register-home-page" v-if="!next">
        <img :src="registerHome" alt="注册" />
        <div class="btn-area" @click="next = true"></div>
      </div>
      <div class="form-area" v-if="next">
        <div class="bg"></div>
        <div>
          <!-- 头部 -->
          <div class="title-area">
            <img
              class="left-img"
              src="@/assets/img/student/register/leftgaga@2x.png"
              alt=""
            />
            <h2>恭喜您！</h2>
            <img
              class="right-img"
              src="@/assets/img/student/register/leftgaga@2x.png"
              alt=""
            />
          </div>
          <!-- 中间 -->
          <div class="middle-area">
            <div class="box">
              <img
                class="right-img"
                src="@/assets/img/student/register/heart@2x.png"
                alt=""
              />
              <p>成功领取到一节50分钟一对一陪练课！</p>
              <p>
                接下来请完成宝贝的基本信息，我们将根据宝贝的自身特色选择合适的优质教师给您！
              </p>
            </div>
          </div>
          <!-- 底部 -->
          <div class="bottom-area">
            <div class="input-item">
              <span class="label">宝贝的姓名：</span>
              <div>
                <input type="text" v-model="formData.name" />
              </div>
            </div>
            <div class="input-item">
              <span class="label">宝贝的年龄：</span>
              <div>
                <input type="text" v-model="formData.age" />
              </div>
            </div>
            <div class="input-item">
              <span class="label">宝贝的学琴年限：</span>
              <div>
                <input type="text" v-model="formData.studyAge" />
              </div>
            </div>
            <div class="input-item instrumentStr">
              <span class="label ">宝贝需要陪练的乐器是：</span>
              <div>
                <input type="text" v-model="formData.instrumentStr" />
              </div>
            </div>
            <div class="input-item">
              <span class="label">家长的手机号：</span>
              <div>
                <input type="text" v-model="formData.phone" />
              </div>
            </div>
            <div class="register-btn-area">
              <img
                class="register-btn"
                :src="registerBtn"
                @click="submit"
                alt="提交"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { studentsList, studentRegister } from "@/api";
import { Indicator } from "mint-ui";
import registerBtn from "@/assets/img/student/register/register_btn@2x.png";
import submitSuccess from "@/assets/img/student/register/submit_success.jpg";
import registerHome from "@/assets/img/student/register/register_home.jpg";

export default {
  name: "StudentRegister",
  components: {},
  data() {
    return {
      registerBtn,
      submitSuccess,
      registerHome,
      next: false,
      formData: {
        name: "",
        phone: "",
        instrumentStr: "",
        studyAge: "",
        age: ""
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
      Object.keys(params).forEach(key => {
        if (typeof params[key] === "string") {
          params[key] = params[key].trim();
        }
      });
      const { studyAge, age } = params;
      if (!params.name) {
        return this.$toast("请输入宝贝的姓名");
      } else if (!params.phone) {
        return this.$toast("请输入手机号码");
      } else if (!/^1[3456789]\d{9}$/.test(params.phone)) {
        return this.$toast("请输入正确的手机号码");
      }
      // 校验 学琴年限（studyAge）
      // 校验 年龄（age）
      if (studyAge.length && Number.isNaN(Number(studyAge))) {
        return this.$toast("学琴年限请输入数字");
      }
      if (studyAge.length && (Number(studyAge) < 0 || Number(studyAge > 100))) {
        return this.$toast("请输入正常的学琴年限！");
      }
      if (age.length && Number.isNaN(Number(age))) {
        return this.$toast("年龄请输入数字");
      }
      if (age.length && (Number(age) < 0 || Number(age > 100))) {
        return this.$toast("请输入正常的年龄！");
      }
      this.$indicator.open();
      studentRegister(params).then(res => {
        this.$indicator.close();
        if (!res) return;
        this.student = res;
        this.showForm = false;
        this.init();
      });
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
  .submit-success {
    font-size: 0;
  }

  .register-home-page {
    position: relative;
    font-size: 0;

    img {
      max-width: 100%;
    }

    .btn-area {
      position: absolute;
      /*border: 1px solid #000;*/
      .w(92 * 2);
      .h(90 * 2);
      .positionTop(207 * 2);
      .positionRight(28 * 2);
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

  .form-area {
    .bg {
      height: 100vh;
      width: 100vh;
      position: fixed;
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

    .middle-area {
      display: flex;
      align-items: center;
      .mt(10);
      .h(240);
      .brd(3, solid, rgba(255, 255, 255, 1));
      .borderRadius(1px);

      .box {
        text-align: center;
        .h(195);
        background: #fff;
        .fs(28);

        img {
          float: right;
          .w(61);
          .mr(29);
          .mt(29);
        }

        p {
          .pdd(3, 6, 3, 6);
          line-height: 1.5;
        }
      }
    }

    .bottom-area {
      .w(600);
      //.h(710);
      .pb(60);
      overflow: hidden;
      background: #fff;
      .pl(20);
      .pr(20);
      .mt(30);

      .input-item {
        display: flex;
        align-items: center;
        .mt(60);
        .fs(28);

        span.label {
          font-weight: bold;
        }

        div {
          flex: 1;
          width: 100%;
          display: flex;
          align-items: center;
          input {
            display: block;
            border: none;
            border-bottom: 1px solid #868686;
            box-shadow: none;
            appearance: none;
            border-radius: 0;
            outline: 0;
            width: 100%;
            .maxW(400);
          }
        }

        &.instrumentStr {
          span.label {
            .w(154 * 2);
          }
        }
      }

      .register-btn-area {
        .mt(60);
        text-align: center;

        .register-btn {
          .w(200);
          cursor: pointer;
        }
      }
    }

    .btn-area {
      button {
        width: 100%;
      }
    }
  }
}
</style>

<template>
  <div class=""></div>
</template>

<script>
import { Indicator } from "mint-ui";
import { login } from "@/api";
import { mapState } from "vuex";
export default {
  name: "Login",
  data() {
    return {};
  },
  computed: {
    ...mapState(["isTeacher"])
  },
  created() {
    const { origin } = window.location;
    Indicator.open({
      text: "登录中...",
      spinnerType: "fading-circle"
    });
    const { code, backUrl } = this.$route.query;
    if (code) {
      login({ code }).then(res => {
        if (!res) return;
        if (res.errcode === 40163) {
          // code 已被用，重新登录
          location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${
            backUrl.includes("teacher")
              ? "wxa2c0420dfeaf8d24"
              : "wx76bedc76c343e5a2"
          }&redirect_uri=${encodeURIComponent(
            `${origin}/login?backUrl=${backUrl}`
          )}&response_type=code&scope=snsapi_base&state=123#wechat_redirect`;
        } else if (res.errmsg) {
          alert(res.errmsg);
        } else {
          // this.$store.commit("setOpenid", res.data);
          this.$router.replace(backUrl);
        }
      });
    } else {
      location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${
        this.isTeacher ? "wxa2c0420dfeaf8d24" : "wx76bedc76c343e5a2"
      }&redirect_uri=${encodeURIComponent(
        `${origin}/login?backUrl=${backUrl}`
      )}&response_type=code&scope=snsapi_base&state=123#wechat_redirect`;
    }
  },
  beforeDestroy() {
    Indicator.close();
  }
};
</script>

<template>
  <div class=""></div>
</template>

<script>
import axios from "axios";
import { Indicator } from "mint-ui";
export default {
  name: "Login",
  data() {
    return {};
  },
  created() {
    Indicator.open({
      text: "登录中...",
      spinnerType: "fading-circle"
    });
    const { code, backUrl } = this.$route.query;
    if (code) {
      axios
        .get(
          `/api/wx/${
            backUrl.includes("teacher") ? "teacher" : "student"
          }/login`,
          { params: { code: code } }
        )
        .then(res => {
          console.log(res.data, "openid 微信登录");
          this.$store.commit("setOpenid", res.data);
          console.log("???", backUrl);
          this.$router.replace(backUrl);
        })
        .catch(err => {
          const data = err.response.data;
          if (data.errcode === 40163) {
            // code 已被用，重新登录
            location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${
              backUrl.includes("teacher")
                ? "wxa2c0420dfeaf8d24"
                : "wx76bedc76c343e5a2"
            }&redirect_uri=${encodeURIComponent(
              "http://page.carry.junn.top/login?backUrl=" + backUrl
            )}&response_type=code&scope=snsapi_base&state=123#wechat_redirect`;
          } else {
            alert(data.errmsg || "系统异常");
          }
        });
    } else {
      location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${
        backUrl.includes("teacher")
          ? "wxa2c0420dfeaf8d24"
          : "wx76bedc76c343e5a2"
      }&redirect_uri=${encodeURIComponent(
        "http://page.carry.junn.top/login?backUrl=" + backUrl
      )}&response_type=code&scope=snsapi_base&state=123#wechat_redirect`;
    }
  },
  beforeDestroy() {
    Indicator.close();
  }
};
</script>

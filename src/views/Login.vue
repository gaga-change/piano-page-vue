<template>
  <div class="">
    登录
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      fullscreenLoading: true
    };
  },
  created() {
    const { code, backUrl } = this.$route.query;
    if (code) {
      axios
        .get("/api/wx/login", { params: { code: code } })
        .then(res => {
          console.log(res.data, "openid 微信登录");
          this.$store.commit("setOpenid", res.data);
          this.$router.replace(backUrl);
        })
        .catch(err => {
          const data = err.response.data;
          if (data.errcode === 40163) {
            // code 已被用，重新登录
            location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa2c0420dfeaf8d24&redirect_uri=${encodeURIComponent(
              "http://static.local.shop.csj361.com/login?backUrl=" + backUrl
            )}&response_type=code&scope=snsapi_base&state=123#wechat_redirect`;
          } else {
            alert(data.errmsg || "系统异常");
          }
        });
    } else {
      location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa2c0420dfeaf8d24&redirect_uri=${encodeURIComponent(
        "http://static.local.shop.csj361.com/login?backUrl=" + backUrl
      )}&response_type=code&scope=snsapi_base&state=123#wechat_redirect`;
    }
  }
};
</script>

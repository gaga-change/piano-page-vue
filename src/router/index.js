import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import TeacherIndex from "../views/teacher/Index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    meta: { title: "主页" },
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/login",
    name: "Login",
    meta: { title: "登录" },
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue")
  },
  {
    path: "/teacher",
    component: TeacherIndex,
    children: [
      {
        path: "teacherRegister",
        name: "TeacherRegister",
        meta: { title: "资料填写" },
        component: () =>
          import(
            /* webpackChunkName: "teacherForm" */ "../views/teacher/TeacherRegister.vue"
          )
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;

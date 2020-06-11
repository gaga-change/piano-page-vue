import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import TeacherIndex from "../views/teacher/Index";
import StudentIndex from "../views/student/Index";

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
    path: "/temp",
    name: "temp",
    meta: { title: "登录" },
    component: () => import(/* webpackChunkName: "temp" */ "../views/Temp.vue")
  },
  {
    path: "/showCourse",
    name: "ShowCourse",
    meta: { title: "我的课表" },
    component: () =>
      import(/* webpackChunkName: "course" */ "../views/course/ShowCourse.vue")
  },
  {
    path: "/leaveList",
    name: "LeaveList",
    meta: { title: "请假" },
    component: () =>
      import(/* webpackChunkName: "LeaveList" */ "../views/leave/LeaveList.vue")
  },
  {
    path: "/student",
    component: StudentIndex,
    children: [
      {
        path: "studentRegister",
        name: "StudentRegister",
        meta: { title: "资料填写" },
        component: () =>
          import(
            /* webpackChunkName: "studentRegister" */ "../views/student/StudentRegister.vue"
          )
      },
      {
        path: "inviteStudent",
        name: "InviteStudent",
        meta: { title: "邀请海报" },
        component: () =>
          import(
            /* webpackChunkName: "inviteStudent" */ "../views/student/InviteStudent.vue"
          )
      }
    ]
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
            /* webpackChunkName: "teacherRegister" */ "../views/teacher/TeacherRegister.vue"
          )
      },
      {
        path: "describe",
        name: "Describe",
        meta: { title: "了解Carry陪练" },
        component: () =>
          import(
            /* webpackChunkName: "describe" */ "../views/teacher/Describe.vue"
          )
      },
      {
        path: "TakeCourse",
        name: "TakeCourse",
        meta: { title: "抢课" },
        component: () =>
          import(
            /* webpackChunkName: "TakeCourse" */ "../views/teacher/TakeCourse.vue"
          )
      },
      {
        path: "inviteStudent",
        name: "InviteStudent",
        meta: { title: "邀请学生海报" },
        component: () =>
          import(
            /* webpackChunkName: "inviteStudent" */ "../views/teacher/InviteStudent.vue"
          )
      },
      {
        path: "inviteTeacher",
        name: "InviteTeacher",
        meta: { title: "邀请老师海报" },
        component: () =>
          import(
            /* webpackChunkName: "inviteTeacher" */ "../views/teacher/InviteTeacher.vue"
          )
      },
      {
        path: "teacherBonus",
        name: "TeacherBonus",
        meta: { title: "奖金细则" },
        component: () =>
          import(
            /* webpackChunkName: "teacherBonus" */ "../views/teacher/TeacherBonus.vue"
          )
      },
      {
        path: "teacherWage",
        name: "TeacherWage",
        meta: { title: "我的资薪" },
        component: () =>
          import(
            /* webpackChunkName: "teacherWage" */ "../views/teacher/TeacherWage.vue"
          )
      },
      {
        path: "teacherSystem",
        name: "TeacherSystem",
        meta: { title: "奖金与规章" },
        component: () =>
          import(
            /* webpackChunkName: "teacherSystem" */ "../views/teacher/TeacherSystem.vue"
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

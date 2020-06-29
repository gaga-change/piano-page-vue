<template>
  <div>
    <div @click="handleShowSelectMonth">
      <mt-cell title="点击切换月份" :value="showMonth"></mt-cell>
    </div>
    <div>
      <mt-cell title="总课数" :value="courses.length + '节'"></mt-cell>
      <mt-cell
        title="总课时"
        :value="courseTimetotal.totoalTime + '分钟'"
      ></mt-cell>
      <mt-cell
        title="完成课时"
        :value="courseTimetotal.passTime + '分钟'"
      ></mt-cell>
      <template v-for="item in statusNum">
        <mt-cell
          :key="'statusNum' + item.value"
          :title="item.name"
          :value="(item.num || 0) + '节'"
        ></mt-cell>
      </template>
      <template v-for="item in courseStatusNum">
        <mt-cell
          :key="'courseStatusNum' + item.value"
          :title="item.name"
          :value="(item.num || 0) + '节'"
        ></mt-cell>
      </template>
      <mt-cell title="基本工资" :value="basePrice + '元'"></mt-cell>
      <mt-cell title="奖金" :value="bonusPrice + '元'"></mt-cell>
      <mt-cell title="总工资" :value="totalPrice + '元'"></mt-cell>
    </div>
    <SelectMonth ref="SelectMonth" @confirm="handleSelectMonth" />
  </div>
</template>

<script>
import {
  coursesFindByPersonAndMonth,
  teachersDetail,
  bonusRulesList
} from "@/api";
import SelectMonth from "@/components/SelectMonth";
import { mapGetters } from "vuex";
export default {
  components: { SelectMonth },
  data() {
    return {
      month: new Date(),
      coursesDetailConfig: [],
      loading: false,
      detail: {},
      courses: [],
      bonusList: [],
      priceRuleConfig: null
    };
  },
  computed: {
    ...mapGetters(["userId", "mapConfig"]),
    showMonth() {
      if (this.month) {
        return `${this.month.getFullYear()}年${this.month.getMonth() + 1}月`;
      } else {
        return "";
      }
    },
    // 个人各状态的数量
    statusNum() {
      const map = this.$copy(this.mapConfig["coursePersonStatusMap"]) || [];
      this.courses.forEach(course => {
        const item = map.find(v => v.value === course.teacherStatus);
        if (item) {
          item.num = item.num || 0;
          item.num++;
        }
      });
      return map;
    },
    // 课程各状态的数量
    courseStatusNum() {
      const map = this.$copy(this.mapConfig["courseStatusMap"]) || [];
      // {name, value}
      this.courses.forEach(course => {
        const item = map.find(v => v.value === course.status);
        if (item) {
          item.num = item.num || 0;
          item.num++;
        }
      });
      return map;
    },
    // 课时
    courseTimetotal() {
      const res = { totoalTime: 0, passTime: 0 };
      this.courses.forEach(item => {
        if (item.status === 1) {
          res.passTime += item.classTime.time;
        }
        res.totoalTime += item.classTime.time;
      });
      return res;
    },
    // 基本工资
    basePrice() {
      if (this.priceRuleConfig && this.detail.type) {
        return this.courses.reduce((price, item) => {
          item.status === 1 &&
            (price += this.priceRuleConfig[this.detail.type._id][
              item.classTime._id
            ]);
          return price;
        }, 0);
      } else {
        return 0;
      }
    },
    // 奖金
    bonusPrice() {
      if (this.courses) {
        const num = Math.floor(this.courseTimetotal.passTime / 50);
        let price = 0;
        if (num >= 100) {
          price = 1100;
        } else if (num >= 80) {
          price = 800;
        } else if (num >= 50) {
          price = 500;
        } else if (num >= 20) {
          price = 200;
        }
        price += this.courses.filter(v => v.studentStatus === 4).length * 7; // 学生旷课加7元
        return price;
      } else {
        return 0;
      }
    },
    totalPrice() {
      return this.bonusPrice + this.basePrice;
    }
  },
  created() {
    this.getCourseByMonth();
    this.personDetail();
    this.initBonusRule();
  },
  methods: {
    handleShowSelectMonth() {
      this.$refs["SelectMonth"].open();
    },
    handleSelectMonth(val) {
      this.month = val;
      this.getCourseByMonth();
    },
    /** 获取规则 */
    initBonusRule() {
      const priceRuleConfig = {};
      bonusRulesList({ pageSize: 999, pageNum: 1 }).then(res => {
        if (!res) return;
        this.bonusList = res.list;
        res.list.forEach(item => {
          if (item.teacherType && item.classTime) {
            priceRuleConfig[item.teacherType._id] =
              priceRuleConfig[item.teacherType._id] || {};
            priceRuleConfig[item.teacherType._id][item.classTime._id] =
              item.price;
          }
        });
        this.priceRuleConfig = priceRuleConfig;
      });
    },
    getCourseByMonth() {
      this.$loading();
      coursesFindByPersonAndMonth({
        person: this.userId,
        month: this.month
      }).then(res => {
        this.$loaded();
        if (!res) return;
        this.courses = res;
      });
    },
    /** 获取教师个人信息 */
    personDetail() {
      teachersDetail(this.userId).then(res => {
        if (!res) return;
        this.detail = res;
      });
    }
  }
};
</script>

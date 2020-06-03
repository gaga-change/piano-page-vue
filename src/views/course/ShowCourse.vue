<template>
  <div class="TableTimeDialogComponent">
    <!-- 600px【小型，单列】 70% 【中型，双列】-->
    <div>
      <div class="course-table">
        <div class="course-header f12">
          <span></span>
          <span v-for="txt in tableTitle" :key="txt">{{ txt }}</span>
        </div>
        <div class="course-body">
          <div class="course-time-array f12">
            <span v-for="(txt, i) in tableTime" :key="i">{{ txt }}</span>
          </div>
          <div class="course-grad">
            <span
              class="grad-col"
              v-for="(txt, weekIndex) in tableTitle"
              :key="txt"
            >
              <span
                class="grad-item"
                v-for="(txt, timeIndex) in tableTime"
                :key="timeIndex"
              >
                <span class="grid-body"> </span>
              </span>
              <template v-if="spaceRulePosition[weekIndex]">
                <span
                  class="space-rule"
                  v-for="item in spaceRulePosition[weekIndex]"
                  :key="item._id"
                  :style="{
                    top: item.top,
                    height: item.height
                  }"
                >
                  <div class="item"></div>
                </span>
              </template>
              <template v-if="coursePosition[weekIndex]">
                <span
                  class="course-item"
                  v-for="item in coursePosition[weekIndex]"
                  :key="item._id"
                  :style="{
                    top: item.top,
                    height: item.height
                  }"
                >
                  <div class="item">{{ item.name }}</div>
                </span>
              </template>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 父级设置
 * <dialog
      :visible.sync="dialogVisible"
      :row="selectedRow"
      @submited="getTableData()"
    />
 */
const WEEK = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

import { getReadyCourses, spaceRulesList } from "@/api";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["user", "isTeacher", "type"])
  },
  watch: {
    user() {
      if (this.user) {
        this.init();
      }
    }
  },
  data() {
    return {
      loading: false,
      tableTitle: [],
      tableTime: [],
      coursePosition: [],
      spaceRulePosition: []
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      const id = this.user._id;
      const params = {};
      params[this.type] = id;
      this.loading = true;
      Promise.all([
        getReadyCourses(params),
        spaceRulesList({ ...params, pageSize: 999 })
      ]).then(res => {
        const [courses, sapceRules] = res;
        this.loading = false;
        if (!courses || !sapceRules) return;
        this.drawCourse(courses);
        this.drawSpaceRules(sapceRules.list);
      });
      this.initDraw();
    },
    /** 绘制低图 */
    initDraw() {
      let today = new Date();
      // 头部标题， 侧边时间点
      const title = [];
      for (let i = today.getDay(); i < today.getDay() + 7; i++) {
        let week = i % 7;
        title.push(WEEK[week]);
      }
      for (let i = 7; i < 24; i++) {
        this.tableTime.push(`${i}:00`);
        this.tableTime.push("");
      }
      this.tableTime.push(`00:00`);
      this.tableTitle = title;
    },
    // 绘制课表
    drawCourse(courses) {
      // 获取课表周
      // 计算开始的高度 和 结束的高度
      this.coursePosition = this.computedGrid(courses);
    },
    drawSpaceRules(spaceRules) {
      this.spaceRulePosition = this.computedGrid(spaceRules);
    },
    computedGrid(list) {
      let res = [];
      list.forEach(course => {
        const startTime = new Date(course.startTime);
        const endTime = new Date(course.endTime);
        const week = startTime.getDay();
        const hour = startTime.getHours();
        const minute = startTime.getMinutes();
        const areaMinute =
          (endTime.getTime() - startTime.getTime()) / 1000 / 60;
        let startMinute = hour * 60 + minute; // 开始分钟数

        /** 传入分钟数，计算出对应的高度 */
        const _ = minute => {
          minute = minute - 7 * 60;
          const GRID_HEIGHT = 20;
          const MARGIN_BOTTOM = 3;
          // 前面块数量 * 块高度+margin   +   占用当前块的高度
          let num = Math.floor(minute / 30);
          let height = ((minute - num * 30) / 30) * GRID_HEIGHT;
          return num * (GRID_HEIGHT + MARGIN_BOTTOM) + height;
        };
        const weekIndex = (week + 7 - new Date().getDay()) % 7;
        res[weekIndex] = res[weekIndex] || [];
        const top = _(startMinute);
        const height = _(startMinute + areaMinute);
        res[weekIndex].push({
          top: top + "px",
          height: height - top + "px",
          name:
            course.teacher &&
            course.student &&
            (!this.isTeacher ? course.teacher.name : course.student.name),
          id: course._id
        });
      });
      return res;
    }
  }
};
</script>

<style lang="less">
.TableTimeDialogComponent {
  padding: 20px 15px;
  .course-table {
    .course-header {
      display: flex;
      margin-bottom: 10px;
      span {
        flex: 1;
        text-align: center;
      }
    }
    .course-body {
      // display: flex;
      .course-time-array {
        width: 12.5%;
        float: left;
        display: flex;
        flex-wrap: wrap;
        span {
          width: 100%;
          height: 20px;
          text-align: right;
          padding-right: 10px;
          padding-top: 2px;
          // background-color: aquamarine;
          margin-bottom: 3px;
        }
      }
      .course-grad {
        display: flex;
        width: 87.5%;
        overflow: hidden;
        .grad-col {
          display: flex;
          position: relative;
          flex-wrap: wrap;

          span.grad-item {
            position: relative;
            display: block;
            width: 100%;
            height: 20px;

            margin-bottom: 3px;
            padding: 0 2px;
          }
          .course-item,
          .space-rule {
            position: absolute;
            display: block;
            left: 0;

            width: 100%;
            padding: 0 2px;
            div.item {
              display: flex;
              align-items: center;
              justify-content: center;

              height: 100%;
              border-radius: 5px;
            }
          }
          .course-item {
            .item {
              opacity: 0.8;
              background-color: #f56c6c;
              color: #eee;
              font-size: 12px;
            }
          }
          .space-rule {
            .item {
              opacity: 0.5;
              background-color: aliceblue;
            }
          }
          .grid-body {
            position: relative;
            display: block;
            width: 100%;
            height: 100%;
            background-color: bisque;
            border-radius: 5px;
            overflow: hidden;
          }
        }
      }
    }
  }
}
</style>

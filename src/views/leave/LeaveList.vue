<template>
  <div class="LeaveList">
    <mt-tab-container v-model="active">
      <mt-tab-container-item id="form">
        <mt-cell
          v-for="item in courseList"
          :title="`${item.dateStr} ${item.weekName}`"
          :label="
            `${item.startTimeStr}-${item.endTimeStr} ${item.targetName}${item.typeName}`
          "
          :key="item._id"
        >
          <mt-button size="small" type="primary" @click="hanldeLeaveClick(item)"
            >请假</mt-button
          >
        </mt-cell>
        <Empty
          :show="!loading && courseList.length === 0"
          hint="暂无未开始的课程"
        />
      </mt-tab-container-item>
      <mt-tab-container-item id="list">
        <mt-cell
          v-for="item in leaveAreaList"
          :title="`${item.dateStr} ${item.weekName}`"
          :label="
            `${item.startTimeStr}-${item.endTimeStr} ${item.targetName}${
              item.typeName
            } ${item.reason ? '\r\n【理由：' + item.reason + '】' : ''}`
          "
          :key="item._id"
        >
          <template>
            <span v-if="item.status === 0" class="leaveAreaStatus">
              <span class="iconfont icon-daishenhe" slot="icon" />
              <span>待审核</span>
            </span>
            <span v-else-if="item.status === 1" class="leaveAreaStatus">
              <span class="iconfont icon-tongguo" slot="icon" />
              <span>已审核</span>
            </span>
            <span v-else-if="item.status === 2" class="leaveAreaStatus">
              <span class="iconfont icon-yijujue" slot="icon" />
              <span>未通过</span>
            </span>
          </template>
        </mt-cell>
        <template>
          <Empty :show="!loading && leaveAreaList.length === 0" />
          <div
            v-show="!loading && leaveAreaList.length !== 0"
            style="text-align: center"
            class="mt20 mb20 f12"
          >
            <a
              class="btn-link"
              v-if="leaveAreaList.length < leaveAreaTotal"
              @click.prevent="loadMore"
              >点击加载更多...</a
            >
            <a class="btn-link" style="color: #909399">
              没有更多了...
            </a>
          </div>
        </template>
      </mt-tab-container-item>
    </mt-tab-container>
    <div style="height: 60px;"></div>
    <mt-tabbar v-model="active" :fixed="true">
      <mt-tab-item id="form">
        <span class="iconfont icon-bianxie" slot="icon" />
        请假
      </mt-tab-item>
      <mt-tab-item id="list">
        <span class="iconfont icon-liebiao" slot="icon" />
        请假记录
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script>
import { getReadyCourses, leaveAreasAdd, leaveAreasList } from "@/api";
import { mapState } from "vuex";
const WEEK = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
export default {
  name: "LeaveList",
  data() {
    return {
      loading: false,
      active: "form",
      courseList: [],
      pageNum: 1,
      pageSize: 20,
      leaveAreaList: [],
      leaveAreaTotal: 0,
      cacheScrollTop: 0
    };
  },
  computed: {
    ...mapState(["user", "isTeacher", "type"])
  },
  watch: {
    active(val) {
      if (val === "form") {
        this.cacheScrollTop = this.getScrollTop();
        this.initCourse();
      } else if (this.leaveAreaList.length === 0) {
        this.initLeaveList();
      } else {
        this.$nextTick(() => {
          window.scrollTo(document.body.scrollWidth, this.cacheScrollTop);
        });
      }
    }
  },
  created() {
    this.initCourse();
  },
  methods: {
    getScrollTop() {
      const num =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      return num;
    },
    /** 请假点击 */
    hanldeLeaveClick(item) {
      this.$messageBox
        .prompt("请输入理由")
        .then(({ value, action }) => {
          if (action === "confirm") {
            if (value && value.length > 100) {
              this.$toast("请假理由字数不能超过100");
              return;
            }
            this.$loading();
            this.loading = true;
            leaveAreasAdd({
              course: item._id,
              person: this.user._id,
              adverse: item.target._id,
              reason: value
            }).then(res => {
              this.loading = false;
              this.$loaded();
              if (!res) return;
              this.$toast({
                message: "操作成功",
                iconClass: "icon icon-success"
              });
              this.pageNum = 1;
              this.leaveAreaList = [];
              this.active = "list";
            });
          }
        })
        .catch(() => {});
    },
    /** 点击加载更多 */
    loadMore() {
      this.pageNum++;
      this.initLeaveList();
    },
    /** 请假列表加载 */
    initLeaveList() {
      this.loading = true;
      this.$loading();
      leaveAreasList({
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        person: this.user._id
      }).then(res => {
        this.$loaded();
        this.loading = false;
        if (!res) return;
        this.leaveAreaTotal = res.total;
        const data = [];
        res.list.forEach(v => {
          const { startTime, endTime } = v.course;
          if (v.course) {
            v.dateStr = this.$moment(startTime).format("YYYY-MM-DD");
            v.startTimeStr = this.$moment(startTime).format("hh:mm");
            v.endTimeStr = this.$moment(endTime).format("hh:mm");
            v.weekName = WEEK[new Date(startTime).getDay()];
            v.target = v.adverse;
            v.targetName = v.adverse && v.adverse.name;
            v.typeName = this.isTeacher ? "学生" : "老师";
            data.push(v);
          }
        });
        this.leaveAreaList.push(...data);
      });
    },
    /** 获取有效期内的课程 */
    initCourse() {
      this.$loading();
      getReadyCourses().then(res => {
        this.$loaded();
        if (!res) return;
        this.courseList = res.map(v => {
          v.dateStr = this.$moment(v.startTime).format("YYYY-MM-DD");
          v.startTimeStr = this.$moment(v.startTime).format("hh:mm");
          v.endTimeStr = this.$moment(v.endTime).format("hh:mm");
          v.weekName = WEEK[new Date(v.startTime).getDay()];
          v.target = this.isTeacher ? v.student : v.teacher;
          v.targetName = v.target && v.target.name;
          v.typeName = this.isTeacher ? "学生" : "老师";
          return v;
        });
      });
    }
  }
};
</script>

<style lang="less">
.LeaveList {
  .mint-cell-label {
    white-space: pre-wrap;
    word-break: break-all;
  }
  .mint-cell {
    margin: 10px 0;
    background-color: aquamarine;
  }
  .mint-cell-wrapper {
    padding-top: 15px;
    padding-bottom: 15px;
    background-color: antiquewhite;
  }
  .leaveAreaStatus {
    span.iconfont {
      font-size: 14px;
      vertical-align: middle;
      margin-right: 5px;
      &:first-child {
        color: #409eff;
      }
      &:nth-child(2) {
        color: #67c23a;
      }
      &:last-child {
        color: #909399;
      }
    }
    span:last-child {
      font-size: 12px;
    }
  }
}
</style>

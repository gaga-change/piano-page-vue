<template>
  <div>
    <Spinner :show="!detail._id" class="mt20" />
    <div v-if="detail._id">
      <div v-if="detail.cancel">
        <mt-header title="抢课已取消"></mt-header>
      </div>
      <div v-else-if="detail.teacher && detail.teacher._id === userId">
        <mt-header title="您已成功抢下该课！"></mt-header>
      </div>
      <div v-else-if="detail.teacher">
        <mt-header title="已被抢课"></mt-header>
      </div>
      <div v-else>
        <mt-header title="抢课"></mt-header>
        <mt-cell title="开始时间" :value="detail.startTime | moment"></mt-cell>
        <mt-cell title="时长" :value="detail.classTime.time + '分钟'"></mt-cell>
        <mt-cell title="学生" :value="detail.student.name"></mt-cell>
        <div style="padding: 10px">
          <mt-button
            type="primary"
            style="width: 100%"
            size="small"
            @click="handleTakeCourse"
            >点击抢课</mt-button
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { takeCoursesDetail, teacherTakeCourse } from "../../api";
import { mapGetters } from "vuex";

export default {
  name: "TakeCourse",
  data() {
    return {
      id: this.$route.query.id,
      detail: {
        classTime: {}
      }
    };
  },
  computed: {
    ...mapGetters(["userId"])
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.detail = {};
      takeCoursesDetail(this.id).then(res => {
        if (!res) return;
        this.detail = res;
      });
    },
    handleTakeCourse() {
      this.$loading();
      teacherTakeCourse({ takeCourseId: this.id }).then(res => {
        this.$loaded();
        this.init();
        if (!res) return;
        this.$toast("抢课成功");
      });
    }
  }
};
</script>

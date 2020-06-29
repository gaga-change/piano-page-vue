<template>
  <mt-popup class="SelectMonth" v-model="popupVisible" position="bottom">
    <mt-picker
      :slots="slots"
      value-key="label"
      @change="onValuesChange"
    ></mt-picker>
  </mt-popup>
</template>

<script>
export default {
  props: {
    value: Date
  },
  data() {
    return {
      popupVisible: false,
      dateValue: undefined,
      year: undefined,
      month: undefined,
      slots: [
        {
          flex: 1,
          values: [],
          className: "slot1",
          textAlign: "right",
          defaultIndex: 0
        },
        {
          divider: true,
          content: "-",
          className: "slot2"
        },
        {
          flex: 1,
          values: [],
          className: "slot3",
          textAlign: "left",
          defaultIndex: 0
        }
      ]
    };
  },
  watch: {
    popupVisible(val) {
      if (!val) {
        this.handleClose();
      }
    }
  },
  created() {
    // 设置年份列表
    const now = new Date();
    const nowYear = now.getFullYear();
    let yearArr = [];
    for (let i = 2019; i <= nowYear; i++) {
      yearArr.push({ label: i + "年", value: i });
    }
    this.slots[0].values = yearArr;
    this.slots[0].defaultIndex = yearArr.length - 1;
    // 设置月份列表
    const monthArr = this.getMonthArr(nowYear);
    this.slots[2].values = monthArr;
    this.slots[2].defaultIndex = monthArr.length - 1;
  },
  methods: {
    handleClose() {
      const date = new Date();
      date.setHours(0, 0, 0, 0);
      date.setFullYear(this.year, this.month - 1, 1);
      this.$emit("confirm", date);
    },
    open() {
      this.popupVisible = true;
    },
    onValuesChange(picker, values) {
      if (this.year !== values[0].value && picker.getSlotValue(0)) {
        const monthArr = this.getMonthArr(values[0].value);
        picker.setSlotValues(1, monthArr);
        picker.setSlotValue(1, monthArr[0]);
        this.year = values[0].value;
        this.month = monthArr[0].value;
      } else {
        this.year = values[0].value;
        this.month = values[1].value;
      }
    },
    getMonthArr(year) {
      const now = new Date();
      const nowYear = now.getFullYear();
      const nowMonth = now.getMonth() + 1;
      const monthArr = [];
      const endMonth = year < nowYear ? 12 : nowMonth;
      for (let i = 1; i <= endMonth; i++) {
        monthArr.push({ label: i + "月", value: i });
      }
      return monthArr;
    }
  }
};
</script>

<style lang="less">
.SelectMonth {
  width: 100%;
}
</style>

<template>
  <div class="d-flex flex-column justify-center align-center w-100">
    <div class="d-flex justify-center align-center w-100 mb-2 ">
      <h1>Daily Totals (Last 2 Weeks)</h1>
    </div>

    <div class="d-flex justify-center align-center w-100 ">
      <div class="d-flex justify-center align-center w-100">
        <TodayVsYesterday
          :todays="todays"
          :yesterdays="yesterdays"
          class="w-100"
        />
      </div>
    </div>
    <div class="d-flex justify-center align-center w-100">
      <WeekToWeekChart
        :itemsData="createDailyItemsData"
        :pricesData="createDailyPricesData"
      />
    </div>
  </div>
</template>

<script>
import {
  format,
  isToday,
  isYesterday,
  isThisWeek,
  addDays,
  parse
} from "date-fns";
import WeeklyChart from "./Charts/WeeklyChart";
import WeekToWeekChart from "./Charts/WeekToWeekChartContainer";
import TodayVsYesterday from "./Cards/TodayVsYesterday";
import ThisWeekVsLastWeek from "./Cards/ThisWeekVsLastWeek";

import { Colors } from "./Charts/colors";

export default {
  components: {
    WeeklyChart,
    TodayVsYesterday,
    ThisWeekVsLastWeek,
    WeekToWeekChart
  },
  computed: {
    dailyTotals() {
      return this.$store.getters["analytics/dailyTotals"];
    },
    uniqueDatesList() {
      const datesList = this.dailyTotals.map(item => {
        const newdate = parse(item.createdDate);
        return format(newdate, "ddd MMM Do"); //     this.$options.filters.monthDayYear(item.createdDate);
      });
      return [...new Set(datesList)];
    },

    createDailyItemsData() {
      if (!this.dailyTotals.length > 0) return false;
      return {
        labels: this.uniqueDatesList,
        datasets: [
          this.createDailyTotalCountDataset(
            "totalItems",
            "Items Count",
            "total-items"
          )
        ]
      };
    },
    createDailyPricesData() {
      if (!this.dailyTotals.length > 0) return false;

      return {
        labels: this.uniqueDatesList,
        datasets: [
          this.createDailyTotalCountDataset(
            "totalPrice",
            "Stock Value",
            "total-prices"
          )
        ]
      };
    },

    todays() {
      return (
        this.dailyTotals.filter(day => isToday(day.createdDate)).shift() ||
        false
      );
    },
    yesterdays() {
      return (
        this.dailyTotals.filter(day => isYesterday(day.createdDate)).shift() ||
        false
      );
    },
    thisWeeks() {
      return this.dailyTotals.filter(day => isThisWeek(day.createdDate));
    },
    lastWeeks() {
      return this.dailyTotals.filter(day =>
        isThisWeek(addDays(day.createdDate, 7))
      );
    }
  },
  methods: {
    createDailyTotalCountDataset(field, label, yAxisID) {
      const itemCountTotals = this.dailyTotals.map(day => {
        return day[field] || 0;
      });

      return {
        label,
        data: itemCountTotals,
        backgroundColor: "#51a0fa",
        barThickness: "flex",
        minBarLength: 5
        //yAxisID: yAxisID
      };
    }
  }
};
</script>

<style scoped></style>

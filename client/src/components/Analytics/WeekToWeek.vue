<template>
  <div class="d-flex flex-column justify-center align-center w-100">
    <div class="d-flex justify-space-around align-center w-100">
      <div class="d-flex justify-center align-center mx-3 grey darken-4">
        <TodayVsYesterday :todays="todays" :yesterdays="yesterdays" />
      </div>
      <div class="d-flex justify-center align-center mx-3 grey darken-4">
        <ThisWeekVsLastWeek :thisWeeks="thisWeeks" :lastWeeks="lastWeeks" />
      </div>
    </div>
    <div class="w-100">
      <v-divider class="w-100 my-4"></v-divider>
    </div>
    <div class="d-flex justify-center align-center w-100">
      <WeekToWeekChart
        :itemsData="createItemsData"
        :pricesData="createPricesData"
      />
    </div>
  </div>
</template>

<script>
import { isToday, isYesterday, isThisWeek, addDays } from "date-fns";
import WeekToWeekChart from "./Charts/WeekToWeekChartContainer";
import TodayVsYesterday from "./Cards/TodayVsYesterday";
import ThisWeekVsLastWeek from "./Cards/ThisWeekVsLastWeek";

export default {
  components: {
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
        return this.$options.filters.monthDayYear(item.createdDate);
      });
      return [...new Set(datesList)];
    },
    createItemsData() {
      if (!this.dailyTotals.length > 0) return false;
      return {
        labels: this.uniqueDatesList,
        datasets: [
          this.createDailyTotalCountDataset("totalItems", "total-items")
        ]
      };
    },
    createPricesData() {
      if (!this.dailyTotals.length > 0) return false;

      return {
        labels: this.uniqueDatesList,
        datasets: [
          this.createDailyTotalCountDataset("totalPrice", "total-prices")
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
    createDailyTotalCountDataset(field, yAxisID) {
      const key = "Items";
      const itemCountTotals = this.dailyTotals.map(day => {
        return day[field] || 0;
      });

      return {
        label: key,
        data: itemCountTotals,
        backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(
          16
        )}`,
        barThickness: "flex",
        minBarLength: 5
        //yAxisID: yAxisID
      };
    }
  }
};
</script>

<style scoped></style>

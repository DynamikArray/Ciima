<template>
  <div class="d-flex flex-column justify-center align-center w-100">
    <div class="d-flex justify-center align-center w-100 mb-2 ">
      <h1>Weekly Totals</h1>
    </div>

    <div class="d-flex justify-center align-center w-100 ">
      <div class="d-flex justify-center align-center w-100">
        <ThisWeekVsLastWeek
          v-if="thisWeeks && lastWeeks"
          :thisWeeks="thisWeeks"
          :lastWeeks="lastWeeks"
          class="w-100"
        />
      </div>
    </div>
    <div class="w-100">
      <v-divider class="w-100 my-4"></v-divider>
    </div>
    <div class="d-flex justify-center align-center w-100">
      <WeeklyChart
        :itemsData="createWeeklyItemsData"
        :pricesData="createWeeklyPricesData"
      />
    </div>
  </div>
</template>

<script>
import { format, isToday, isYesterday, isThisWeek, addDays } from "date-fns";
import ThisWeekVsLastWeek from "./Cards/ThisWeekVsLastWeek";
import WeeklyChart from "./Charts/WeeklyChart";
import { Colors } from "./Charts/colors";

export default {
  components: {
    ThisWeekVsLastWeek,
    WeeklyChart
  },
  computed: {
    dailyTotals() {
      return this.$store.getters["analytics/dailyTotals"];
    },

    weeklyTotals() {
      return this.$store.getters["analytics/weeklyTotals"];
    },
    uniqueWeeksList() {
      const weeksList = this.weeklyTotals.map(item => {
        return `${format(item.weekStart, "MMM Do")} - ${format(
          item.weekEnd,
          "MMM Do"
        )}`;
      });
      return [...new Set(weeksList)];
    },

    createWeeklyItemsData() {
      if (!this.weeklyTotals.length > 0) return false;
      return {
        labels: this.uniqueWeeksList,
        datasets: [
          this.createWeeklyTotalCountDataset(
            "totalItems",
            "Items Count",
            "total-items"
          )
        ]
      };
    },
    createWeeklyPricesData() {
      if (!this.weeklyTotals.length > 0) return false;

      return {
        labels: this.uniqueWeeksList,
        datasets: [
          this.createWeeklyTotalCountDataset(
            "totalPrice",
            "Stock Value",
            "total-prices"
          )
        ]
      };
    },
    thisWeeks() {
      return this.weeklyTotals[0];
    },
    lastWeeks() {
      return this.weeklyTotals[1];
    }
  },
  methods: {
    createWeeklyTotalCountDataset(field, label, yAxisID) {
      const itemCountTotals = this.weeklyTotals.map(week => {
        return week[field] || 0;
      });

      return {
        label,
        data: itemCountTotals,
        backgroundColor: Colors.random(),
        barThickness: "flex",
        minBarLength: 5
        //yAxisID: yAxisID
      };
    }
  }
};
</script>

<style scoped></style>

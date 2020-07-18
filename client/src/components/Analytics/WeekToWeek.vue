<template>
  <div>
    <WeekToWeekChart
      :itemsData="createItemsData"
      :pricesData="createPricesData"
    />
  </div>
</template>

<script>
import WeekToWeekChart from "./Charts/WeekToWeekChartContainer";

export default {
  components: {
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

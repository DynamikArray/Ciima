<template>
  <div class="d-flex flex-grow justify-start align-center w-100 flex-column">
    <div class="d-flex flex-grow justify-space-around align-center w-100">
      <TotalItems
        v-if="formattedItemsData"
        class="w-100 mx-3 my-3"
        :analyticsData="summaryItemCounts"
        :loading="analyticsLoading"
        :days="days"
        :userName="userName"
      />
      <TotalPrices
        v-if="formattedPricesData"
        class="w-100 mx-3 my-3"
        :analyticsData="summaryPriceCounts"
        :loading="analyticsLoading"
        :days="days"
        :userName="userName"
      />
    </div>

    <div class="d-flex flex-grow justify-center align-center w-100">
      <v-divider class="my-2"></v-divider>
    </div>

    <div class="d-flex flex-grow justify-center align-center w-100">
      <NewItemsChartContainer
        :analyticsData="formattedItemsData"
        :loading="analyticsLoading"
        :days="days"
        :userName="userName"
      />
    </div>

    <div class="d-flex flex-grow justify-center align-center w-100">
      <v-divider class="my-4"></v-divider>
    </div>

    <div class="d-flex flex-grow justify-center align-center w-100">
      <ItemsPriceChartContainer
        :analyticsData="formattedPricesData"
        :loading="analyticsLoading"
        :days="days"
        :userName="userName"
      />
    </div>
  </div>
</template>

<script>
import TotalItems from "./Cards/TotalItems";
import TotalPrices from "./Cards/TotalPrices";
import AverageItemsPrices from "./Cards/AverageItemsPrices";

import NewItemsChartContainer from "./Charts/NewItemsChartContainer";
import ItemsPriceChartContainer from "./Charts/ItemsPriceChartContainer";

import { Colors } from "./Charts/colors";

export default {
  props: {
    days: [String, Number, Boolean],
    userId: [String, Number, Boolean],
    userName: [String, Boolean],
    getData: [Function],
    updateParam: [Function],
    analyticsLoading: [Boolean],
    analyticsData: [Boolean, Array]
  },
  components: {
    TotalItems,
    TotalPrices,
    AverageItemsPrices,
    NewItemsChartContainer,
    ItemsPriceChartContainer
  },
  computed: {
    groupedData() {
      //group by user
      return this.analyticsData.reduce((users, item) => {
        users[item.username] = users[item.username] || {};
        return users;
      }, {});
    },
    uniqueDatesList() {
      const datesList = this.analyticsData.map(item => {
        return this.$options.filters.date(item.createdDate);
      });
      return new Set(datesList);
    },
    formattedItemsData() {
      const groupedData = this.groupedData;
      const something = this.analyticsData.map(item => {
        const dataDate = this.$options.filters.date(item.createdDate);
        groupedData[item.username][dataDate] = {
          totalItems: item.totalItems
        };
      });

      //combine everything
      const datasets = [];
      for (const [key, value] of Object.entries(groupedData)) {
        const data = [];
        this.uniqueDatesList.forEach(item => {
          if (value[item]) {
            data.push(value[item].totalItems || 0);
          } else {
            data.push(0);
          }
        });

        //push into dataset
        datasets.push({
          label: key,
          data: data,
          backgroundColor: Colors.random(),
          barThickness: "flex",
          minBarLength: 5
        });
      }
      //return chartData
      return {
        labels: [...this.uniqueDatesList],
        datasets
      };
    },

    formattedPricesData() {
      const groupedData = this.groupedData;
      const something = this.analyticsData.map(item => {
        const dataDate = this.$options.filters.date(item.createdDate);
        groupedData[item.username][dataDate] = {
          totalPrices: item.totalPrice
        };
      });

      //combine everything
      const datasets = [];
      for (const [key, value] of Object.entries(groupedData)) {
        const data = [];
        this.uniqueDatesList.forEach(item => {
          if (value[item]) {
            data.push(value[item].totalPrices || 0);
          } else {
            data.push(0);
          }
        });

        //push into dataset
        datasets.push({
          label: key,
          data: data,
          backgroundColor: Colors.random(),
          barThickness: "flex",
          minBarLength: 5
        });
      }

      //return chartData
      return {
        labels: [...this.uniqueDatesList],
        datasets
      };
    },

    summaryItemCounts() {
      const results = [];
      const groupedData = this.groupedData;

      for (const [user, count] of Object.entries(groupedData)) {
        let userTotal = 0;
        for (const [day, items] of Object.entries(count)) {
          userTotal = userTotal + items.totalItems;
        }
        results.push({ [user]: { total: userTotal } });
      }
      return results;
    },

    summaryPriceCounts() {
      const results = [];
      const groupedData = this.groupedData;

      for (const [user, count] of Object.entries(groupedData)) {
        let userTotal = 0;
        for (const [day, items] of Object.entries(count)) {
          userTotal = userTotal + items.totalPrices;
        }
        results.push({ [user]: { total: userTotal } });
      }
      return results;
    }
  }
};
</script>

<style scoped></style>

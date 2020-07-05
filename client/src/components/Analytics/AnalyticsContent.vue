<template>
  <div class="d-flex flex-grow justify-start align-center w-100 flex-column">
    <div class="d-flex flex-grow justify-space-around align-center w-100">
      <TotalItems
        v-if="formattedItemsData"
        class="w-100 mx-2 my-3"
        :analyticsData="summaryItemCounts"
        :loading="analyticsLoading"
        :days="days"
        :userName="userName"
      />
      <TotalPrices
        v-if="formattedPricesData"
        class="w-100 mx-2 my-3"
        :analyticsData="summaryPriceCounts"
        :loading="analyticsLoading"
        :days="days"
        :userName="userName"
      />
      <AverageItemsPrices
        v-if="formattedAveragesData"
        class="w-100 mx-2 my-3"
        :analyticsData="summaryAveragePrices"
        :loading="analyticsLoading"
        :days="days"
        :userName="userName"
      />
    </div>

    <div class="d-flex flex-grow justify-center align-center w-100 my-3">
      <v-divider class="mx-3 my-3"></v-divider>
    </div>

    <div class="d-flex flex-grow justify-center align-center w-100">
      <NewItemsChartContainer
        class="my-2"
        :analyticsData="formattedItemsData"
        :loading="analyticsLoading"
        :days="days"
        :userName="userName"
        :title="title"
      />
    </div>

    <div class="d-flex flex-grow justify-center align-center w-100 my-3">
      <v-divider class="mx-3 my-3"></v-divider>
    </div>

    <div class="d-flex flex-grow justify-center align-center w-100">
      <ItemsPriceChartContainer
        class="my-2"
        :analyticsData="formattedPricesData"
        :loading="analyticsLoading"
        :days="days"
        :userName="userName"
        :title="title"
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
    analyticsData: [Boolean, Array],
    title: [String]
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

    formattedAveragesData() {
      const groupedData = this.groupedData;
      const something = this.analyticsData.map(item => {
        const dataDate = this.$options.filters.date(item.createdDate);
        groupedData[item.username][dataDate] = {
          avgPrices: item.avgPrice
        };
      });

      //combine everything
      const datasets = [];
      for (const [key, value] of Object.entries(groupedData)) {
        const data = [];
        this.uniqueDatesList.forEach(item => {
          if (value[item]) {
            data.push(value[item].avgPrices || 0);
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

      for (const [user, counts] of Object.entries(groupedData)) {
        let userTotal = 0;
        for (const [day, items] of Object.entries(counts)) {
          userTotal = userTotal + items.totalPrices;
        }
        results.push({ [user]: { total: userTotal } });
      }
      return results;
    },

    summaryAveragePrices() {
      const results = [];
      const groupedData = this.groupedData;

      for (const [user, counts] of Object.entries(groupedData)) {
        let userTotal = 0;

        for (const [day, items] of Object.entries(counts)) {
          userTotal = userTotal + items.avgPrices;
        }
        const userAvg = userTotal / Object.entries(counts).length;

        results.push({ [user]: { total: userAvg } });
      }
      return results;
    }
  }
};
</script>

<style scoped></style>
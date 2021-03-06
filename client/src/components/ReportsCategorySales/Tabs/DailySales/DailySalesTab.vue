<template>
  <div class="d-flex flex-column w-100">
    <div class="d-flex align-center justify-space-around">
      <!--START LEFT -->
      <div class="d-flex flex-column pa-2 mx-2 grey darken-4 align-center justify-middle">
        <div class="d-flex justify-space-around align-center w-100">
          <div class="d-flex align-start mx-3">
            <h3>Total Items Sold for Period:</h3>
          </div>
          <div class="d-flex align-end mx-3 flex-grow">
            <h2>{{ totalItemsCount }}</h2>
          </div>
        </div>
        <div class="d-flex justify-space-around align-center w-100">
          <div class="d-flex align-start mx-3">
            <h3>Average Sold Per Day</h3>
          </div>
          <div class="d-flex align-end mx-3 flex-grow">
            <h2>{{ averageItemsCount }}</h2>
          </div>
        </div>
      </div>
      <!--END LEFT -->

      <!--START RIGHT -->
      <div class="d-flex flex-column pa-2 mx-2 grey darken-4 align-center justify-middle">
        <div class="d-flex justify-space-around align-center w-100">
          <div class="d-flex align-start mx-3">
            <h3>Value of Items Sold for Period:</h3>
          </div>
          <div class="d-flex align-end mx-3 flex-grow">
            <h2>{{ totalValueCount | currency }}</h2>
          </div>
        </div>
        <div class="d-flex justify-space-around align-center w-100">
          <div class="d-flex align-start mx-3">
            <h3>Average Value Sold Per Day</h3>
          </div>
          <div class="d-flex align-end mx-3 flex-grow">
            <h2>{{ averageValueCount | currency }}</h2>
          </div>
        </div>
      </div>
      <!--END RIGHT -->
    </div>
    <div class="d-flex">
      <v-divider class="my-3"></v-divider>
    </div>
    <div class="d-flex w-100 align-center justify-center grey darken-4 pa-2">
      <div class="d-flex flex-column w-100 align-center justify-center">
        <ItemsCountPerDay
          key="itemsCountPerDay"
          :categorySalesData="itemsCountPerDayData"
          :chartTitle="`${categoryName} Total Items Sold Per Day`"
        />
      </div>
    </div>
    <div class="d-flex">
      <v-divider class="my-3"></v-divider>
    </div>
    <div class="d-flex w-100 align-center justify-center grey darken-4 pa-2">
      <ItemsValuePerDay
        key="itemsValuePerDay"
        :categorySalesData="itemsValuePerDayData"
        :chartTitle="`${categoryName} Total Value Sold Per Day`"
      />
    </div>
  </div>
</template>

<script>
import ItemsCountPerDay from "@/components/ReportsCategorySales/Charts/ItemsPerDayChart";
import ItemsValuePerDay from "@/components/ReportsCategorySales/Charts/ItemsPerDayChart";

export default {
  props: {
    categoryName: [String, Boolean],
    loading: [Boolean],
    items: [Boolean, Array]
  },
  components: {
    ItemsCountPerDay,
    ItemsValuePerDay
  },
  computed: {
    itemsTotals() {
      return {
        sum1: 1,
        sum2: 2
      };
    },
    uniqueDatesList() {
      const allDates = this.items.map(item => item.ReceievedDate);
      return [...new Set(allDates)];
    },
    itemsCountPerDayData() {
      const orderedDates = [...this.uniqueDatesList].sort((a, b) => {
        return new Date(a) - new Date(b);
      });

      const data = [...this.items]
        .sort((a, b) => {
          return new Date(a.ReceievedDate) - new Date(b.ReceievedDate);
        })
        .reduce((acc, item) => {
          acc.push(item.ItemsSold);
          return acc;
        }, []);

      return {
        labels: orderedDates,
        datasets: [{ label: "Items Sold Per Day", data, backgroundColor: "#1565C0", barThickness: "flex", minBarLength: 5 }]
      };
    },
    itemsValuePerDayData() {
      const orderedDates = this.uniqueDatesList.sort((a, b) => {
        return new Date(a) - new Date(b);
      });

      const data = [...this.items]
        .sort((a, b) => {
          return new Date(a.ReceievedDate) - new Date(b.ReceievedDate);
        })
        .reduce((acc, item) => {
          acc.push(item.OrderItemsValue);
          return acc;
        }, []);

      return {
        labels: orderedDates,
        datasets: [{ label: "Items Value Per Day", data, backgroundColor: "#1565C0", barThickness: "flex", minBarLength: 5 }]
      };
    },
    totalItemsCount() {
      return this.items.reduce((acc, item) => {
        acc = acc + parseInt(item.ItemsSold);
        return acc;
      }, 0);
    },
    totalValueCount() {
      return this.items.reduce((acc, item) => {
        acc = acc + parseInt(item.OrderItemsValue);
        return acc;
      }, 0);
    },
    averageItemsCount() {
      if (this.uniqueDatesList.length > 0) {
        return parseInt(this.totalItemsCount / this.uniqueDatesList.length);
      }
      return 0;
    },
    averageValueCount() {
      if (this.uniqueDatesList.length > 0) {
        return parseInt(this.totalValueCount / this.uniqueDatesList.length);
      }
      return 0;
    }
  }
};
</script>

<style scoped></style>

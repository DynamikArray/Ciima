<template>
  <div class="d-flex align-center justify-center w-100 pt-2">
    <div class="w-100  grey darken-4 px-3 mr-3">
      <h3 class="text-center">New Items: Last 14 Days</h3>
      <BarChart
        style="height:300px"
        class="w-100 pa-2"
        v-if="itemsData"
        :chartData="itemsData"
        :options="options"
      />
    </div>
    <div class="w-100  grey darken-4 px-3 ml-3">
      <h3 class="text-center">Stock Value: Last 14 Days</h3>
      <BarChart
        style="height:300px"
        class="w-100 pa-2"
        v-if="pricesData"
        :chartData="pricesData"
        :options="options"
      />
    </div>
  </div>
</template>

<script>
import BarChart from "./BarChart";

export default {
  components: {
    BarChart
  },
  props: {
    itemsData: [Boolean, Object],
    pricesData: [Boolean, Object]
  },
  data: () => ({
    options: {
      legend: {
        position: "bottom"
      },
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            stacked: true,
            ticks: {
              display: true,
              beginAtZero: true,
              callback: function(value, index, values) {
                return "$" + value;
              }
            },
            gridLines: {
              display: true,
              color: "#444"
            }
          }
        ]
      }
    }
  })
};
</script>

<style scoped></style>

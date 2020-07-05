<template>
  <div class="d-flex justify-center w-100 flex-column mx-3">
    <div class="d-flex flex-grow justify-center align-center w-100">
      <h3 class="my-1">
        New Items Inputted over the Last {{ days }} Days For {{ userName }}
      </h3>
    </div>
    <div class="d-flex flex-grow justify-start align-center w-100">
      <BarChart
        class="w-100 grey darken-4 pa-2"
        v-if="analyticsData"
        :chartData="analyticsData"
        :options="options"
      />
    </div>
  </div>
</template>

<script>
import BarChart from "./BarChart";
import { Colors } from "./colors";

export default {
  components: {
    BarChart
  },
  props: {
    days: [Number],
    userName: [String],
    analyticsData: [Boolean, Object]
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
            ticks: {
              display: true,
              beginAtZero: true
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

<template>
  <div class="d-flex justify-center w-100 flex-column mx-3 grey darken-4 ">
    <div class="d-flex flex-grow justify-start align-center w-100">
      <h2 class="my-3 ml-4">
        {{ title }} Stock Value over the {{ days | daysAsString }} For
        {{ userName }}
      </h2>
    </div>
    <div class="d-flex flex-grow justify-start align-center w-100">
      <BarChart
        class="w-100 pa-2"
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
    days: [Number, String],
    userName: [String],
    analyticsData: [Boolean, Object],
    title: [String]
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
            type: "linear",
            ticks: {
              display: true,
              beginAtZero: true,
              callback: function(value, index, values) {
                return "$" + value;
              }
            },
            scaleLabel: {
              fontSize: 20
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

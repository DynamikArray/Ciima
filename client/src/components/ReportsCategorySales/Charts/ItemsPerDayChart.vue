<template>
  <div class="d-flex flex-column w-100 align-center justify-center">
    <h2>{{ chartTitle || "Sales Data By Day" }}</h2>
    <BarChart class="w-100 pa-2" v-if="categorySalesData" :chartData="categorySalesData" :options="options" />
  </div>
</template>

<script>
import BarChart from "./BarChart";

export default {
  props: {
    chartTitle: [String, Boolean],
    categorySalesData: [Boolean, Object]
  },
  components: {
    BarChart
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
                return "" + value;
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

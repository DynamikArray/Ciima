<template>
  <div class="d-flex flex-column align-center justify-center w-100">
    <div class="w-100  grey darken-4 px-3 ma-3 ">
      <h3 class="text-center mt-2">Weekly Stock Update Summary</h3>
      <BarChart
        key="itemsData"
        style="height:300px"
        class="w-100 pa-2"
        v-if="itemsData"
        :chartData="itemsData"
        :options="options()"
      />
    </div>
    <div class="w-100  grey darken-4 px-3 ma-3 ">
      <h3 class="text-center mt-2">Weekly Stock Value Summary</h3>
      <BarChart
        key="itemsData"
        style="height:300px"
        class="w-100 pa-2"
        v-if="pricesData"
        :chartData="pricesData"
        :options="optionsWithDollarSign()"
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
  data: () => ({}),
  methods: {
    options() {
      return {
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
                beginAtZero: true
              },
              gridLines: {
                display: true,
                color: "#444"
              }
            }
          ]
        }
      };
    },
    optionsWithDollarSign() {
      const options = this.options();
      const ticks = options.scales.yAxes[0].ticks;

      const callback = function(value, index, values) {
        return "$" + value;
      };

      if (ticks) {
        options.scales.yAxes[0].ticks = { ...ticks, callback };
      }

      return options;
    }
  }
};
</script>

<style scoped></style>

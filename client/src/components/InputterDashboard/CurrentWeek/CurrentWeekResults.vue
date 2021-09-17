<template>
  <div class="currentWeekGoal d-flex flex-column grey darken-4 px-2 py-1">
    <div class="d-flex flex-column justify-center">
      <h3>Daily Inputting Result <span class="subtitle-2"></span></h3>
      <v-divider></v-divider>
    </div>
    <div class="d-flex align-center justify-center flex-fill">
      <BarChartWrapper
        key="itemsData"
        class="BarChartWrapper w-100 pa-2"
        v-if="chartData"
        :chartData="chartData"
        :options="chartOptions"
      />
    </div>
  </div>
</template>

<script>
import { format, addDays, parse } from "date-fns";
import { dashboard as config } from "@/config";

import BarChartWrapper from "../Chart/BarChartWrapper";
export default {
  name: "CurrentWeekResults",
  props: {
    results: [Array],
    startDate: [String],
    endDate: [String]
  },
  components: {
    BarChartWrapper
  },
  data: () => ({
    testVar: "",
    colors: config.chartOptions.colors,
    chartOptions: {
      title: {
        display: true,
        text: "Amount Inputted Shown As Percentage of Weekly Goal",
        position: "bottom"
      },
      legend: {
        display: false,
        position: "bottom"
      },
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            ticks: {
              display: true,
              beginAtZero: true,
              callback: function(value, index, values) {
                return value + " %";
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
  }),
  computed: {
    getAllDatesInWeek() {
      const weekDates = [];
      const parsedDate = parse(this.startDate);

      for (let x = 0; x < 5; x++) {
        weekDates.push(format(addDays(parsedDate, x), config.formatDatePlain));
      }
      return weekDates;
    },
    chartLabels() {
      return this.getAllDatesInWeek.reduce((acc, item) => {
        acc.push(format(item, config.formatMonthDayDayname));
        return acc;
      }, []);
    },
    chartDataset() {
      return this.getAllDatesInWeek.reduce((acc, date) => {
        const valueForDay = this.results.find(item => item.createdDate == date);
        if (valueForDay === undefined) {
          acc.push(0);
        } else {
          acc.push(valueForDay.percentOfTarget);
        }
        return acc;
      }, []);
    },
    chartData() {
      return {
        labels: this.chartLabels,
        datasets: [
          {
            label: "Percent Completed of Weekly Goal on this day",
            data: this.chartDataset,
            backgroundColor: this.colors.blue,
            barThickness: "flex"
          }
        ]
      };
    }
  }
};
</script>

<style>
.BarChartWrapper {
  max-height: 300px;
}
</style>

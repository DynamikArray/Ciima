<template>
  <div class="currentWeekGoal d-flex flex-column grey darken-4 px-2 py-1">
    <div class="d-flex flex-column justify-center">
      <h3>Daily Progress Towards Weekly Goal</h3>
    </div>
    <div class="d-flex align-center justify-center flex-fill">
      <LineChartWrapper
        key="itemsData"
        class="LineChartWrapper w-100 pa-2"
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

import LineChartWrapper from "../Chart/LineChartWrapper";
export default {
  name: "CurrentWeekProgress",
  props: {
    results: [Array],
    startDate: [String],
    endDate: [String]
  },
  components: {
    LineChartWrapper
  },
  data: () => ({
    colors: config.chartOptions.colors,
    chartOptions: {
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
      return this.getAllDatesInWeek.reduce((acc, date, index) => {
        let daysValue = 0;

        const dayStats = this.results.find(item => item.createdDate == date);
        if (dayStats !== undefined) {
          daysValue = dayStats.percentOfTarget;
        }
        if (index === 0) {
          acc.push(daysValue);
        } else {
          acc.push(acc[index - 1] + daysValue);
        }
        return acc;
      }, []);
    },
    chartData() {
      return {
        labels: this.chartLabels,
        datasets: [
          {
            order: 1,
            type: "line",
            label: "Target",
            borderWidth: 4,
            borderDash: [20, 10],
            borderColor: this.colors.green,
            /* backgroundColor: this.colors.greenOpacity, */
            data: [20, 40, 60, 80, 100]
          },
          {
            order: 0,
            label: "Completed",
            stepped: "after",
            borderWidth: 4,
            borderColor: this.colors.blue,
            backgroundColor: this.colors.blueOpacity,
            data: this.chartDataset
          }
        ]
      };
    }
  }
};
</script>

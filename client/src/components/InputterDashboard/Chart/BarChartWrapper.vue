<script>
import Chart from "chart.js";
import { Bar, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;
Chart.defaults.global.defaultFontColor = "#efefef";

export default {
  extends: Bar,
  mixins: [reactiveProp],
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
  props: ["chartData", "options"]
};
</script>

<style scoped></style>

<template>
  <div class="currentWeekGoal d-flex flex-column grey darken-4 px-2 py-1">
    <div class="d-flex flex-column justify-center">
      <h3>Current Week Goal</h3>
    </div>
    <div class="d-flex align-center justify-center flex-fill">
      <div class="d-flex justify-center align-center">
        <div class="subtitle-1 text-center ma-1">
          You have completed <b>{{ percentComplete }}%</b> of your weekly inputting goal.
        </div>
      </div>
      <div class="d-flex ma-4">
        <v-progress-circular color="primary" :value="percentComplete" size="120" width="16" rotate="270"
          ><h1 class="">{{ percentComplete }}%</h1>
        </v-progress-circular>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CurrentWeekGoals",
  props: {
    percentComplete: [Number]
  }
};
</script>

<style>
.currentWeekGoal .v-progress-circular .v-progress-circular__underlay {
  stroke: rgba(255, 255, 255, 0.75);
}
</style>

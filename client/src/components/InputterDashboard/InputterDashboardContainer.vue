<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col>
        <div class="d-flex align-center justify-space-between">
          <div class="d-flex align-center justify-start">
            <h2><v-icon class="mr-2">fa fa-user</v-icon>Dashboard - {{ displayName }}</h2>
          </div>
          <div class="d-flex align-center justify-end">
            <WeekSelect class="mx-2 mb-2" :startDate="getStartDate" :endDate="getEndDate" @changeWeek="weekSelected" />
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col><v-divider /></v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="5" lg="4">
        <!-- <CurrentWeekScore :results="currentWeek" /> -->
        <CurrentWeekGoals :percentComplete="totalPercentCompleted" />
      </v-col>
      <v-col cols="12" md="7" lg="8">
        <CurrentWeekResults :results="currentWeek" :startDate="getStartDate" :endDate="getEndDate" />
      </v-col>
      <v-col cols="12">
        <CurrentWeekProgress :results="currentWeek" :startDate="getStartDate" :endDate="getEndDate" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { format, startOfWeek, endOfWeek } from "date-fns";
import { dashboard as config } from "@/config";
const today = new Date();
//use this for testing new dates against the ui
//const today = new Date("2021", "02", "01");

import { mapGetters } from "vuex";
import { DASHBOARD_DAILY_FETCH } from "@/store/action-types";

import WeekSelect from "@/components/Shared/Fields/WeekSelect";

import CurrentWeekResults from "./CurrentWeek/CurrentWeekResults";
import CurrentWeekProgress from "./CurrentWeek/CurrentWeekProgress";
import CurrentWeekScore from "./CurrentWeek/CurrentWeekScore";
import CurrentWeekGoals from "./CurrentWeek/CurrentWeekGoals";

export default {
  name: "InputterDashboardContainer",
  components: {
    WeekSelect,
    CurrentWeekScore,
    CurrentWeekGoals,
    CurrentWeekResults,
    CurrentWeekProgress
  },
  mounted() {
    this.loadData();
  },
  data: () => ({
    selectedUserDisplayName: false,
    startingDate: false,
    endingDate: false
  }),
  computed: {
    ...mapGetters({
      displayName: "user/displayName",
      userId: "user/userId",
      currentWeek: "dashboard/dailyResults",
      totalPercentCompleted: "dashboard/percentComplete"
    }),
    getStartDate() {
      if (!this.startingDate) {
        return format(startOfWeek(today, { weekStartsOn: 1 }), config.formatTimestampStartOfDay);
      } else {
        return format(startOfWeek(this.startingDate, { weekStartsOn: 1 }), config.formatTimestampStartOfDay);
      }
    },
    getEndDate() {
      if (!this.endingDate) {
        return format(endOfWeek(today, { weekStartsOn: 1 }), config.formatTimestampEndOfDay);
      } else {
        return format(endOfWeek(this.endingDate, { weekStartsOn: 1 }), config.formatTimestampEndOfDay);
      }
    },
    dateRangeAsString() {
      return `${format(this.getStartDate, config.formatDateTitleString)} - ${format(
        this.getEndDate,
        config.formatDateTitleString
      )}`;
    }
  },
  methods: {
    weekSelected({ startDate, endDate }) {
      this.startingDate = startDate;
      this.endingDate = endDate;
      this.loadData();
    },
    loadData() {
      const params = { userId: this.userId, startDate: this.getStartDate, endDate: this.getEndDate };
      this.$store.dispatch(`dashboard/${DASHBOARD_DAILY_FETCH}`, params);
    }
  }
};
</script>

<style scoped></style>

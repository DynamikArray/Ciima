<template>
  <v-container fluid class="UserMetricsContainer">
    <v-row>
      <v-col>
        <div class="d-flex justify-space-around align-center grey darken-4 px-2 pt-3 pb-1 flex-wrap">
          <div class="d-flex align-center justify-start">
            <UserSelect
              @userSelected="userSelected"
              :selectedUserId="selectedUserId"
              labelText=""
              componentClass="align-center"
              roleToSelect="inputter"
              labelText="Select User:"
              class="mx-2"
            />
            <div class="d-flex align-start" v-if="!selectedUserId">
              <h3 class="blink warning--text">
                <v-icon class="warning--text mr-1 mb-2">far fa-hand-point-left</v-icon>Select An Inputter
              </h3>
            </div>
          </div>

          <WeekSelect class="mx-2 mb-2" :startDate="getStartDate" :endDate="getEndDate" @changeWeek="weekSelected" />
        </div>
      </v-col>
    </v-row>

    <v-row no-gutters>
      <v-col><v-divider /></v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="5" lg="4">
        <div v-if="selectedUserDisplayName" class="d-flex flex-column align-center justify-center flex-fill mb-2">
          <h2 class="mX-1 mb-1">Viewing results for {{ selectedUserDisplayName }}</h2>
        </div>
        <CurrentWeekScore :results="currentWeek" />
        <CurrentWeekGoals :percentComplete="totalPercentCompleted" />
      </v-col>
      <v-col cols="12" md="7" lg="8">
        <CurrentWeekResults :results="currentWeek" :startDate="getStartDate" :endDate="getEndDate" />
      </v-col>
      <v-col cols="12">
        <CurrentWeekProgress :results="currentWeek" :startDate="getStartDate" :endDate="getEndDate" />
      </v-col>
    </v-row>

    <v-row no-gutters>
      <v-col><v-divider /></v-col>
    </v-row>

    <v-row no-gutters>
      <v-col>
        <GridDraftsSummary :items="userDraftsSummary" />
      </v-col>
    </v-row>

    <!-- <SelectUserDialog :selectedUserId="selectedUserId" @userSelected="userSelected" /> -->
  </v-container>
</template>

<script>
import { weekStartDate, weekEndDate, weekDateRangeAsString } from "../../DashboardHelpers";

import { mapGetters } from "vuex";
import { DASHBOARD_DAILY_FETCH } from "@/store/action-types";
import { DASHBOARD_DAILY_RESULTS_CLEAR } from "@/store/mutation-types";

import UserSelect from "@/components/Shared/Fields/UserSelect";
import WeekSelect from "@/components/Shared/Fields/WeekSelect";

import CurrentWeekResults from "../../CurrentWeek/CurrentWeekResults";
import CurrentWeekProgress from "../../CurrentWeek/CurrentWeekProgress";
import CurrentWeekScore from "../../CurrentWeek/CurrentWeekScore";
import CurrentWeekGoals from "../../CurrentWeek/CurrentWeekGoals";

import GridDraftsSummary from "../../GridDraftsSummary/GridDraftsSummary";

// import SelectUserDialog from "./SelectUserDialog";

export default {
  name: "UserMetricsContainer",
  props: {
    hasFocus: {
      type: [Boolean],
      default: false
    }
  },
  components: {
    UserSelect,
    WeekSelect,
    CurrentWeekScore,
    CurrentWeekGoals,
    CurrentWeekResults,
    CurrentWeekProgress,
    GridDraftsSummary
    // SelectUserDialog
  },
  data: () => ({
    userDialog: false,
    selectedUserId: false,
    selectedUserDisplayName: false,
    startingDate: false,
    endingDate: false
  }),
  beforeDestroy() {
    this.$store.commit(`dashboard/${DASHBOARD_DAILY_RESULTS_CLEAR}`);
  },
  watch: {
    hasFocus: function(val) {
      if (this.selectedUserId) {
        this.loadData();
      }
    }
  },
  computed: {
    ...mapGetters({
      currentWeek: "dashboard/dailyResults",
      currentWeekDrafts: "dashboard/userDraftsSummary",
      totalPercentCompleted: "dashboard/percentComplete",
      userDraftsSummary: "dashboard/userDraftsSummary"
    }),
    getStartDate() {
      return weekStartDate(this.startingDate);
    },
    getEndDate() {
      return weekEndDate(this.endingDate);
    },
    dateRangeAsString() {
      return weekDateRangeAsString(this.getStartDate, this.getEndDate);
    }
  },
  methods: {
    loadData() {
      if (!this.checkIfUserSelected()) return false;

      const params = { userId: this.selectedUserId, startDate: this.getStartDate, endDate: this.getEndDate };
      this.$store.dispatch(`dashboard/${DASHBOARD_DAILY_FETCH}`, params);
    },
    userSelected({ userId, userName }) {
      this.selectedUserId = userId;
      this.selectedUserDisplayName = userName;
      this.loadData();
    },
    weekSelected({ startDate, endDate }) {
      if (!this.checkIfUserSelected()) return false;

      this.startingDate = startDate;
      this.endingDate = endDate;
      this.loadData();
    },
    checkIfUserSelected() {
      if (!this.selectedUserId) {
        this.$toastr.w("No user selected.  Please select a user.");
        return false;
      }
      return true;
    }
  }
};
</script>

<style scoped>
.blink {
  animation: blink 2.5s linear infinite;
}
@keyframes blink {
  0% {
    opacity: 0;
  }
  20% {
    opacity: 50;
  }
  50% {
    opacity: 1;
  }
  80% {
    opacity: 50;
  }
  100% {
    opacity: 0;
  }
}
</style>

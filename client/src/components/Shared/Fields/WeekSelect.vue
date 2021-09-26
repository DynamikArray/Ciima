<template>
  <div class="d-flex align-center justify-end">
    <div class="d-flex align-center justify-end">
      <div class="mx-2">
        <b>Select Week:</b>
      </div>
      <div class="mx-1 d-flex align-center justify-center">
        <v-btn color="primary" class="pa-0" style="min-width:42px;" @click="priorWeekSelected"
          ><v-icon>fa fa-caret-left</v-icon></v-btn
        >
      </div>
      <div class="mx-3 d-flex align-center justify-center">
        <h3 class="text-center">{{ dateRangeAsString }}</h3>
      </div>
      <div class="mx-1 d-flex align-center justify-center">
        <v-btn color="primary" class="pa-0" style="min-width:42px;" @click="nextWeekSelected" :disabled="disableButton"
          ><v-icon>fa fa-caret-right</v-icon></v-btn
        >
      </div>
    </div>
  </div>
</template>

<script>
import { format, addDays, endOfWeek, compareAsc } from "date-fns";
import { dashboard as config } from "@/config";

export default {
  name: "WeekSelect",
  props: {
    startDate: {
      type: [String]
    },
    endDate: {
      type: [String]
    },
    allowWeekAhead: {
      type: [Boolean],
      default: false
    }
  },
  computed: {
    dateRangeAsString() {
      return `${format(this.startDate, config.formatDateTitleString)} - ${format(
        this.endDate,
        config.formatDateTitleString
      )}`;
    },
    disableButton() {
      if (this.allowWeekAhead) return false;

      const weekEnd = format(endOfWeek(new Date(), { weekStartsOn: 1 }), "MM-DD-YYYY");
      const endDate = format(new Date(this.endDate), "MM-DD-YYYY");
      const compared = compareAsc(endDate, weekEnd);
      if (compared == -1) return false;
      return true;
    }
  },
  methods: {
    priorWeekSelected() {
      const startDate = addDays(this.startDate, -7);
      const endDate = addDays(this.endDate, -7);
      this.$emit("changeWeek", { startDate, endDate });
    },
    nextWeekSelected() {
      const startDate = addDays(this.startDate, 7);
      const endDate = addDays(this.endDate, 7);

      /*
      //if endDate would be greater than todays week ending date
      const weekEnd = endOfWeek(new Date(), { weekStartsOn: 1 });
      if (endDate > weekEnd) {
        this.disableNextWeek = true;
        return false;
      }
      */

      this.$emit("changeWeek", { startDate, endDate });
    }
  }
};
</script>

<style scoped></style>

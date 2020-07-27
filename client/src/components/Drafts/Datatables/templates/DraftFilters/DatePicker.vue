<template>
  <div class="d-flex align-start justify-center mx-3">
    <v-dialog ref="dialog" v-model="modal" persistent width="320px">
      <template v-slot:activator="{ on, attrs }">
        <div class="d-flex align-center flex-column mb-2">
          <div class="d-flex align-center justify-start">
            <h5 class="mt-0 mr-2 mb-1">Created Date:</h5>
          </div>

          <div class="d-flex align-center justify-end w-100">
            <v-text-field
              style="width:190px"
              prepend-icon="fa fa-calendar"
              hide-details
              outlined
              dense
              filled
              clearable
              :value="dateValue"
              v-bind="attrs"
              v-on="on"
              @click:clear="clearDateValueParam()"
              :label="fieldLabel"
              single-line
            ></v-text-field>
          </div>
        </div>
      </template>

      <v-date-picker v-model="dateValue" scrollable color="primary">
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
        <v-btn text color="primary" @click="handleModalSave(dateValue)"
          >OK</v-btn
        >
      </v-date-picker>
    </v-dialog>
  </div>
</template>

<script>
import { format } from "date-fns";

export default {
  props: {
    fieldName: [String],
    fieldLabel: [String],
    getData: [Function]
  },
  data: () => ({
    modal: false,
    dateValue: ""
  }),
  methods: {
    handleModalSave(newVal) {
      this.dateValue = newVal;
      this.getData({ [this.fieldName]: newVal });
      this.modal = false;
    },
    clearDateValueParam() {
      this.getData({ [this.fieldName]: "" });
    }
  }
};
</script>

<style scoped></style>

<template>
  <div class="d-flex align-end justify-start mx-3">
    <v-dialog ref="dialog" v-model="modal" persistent width="290px">
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          dense
          :value="dateValue"
          :label="fieldLabel"
          prepend-icon="fa fa-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
          clearable
          @click:clear="clearDateValueParam()"
        ></v-text-field>
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
      this.getData({ [this.fieldName]: false });
    }
  }
};
</script>

<style scoped></style>

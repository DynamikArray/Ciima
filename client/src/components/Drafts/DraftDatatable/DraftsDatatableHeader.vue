<template>
  <section>
    <div class="d-flex justify-space-between">
      <div class="d-flex align-center mr-auto">
        <h1 class="display-1 mb-0">
          <v-icon class="mr-2">{{ icon }}</v-icon
          >{{ title }}
        </h1>
      </div>
      <div class="d-flex align-center mr-4">
        <v-flex class="align-center pb-2">
          <h4 class="mr-1">Include All Users</h4>
        </v-flex>
        <v-flex class="align-center pb-2">
          <v-switch
            color="primary"
            class="mb-5"
            :value="showAllUsers"
            @change="updateRadioValue"
            :label="convertBlnToYesNo()"
            hide-details
          ></v-switch>
        </v-flex>
      </div>
      <div class="d-flex align-center ml-4">
        <DraftStatusDropdown
          :onSelect="updateDropdownValue"
        ></DraftStatusDropdown>
      </div>
    </div>
    <v-divider class="mb-2"></v-divider>
  </section>
</template>

<script>
import DraftStatusDropdown from "./DraftStatusDropdown.vue";
export default {
  props: {
    title: [String],
    icon: [String],
    showAllUsers: [Number],
    onSelect: [Function],
    status: [String]
  },
  components: {
    DraftStatusDropdown
  },
  methods: {
    convertBlnToYesNo() {
      if (this.showAllUsers) return "Yes";
      return "No";
    },
    updateRadioValue(val) {
      this.$emit("update:showAllUsers", +val);
      this.onSelect({ all: +val });
    },
    updateDropdownValue({ status }) {
      this.$emit("update:status", status);
      this.onSelect({ status });
    }
  }
};
</script>

<style scoped></style>

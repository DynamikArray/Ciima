<template>
  <div class="d-flex align-center justify-center">
    <div class="d-flex align-center justify-center">
      <div class="title">Categories:</div>
      <v-radio-group
        outlined
        :value="searchCategories"
        row
        multiple
        dense
        hide-details
        class="ma-0 pa-0 ml-4"
        @change="handleChange"
      >
        <v-radio label="Sets" color="primary" value="EBAY-SETS" class="pa-2" />
        <v-radio
          label="Singles"
          color="primary"
          value="EBAY-SINGLES"
          class="pa-2"
        />
        <v-radio label="Lots" color="primary" value="EBAY-LOTS" class="pa-2" />
        <v-radio label="GTCs" color="primary" value="EBAY-GTCS" class="pa-2" />
        <v-radio label="Default" color="primary" value="Default" class="pa-2" />
      </v-radio-group>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    searchCategories: ["EBAY-SETS", "EBAY-LOTS", "EBAY-SINGLES", "EBAY-GTCS"]
  }),
  methods: {
    handleChange(val) {
      this.searchCategories = val;
      this.emit("updateSearchCategories", this.searchCategories);
    }
  }
};
</script>

<style scoped></style>

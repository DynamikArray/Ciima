<template>
  <div class="d-flex align-end justify-end mb-3 mr-4">
    <v-form v-model="validTitleSearch" @submit.prevent="handleSearchInput">
      <v-text-field
        style="width:440px"
        dense
        autocomplete="off"
        hide-details
        persistent-hint
        v-model="searchTitleString"
        label="Search Titles"
        prepend-icon="fa-search"
      >
        <template v-slot:append-outer>
          <v-btn small color="info" @click="handleSearchInput"
            ><v-icon small class="mr-1">fa fa-search</v-icon>Search</v-btn
          >
        </template>
      </v-text-field>
    </v-form>
  </div>
</template>

<script>
export default {
  props: {
    getData: [Function]
  },
  data: () => ({
    searchTitleString: "",
    validTitleSearch: false
  }),
  methods: {
    handleSearchInput() {
      if (this.searchTitleString)
        this.getData({ title: this.searchTitleString });
    }
  }
};
</script>

<style scoped></style>

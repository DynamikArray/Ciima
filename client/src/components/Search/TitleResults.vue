<template>
  <div v-if="titleResults">
    <v-data-table
      :headers="headers"
      :items="titleResults"
      :loading="loading"
      loading-text="Searching Database"
      :items-per-page="100"
      :sort-by.sync="sortBy"
      :sort-desc.sync="descending"
    >
      <template v-slot:item.action="{ item }">
        <v-btn small color="primary" @click="loadIssues(item.TitleID)">
          <v-icon small>
            fa-search-plus
          </v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      sortBy: "IssuesCount",
      descending: true,
      headers: [
        { text: "View", value: "action", sortable: false },
        {
          text: "Id",
          value: "TitleID",
          sortable: false,
          align: "center"
        },
        {
          text: "Title",
          value: "Title",
          sortable: true,
          align: "left"
        },
        {
          text: "# of Issues ",
          value: "IssuesCount",
          sortable: true,
          align: "center"
        },
        {
          text: "Publisher",
          value: "Publisher",
          sortable: true,
          align: "center"
        },
        {
          text: "Years",
          value: "YearsPublished",
          sortable: true,
          align: "center"
        }
      ]
    };
  },
  computed: {
    ...mapState({
      titleResults: state => state.search.items,
      loading: state => state.search.loading
    })
  },
  methods: {
    loadIssues(itemId) {
      console.log("Load me ", itemId);
    }
  }
};
</script>

<style scoped></style>

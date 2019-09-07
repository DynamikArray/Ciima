<template>
  <div>
    <v-data-table
      v-if="titleResults"
      :headers="headers"
      :items="titleResults"
      :loading="loading"
      loading-text="Searching Database"
      :items-per-page="50"
      :sort-by.sync="sortBy"
      :sort-desc.sync="descending"
    >
      <template v-slot:item.action="{ item }">
        <router-link
          :to="{ name: 'issues', params: { titleId: item.titleId } }"
          class="noUnderline"
          ><v-icon color="primary">fa-search-plus</v-icon></router-link
        >
      </template>
    </v-data-table>
    <div v-else>
      <h3 class="text-center">No Titles</h3>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      sortBy: "issuesCount",
      descending: true,
      headers: [
        { text: "View", value: "action", sortable: false, align: "center" },
        {
          text: "Id",
          value: "titleId",
          sortable: false,
          align: "center"
        },
        {
          text: "Title",
          value: "title",
          sortable: true,
          align: "left"
        },
        {
          text: "Issues",
          value: "issuesCount",
          sortable: true,
          align: "center"
        },
        {
          text: "Publisher",
          value: "publisher",
          sortable: true,
          align: "center"
        },
        {
          text: "Years",
          value: "yearsPublished",
          sortable: true,
          align: "center"
        }
      ]
    };
  },
  computed: {
    ...mapState({
      titleResults: state => state.titleSearch.items,
      loading: state => state.titleSearch.loading
    })
  },
  methods: {}
};
</script>

<style scoped>
.noUnderline {
  text-decoration: none;
}
</style>

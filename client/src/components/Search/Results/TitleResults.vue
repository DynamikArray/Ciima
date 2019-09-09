<template>
  <div class="">
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
        <v-btn color="primary" @click="selectTitle(item)"
          ><v-icon color="white">fa-search-plus</v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <div v-else class="d-flex h-100 w-100 justify-center">
      <div class="">
        <h3 class="title text-center">
          Search for Issues using the textbox located above.
        </h3>
        <p>
          Hotkeys & shortcuts coming next.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { SEARCH_TITLES_SELECTED_SET } from "@/store/mutation-types.js";

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
  methods: {
    selectTitle(item) {
      this.$store.commit(`titleSearch/${SEARCH_TITLES_SELECTED_SET}`, { item });
      this.$router.push({ name: "issues", params: { titleId: item.titleId } });
    }
  }
};
</script>

<style scoped>
.noUnderline {
  text-decoration: none;
}
</style>

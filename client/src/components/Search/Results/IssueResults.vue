<template>
  <div>
    <v-data-table
      v-if="issues"
      :headers="headers"
      :items="issues"
      :loading="loading"
      loading-text="Searching Database"
      :items-per-page="50"
    >
      <template v-slot:item.imageUrl="{ item }">
        <img :src="makeImageUrl(item)" width="70" class="ma-1" />
      </template>

      <template v-slot:item.title="{ item }">
        {{ item.title }} - {{ item.variation }}
      </template>
    </v-data-table>
    <div v-else>
      <h3 class="text-center">No Issues</h3>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      issues: state => state.issueSearch.items,
      loading: state => state.issueSearch.loading
    })
  },
  data() {
    return {
      headers: [
        {
          text: "Cover",
          value: "imageUrl",
          sortable: false,
          align: "center",
          width: "120"
        },
        {
          text: "Title",
          value: "title",
          sortable: true,
          align: "left"
        },
        {
          text: "Variant",
          value: "variation",
          sortable: true,
          align: "center"
        },
        {
          text: "Printing",
          value: "printing",
          sortable: true,
          align: "center"
        },
        {
          text: "FullIssue",
          value: "fullIssue",
          sortable: true,
          align: "center"
        }
      ]
    };
  },
  methods: {
    makeImageUrl(item) {
      return `http://searchlightcomics.com/${item.imageUrl}`;
    }
  }
};
</script>

<style scoped></style>

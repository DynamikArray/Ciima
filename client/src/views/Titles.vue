<template>
  <v-container class="h-100-force">
    <v-scroll-y-reverse-transition>
      <div class="pageTitleWrapper" v-if="!issueResults">
        <h1 class="display-3 text-left">Search Titles</h1>
        <v-divider class="my-3"></v-divider>
      </div>
    </v-scroll-y-reverse-transition>

    <v-row no-gutters>
      <v-col class="text-center">
        <Search></Search>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-divider class="my-3"></v-divider>
    </v-row>
    <v-row no-gutters>
      <v-col class="text-center">
        <TitleResults></TitleResults>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

import Search from "@/components/Search/Search";
import TitleResults from "@/components/Search/Results/TitleResults";

export default {
  components: {
    Search,
    TitleResults
  },
  computed: {
    ...mapState({
      issueResults: state => state.titleSearch.items
    })
  }
};
</script>

<style scoped></style>

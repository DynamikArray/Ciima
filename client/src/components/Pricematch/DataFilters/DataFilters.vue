<template>
  <div
    class="d-flex align-center justify-center textShadow"
    :class="getClasses"
  >
    <div class="d-flex align-center justify-start mx-3">
      <h5 class="mr-1">
        Has Match:
      </h5>
      <v-switch
        inset
        color="info"
        dense
        hide-details
        :input-value="filterHasMatch"
        @change="handleFilterHasMatch(!filterHasMatch)"
        class="mt-0 mb-1"
      ></v-switch>
      <h5 class="caption mr-1">
        {{ filterHasMatch ? `Hidden` : `Visible` }}
      </h5>
    </div>

    <div class="d-flex align-center justify-start mx-3">
      <h5 class="mr-1">
        Variants:
      </h5>
      <v-switch
        inset
        color="info"
        dense
        hide-details
        :input-value="filterVariants"
        @change="handleFilterVariants(!filterVariants)"
        class="mt-0 mb-1"
        true-value="YEP"
      ></v-switch>
      <h5 class="caption mr-1">
        {{ filterVariants ? `Hidden` : `Visible` }}
      </h5>
    </div>

    <div class="d-flex align-center justify-start mx-3">
      <h5 class="mr-1">
        ComicTypes:
      </h5>
      <v-switch
        inset
        color="info"
        dense
        hide-details
        :input-value="filterComicTypes"
        @change="handleFilterComicTypes(!filterComicTypes)"
        class="mt-0 mb-1"
      ></v-switch>
      <h5 class="caption mr-1">
        {{ filterComicTypes ? `Hidden` : `Visible` }}
      </h5>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import {
  SET_OUR_FILTER_COMIC_TYPES,
  SET_OUR_FILTER_VARIANTS,
  SET_OUR_FILTER_HAS_MATCH
} from "@/store/action-types";

export default {
  props: {
    asColumn: {
      type: [Boolean],
      default: false
    },
    borderBottom: {
      type: [Boolean],
      default: true
    }
  },
  computed: {
    ...mapGetters({
      filterHasMatch: "pricematch/ourData/issuesFilter/getFilterHasMatch",
      filterVariants: "pricematch/ourData/issuesFilter/getFilterVariants",
      filterComicTypes: "pricematch/ourData/issuesFilter/getFilterComicTypes"
    }),
    getClasses() {
      const classNames = [];
      if (this.asColumn) {
        classNames.push("flex-column");
      }
      if (this.borderBottom) {
        classNames.push("borderBottom");
      }
      return classNames.join("");
    }
  },
  methods: {
    handleFilterVariants(val) {
      this.$store.dispatch(
        `pricematch/ourData/issuesFilter/${SET_OUR_FILTER_VARIANTS}`,
        val,
        {
          global: true
        }
      );
    },
    handleFilterComicTypes(val) {
      this.$store.dispatch(
        `pricematch/ourData/issuesFilter/${SET_OUR_FILTER_COMIC_TYPES}`,
        val,
        {
          global: true
        }
      );
    },
    handleFilterHasMatch(val) {
      this.$store.dispatch(
        `pricematch/ourData/issuesFilter/${SET_OUR_FILTER_HAS_MATCH}`,
        val,
        {
          global: true
        }
      );
    }
  }
};
</script>

<style scoped></style>

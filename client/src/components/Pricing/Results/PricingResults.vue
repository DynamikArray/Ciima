<template>
  <div class="w-100 h-100">
    <div
      v-if="loading"
      class="mt-4 text-center"
      style="text-shadow: 1px 1px 1px #000;"
    >
      <v-progress-circular
        class="mt-5"
        size="200"
        width="10"
        indeterminate
        color="blue darken-1"
      ></v-progress-circular>
      <h3 class=" text-center my-3">
        Searching for prices
      </h3>
    </div>

    <div class="" v-if="!loading && items.length > 0">
      <div class="d-flex justify-space-between">
        <div class="d-flex align-center ml-3">
          <div v-if="sortResultsByDate" class="ma-1">
            <v-btn
              v-if="sortDateDir == `ASC`"
              class="mr-1"
              color="info"
              small
              @click="setSortByDate(`DESC`)"
              >{{ endDateText
              }}<v-icon class="ml-1" small>fa fa-sort-numeric-up</v-icon>
            </v-btn>
            <v-btn
              v-if="sortDateDir == `DESC`"
              class="mr-1"
              color="info"
              small
              @click="setSortByDate(`ASC`)"
              >{{ endDateText
              }}<v-icon class="ml-1" small>fa fa-sort-numeric-down</v-icon>
            </v-btn>
          </div>
        </div>
        <div class="d-flex align-center">
          <h5 class="text-center pa-4">{{ items.length }} Results</h5>
        </div>
        <div class="d-flex align-center mr-3">
          <div v-if="sortResultsByPrice" class="ma-1">
            <v-btn
              v-if="sortPriceDir == `ASC`"
              class="mr-1"
              color="info"
              small
              @click="setSortByPrice(`DESC`)"
              >Price: <v-icon class="ml-1" small>fa fa-sort-numeric-up</v-icon>
            </v-btn>
            <v-btn
              v-if="sortPriceDir == `DESC`"
              class="mr-1"
              color="info"
              small
              @click="setSortByPrice(`ASC`)"
              >Price:
              <v-icon class="ml-1" small>fa fa-sort-numeric-down</v-icon>
            </v-btn>
          </div>
        </div>
      </div>

      <V-scroll-y-transition group>
        <PriceCard
          v-for="(item, index) in sortItems()"
          :key="`${item.site}-${Date.now()}-${index}`"
          :item="item"
          :endDateText="endDateText"
          :listingType="listingsType"
        >
        </PriceCard>
      </V-scroll-y-transition>
      <h5 class="text-center pa-4">{{ items.length }} Results</h5>
    </div>

    <div
      v-if="!loading && items.length == 0"
      class="pa-4"
      style="text-shadow: 1px 1px 1px #000;"
    >
      <div v-if="isDisabled" class="text-center">
        <v-alert
          color="primary"
          icon="fa-exclamation-circle"
          border="left"
          dark
          prominent
        >
          <h1 class="display-1 mb-4">
            Sorry! This feature is currently disabled.
          </h1>
          <h3 class="headline">
            If you used this feature in your day to day workflow, please contact
            Brian or Johnny and make them aware.
          </h3>
        </v-alert>
      </div>
      <div v-else>
        <h4 class="text-center mx-4 px-4">
          Search for product prices across various websites.
        </h4>
        <h1 class=" text-center display-1 my-3">No Results</h1>
      </div>
    </div>
  </div>
</template>

<script>
import PriceCard from "./PriceCard";
export default {
  components: {
    PriceCard
  },
  data: () => ({
    sortType: "price",
    sortDateDir: "ASC",
    sortPriceDir: "DESC"
  }),
  props: {
    isDisabled: [Boolean],
    items: [Boolean, Array],
    loading: [Number, Boolean],
    endDateText: [Boolean, String],
    listingsType: [Boolean, String],
    sortResultsByDate: {
      type: Boolean,
      default: false
    },
    sortResultsByPrice: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    //
    //
    setSortByDate(dir) {
      this.sortType = "date";
      this.sortDateDir = dir;
    },
    //
    //
    setSortByPrice(dir) {
      this.sortType = "price";
      this.sortPriceDir = dir;
    },
    //
    //
    sortItems() {
      switch (this.sortType) {
        case "price":
          return this.sortItemsByPrice();
          break;
        case "date":
          return this.sortItemsByDate();
          break;
      }
    },
    //
    //
    sortItemsByPrice() {
      const items = this.items.sort((a, b) => {
        switch (this.sortPriceDir) {
          case "DESC":
            return b.price - a.price;
            break;
          case "ASC":
            return a.price - b.price;
            break;
        }
      });
      return items;
    },
    //
    //
    sortItemsByDate() {
      const items = this.items.sort((a, b) => {
        switch (this.sortDateDir) {
          case "DESC":
            return (
              new Date(b.meta.listingDate.value) -
              new Date(a.meta.listingDate.value)
            );
            break;
          case "ASC":
            return (
              new Date(a.meta.listingDate.value) -
              new Date(b.meta.listingDate.value)
            );
            break;
        }
      });
      return items;
    }
  }
};
</script>

<style scoped></style>

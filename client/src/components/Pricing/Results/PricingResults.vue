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
        <div class="d-flex align-center">
          <div v-if="sortResultsByDate" class="ma-1">
            <v-btn
              v-if="sortDateDir == `ASC`"
              class="mr-1"
              color="info"
              small
              @click="sortResults(`DESC`)"
              >{{ endDateText }}<v-icon small>fa fa-sort-numeric-up</v-icon>
            </v-btn>
            <v-btn
              v-if="sortDateDir == `DESC`"
              class="mr-1"
              color="info"
              small
              @click="sortResults(`ASC`)"
              >{{ endDateText }}<v-icon small>fa fa-sort-numeric-down</v-icon>
            </v-btn>
          </div>
        </div>
        <div class="d-flex align-center"><!--DO PRICES NEXT--></div>
      </div>

      <V-scroll-y-transition group>
        <PriceCard
          v-for="(item, index) in sortItems(items)"
          :key="`${item.site}-${Date.now()}-${index}`"
          :item="item"
          :endDateText="endDateText"
          :listingType="listingsType"
        >
        </PriceCard>
      </V-scroll-y-transition>
    </div>

    <div
      v-if="!loading && items.length == 0"
      class="pa-4"
      style="text-shadow: 1px 1px 1px #000;"
    >
      <h4 class="text-center mx-4 px-4">
        Search for a product across Ebays Active Items, Completed Items, and
        MyComicShop.com <span class="font-italic">(singles only)</span>
      </h4>
      <h1 class=" text-center display-1 my-3">No Results</h1>
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
    sortDateDir: "ASC"
  }),
  props: {
    items: [Boolean, Array],
    loading: [Number, Boolean],
    endDateText: [Boolean, String],
    listingsType: [Boolean, String],
    sortResultsByDate: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    sortResults(dir) {
      this.sortDateDir = dir;
    },
    sortItems() {
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

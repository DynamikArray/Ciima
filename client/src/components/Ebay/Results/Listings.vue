<template>
  <div>
    <h3 class="text-center">{{ title }}</h3>
    <V-scroll-y-transition group>
      <v-card
        v-for="(item, index) in items"
        class="my-4"
        :key="`${listingsType}-${item.itemId}-${index}`"
        :color="
          item.sellerInfo.sellerUserName === `searchlightcomics`
            ? `orange darken-4`
            : ``
        "
      >
        <v-card-text class="pa-1">
          <v-list class="pa-0">
            <v-list-item class="px-0">
              <v-list-item-icon
                style="max-height: 80px; min-width:80px"
                class="ma-1 pa-0 mr-3"
              >
                <v-img
                  border
                  contain
                  height="80"
                  width="80"
                  :src="item.galleryURL"
                >
                  <template v-slot:placeholder>
                    <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                    >
                      <v-progress-circular
                        indeterminate
                        color="blue darken-1"
                      ></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </v-list-item-icon>
              <v-list-item-content class="py-1">
                <div class="caption">
                  {{ endDateText }} {{ item.listingInfo.endTime | date }}
                </div>

                <h3 class="my-2">{{ item.title }}</h3>

                <div>
                  <v-icon
                    left
                    x-small
                    v-if="item.sellerInfo.topRatedSeller"
                    class="mx-1"
                    >fa fa-medal</v-icon
                  >
                  {{ item.sellerInfo.sellerUserName }}
                </div>
              </v-list-item-content>
              <v-list-item-action>
                <div
                  class="d-flex flex-column endFlex justify-center align-end mr-2"
                >
                  <div class="d-flex align-center">
                    <h3 class="headline">
                      {{
                        item.sellingStatus.convertedCurrentPrice.amount
                          | currency
                      }}
                    </h3>
                  </div>
                  <div class="d-flex align-center">
                    <h4 class="subtitle-2">
                      {{ getShippingCost(item.shippingInfo) }}
                      <span class="caption">Shipping</span>
                    </h4>
                  </div>
                </div>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </V-scroll-y-transition>
  </div>
</template>

<script>
export default {
  props: ["items", "loading", "title", "endDateText", "listingsType"],
  methods: {
    getShippingCost(shippingInfo) {
      const { shippingServiceCost, shippingType } = shippingInfo;

      switch (shippingType) {
        case "Flat":
          return this.$options.filters.currency(shippingServiceCost.amount);
          break;
        case "Calculated":
          //tdodo handle this better
          return "Calc'd";
          break;
        case "Free":
          return "Free";
          break;
        default:
          return "n/a";
          break;
      }
    }
  }
};
</script>

<style scoped></style>

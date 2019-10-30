<template>
  <V-scroll-y-transition group>
    <v-card
      elevation="2"
      v-for="(item, index) in items"
      class="border mr-3"
      :key="`${item.site}-${Date.now()}-${index}`"
    >
      <v-card-text class="pa-1" :class="isMyListing(item.meta.sellersInfo)">
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
                :src="item.thumbnail"
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
            <v-list-item-content
              class="py-1 grey--text text--lighten-2"
              style="text-shadow: 1px 1px 1px #000;"
            >
              <div class="caption" v-if="listingsType">
                {{ endDateText }} {{ item.meta.listingDate.value | date }}
              </div>

              <h3 class="my-2">
                {{ item.title }}
              </h3>

              <div v-if="item.meta.sellersInfo">
                <v-icon
                  left
                  x-small
                  v-if="item.meta.sellersInfo.topRated"
                  class="mx-1"
                  >fa fa-medal</v-icon
                >
                {{ item.meta.sellersInfo.name }}
              </div>
            </v-list-item-content>
            <v-list-item-action>
              <div
                class="d-flex flex-column endFlex justify-center align-end mr-2"
              >
                <div class="d-flex align-center">
                  <h3 class="headline">
                    {{ item.price | currency }}
                  </h3>
                </div>
                <div class="d-flex align-center">
                  <div class="subtitle-2" v-if="item.meta.shippingInfo">
                    <div class="text-right w-100">
                      {{ item.meta.shippingInfo.shippingCost | currency }}
                    </div>
                    <div style="max-width:100px">
                      <div class="caption text-truncate">
                        {{ item.meta.shippingInfo.shippingType }}
                        Shipping
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </V-scroll-y-transition>
</template>

<script>
export default {
  props: ["items", "loading", "endDateText", "listingsType"],
  methods: {
    isMyListing(sellersInfo) {
      if (sellersInfo.name && sellersInfo.name === "searchlightcomics") {
        return "myListing";
      }
    }
  }
};
</script>

<style scoped>
.border {
  border: 0px;
  border-bottom: 2px solid #595959;
}
.myListing {
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  border-left: 10px solid orange;
}
</style>

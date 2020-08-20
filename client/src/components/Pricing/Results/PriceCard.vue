<template>
  <v-card elevation="2" class="border mr-3">
    <v-card-text class="pa-1" :class="isMyListing(item.meta.sellersInfo)">
      <v-list class="pa-0">
        <v-list-item class="px-0">
          <v-list-item-icon
            style="max-height: 80px; min-width:80px"
            class="ma-1 pa-0 mr-3"
          >
            <ImagesHoverOver
              :key="item.image"
              :imageFull="item.image"
              :imageThumb="item.thumbnail"
            />
          </v-list-item-icon>
          <v-list-item-content
            class="py-1 grey--text text--lighten-2"
            style="text-shadow: 1px 1px 1px #000;"
          >
            <div
              class="caption d-flex justify-content-start align-center"
              v-if="listingType"
            >
              <div class="d-flex justify-center">
                {{ endDateText }} {{ item.meta.listingDate.value | date }}
              </div>
              <div
                class="d-flex justify-center ml-1"
                v-if="item.meta.sellingStatus.bidCount > 0"
              >
                with
                {{ item.meta.sellingStatus.bidCount || 0 }} Bids
              </div>
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
</template>

<script>
import ImagesHoverOver from "@/components/Images/ImageHoverOver";

export default {
  components: {
    ImagesHoverOver
  },
  props: {
    item: [Boolean, Object],
    endDateText: [Boolean, String],
    listingType: [Boolean, String]
  },
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
  border: 6px solid orange;
}
</style>

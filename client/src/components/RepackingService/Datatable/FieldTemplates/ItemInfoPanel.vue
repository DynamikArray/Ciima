<template>
  <v-slide-x-reverse-transition mode="out-in">
    <div class="perComicPriceInfoPanel" :key="`transition_pricefield_${item.pkStockItemID}`">
      <div class="d-flex flex-column align-start my-3 w-100">
        <LinnworksItemTitle :keyString="item.pkStockItemID" :value="item.ItemTitle" fontClass="itemTitle" />

        <div class="metaPanel d-flex flex-row justify-start w-100  pa-1 flex-wrap-reverse">
          <div class="d-flex flex-column flex-grow-0">
            <div class="d-flex flex-row justify-space-between my-0">
              <div class="d-flex mr-3 align-center">
                <div class="mx-1">Issues:</div>
                <div class="body-1">
                  {{ item.TotalIssues }}
                </div>
              </div>

              <div class="d-flex mr-3 align-center">
                <div class="mx-1">Price:</div>
                <div class="body-1">
                  <LinnworksPrice :keyString="item.pkStockItemID" :value="item.CurrentListingPrice" fontClass="subtitle-1" />
                </div>
              </div>
            </div>

            <div class="d-flex flex-row justify-start my-0">
              <div class="d-flex mr-5 align-center">
                <div class="mx-1">Qty:</div>
                <div class="body-1">
                  <LinnworksQuantity :keyString="item.pkStockItemID" :value="item.Quantity" />
                </div>
              </div>
              <div
                class="d-flex mr-5 align-center"
                v-if="item.InOrderBook"
                :class="item.InOrderBook ? 'red darken-2 px-2  title shadowText' : ''"
              >
                <div class="mx-1">Iob:</div>
                <div>
                  <InOrderBookField :item="item" fieldName="InOrderBook" fontClass="title" />
                </div>
              </div>

              <div class="d-flex mr-5 align-center">
                <div class="mx-1">Created:</div>
                <div class="body-1">
                  <LinnworksTime :keyString="item.pkStockItemID" :value="item.CreationDate" fontClass="caption" />
                </div>
              </div>
            </div>
          </div>

          <div class="d-flex flex-row algin-start justify-space-between flex-grow-1 mx-4">
            <div class="d-flex align-start justify-start justify-lg-start">
              <v-chip color="grey darken-4">
                <LinnworksBinRackNumber :keyString="item.pkStockItemID" :value="item.LocationCode" />
              </v-chip>
            </div>

            <div class="d-flex align-start justify-start justify-lg-start">
              <LinnworksEbayLink
                v-if="item.ebayActive"
                :value="item.ebayItemNumber"
                :keyString="item.pkStockItemID"
                fontClass="caption"
                :btnColor="actionBtnColor"
                iconColor="white"
                :asIcon="false"
                iconString="fa fa-link"
                :iconText="actionBtnIconText"
                :iconSmall="true"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-slide-x-reverse-transition>
</template>

<script>
import LinnworksTime from "@/components/Shared/Datatable/FieldTemplates/DisplayOnly/LinnworksTime";
import LinnworksItemTitle from "@/components/Shared/Datatable/FieldTemplates/DisplayOnly/LinnworksTitle";
import LinnworksBinRackNumber from "@/components/Shared/Datatable/FieldTemplates/DisplayOnly/LinnworksBinRackNumber";
import LinnworksQuantity from "@/components/Shared/Datatable/FieldTemplates/DisplayOnly/LinnworksQuantity";
import LinnworksPrice from "@/components/Shared/Datatable/FieldTemplates/DisplayOnly/LinnworksPrice";
import InOrderBookField from "./InOrderBookField";
import LinnworksEbayLink from "@/components/Shared/Datatable/FieldTemplates/DisplayOnly/LinnworksEbayItemLink";

export default {
  name: "ItemInfoPanel",
  props: {
    item: {
      type: [Object]
    },
    actionBtnIconText: {
      type: [String],
      default: "View Listing"
    },
    actionBtnColor: {
      type: [String],
      default: "info"
    }
  },
  components: {
    LinnworksItemTitle,
    LinnworksBinRackNumber,
    LinnworksQuantity,
    InOrderBookField,
    LinnworksPrice,
    LinnworksTime,
    LinnworksEbayLink
  }
};
</script>

<style scoped>
.perComicPriceInfoPanel .v-chip {
  height: 25px;
}
.perComicPriceInfoPanel .metaPanel {
  font-size: 90%;
  border-radius: 4px;
}
.perComicPriceInfoPanel .itemTitle {
  font-size: 130% !important;
  font-weight: 500;
}
</style>

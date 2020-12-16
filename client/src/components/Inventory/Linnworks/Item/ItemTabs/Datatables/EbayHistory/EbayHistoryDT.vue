<template>
  <div>
    <h3 class="title white--text">
      Ebay Listing History
    </h3>
    <v-data-table
      :headers="headers"
      :items="items"
      :items-per-page="5"
      :loading="loading"
      loading-text="Loading..."
      :footer-props="footerProps"
      sort-by="endTime"
      :sort-desc="true"
    >
      <template v-slot:item.Active="{ item }">
        <LinnworksBoolean
          :value="item.Active"
          :keyString="item.pkListId"
          fontClass="caption"
        />
      </template>
      <template v-slot:item.startTime="{ item }">
        <LinnworksTime
          :value="item.startTime"
          :keyString="item.pkListId"
          fontClass="caption"
        />
      </template>
      <template v-slot:item.endTime="{ item }">
        <LinnworksTime
          :value="item.endTime"
          :keyString="item.pkListId"
          fontClass="caption"
        />
      </template>
      <template v-slot:item.ListingPrice="{ item }">
        <LinnworksListingPrice
          :value="item.ListingPrice"
          :keyString="item.pkListId"
          fontClass="body-1"
        />
      </template>
      <template v-slot:item.Qty="{ item }">
        <LinnworksQuantity
          :value="item.Qty"
          :keyString="item.pkListId"
          fontClass="caption"
        />
      </template>
      <template v-slot:item.ListingStatus="{ item }">
        <LinnworksStatus
          :value="item.ListingStatus"
          :keyString="item.pkListId"
          fontClass="caption"
        />
      </template>
      <template v-slot:item.RelistPending="{ item }">
        <LinnworksBoolean
          :value="item.RelistPending"
          :keyString="item.pkListId"
          fontClass="caption"
        />
      </template>
      <template v-slot:item.hasErrorMsg="{ item }">
        <LinnworksBoolean
          :value="item.hasErrorMsg"
          :keyString="item.pkListId"
          fontClass="caption"
        />
      </template>
    </v-data-table>
  </div>
</template>

<script>
import headers from "./headers";

import LinnworksBoolean from "@/components/Shared/Datatable/FieldTemplates/DisplayOnly/LinnworksBoolean";
import LinnworksTime from "@/components/Shared/Datatable/FieldTemplates/DisplayOnly/LinnworksTime";
import LinnworksQuantity from "@/components/Shared/Datatable/FieldTemplates/DisplayOnly/LinnworksQuantity";
import LinnworksListingPrice from "@/components/Shared/Datatable/FieldTemplates/DisplayOnly/LinnworksListingPrice";
import LinnworksStatus from "@/components/Shared/Datatable/FieldTemplates/DisplayOnly/LinnworksStatus";

export default {
  props: {
    items: {
      type: [Array]
    },
    loading: {
      type: [Boolean]
    }
  },
  components: {
    LinnworksBoolean,
    LinnworksTime,
    LinnworksQuantity,
    LinnworksListingPrice,
    LinnworksStatus
  },
  data: () => ({
    headers,
    footerProps: {
      "items-per-page-options": [5, 10]
    }
  })
};
</script>

<style scoped></style>

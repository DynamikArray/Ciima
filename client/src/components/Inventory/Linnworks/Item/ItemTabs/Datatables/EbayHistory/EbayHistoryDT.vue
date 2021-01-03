<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="items"
      :items-per-page="5"
      :loading="loading"
      loading-text="Loading..."
      :footer-props="footerProps"
      sort-by="endTime"
      :sort-desc="true"
      :hide-default-footer="true"
    >
      <template v-slot:top="{ pagination, options, updateOptions }">
        <TitleAndPager
          title="Ebay History"
          :pagination="pagination"
          :options="options"
          :updateOptions="updateOptions"
          :footerProps="footerProps"
        />
      </template>

      <template v-slot:item.Active="{ item }">
        <LinnworksBoolean
          :value="item.Active"
          :keyString="item.pkListId"
          fontClass="caption"
          activeIcon="fa fa-thumbs-up"
          inActiveIcon="fa fa-calendar"
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
          :isActive="item.Active"
          :listingStatus="item.ListingStatus"
          :hasErrorMsg="item.hasErrorMsg"
          :errorMessage="item.errorMessage"
          :keyString="item.pkListId"
          fontClass="caption"
        />
      </template>

      <template v-slot:item.ItemNumber="{ item }">
        <LinnworksEbayLink
          :value="item.ItemNumber"
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
import LinnworksEbayLink from "@/components/Shared/Datatable/FieldTemplates/DisplayOnly/LinnworksEbayItemLink";
import TitleAndPager from "@/components/Shared/Datatable/SlotTemplates/TitleAndPager";

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
    LinnworksStatus,
    LinnworksEbayLink,
    TitleAndPager
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

<template>
  <div class="w-100 h-100">
    <CustomPager
      key="topPager"
      align="end"
      :limit.sync="limit"
      :page="page"
      :pageCount="pageCount"
      :pageLimit="pageLimit"
      :rowsTotal="rowsTotal"
      :getData="getData"
    />

    <v-data-table
      :headers="headers"
      :items="items"
      :loading="loading"
      loading-text="Loading..."
      :items-per-page="limit"
      hide-default-footer
      :footer-props="footerProps"
    >
      <template v-slot:item.ourImageUrl="{ item }">
        <OurIssueImage
          style="min-height:60px"
          :imageUrl="item.ourImageUrl"
          :onClick="() => ({})"
        />
      </template>

      <template v-slot:item.theirImageThumbnail="{ item }">
        <TheirIssueImage
          :thumbnail="item.theirImageThumbnail"
          :fullsize="item.theirImageFullsize"
          :onClick="() => ({})"
        />
      </template>

      <template v-slot:item.ourPricesFromThem="{ item }">
        <Prices :prices="item.ourPricesFromThem" />
      </template>

      <template v-slot:item.dateCreated="{ item }">
        {{ item.dateCreated | dateTime }}
      </template>
      <template v-slot:item.dateUpdated="{ item }">
        {{ item.dateCreated | dateTime }}
      </template>
    </v-data-table>

    <CustomPager
      key="bottomPager"
      :limit="limit"
      :page="page"
      :pageCount="pageCount"
      :pageLimit="pageLimit"
      :rowsTotal="rowsTotal"
      :getData="getData"
    />
  </div>
</template>

<script>
import { headers } from "./tableHeaders";

import Prices from "./Templates/Prices";
import OurIssueImage from "./Templates/OurIssueImage";
import TheirIssueImage from "./Templates/TheirIssueImage";
import CustomPager from "@/components/Datatable/Pager/CustomPager";

export default {
  props: {
    limit: [Number],
    items: [Boolean, Array],
    pagination: [Boolean, Object],
    loading: [Boolean],
    getData: [Function]
  },
  components: {
    OurIssueImage,
    TheirIssueImage,
    Prices,
    CustomPager
  },
  data: () => ({
    headers,
    footerProps: {}
  }),
  computed: {
    page() {
      return this.pagination.page;
    },
    pageCount() {
      return this.pagination.pageCount;
    },
    pageLimit() {
      return this.pagination.pageLimit;
    },
    rowsTotal() {
      return this.pagination.rowsTotal;
    }
  }
};
</script>

<style scoped></style>

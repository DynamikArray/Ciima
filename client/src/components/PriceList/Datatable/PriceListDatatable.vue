<template>
  <div class="w-100 h-100">
    <CustomPager
      key="topPager"
      align="end"
      :limit="limit"
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
      <template v-slot:item.ourTitle="{ item }">
        <h4>{{ item.ourTitle }}</h4>
      </template>

      <template v-slot:item.theirTitle="{ item }">
        <h4>{{ item.theirTitle }}</h4>
      </template>

      <template v-slot:item.ourImageUrl="{ item }">
        <OurIssueImage
          class="ma-1"
          style="min-height:60px"
          :imageUrl="item.ourImageUrl"
          :onClick="showOurFullSize"
        />
      </template>

      <template v-slot:item.theirImageThumbnail="{ item }">
        <TheirIssueImage
          class="ma-1"
          :thumbnail="item.theirImageThumbnail"
          :fullsize="item.theirImageFullsize"
          :onClick="showTheirFullSize"
        />
      </template>

      <template v-slot:item.ourPricesFromThem="{ item }">
        <Prices :prices="item.ourPricesFromThem" />
      </template>

      <template v-slot:item.dateCreated="{ item }">
        <h5 class="">{{ item.dateCreated | dateTime }}</h5>
      </template>
      <template v-slot:item.dateUpdated="{ item }">
        <h5 class="">{{ item.dateUpdated | dateTime }}</h5>
      </template>

      <!--ACTION COLUMN-->
      <template v-slot:item.action="{ item }">
        <ActionButtons :item="item" :getData="getData" />
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

    <v-dialog v-model="previewImage" max-width="550">
      <v-card color="secondary darken-3" dark class="pt-2">
        <v-card-text>
          <v-img :src="previewImageUrl" max-height="750" contain></v-img>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { headers } from "./Templates/tableHeaders";
import Prices from "./Templates/Prices";
import OurIssueImage from "./Templates/OurIssueImage";
import TheirIssueImage from "./Templates/TheirIssueImage";
import ActionButtons from "./Templates/ActionButtons";
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
    ActionButtons,
    CustomPager
  },
  data: () => ({
    headers,
    footerProps: {},
    previewImage: false,
    previewImageUrl: false
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
  },
  methods: {
    showTheirFullSize(imageUrl) {
      this.previewImageUrl = imageUrl;
      this.previewImage = true;
    },
    showOurFullSize(imageUrl) {
      this.previewImageUrl = imageUrl;
      this.previewImage = true;
    }
  }
};
</script>

<style scoped></style>

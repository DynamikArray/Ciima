<template>
  <div>
    <div class="text-left pa-2">
      <div class="d-flex align-center justify-space-between">
        <div class="d-flex align-center justify-start">
          <h3 class="subtitle">Record Count: {{ items.length }}</h3>
        </div>
        <div class="d-flex align-center justify-end">
          <div>
            <v-btn @click="fetchData" color="primary">
              <v-icon class="mr-2">fa fa-sync</v-icon>
              Refresh
            </v-btn>
          </div>
        </div>
      </div>
    </div>
    <V-divider />
    <PriceSyncDatatable
      :items="items"
      :loading="loading"
      @rowUpdated="fetchData"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { GET_OUT_OF_SYNC_PRICES } from "@/store/action-types";

import PriceSyncDatatable from "./Datatable/PriceSyncDatatable";

export default {
  components: {
    PriceSyncDatatable
  },
  created() {
    this.fetchData();
  },
  data: () => ({}),
  computed: {
    ...mapGetters({
      items: "linnworks/priceSync/getItems",
      loading: "linnworks/priceSync/getLoading"
    })
  },
  methods: {
    fetchData() {
      this.$store.dispatch(`linnworks/priceSync/${GET_OUT_OF_SYNC_PRICES}`, {});
    }
  }
};
</script>

<style scoped></style>

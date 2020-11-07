<template>
  <div>
    <div class="text-left pa-2">
      <h3 class="subtitle">Record Count: {{ items.length }}</h3>
    </div>
    <V-divider />
    <PriceSyncDatatable :items="items" :loading="loading" />
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

<template>
  <div class="whatnot-sales-data-grid">
    <v-data-table
      class="flex-grow-1"
      :headers="headers"
      :items="getItems"
      :loading="getLoading"
      :footer-props="footerProps"
      :group-by="groupBy"
    >
      <template v-slot:top="{ pagination, options, updateOptions }">
        <div class="dtSlotTop d-flex flex-row align-center justify-space-between pa-1">
          <div class="d-flex justify-start align-center mx-3 mt-2">
            <div class="d-flex flex-row align-start">
              <h3 class="mr-4 mt-2">Grouping Options</h3>
              <v-radio-group row v-model="groupBy">
                <div class="d-flex flex-row">
                  <v-radio dense color="primary" label="Date" value="saleDate"></v-radio>
                  <v-radio dense color="primary" label="Buyer" value="buyer"></v-radio>
                  <v-radio dense color="primary" label="Tracking" value="tracking"></v-radio>

                  <div class="d-flex ">
                    <v-btn secondary class="" @click="groupBy = []">Clear</v-btn>
                  </div>
                </div>
              </v-radio-group>
            </div>
          </div>

          <div class="d-flex justify-end align-center mx-1">
            <v-data-footer
              :pagination="pagination"
              :options="options"
              @update:options="updateOptions"
              items-per-page-text="$vuetify.dataTable.itemsPerPageText"
              :items-per-page-options="footerProps['items-per-page-options']"
            />
          </div>
        </div>
        <div class="w-100">
          <v-divider class="my-1" />
        </div>
      </template>

      <template v-slot:group.header="{ group, groupBy, items, isOpen, toggle }">
        <th colspan="9">
          <span>
            <span class="capitalizeFirstLetter subtitle-2" v-for="name in groupBy" :key="name">{{ name }}</span>
            <span class="mx-2">-</span>
            <span class="subtitle-1">{{ group }}</span>
          </span>
        </th>
      </template>

      <template v-slot:item.saleDate="{ item }">
        <v-slide-x-reverse-transition mode="out-in">
          <div class="caption" :key="`transition_${item.order_id})_saleDate`">{{ item.saleDate }}</div>
        </v-slide-x-reverse-transition>
      </template>

      <template v-slot:item.order_id="{ item }">
        <v-slide-x-reverse-transition mode="out-in">
          <div class="body-1" :key="`transition_${item.order_id}_order_id`">{{ item.order_id }}</div>
        </v-slide-x-reverse-transition>
      </template>

      <template v-slot:item.buyer="{ item }">
        <v-slide-x-reverse-transition mode="out-in">
          <div class="subtitle-1" :key="`transition_${item.order_id}_buyer`">
            <v-btn class="mr-1" icon @click="handleBuyerSelect(item.buyer)"><v-icon small>fas fa-filter</v-icon></v-btn>
            {{ item.buyer }}
          </div>
        </v-slide-x-reverse-transition>
      </template>

      <template v-slot:item.product_name="{ item }">
        <v-slide-x-reverse-transition mode="out-in">
          <div class="caption" :key="`transition_${item.order_id}_product_name`">{{ item.product_name }}</div>
        </v-slide-x-reverse-transition>
      </template>

      <template v-slot:item.product_description="{ item }">
        <v-slide-x-reverse-transition mode="out-in">
          <div class="caption" :key="`transition_${item.order_id}_product_description`">{{ item.product_description }}</div>
        </v-slide-x-reverse-transition>
      </template>

      <template v-slot:item.sold_price="{ item }">
        <v-slide-x-reverse-transition mode="out-in">
          <div class="subtitle-2" :key="`transition_${item.order_id}_sold_price`">{{ item.sold_price | currency }}</div>
        </v-slide-x-reverse-transition>
      </template>

      <template v-slot:item.cancelled="{ item }">
        <v-slide-x-reverse-transition mode="out-in">
          <div class="caption" :key="`transition_${item.order_id}_cancelled`">{{ item.cancelled }}</div>
        </v-slide-x-reverse-transition>
      </template>

      <template v-slot:item.bundled="{ item }">
        <v-slide-x-reverse-transition mode="out-in">
          <div class="caption" :key="`transition_${item.order_id}_bundled`">{{ item.bundled }}</div>
        </v-slide-x-reverse-transition>
      </template>

      <template v-slot:item.tracking="{ item }">
        <v-slide-x-reverse-transition mode="out-in">
          <div class="caption" :key="`transition_${item.order_id}_tracking`">{{ item.tracking }}</div>
        </v-slide-x-reverse-transition>
      </template>

      <template v-slot:item.shipment_manifest="{ item }">
        <v-slide-x-reverse-transition mode="out-in">
          <div v-if="item.shipment_manifest" class="caption" :key="`transition_${item.order_id}_shipment_manifest`">
            <a :href="item.shipment_manifest" target="_blank"><v-icon>fas fa-shipping-fast</v-icon></a>
          </div>
        </v-slide-x-reverse-transition>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { headers } from "@/components/Whatnot/Datatables/settings/config.js";
import { mapGetters } from "vuex";

export default {
  name: "Whatnot-Sales-DataGrid",
  data: () => ({
    groupBy: [],
    headers: headers,
    footerProps: {
      "items-per-page-options": [5, 10, 25, 50]
    }
  }),
  computed: {
    ...mapGetters({
      getItems: "whatnot/getItems",
      getLoading: "whatnot/getLoading"
    })
  },
  methods: {
    handleBuyerSelect(buyer) {
      this.$emit("buyerSelected", { buyer });
    }
  }
};
</script>

<style>
.capitalizeFirstLetter {
  text-transform: capitalize;
}

.whatnot-sales-data-grid .v-data-table__wrapper {
  overflow-x: hidden !important;
}

.whatnot-sales-data-grid .dtSlotTop .v-input--radio-group {
  margin-top: 0px;
}

.dtSlotTop .v-data-footer {
  border-top: 0px !important;
  margin-top: 4px;
}

.dtSlotTop .v-data-footer .v-select {
  margin: 0 0 0 34px !important;
}
</style>

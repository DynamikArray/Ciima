<template>
  <div>
    <v-card class="elevation-1">
      <v-card-text class="">
        <div class="d-flex justify-space-between">
          <SearchForm class="d-flex grow align-center" />
        </div>
      </v-card-text>
    </v-card>

    <v-divider class="my-3"></v-divider>

    <v-data-table
      :loading="loading"
      :headers="headers"
      :items-per-page="20"
      :items="inventory"
      class="elevation-1"
    >
      <template v-slot:item.imgThumb="{ item }">
        <ImagesHoverOver
          :imageFull="item.imageFull"
          :imageThumb="item.imageThumb"
        />
      </template>

      <template v-slot:item.location.name="{ item }">
        <EditFieldDialog
          :key="item.stockItemId"
          :originalValue.sync="item.location.name"
          :itemId="item.stockItemId"
          :locationId="item.location.id"
          fieldName="BinRack"
          :textfieldWidth="320"
        ></EditFieldDialog>
      </template>

      <template v-slot:item.location.qty="{ item }">
        <EditFieldDialog
          :key="item.stockItemId"
          :originalValue.sync="item.location.qty"
          :itemId="item.stockItemId"
          :locationId="item.location.id"
          fieldName="StockLevel"
          :textfieldWidth="150"
        ></EditFieldDialog>
      </template>

      <template v-slot:item.action="{ item }">
        <button>Action</button>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { headers } from "./tableConfig.js";
import SearchForm from "@/components/Inventory/Search/SearchForm";
import UpdateDialog from "./UpdateDialog";
import ImagesHoverOver from "@/components/Images/ImageHoverOver";
import EditFieldDialog from "./EditFieldDialog";

export default {
  components: {
    SearchForm,
    UpdateDialog,
    ImagesHoverOver,
    EditFieldDialog
  },
  data() {
    return {
      headers,
      returnValue: false
    };
  },
  computed: {
    ...mapState({
      loading: state => state.linnworks.loading,
      inventory: state => state.linnworks.items
    })
  },
  methods: {
    getMainImage(images, property) {
      if (!images.length > 0) return false;
      const mainImage = images.filter(image => image.IsMain);
      return mainImage[0][property];
    }
  }
};
</script>

<style scoped></style>

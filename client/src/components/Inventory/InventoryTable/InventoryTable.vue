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
          :imageThumb="item.imageFull"
        />
      </template>

      <template v-slot:item.location.name="{ item }">
        <v-edit-dialog
          :return-value.sync="returnValue"
          @save="save"
          @cancel="cancel"
          @open="open"
          @close="close"
        >
          {{ item.location.name }}
          <template v-slot:input>
            <v-text-field
              v-model="item.location.name"
              :rules="[max55chars]"
              label="Edit"
              single-line
              counter
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>

      <template v-slot:item.action="{ item }">
        <button>Action</button>
      </template>
    </v-data-table>

    <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
      {{ snackText }}
      <v-btn text @click="snack = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
/*
<template v-slot:item.Images="{ item }">
  <ImagesHoverOver
    :imageFull="getMainImage(item.Images, `FullSource`)"
    :imageThumb="getMainImage(item.Images, `Source`)"
  />
</template>

<template v-slot:item.StockLevels="{ item }">
  <div v-html="createStockLevels(item.StockLevels)" />
</template>

<template v-slot:item.StockItemId="{ item }">
  <div v-html="createStockLocations(item.StockLevels)" />
</template>
 */
import { mapState } from "vuex";
import { headers } from "./tableConfig.js";
import SearchForm from "@/components/Inventory/Search/SearchForm";
import UpdateDialog from "./UpdateDialog";
import ImagesHoverOver from "@/components/Images/ImageHoverOver";

export default {
  components: {
    SearchForm,
    UpdateDialog,
    ImagesHoverOver
  },
  data() {
    return {
      headers,
      max55chars: v => v.length <= 55 || "Input too long!",
      snack: false,
      snackColor: "",
      snackText: "",
      returnValue: false
    };
  },
  computed: {
    ...mapState({
      loading: state => state.linnworks.loading,
      inventory: state => state.linnworks.items
    })
  },
  watch: {
    returnValue: newVal => {
      console.log("RETURN VALUE WATHC, ", newVal);
    }
  },
  methods: {
    getMainImage(images, property) {
      if (!images.length > 0) return false;
      const mainImage = images.filter(image => image.IsMain);
      return mainImage[0][property];
    },
    save() {
      //this could call the update at the api level
      //if oka then yeah
      console.log("Dialog save");

      this.snack = true;
      this.snackColor = "success";
      this.snackText = "Data saved";
    },
    cancel() {
      console.log("Dialog cance");
      this.snack = true;
      this.snackColor = "error";
      this.snackText = "Canceled";
    },
    open() {
      console.log("Dialog open", this.snack);
      this.snack = true;
      this.snackColor = "info";
      this.snackText = "Dialog opened";
    },
    close() {
      console.log("Dialog closed");
    }
    /*
    convertBlnToYesNo() {
      if (this.blnSetsOnly) return "Yes";
      return "No";
    },
    createStockLevels(stockLevels) {
      if (stockLevels.length === 0) return "-";
      const levels = stockLevels.map(local => {
        return `<div>
          ${local.StockLevel}
        </div>`;
      });
      return levels.join("");
    },
    createStockLocations(stockLevels) {
      if (stockLevels.length === 0) return "-";
      const locations = stockLevels.map(local => {
        if (local.Location) {
          return `<div> ${local.Location.BinRack} </div>`;
        }
      });
      return locations.join("");
    }
    */
  }
};
</script>

<style scoped></style>

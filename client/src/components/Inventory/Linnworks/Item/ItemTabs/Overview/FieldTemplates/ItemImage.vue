<template>
  <v-dialog
    v-model="dialog"
    width="720"
    :scrollable="true"
    overlay-color="grey darken-4"
    overlay-opacity=".7"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-slide-x-reverse-transition mode="out-in">
        <div class="" :key="`activator_${mainImageUrl}`">
          <div
            v-bind="attrs"
            v-on="on"
            :style="`min-height: 100px;`"
            class="d-flex justify-center mx-auto pa-1 hover"
          >
            <div class="d-flex align-center justify-center">
              <v-img
                v-if="mainImageUrl"
                :key="`thumb_${mainImageUrl}`"
                :src="mainImageUrl"
                :style="`max-width: 200px; max-height: 280px;`"
                contain
              >
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular
                      indeterminate
                      color="blue darken-1"
                    ></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
            </div>
          </div>
        </div>
      </v-slide-x-reverse-transition>
    </template>

    <v-card class="">
      <v-card-text class="text-center py-1">
        <v-img
          v-if="mainImageUrl"
          :key="`main_${mainImageUrl}`"
          :src="mainImageUrl"
          :style="`max-height: 600px;`"
          class="mx-auto"
          contain
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="blue darken-1"
                size="300"
                width="25"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import ImagesModal from "@/components/Images/ImagesModal/ImagesModal";
export default {
  props: {
    imageUrl: {
      type: [String],
      default: ""
    }
  },
  components: {
    ImagesModal
  },
  data: () => ({
    dialog: false
  }),
  computed: {
    mainImageUrl() {
      return this.imageUrl;
    }
  }
};
</script>

<style scoped></style>

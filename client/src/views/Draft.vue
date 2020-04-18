<template>
  <section style="min-height:100%; height: 100%">
    <v-container
      fluid
      style="min-height:100%; height: 100%"
      v-if="defaultProductType !== 'lots'"
    >
      <v-row>
        <v-col>
          <div class="d-flex justify-start align-center">
            <div class="d-flex align-baseline">
              <h2 class="display-1 mr-1">
                {{ defaultProductType | capitalizeFirst }}
              </h2>
              <h2 class="">- Draft Form :</h2>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <SetDraftForm v-if="defaultProductType !== 'lots'"></SetDraftForm>
    </v-container>

    <v-container
      fluid
      style="min-height:100%; height: 100%"
      v-if="defaultProductType == 'lots'"
    >
      <LotDraftForm v-if="defaultProductType == 'lots'"></LotDraftForm>
    </v-container>
  </section>
</template>

<script>
import { mapState } from "vuex";

import SetDraftForm from "@/components/Draft/DraftForm";
import LotDraftForm from "@/components/Draft/Lot/LotDraftForm";

export default {
  components: {
    SetDraftForm,
    LotDraftForm
  },
  computed: {
    ...mapState({
      defaultProductType: state => state.settings.defaultProductType
    })
  }
};
</script>

<style scoped></style>

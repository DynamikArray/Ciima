<template>
  <section style="min-height:100%; height: 100%">
    <v-container
      fluid
      style="min-height:100%; height: 100%"
      v-if="usesSetsForm"
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
      <SetDraftForm v-if="usesSetsForm"></SetDraftForm>
    </v-container>

    <v-container
      fluid
      style="min-height:100%; height: 100%"
      v-if="defaultProductType == 'lots'"
    >
      <LotDraftForm />
    </v-container>

    <v-container
      fluid
      style="min-height:100%; height: 100%"
      v-if="defaultProductType == 'gtc'"
    >
      <GtcDraftForm />
    </v-container>
  </section>
</template>

<script>
import { mapState } from "vuex";

import SetDraftForm from "@/components/Draft/SetsDraftForm";
import LotDraftForm from "@/components/Draft/Lot/LotDraftForm";
import GtcDraftForm from "@/components/Draft/Gtc/GtcDraftForm";

export default {
  components: {
    SetDraftForm,
    LotDraftForm,
    GtcDraftForm
  },
  computed: {
    ...mapState({
      defaultProductType: state => state.settings.defaultProductType
    }),
    usesSetsForm() {
      switch (this.defaultProductType) {
        case "sets":
          return true;
          break;
        case "singles":
          return true;
          break;
        case "adult":
          return true;
          break;
        default:
          return false;
      }
    }
  }
};
</script>

<style scoped></style>

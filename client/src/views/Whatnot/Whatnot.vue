<template>
  <v-container fluid style="min-height:100%">
    <v-row>
      <v-col class="pt-0">
        <WhatnotContainer />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import WhatnotContainer from "@/components/Whatnot/WhatnotContainer";
export default {
  components: {
    WhatnotContainer
  }
};
</script>

<style scoped></style>

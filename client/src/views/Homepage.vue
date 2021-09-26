<template>
  <section>
    <!-- Inputter Dashboard -->
    <InputterDashboard v-if="!isManager" />
    <ManagerDashboard v-if="isManager" />
    <!-- Manager Dashboard -->
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import InputterDashboard from "@/components/Dashboard/InputterDashboardContainer";
import ManagerDashboard from "@/components/Dashboard/Manager/ManagerDashboardContainer";

import LoginForm from "@/components/LoginForm/LoginForm";
export default {
  components: {
    InputterDashboard,
    ManagerDashboard
  },
  computed: {
    ...mapGetters({
      isManager: "user/isManager"
    })
  },
  created() {
    /*
    if (this.isManager) {
      this.$router.push({ name: "analytics" });
    }
    */
  }
};
</script>

<style scoped>
.username {
  font-size: 135%;
  font-weight: light;
}
</style>

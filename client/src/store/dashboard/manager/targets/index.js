import { DASHBOARD_MANAGER_TARGETS_FETCH } from "@/store/action-types";
import { DASHBOARD_MANAGER_TARGETS_LOADING, DASHBOARD_MANAGER_TARGETS_RESULTS } from "@/store/mutation-types";
import targetForm from "./targetForm";

const targets = {
  namespaced: true,
  modules: {
    targetForm
  },
  state: {
    items: [],
    loading: false
  },
  getters: {
    userTargetItems: state => {
      return state.items;
    },
    userTargetItemsLoading: state => {
      return state.loading;
    }
  },
  mutations: {
    [DASHBOARD_MANAGER_TARGETS_LOADING](state, data) {
      state.loading = data.loading;
    },
    [DASHBOARD_MANAGER_TARGETS_RESULTS](state, items) {
      state.items = items;
    }
  },
  actions: {
    async [DASHBOARD_MANAGER_TARGETS_FETCH]({ dispatch, commit }, params) {
      await dispatch(
        "api/requestHandler",
        {
          method: "get",
          url: "/managers/userTargets",
          params: params,
          success: `dashboard/manager/targets/${DASHBOARD_MANAGER_TARGETS_RESULTS}`,
          loading: `dashboard/manager/targets/${DASHBOARD_MANAGER_TARGETS_LOADING}`
        },
        { root: true }
      );
    }
  }
};

export default targets;

export const defaultFormFields = [
  "userId",
  "userName",
  "startDate",
  "endDate",
  "targetValue",
  "blnEditMode",
  "dialogVisible"
];

const defaultFormState = {
  id: 0,
  userId: "",
  userName: "",
  startDate: "",
  endDate: "",
  targetValue: "",
  blnEditMode: false,
  dialogVisible: false
};

import { getField, updateField } from "vuex-map-fields";

import {
  DASHBOARD_MANAGER_TARGETS_FORM_ADD,
  DASHBOARD_MANAGER_TARGETS_FORM_EDIT,
  DASHBOARD_MANAGER_TARGETS_FORM_DELETE
} from "@/store/action-types";
import { DASHBOARD_MANAGER_TARGETS_FORM_LOAD, DASHBOARD_TARGET_FORM_RESET } from "@/store/mutation-types";

const targetForm = {
  namespaced: true,
  state: { ...defaultFormState },
  getters: {
    getField
  },
  mutations: {
    updateField,
    [DASHBOARD_TARGET_FORM_RESET](state) {
      state.id = 0;
      state.userId = "";
      state.userName = "";
      state.targetValue = "";
      state.blnEditMode = false;
    },
    [DASHBOARD_MANAGER_TARGETS_FORM_LOAD](state, item) {
      state.id = item.id;
      state.userId = item.userId;
      state.targetValue = item.targetValue;
      state.startDate = item.startDate;
      state.endDate = item.endDate;
      state.blnEditMode = item.blnEditMode;
      state.dialogVisible = item.dialogVisible;
    }
  },
  actions: {
    async [DASHBOARD_MANAGER_TARGETS_FORM_ADD]({ dispatch, commit }, params) {
      return await dispatch(
        "api/requestHandler",
        {
          method: "post",
          url: "/managers/userTargets",
          params: params
        },
        { root: true }
      );
    },
    async [DASHBOARD_MANAGER_TARGETS_FORM_EDIT]({ dispatch, commit }, params) {
      return await dispatch(
        "api/requestHandler",
        {
          method: "put",
          url: "/managers/userTargets",
          params: params
        },
        { root: true }
      );
    },
    async [DASHBOARD_MANAGER_TARGETS_FORM_DELETE]({ dispatch, commit }, params) {
      return await dispatch(
        "api/requestHandler",
        {
          method: "delete",
          url: "/managers/userTargets",
          params: params
        },
        { root: true }
      );
    }
  }
};

export default targetForm;

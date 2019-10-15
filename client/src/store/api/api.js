import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import { axiosInstance, createInterceptor } from "@/util/axios/axiosInstance";

import {
  ADD_API_CALL,
  REMOVE_API_CALL,
  UPDATE_LOADING_SCREEN_FLAG
} from "../mutation-types";

const api = {
  namespaced: true,
  state: {
    loading: false,
    useLoadingScreen: false,
    error: false
  },
  mutations: {
    [ADD_API_CALL](state, payload) {
      state.loading++;
    },
    [REMOVE_API_CALL](state, payload) {
      state.loading--;
    },
    [UPDATE_LOADING_SCREEN_FLAG](state, payload) {
      state.useLoadingScreen = payload;
    }
  },
  getters: {
    loadingState: state => {
      return state.loading;
    }
  },
  actions: {
    requestHandler: async ({ dispatch, commit }, payload) => {
      //create axios interceptor by passing our logout function to our helper
      //and then pull off the function it returns
      const { expired } = createInterceptor(() => {
        dispatch("user/logout", false, { root: true });
      });
      axiosInstance.interceptors.response.use(undefined, expired);

      //pull of payload params
      const { method, url, params, success, loading, toastr } = payload;

      //handle loading indicator
      //see if we passed a callback function with the payload,
      //create local copy, remove it from params
      let callback = false;
      if (params && params.callback) {
        callback = params.callback;
        delete params.callback;
      }

      if (loading)
        commit(loading, { loading: true, items: false }, { root: true });

      //config requests
      let config = { method, url: `${url}`, success };

      //set params for request
      if (method === "post") config.data = { ...params };
      if (method === "get") config.params = { ...params };

      /*  NOT YET USED OR TESTED
      //special handler to transform PUT requests querystring
      if (method === "put" && asParams) config.params = { ...params };
      if (method === "put" && !asParams) config.data = { ...params };
      */

      //try the api call
      try {
        //simple attempt at requst tracking
        commit(`${ADD_API_CALL}`);

        const response = await axiosInstance({
          ...axiosInstance.defaults,
          ...config
        });

        const { data } = response;

        //hande results of api call data.result
        if (data.result && !data.error) {
          commit(success, data.result, { root: true });
          if (toastr) {
            let resp = `Success!`;
            if (typeof data.result === "string")
              resp = `<h4>${resp}</h4><p>${data.result}</p>`;
            toastr.s(resp);
          }
          return { result: success };
        }
        //handle error from our server that we created
        if (data.error && !data.result) {
          commit(success, { error: data.error }, { root: true });

          //TODO ALERT THIS BETTER DOES  TOAST WORK
          let resp = `An Error Occured!`;
          if (toastr) {
            resp = `<h4>${data.error}</h4><p>${data.message}</p>`;
            toastr.e(resp);
          }
          console.error("API ERROR:", data.error);
          return { error: data.error };
        }
      } catch (error) {
        //see if this an error we handled on our server
        const { data } = error.response;

        //TODO ALERT THIS BETTER DOES  TOAST WORK
        let resp = `An Error Occured!`;
        if (toastr) {
          if (data) {
            resp = `<h4>${data.error}</h4><p>${data.message}</p>`;
          } else {
            resp = `<h4>${resp}</h4><p>${error}</p>`;
          }
          toastr.e(resp);
        }

        throw new Error(data.message);
      } finally {
        commit(`${REMOVE_API_CALL}`);
        if (loading) commit(loading, { loading: false }, { root: true });
      }
    }
  }
};

export default api;

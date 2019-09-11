import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const axios = require("axios");
//import axiosRetry from "axios-retry";
//axiosRetry(axios, { retries: 2 });

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
      //pull of payload params
      const { method, url, params, success, loading } = payload;
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

        const response = await axios(config);
        const { data } = response;

        //hande results of api call data.result
        if (data.result && !data.error) {
          if (callback) {
            callback(data.result);
          }
          commit(success, data.result, { root: true });
        }

        //handle error from our server that we created
        if (data.error && !data.result) {
          // we caught and reported back to the user
          _this.$toastr.e("An API Error occured");
          console.error(data.error);
        }
      } catch (error) {
        //axios-retry will have retried any requests if they get this failed we need
        //to tell the user an error occured
        _this.$toastr.e("An API Error occured");
        console.error(error);
        //throw new Error(error);
        //apiErrorHandler(dispatch, error);
      } finally {
        commit(`${REMOVE_API_CALL}`);
        if (loading) commit(loading, { loading: false }, { root: true });
      }
    }
  }
};

export default api;

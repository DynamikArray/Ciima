const EbayAuthToken = require("ebay-oauth-nodejs-client");
const axios = require("axios");

const NodeCache = require("node-cache");

class EbayClient {
  retryAttempt = 0;

  ebayAuthToken;
  axiosInstance;
  logger;
  cache;

  /**
   * [constructor description]
   */
  constructor({ clientID, clientSecret }, logger = false) {
    //setup logger
    this.logger = logger;

    //set up cache
    this.cache = new NodeCache({
      checkperiod: 10,
      deleteOnExpire: true,
    });

    //set up cache event handlers
    this.cache.on("set", (key, val) => this.logCacheSet(key, this.logger));
    this.cache.on("expired", (key, val) => this.logCacheExpired(key, this.logger));

    //define our token ojbect
    this.ebayAuthToken = new EbayAuthToken({
      clientId: clientID,
      clientSecret: clientSecret,
    });

    //init last
    this.init();
  }

  //init - create axios instance, setup interceptros
  async init() {
    this.axiosInstance = axios.create();
    this.axiosInstance.interceptors.request.use(async (config) => {
      const token = await this.getCachedAccessToken();
      config.headers = {
        ...config.headers,
        Authorization: "Bearer " + token,
        "Accept-Encoding": "application/gzip",
      };
      return config;
    });
    this.axiosInstance.interceptors.response.use(this.handleSuccess, async (error) => {
      console.log("Retry Attempt", this.retryAttempt);
      if (error.config && error.response && error.response.status === 401 && this.retryAttempt < 1) {
        this.retryAttempt++;
        const token = await this.getCachedAccessToken();
        error.config.headers = {
          ...error.config.headers,
          Authorization: "Bearer " + token,
        };

        return this.axiosInstance.request(error.config);
      }
      return this.handleError(error, this.logger);
    });
  }

  async getCachedAccessToken() {
    let accessToken = this.cache.get("ebayAccessToken");
    if (accessToken == undefined) {
      this.logger.info("Cache Missed for Ebay Token");
      const { token, expires_in } = await this.getApplicationAccessToken();
      this.cache.set("ebayAccessToken", token, expires_in - 60);
      accessToken = token;
    }
    return accessToken;
  }

  async getApplicationAccessToken() {
    const tokenJson = await this.ebayAuthToken.getApplicationToken("PRODUCTION");
    const tokenObject = JSON.parse(tokenJson);
    return { token: tokenObject.access_token, expires_in: tokenObject.expires_in };

    /*
    let accessToken =
      "v^1.1#i^1#I^3#f^0#p^1#r^0#t^H4sIAAAAAAAAAOVYbWwURRjuXq8HFdAgX5Xw41wgIYW7m929j+3KHbm2YA/b68edpRIJ7O7Ntkv3do+dWa6NIWmaiJgYRVJC4gdUkEAwAWuiJsSSSPzhHxJEgxgTvtTgL4EooGiCs9truVYCSC+xiZdNLvPOO+88zzPvOzO7oM9TWb29YfutWdQ012Af6HNRFDMDVHoqlj9e7lpYUQaKHKjBviV97v7yn1ciMavlhDaIcoaOoLcnq+lIcIxR2jJ1wRCRigRdzEIkYFlIxZsaBdYPhJxpYEM2NNqbqI/SDGA5yHARhlUAz0UAseqjMdNGlFaCAIaUiBhi2QjPs3Y/QhZM6AiLOo7SLGAZHwPIkwacEIwIIOwHTGg97W2HJlINnbj4AR1z4ArOWLMI6/2highBE5MgdCwRX5NqjifqVyfTKwNFsWIFHVJYxBYa36ozMtDbLmoWvP80yPEWUpYsQ4ToQGxkhvFBhfgomEeA70gtMVxYiSgAQD4EM0GlJFKuMcysiO+Pw7aoGZ/iuApQxyrufZCiRA1pM5RxoZUkIRL1Xvuv1RI1VVGhGaVX18ZfiLe00LFaUxX1NjIH0mSdqC76WtrqfUGJYyQpHKnxRdgMGw7yocJEI9EKMk+Yqc7QM6otGvImDVwLCWo4URuuSBvi1Kw3m3EF24iK/UKjGgLiFxhdRQt36fa6wiwRwus0H7wCY6MxNlXJwnAswsQOR6IoLeZyaoae2OnkYiF9elCU7sI4JwQC+Xzen+f8htkZYAFgAh1NjSm5C2ZFmvjatT7irz54gE91qMiQjESqgHtzBEsPyVUCQO+kY0HARILhgu7jYcUmWv9hKOIcGF8RJauQSFDiFV6uUYIML0p8KSokVkjSgI0DSmKvLyua3RDnNFGGPpnkmZWFppoRuJDCcrwCfZlwjeIL1iiKTwplwj5GgRBAKElyDf9/KpSHTfUUlE2IS5LrJcvzNGKMXKfUqq+vbTKXZzd3h+o5neeasj1rU21xK9G4JSitXccEmFB39GGr4Z7k6zSVKJMm85dCALvWSydCg4EwzEyKXko2crDF0FS5d2otMGdmWkQT96agphHDpEjGc7lEafbqktH7l9vEo/Eu3Rn1H51P92SF7JSdWqzs8YgEEHOq3z6B/LKRDdi1bojk+mGbNzqoJ8VbJTfXKcWakBxhq2ZGrpx+h64fbZX9JkSGZZLbtr/ZvoGljW6ok/MMm4amQbOdmXQ9Z7MWFiUNTrXCLkGCq+IUO2yZMMeRV8cwOzlesnOUbpxqW1IptmL3s494rQ6Mf8mPlTk/pp/6GPRTQy6KAgGwlFkMnvaUP+8un7kQqRj6VVHxI7VTJ++uJvR3w96cqJouD5VfcPzgcNFnhcENoGrsw0JlOTOj6CsDWHS3p4J5YsEslmEAAwAXjIDwerD4bq+bme+eO+d2KHGj6o47ea3L9c1j6ML7c2e7wKwxJ4qqKHP3U2W7A5aye/6N/psdpzKX0uzVXVc3HDix4WKk7213cskv36fqPtm/5aDQUDZdOHfrnes32xYdnqvdWnpyb3vVwAEDWkeHd21Kcbue64icHlgrnP31j/YflmyTPS92nDl5cXhw3bGnyoaOzsxPr9732vzK1zf9tNH35uKEOe+VZVfmLD9R4zm/+suXhN+tD1dUX6cWHul4Lzh8SHXNdt1Ut9zZeTl4Z/+rPDz27smBZ9pvt877bMfMM8fRgZ3VyY7ktCvbPm9dsImfl//zi4q/Gs4a585/TbUZh568vGzVwFbPj/0vfzu079rQd7+98ZGwas/p2WjG0J7GU02ZIwMfVG7bfWFvFf7qMP/Wjk+bVlwaWb6/AUY2RKTwEQAA";

    return { token: accessToken, expires_in: 20 };
    */
  }

  handleSuccess(response) {
    return response;
  }

  handleError(error, logger) {
    let returnError = error;
    const { response } = error;
    const { data } = response;

    if (data.errors) {
      returnError = new Error(data.errors[0].message);
    }

    let loggerError =
      "Error in EbayClient" +
      " | method=" +
      error.request.method +
      " | path=" +
      error.request.path +
      " | error=" +
      JSON.stringify(data.errors || error);

    logger.error(loggerError);

    return Promise.reject(returnError);
  }

  logCacheSet(key, logger) {
    logger.info(`Cache Key Set | key=${key}`);
  }

  logCacheExpired(key, logger) {
    logger.info(`Cache Key Expired | key=${key}`);
  }
}

module.exports = EbayClient;

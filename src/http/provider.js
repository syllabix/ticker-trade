import axios from "axios";
import qs from "qs";

import cachios from "./cache";
import config from "../config";

let provider = axios.create({
  baseURL: config.TICKER_URL,
  timeout: 3000,
  headers: {
    accept: "application/json"
  },
  validateStatus: status => {
    return status >= 200 && status < 300;
  },
  paramsSerializer: params => {
    return qs.stringify(params);
  }
});

export default provider;

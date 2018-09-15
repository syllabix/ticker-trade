import { CancelToken } from "axios";
import { CANCEL } from "redux-saga";
import baseHttp from "./provider";

// This Http class wraps a provider (in this an axios instance)
// and sets up cancellation in the context of sagas
// (where all network requests should occur in this application)

class Http {
  constructor(httpProvider) {
    this._provider = httpProvider;
  }

  get(url = "", params = {}) {
    const source = CancelToken.source();
    let request = this._provider.get(url, {
      params,
      crossdomain: true,
      cancelToken: source.token
    });
    request[CANCEL] = () => source.cancel();
    return request;
  }

  //only implementing 'get' for now, as that all that is required for the current application
  //the above 'pattern' can be easily implemented across other http methods as needed
}

const http = new Http(baseHttp);

export default http;

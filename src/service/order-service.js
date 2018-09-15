import SimpleCache from "./simple-cache";
import http from "../http";

const PAGE_CACHE_KEY = "orders_page_number";

class OrderService {
  constructor(http, cache) {
    this.http = http;
    this.cache = cache;
  }

  next() {
    let pageNum = this.cache.get(PAGE_CACHE_KEY) || 0;
    const result = this.http.get("/listOrders", { start: pageNum, size: 1 });
    this.cache.set(PAGE_CACHE_KEY, ++pageNum);
    return result;
  }

  all() {
    const pages = this.cache.get(PAGE_CACHE_KEY) || 0;
    return this.http.get("/listOrders", { start: 1, size: pages + 1 });
  }
}

const service = new OrderService(http, SimpleCache);

export { service };

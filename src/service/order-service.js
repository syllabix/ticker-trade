import SimpleCache from "./simple-cache";
import http from "../http";

const PAGE_CACHE_KEY = "orders_page_number";

class OrderService {
  constructor(http, cache) {
    this.http = http;
    this.cache = cache;
  }

  async next() {
    let pageNum = this.cache.get(PAGE_CACHE_KEY) || 0;
    const result = await this.http.get("/listOrders", {
      start: pageNum,
      size: 1
    });
    if (result.data.length > 0) {
      this.cache.set(PAGE_CACHE_KEY, ++pageNum);
    }
    return result;
  }

  async all() {
    const pages = this.cache.get(PAGE_CACHE_KEY) || 0;
    try {
      const result = await this.http.get("/listOrders", {
        start: 1,
        size: pages + 1
      });
      this.cache.set(PAGE_CACHE_KEY, result.data.length);
      return result;
    } catch (error) {
      this.cache.set(PAGE_CACHE_KEY, 0);
    }
  }
}

const service = new OrderService(http, SimpleCache);

export { service };

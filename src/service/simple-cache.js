export default class SimpleCache {
  static set(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  static get(key) {
    let data = sessionStorage.getItem(key);
    return JSON.parse(data);
  }

  static remove(key) {
    sessionStorage.removeItem(key);
  }
}

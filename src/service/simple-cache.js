export default class SimpleCache {
  static set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static get(key) {
    let data = localStorage.getItem(key);
    return JSON.parse(data);
  }

  static remove(key) {
    localStorage.removeItem(key);
  }
}

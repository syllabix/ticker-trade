//While this accomplishes the needs for the initial project requirements -
//TODO - improve SimpleCache to offer multiple storage 'backends',
//have a ttl setting, etc.

//Simple cache 'implements' the cache methods for cachios
export default class SimpleCache {
    set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    get(key) {
        let data = localStorage.getItem(key);
        return JSON.parse(data);
    }

    remove(key) {
        localStorage.removeItem(key);
    }
}

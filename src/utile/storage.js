export default {
    get(key, defaultValue) {
        let data = JSON.parse(localStorage.getItem(key))
        return data ? data : defaultValue
    },
    set(key,value) {
        localStorage.setItem(key,JSON.stringify(value))
    }
}
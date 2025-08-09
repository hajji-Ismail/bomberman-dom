export class State {
    constructor(intialSate = {}) {
        this.state = { ...intialSate }
        this.listeners = new Map()
    }

    set(key, value) {
        this.state[key] = value;
        if (this.listeners.has(key)) {
            for (const cb of this.listeners.get(key)) cb(value);
        }
    }

    setContext(key, value) {
        this.state[key] = value;
    }
    get(key) {
        return this.state[key]
    }
    getState() {
        return { ...this.state };
    }


    subscribe(keys, callback) {
        if (!Array.isArray(keys)) keys = [keys];

        keys.forEach(key => {
            if (!this.listeners.has(key)) {
                this.listeners.set(key, []);
            }
            this.listeners.get(key).push(callback);
        });
    }



}
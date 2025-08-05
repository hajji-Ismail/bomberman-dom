// src/core/events.js
class Events {
    constructor() {
        this.events = new Map();
    }

    on(event, handler) {
        if (!this.events.has(event)) this.events.set(event, []);
        this.events.get(event).push(handler);
    }


    off(event, handler) {
        if (this.events.has(event)) {
            const filtered = this.events.get(event).filter(h => h !== handler);
            if (filtered.length > 0) {
                this.events.set(event, filtered);
            } else {
                this.events.delete(event); // 🧽 Clean up the key entirely
            }
        }
    }

    emit(event, data) {
        if (this.events.has(event)) {
            this.events.get(event).forEach(handler => handler(data));
        }
    }
}

export const GlobalEvents = new Events();



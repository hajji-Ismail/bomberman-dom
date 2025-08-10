// src/core/router.js
export class Router {
  constructor(routes = {}) {
    this.routes = routes;

    // Listen for both initial load and hash changes
    window.addEventListener('DOMContentLoaded', () => this.load(location.hash));
    window.addEventListener('hashchange', () => this.load(location.hash));
  }

  getPath(hash) {
    return hash.replace(/^#/, '') || '/';
  }

  load(hash) {
    const path = this.getPath(hash);
    const view = this.routes[path];

    if (view && typeof view === 'function') {
      view();
    } else {
      console.error(`Route "${path}" not found`);
    }
  }
}

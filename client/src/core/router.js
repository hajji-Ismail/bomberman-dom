// src/core/router.js
export class Router {
  constructor(routes = {}) {
    this.routes = routes;
    window.addEventListener('hashchange', () => this.load(location.hash));
  }

  load(hash) {
    const path = hash.replace(/^#/, '') || '/';
    const view = this.routes[path];
    if (view && typeof view === 'function') {
      view();
    } else {
      console.error(`Route "${path}" not found`);
    }
  }

  init() {
    this.load(location.hash);
  }
}

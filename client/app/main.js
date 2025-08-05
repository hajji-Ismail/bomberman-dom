import {
    State,
    Router,
    Renderer
} from '../src/index.js';
import App from './app.js';

const renderer = new Renderer();

const state = new State({
    route: location.hash || '#/',
    mesaage: 'Welcome to the mini  App',
});


function updateRoute() {
    const route = location.hash || '#/';
    state.set('route', route);
    renderApp();
}

function renderApp() {
    renderer.render('#root', App(state));
}

const router = new Router({
    '/': () => {
        state.set('message', 'Welcome to the Home Page');
        updateRoute();
    },
    "/waitting": () => {
        updateRoute();
    }
});

window.addEventListener('DOMContentLoaded', () => {
    router.init();
    renderApp();
    const ws = new WebSocket("ws://localhost:8080/ws")
    ws.onopen = () => {
        console.log("🔗 WebSocket connection opened");
    };
    state.set("ws", ws)
});

window.addEventListener('hashchange', updateRoute);

state.subscribe(['message', 'route'], renderApp);



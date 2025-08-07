import {
    State,
    Router,
    Renderer
} from '../src/index.js';
import App from './app.js';
import chat from './components/chat.js';

const renderer = new Renderer();

const state = new State({
    route: location.hash || '#/',
    mesaage: 'Welcome to the mini  App',
    messages : [],
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
});

window.addEventListener('hashchange', updateRoute);

state.subscribe(['message', 'route', 'counter', 'current_room'], renderApp);
state.subscribe(['messages'], chat)



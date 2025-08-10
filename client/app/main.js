import {
    State,
    Router,
    Renderer
} from '../src/index.js';


import App from './app.js';

const renderer = new Renderer();

export const state = new State();

state.setStet(renderApp)

export function renderApp() {
    renderer.render('#root', App());
}

new Router({
    '/': () => {
        renderApp();
    },
    // '/waitting': () => {
    //     renderApp();

    // }
});



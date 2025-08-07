// client/app/app.js
import Joinning from "./pages/Joinning.js"
import Waitting from "./pages/Waitting.js";
import { generateMap } from "./pages/game.js";

function App(state) {
    const route = state.get('route') || "/"
    let currentComponent

    switch (route) {
        case "#/":
            currentComponent = Joinning(state)
            break
        case "/waitting":
            currentComponent = Waitting(state)
            break
        default:
            alert("hhhhh 404")
    }
    return {
        tag: 'div',
        attrs: {
            class: "container",
        },
        children:
            currentComponent
    }
}

export default App
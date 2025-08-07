// client/app/app.js
import Joinning from "./pages/Joinning.js"
import Waitting from "./pages/Waitting.js";
import { generateMap } from "./pages/game.js";
import battleField from "./components/battleField.js";

function App(state) {
    const route = state.get('route') || "/"
    const map = generateMap(10)
    state.set('map', map)
    let currentComponent

    switch (route) {
        case "#/":
            currentComponent = Joinning(state)
            break
        case "/waitting":
            currentComponent = Waitting(state)
            break
        case "/game":
            currentComponent = battleField(map)
            console.log(currentComponent,"componne");
            
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
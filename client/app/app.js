import battleField from "./components/battleFiled.js";
import Joinning from "./pages/Joinning.js"
import Waitting from "./pages/Waitting.js";
import { state } from "./main.js";

function App() {
    const route = state.get('route') || "/"
    let currentComponent


    switch (route) {
        case "/":
            currentComponent = Joinning()
            break
        case "/waitting":
            currentComponent = Waitting()
            break
        case "/game":
            currentComponent = battleField()

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
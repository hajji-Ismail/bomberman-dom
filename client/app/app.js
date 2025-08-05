import Joinning from "./components/Joinning.js"
import Waitting from "./components/Waitting.js";

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
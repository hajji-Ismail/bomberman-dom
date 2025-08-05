import Joinning from "./components/Joinning.js"

function App(state) {

    return {
        tag: 'div',
        attrs: {
            class: "container",
        },
        children:
            Joinning(state)
    }
}

export default App
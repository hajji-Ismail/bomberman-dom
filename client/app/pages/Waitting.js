import counterRoom from "../components/counterRoom.js"

function Waitting(state) {

    // const ws = state.get("ws")
    
    return [
        {
            tag: "h1",
            attrs: {
                class: 'title'
            },
            text: "WAITTING..."
        },
        counterRoom(state)

    ]

}

export default Waitting
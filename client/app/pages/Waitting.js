import chat from "../components/chat.js"
import counterRoom from "../components/counterRoom.js"

function Waitting(state) {
    const current = state.get('current_room')
    return [
        {
            tag: "h1",
            attrs: {
                class: 'title'
            },
            text: "WAITTING..."
        },
        ...(current?.players?.length > 1 ? [counterRoom(state)] : [{
            tag: "p",
            attrs: {
                class: 'title'
            },
            text: "waitt for others to join"
        }]) ,
        chat(state)
    ]

}

export default Waitting
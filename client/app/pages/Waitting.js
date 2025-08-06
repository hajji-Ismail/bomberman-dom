import counterRoom from "../components/counterRoom.js"

function Waitting(state) {
    const current = state.get('current_room')
    console.log(current, "current room");

    return [
        {
            tag: "h1",
            attrs: {
                class: 'title'
            },
            text: "WAITTING..."
        },
        ...( current.players.length > 1  ? counterRoom(state) : {
            tag: "h3",
            attrs: {
                class: 'title'
            },
            text: "waitt for others to join"
        })
    ]

}

export default Waitting
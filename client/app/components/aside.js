import { state } from "../main.js"

const Aside = () => {
    const username = state.get('username')
    const room = state.get('current_room')
    const findPlayer = () => {
        const playerIndex = room?.players?.findIndex((player) => {
            return player.username === username
        })
        return [
            {
                tag: 'div',
                attrs: {
                    class: `player char${playerIndex + 1}`
                }
            }
        ]
    }


    return [
        {
            tag: 'h2',
            text: username
        },
        {
            tag: 'div',
            attrs: {
                class: "info-player"
            },
            children: findPlayer()
        }
    ]
}

export default Aside
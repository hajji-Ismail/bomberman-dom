import chat from "../components/chat.js"
import counterRoom, { CloseRoom, CounterObj } from "../components/counterRoom.js"
import { state } from "../main.js"

function Waitting() {
    const current = state.get('current_room')
    const availablePlayer = current?.players?.filter((p) => !p.isDeath && !p.isLosed)

    if (availablePlayer?.length <= 1) {
        clearInterval(CounterObj.timer)
    }
    if (!CounterObj.timer && availablePlayer.length === 4) {
        CounterObj.completTeam = true
        state.get('ws').send(JSON.stringify({
            type: 'reset-counter',
            id: current.id,
            newTime: Math.floor(CounterObj.cp / 2)
        }))
    }



    const displayPlayerNames = () => {
        return availablePlayer?.map(p => {
            return {
                tag: "p",
                attrs: {
                    class: p.playerNumber
                },
                text: p.username
            }
        })
    }


    return [
        {
            tag: "h1",
            attrs: {
                class: 'title'
            },
            text: "WAITTING..."
        },
        ...(availablePlayer?.length > 1 ? [counterRoom(availablePlayer)] : [{
            tag: "p",
            attrs: {
                class: 'title'
            },
            text: "waitt for others to join"
        }]),
        {
            tag: "div",
            attrs: {
                class: "player-names"
            },
            children: displayPlayerNames()
        },
        chat(state)
    ]

}

export default Waitting
import chat from "../components/chat.js"
import counterRoom, { CloseRoom, CounterObj } from "../components/counterRoom.js"
import { state } from "../main.js"

function Waitting() {
    const current = state.get('current_room')
    const availablePlayer = current?.players?.filter((p) => !p.isDeath && !p.isLosed)

    if (availablePlayer?.length <= 1) {
        clearInterval(CounterObj.timer)
    }

    if (CounterObj.timer && !CounterObj.isRestartPhase && availablePlayer.length === 4) {
        CounterObj.isRestartPhase = true
        CloseRoom()
        state.set("counter", Math.floor(CounterObj.cp / 2));
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
        ...(availablePlayer?.length > 1 ? [counterRoom()] : [{
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
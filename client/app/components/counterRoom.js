import { state } from "../main.js";

export const CounterObj = {
    isInitialized: false,
    isRestartPhase: false,
    timer: undefined,
    cp: 4,
    completTeam: false,
}

const counterRoom = () => {

    if (!CounterObj.isInitialized) {
        CounterObj.isInitialized = true;

        if (!CounterObj.completTeam) {
            state.set("counter", CounterObj.cp);
        }
        CounterObj.timer = setInterval(() => {
            let counter = state.get("counter");
            if (counter === 0) {
                if (CounterObj.isRestartPhase) {
                    clearInterval(CounterObj.timer);
                    return;
                } else {
                    CloseRoom()
                    return;
                }
            }

            state.set("counter", counter - 1);
            if (CounterObj.isRestartPhase && counter <= 1) {
                state.set('route', "/game")
                clearInterval(CounterObj.timer);
            }

        }, 1000);
    }

    const counter = state.get("counter");
    return {
        tag: "div",
        attrs: {
            class: "wait-counter"
        },
        text: (counter || counter === 0) ? counter : ""
    };
};

export function CloseRoom() {
    const player = state.get('current_room')
    if (player.players[player.players.length - 1].username == state.get("username")) {
        state.get('ws').send(JSON.stringify({
            type: "close-room",
            id: state.get('current_room').id,
            counter: Math.floor(CounterObj.cp / 2)
        }))


    }
    state.set('current_room', { ...state.get('current_room'), available: false })
    state.set("counter", Math.floor(CounterObj.cp / 2));
    CounterObj.isRestartPhase = true;
}

export default counterRoom;

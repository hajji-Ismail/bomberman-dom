import { state } from "../main.js";

export const CounterObj = {
    isInitialized: false,
    timer: undefined,
    cp: 20,
    completTeam: false
}

const counterRoom = () => {
    if (!CounterObj.isInitialized) {
        CounterObj.isInitialized = true;
        let isRestartPhase = false;
        if (!CounterObj.completTeam) {
            console.log(CounterObj.completTeam);
            state.set("counter", CounterObj.cp);
        }
        CounterObj.timer = setInterval(() => {
            let counter = state.get("counter");
            if (counter === 0 || (CounterObj.completTeam && !isRestartPhase)) {
                if (isRestartPhase && counter === 0) {
                    clearInterval(CounterObj.timer);
                    return;
                } else {
                    const player = state.get('current_room')
                    if (player.players[player.players.length - 1].username == state.get("username")) {
                        state.get('ws').send(JSON.stringify({
                            type: "close-room",
                            id: state.get('current_room').id
                        }))
                    }
                    state.set('current_room', { ...state.get('current_room'), available: false })
                    state.set("counter", 10);
                    isRestartPhase = true;
                    return;
                }
            }
            state.set("counter", counter - 1);
            if (isRestartPhase && counter <= 1) {
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
        text: (counter || counter === 0) ? counter : 20
    };
};

export default counterRoom;

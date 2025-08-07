// client/app/components/counterRoom.js
let isInitialized = false;

const counterRoom = (state) => {

    if (!isInitialized) {
        isInitialized = true;
        let isRestartPhase = false;
        state.set("counter", 5);
        const timer = setInterval(() => {
            let counter = state.get("counter");
            if (counter === 0) {
                if (isRestartPhase) {
                    clearInterval(timer);
                    state.set('route', "/game")
                    return;
                } else {
                    console.log("close waiting room.");
                    state.set("counter", 3);
                    isRestartPhase = true;
                    return;
                }
            }
            state.set("counter", counter - 1);
        }, 1000);
    }

    const counter = state.get("counter");
    return {
        tag: "div",
        text: (counter || counter === 0) ? counter : 5
    };
};

export default counterRoom;

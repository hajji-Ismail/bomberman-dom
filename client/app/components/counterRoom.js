export const CounterObj = {
    isInitialized: false,
    timer: undefined
}

const counterRoom = (state) => {

    console.log('first')
   
     if (!CounterObj.isInitialized) {
        CounterObj.isInitialized = true;
        let isRestartPhase = false;
        state.set("counter", 20);
        CounterObj.timer = setInterval(() => {
            let counter = state.get("counter");
            if (counter === 0) {
                if (isRestartPhase) {
                    clearInterval(CounterObj.timer);
                    return;
                } else {
                    console.log("close waiting room.");
                    state.set("counter", 10);
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
        text: (counter || counter === 0) ? counter : 20
    };
};

export default counterRoom;

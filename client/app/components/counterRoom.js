let isInitialized = false;

const counterRoom = (state) => {
    if (!isInitialized) {
        isInitialized = true;

        let isRestartPhase = false;

        state.set("counter", 20);

        const timer = setInterval(() => {
            let counter = state.get("counter");

            if (counter === 0) {
                if (isRestartPhase) {
                    clearInterval(timer);
                    return;
                } else {
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

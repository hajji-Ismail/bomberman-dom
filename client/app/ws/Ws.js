export const CreateWs = (state) => {
    return new Promise((resolve, reject) => {
        const ws = new WebSocket("ws://localhost:8080/ws");
        ws.onopen = () => {
            console.log("🔗 WebSocket connection opened");
            state.set("ws", ws);
            resolve(true);
        };

        ws.onclose = () => {
            console.log("❌ WebSocket error");
            reject(false);
        };

        ws.onmessage = (data) => {
            const message = JSON.parse(data.data)
            console.log(message);

            switch (message.type) {
                case "waitting_room":
                    state.set('current_room', message.room)
                    if (state.get('counter')) {
                        state.set('counter', 20)
                    }
                    break;
                case "chating":
                    const messages = state.get('messages') || []; // get current messages
                    state.set('messages', [...messages, message]); // append new message
                    break;

                default:
                    break;
            }


        }
    });
}



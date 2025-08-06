export const CreateWs = (state) => {
    return new Promise((resolve, reject) => {
        const ws = new WebSocket("ws://localhost:8080/ws");
         ws.onopen = () => {
            console.log("🔗 WebSocket connection opened");
            state.set("ws", ws);
            resolve(true); 
        };

        ws.onerror = () => {
            console.log("❌ WebSocket error");
            reject(false); 
        };
    });
}



import { CounterObj } from "../components/counterRoom.js";
import { HandleMovement, StopMove } from "../services/HandleMovemement.js";
import { state } from "../main.js";

export const CreateWs = () => {
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

            switch (message.type) {
                case "waitting_room":


                    CounterObj.isInitialized = false
                    clearInterval(CounterObj.timer)
                    state.set('current_room', message.room)
                    break;
                case "chating":
                    const messages = state.get('messages') || [];
                    state.set('messages', [...messages, message]);
                    break;
                case "userhange":
                    state.set("username", message.username)
                    break
                case "newRoom":
                    state.set('current_room', message.room)

                    break
                case "canMove":
                    HandleMovement(message, state)
                    break
                case "stopMove":
                    StopMove(message, state)
                    break
                case "placeBomb":
                    state.set('current_room', message.room)
                    break
                default:
                    break;
            }
        }
    });
}



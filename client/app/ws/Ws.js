import { CounterObj } from "../components/counterRoom.js";
import { HandleMovement } from "../services/HandleMovemement.js";
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
                    const messages = state.get('messages') || []; // get current messages
                    state.set('messages', [...messages, message]); // append new message
                    break;
                case "userhange":

                    state.set("username", message.username)
                    break
                case "getMap":

                    state.set('current_room', { ...state.get('current_room'), map: message.map })
                    state.setContext('positionX', 0)
                    state.setContext('positionY', 0)
                    ws.send(JSON.stringify({
                        type: "start",
                        room: state.get('current_room')
                    }))
                    break
                case "canMove":
                    HandleMovement(message, state)
                    break
                case "stopMove":
                    state.set("newCLass", message.newCLass)
                    break
                default:
                    break;
            }


        }
    });
}



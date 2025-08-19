
import { state } from "../main.js";
function chat() {
    const chatHandler = (e) => {
        const socket = state.get('ws');

        if (e.key === 'Enter') {
            const currentRoom = state.get('current_room')
            const user = state.get("username")

            let player = currentRoom.players.find(p => p.username === user)

            if (e.target.value.trim().length > 0) {
                socket.send(JSON.stringify({
                    type: 'chating',
                    room: currentRoom,
                    message: e.target.value.trim(),
                    playerNumber: player.playerNumber,
                    username: player.username
                }));
                e.target.value = "";

            }


        }
    };

    const showMessages = () => {
        const messages = state.get('messages');
        const user = state.get("username")
        return {
            tag: "div",
            attrs: { id: "chatmessages" },
            children: Array.isArray(messages)
                ? messages.map(msg => ({
                    tag: "div",
                    attrs: {
                        class: msg.username == user ? "message--sent" : "message--received"
                    },
                    children: [
                        {
                            tag: "p",
                            attrs: {
                                class: msg.playerNumber
                            },
                            text: `${msg.username}: ${msg.message}`
                        }
                    ]
                }))
                : []
        };
    };
    const players = state.get("current_room")?.players
    const playerAtCell = players.filter(
        (p) =>
            !p.isDeath && !p.isLosed)
    return {
        tag: "div",
        attrs: { id: "chatroom" },
        children: [
            {
                tag: 'p',

                text: `${playerAtCell?.length}/4`
            }
            ,
            showMessages(),
            {
                tag: "input",
                attrs: {
                    id: "chatinput",
                    placeholder: "Enter your message",
                    onKeyDown: chatHandler,
                }
            }
        ]
    };
}


export default chat;

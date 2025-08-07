function chat(state) {
    const chatHandler = (e) => {
        const socket = state.get('ws');

        if (e.key === 'Enter') {
            if (e.target.value.trim().length > 0) {
                socket.send(JSON.stringify({
                    type: 'chating',
                    chating_room: state.get('current_room'),
                    message: e.target.value.trim(),
                    username: state.get("username")
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
                            text: `${msg.username}: ${msg.message}`
                        }
                    ]
                }))
                : []
        };
    };

    return {
        tag: "div",
        attrs: { id: "chatroom" },
        children: [
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

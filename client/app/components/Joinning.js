import { CreateWs } from "../ws/Ws.js"

function Joinning(state) {
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await CreateWs(state);
            state.set('route', "/waitting");
            console.log(state.get("username"));
        } catch (err) {
            console.log("Connection failed");
        }
    };

    return [
        {
            tag: "h1",
            attrs: {
                class: 'title'
            },
            text: "bomberman-dom"
        },
        {
            tag: 'form',
            attrs: {
                onsubmit: handleSubmit,
                class: "join-form"
            },
            children: [
                {
                    tag: "input",
                    attrs: {
                        placeholder: "Enter your name",
                        maxlength: 20,
                        onchange: (e) => { state.set('username', e.target.value) }
                    }
                }, {
                    tag: "button",
                    attrs: {
                        type: 'submit',
                    },
                    text: 'Join'

                }
            ]
        }
    ]

}

export default Joinning
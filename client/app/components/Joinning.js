function Joinning(state) {
    const handleSubmit = (e) => {
        e.preventDefault()
        state.set('route', "/waitting")

    }

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
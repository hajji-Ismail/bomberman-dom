function Waitting(state) {

    const ws = state.get("ws")
    
    return [
        {
            tag: "h1",
            attrs: {
                class: 'title'
            },
            text: "WAITTING..."
        },

    ]

}

export default Waitting
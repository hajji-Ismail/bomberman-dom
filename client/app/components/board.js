const board = () => {
    const iconClasses = [
        { icon: "fa-solid fa-bomb", text: "Bombs" },
        { icon: "fa-solid fa-fire", text: "Flame" },
        { icon: "fa-solid fa-bolt-lightning", text: "Speed" },
        { icon: "fa-solid fa-heart", text: "Lives" }
    ]

    const displayAbilities = () => {
        return iconClasses.map(element => {
            return {
                tag: "p",
                children: [
                    {
                        tag: "i",
                        attrs: {
                            class: element.icon
                        }
                    },
                    {
                        tag: "span",
                        text: element.text
                    }
                ]
            }
        })
    }

    return {
        tag: "div",
        attrs: {
            class: "board"
        },
        children: displayAbilities()
    }
}

export default board
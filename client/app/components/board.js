const board = (player) => {
    
    const iconClasses = [
        { icon: "fa-solid fa-bomb", text: `Bombs ${player.Bombs}` },
        { icon: "fa-solid fa-fire", text: `Flame ${player.Flames}` },
        { icon: "fa-solid fa-bolt-lightning", text: `Speed ${player.Speed}` },
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
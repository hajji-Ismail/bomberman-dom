import { state } from "../main.js";

const board = (player, playerAtCell) => {
    const current = state.get("current_room");
    const numPlayers = current.players.length
    const iconClasses = [
        { icon: "fa-solid fa-bomb", text: `Bombs ${player.Bombs}` },
        { icon: "fa-solid fa-fire", text: `Flame ${player.Flames}` },
        { icon: "fa-solid fa-bolt-lightning", text: `Speed ${player.Speed}` },
        { icon: "fa-solid fa-heart", text: `Lives ${player.Lives}` },
        { icon: "fa-solid fa-gamepad", text: `${playerAtCell}/${numPlayers}` }
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
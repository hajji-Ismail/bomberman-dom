// client/app/components/battleField.js

const battleField = (map) => {

    let divs = []

    const divsClasses = {
        0: "path",
        1: "solid",
        2: "soft",
    }

    for (let row = 0; row < map.length; row++) {
        for (let col = 0; col < map[row].length; col++) {
            const divType = map[row][col]
            const divclass = divsClasses[divType]
            divs.push(
                {
                    tag: "div",
                    atrrs: { class: divclass },
                }
            )
        }

    }

    return {
        tag: "div",
        atrrs: { class: "battle-field" },
        children: divs

    }
}

export default battleField

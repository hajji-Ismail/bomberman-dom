// client/app/components/battleField.js

const battleField = (map) => {

    let divs = []

    const divsClasses = {
        0: "path",
        1: "solid-wall",
        2: "soft-wall",
        
    }

    for (let row = 0; row < map.length; row++) {
        let wall = []
        for (let col = 0; col < map[row].length; col++) {
            const divType = map[row][col]
            const divclass = divsClasses[divType]
            wall.push(
                {
                    tag: "div",
                    attrs: { class: `${divclass} box` },

                }
            )
        }
        divs.push({

            tag: "div",
            attrs: { class: `wall` },
            children: wall

        })
        wall = []

    }

    return [{
        tag: "div",
        attrs: { class: "battle-field" },
        children: divs

    }]
}

export default battleField

// client/app/components/battleField.js

const battleField = (map) => {
    let divs = [];

    // Map values to base classes (e.g., walls, paths)
    const divsClasses = {
        0: "path",
        1: "solid-wall",
        2: "soft-wall",
        11: "path",  // player-1 base is still path
        12: "path",
        13: "path",
        14: "path",
    };

    // Map player values to player class names
    const playerClasses = {
        11: "player-1",
        12: "player-2",
        13: "player-3",
        14: "player-4",
    };

    for (let row = 0; row < map.length; row++) {
        let wall = [];

        for (let col = 0; col < map[row].length; col++) {
            const cellValue = map[row][col];
            const baseClass = divsClasses[cellValue];

            const box = {
                tag: "div",
                attrs: { class: `${baseClass} box` },
            };

            // If this cell is a player, add a child inside the box
            if (playerClasses[cellValue]) {
                box.children = [
                    {
                        tag: "div",
                        attrs: { class: `${playerClasses[cellValue]}` },
                    },
                ];
            }

            wall.push(box);
        }

        divs.push({
            tag: "div",
            attrs: { class: `wall` },
            children: wall,
        });
    }

    return [
        {
            tag: "div",
            attrs: { class: "battle-field" },
            children: divs,
        },
    ];
};


export default battleField

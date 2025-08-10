// client/app/components/battleField.js

const battleField = (state) => {
    const map = state.get('map');
    const current = state.get('current_room');
    const players = current.players;

    let divs = [];

    // Map values to base classes
    const divsClasses = {
        0: "path",
        1: "solid-wall",
        2: "soft-wall",
    };

    for (let row = 0; row < map.length; row++) {
        let wall = [];

        for (let col = 0; col < map[row].length; col++) {
            const cellValue = map[row][col];
            const baseClass = divsClasses[cellValue] || "path";

            const box = {
                tag: "div",
                attrs: { class: `${baseClass} box` },
            };

            // Check if a player exists at this cell
            const playerAtCell = players.find((p, idx) => 11 + idx == cellValue);
            if (playerAtCell) {
                const playerIndex = players.indexOf(playerAtCell);
                box.children = [
                    {
                        tag: "div",
                        attrs: { class: `player-${playerIndex + 1}` },
                    },
                ];
            }

            wall.push(box);
        }

        divs.push({
            tag: "div",
            attrs: { class: "wall" },
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

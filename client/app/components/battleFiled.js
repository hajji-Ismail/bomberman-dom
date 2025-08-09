const battleField = (state) => {
    const current = state.get('current_room');
    const map = current.map
    const players = current.players;
    const currrentUsername = state.get('username')
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
                    playerAtCell.username === currrentUsername ?
                        {
                            tag: "div",
                            player: true,
                            attrs: {
                                class: `player char${playerIndex + 1}`,
                                onkeyup: (e) => {
                                    // console.log(e.key)
                                },
                            },
                        } : {
                            tag: "div",
                            attrs: {
                                class: `player char${playerIndex + 1}`,
                            },
                        }
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
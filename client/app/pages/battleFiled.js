import board from "../components/board.js";
import { state } from "../main.js";
const battleField = () => {
    const current = state.get('current_room');
    const map = current.map
    const players = current.players;
    const currrentUsername = state.get('username')
    const socket = state.get('ws')

    let divs = [];
    const moving = (e) => {
        socket.send(JSON.stringify({
            type: "move",
            username: currrentUsername,
            room: current,
            action: e.key

        }))

    }
    const stopMoving = (e) => {
        socket.send(JSON.stringify({
            type: "stop-move",
            username: currrentUsername,
            room: current,
            action: e.key
        }))
    }
    // Map values to base classes
    const divsClasses = {
        0: "path",
        1: "solid-wall",
        2: "soft-wall",
        3: "bomb",
        4: "speed",
        5: "flame"
    };

    for (let row = 0; row < map.length; row++) {
        let wall = [];

        for (let col = 0; col < map[row].length; col++) {
            const cellValue = map[row][col];

            // Determine if the cell is an ability (3: speed, 4: bomb, 5: flame)
            const isAbility = [3, 4, 5].includes(cellValue);
            const abilityType = isAbility ? cellValue : null;

            // If it's an ability, we treat it as a soft wall visually
            const baseClass = isAbility ? "soft-wall" : (divsClasses[cellValue] || "path");

            const box = {
                tag: "div",
                attrs: { class: `${baseClass} box` },
            };

            // Add player if present
            const playerAtCell = players.find((p, idx) => 11 + idx == cellValue);



            if (playerAtCell) {
                const playerIndex = players.indexOf(playerAtCell);

                box.children = [
                    playerAtCell.username === currrentUsername
                        ? {
                            tag: "div",
                            player: true,
                            attrs: {
                                class: `player char${playerIndex + 1}`,
                                onkeyup: moving,
                                style: state.get("style") || ' transform: translate(0px,0px);',
                                class: state.get('newCLass') || `player char${playerIndex + 1}`,
                                onkeydown: moving,
                                onkeyup: stopMoving
                            },
                        }
                        : {
                            tag: "div",
                            attrs: {
                                class: `player char${playerIndex + 1}`,
                            },
                        }
                ];
            }

            // If it's an ability cell, add it as a child to the soft wall
            if (isAbility) {
                // Ensure `children` exists before pushing
                if (!box.children) box.children = [];

                box.children.push({
                    tag: "div",
                    attrs: {
                        class: `abilitie ${divsClasses[abilityType]}`,
                    },
                });
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
            attrs: {
                class: "game-container"
            },
            children: [
                board()
                ,
                {
                    tag: "div",
                    attrs: { class: "battle-field" },
                    children: divs,
                },
            ]
        }
    ];
};



export default battleField
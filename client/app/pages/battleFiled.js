import board from "../components/board.js";
import { state } from "../main.js";

const divsClasses = {
    0: "path",
    1: "solid",
    2: "soft",
    3: "bomb",
    4: "speed",
    5: "flame",
    6: "place-bomb",
    7: "earn-bomb fa-solid fa-bomb",
    8: "earn-speed fa-solid fa-bolt-lightning",
    9: "earn-flame fa-solid fa-fire"
};

const earnAbilityWrapperClasses = {
    7: "earn-bomb",
    8: "earn-speed",
    9: "earn-flame"
};

const battleField = () => {
    const current = state.get("current_room");
    const map = current.map;
    const players = current.players;
    const currentUsername = state.get("username");
    const socket = state.get("ws");
    const player = players.find((p) => p.username === currentUsername);

    const styles = state.get("playerStyles") || {};
    const classes = state.get("playerClasses") || {};

    const sendAction = (type) => (e) => {
        socket.send(
            JSON.stringify({
                type,
                username: currentUsername,
                room: current,
                action: e.key
            })
        );
    };

    const moving = sendAction("move");
    const stopMoving = sendAction("stop-move");

    const divs = map.map((row) => {
        const wall = row.map((cellValue) => {
            const isAbility = [3, 4, 5].includes(cellValue);
            const isEarnAbility = [7, 8, 9].includes(cellValue);
            const isPlacingBomb = cellValue === 6;

            let baseClass = "path";
            if (isAbility) baseClass = "soft";
            else if (isEarnAbility) baseClass = "path";  
            else baseClass = divsClasses[cellValue] || "path";

            const box = {
                tag: "div",
                attrs: { class: `${isPlacingBomb ? "path" : baseClass} box` },
                children: []
            };

            const playerAtCell = players.find(
                (p, idx) =>
                    !p.isDeath &&
                    ((11 + idx === cellValue) ||
                        (Array.isArray(cellValue) && 11 + idx === cellValue[0]))
            );

            if (playerAtCell) {
                const playerIndex = players.indexOf(playerAtCell);
                box.children.push({
                    tag: "div",
                    player: true,
                    attrs: {
                        style: styles[playerAtCell.username] || "transform: translate(0px,0px);",
                        class: classes[playerAtCell.username] || `player char${playerIndex + 1}`,
                        onkeydown: moving,
                        onkeyup: stopMoving
                    }
                });
            }

            if (isAbility) {
                box.children.push({
                    tag: "div",
                    attrs: { class: `abilitie ${divsClasses[cellValue]}` }
                });
            } else if (isEarnAbility) {
                box.children.push({
                    tag: "div",
                    attrs : {class : "ability-container"},
                    children: [
                        {
                            tag: "i",
                            attrs: { class: divsClasses[cellValue] }
                        }
                    ]
                });
            }

            if (isPlacingBomb || (Array.isArray(cellValue) && cellValue.length > 1)) {
                box.children.push({
                    tag: "div",
                    attrs: {
                        class: Array.isArray(cellValue) ? divsClasses[cellValue[1]] : baseClass
                    },
                    children: [
                        {
                            tag: "i",
                            attrs: { class: "fa-solid fa-bomb" }
                        }
                    ]
                });
            }

            return box;
        });

        return {
            tag: "div",
            attrs: { class: "wall" },
            children: wall
        };
    });

    return [
        {
            tag: "div",
            attrs: { class: "game-container" },
            children: [
                board(player),
                {
                    tag: "div",
                    attrs: { class: "battle-field" },
                    children: divs
                }
            ]
        }
    ];
};

export default battleField;

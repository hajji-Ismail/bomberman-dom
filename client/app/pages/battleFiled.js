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
  9: "earn-flame fa-solid fa-fire",
  10: "flames",
};

let move = false
let reqid
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
    if (!move) {
      move = true
      const fn = () => {
        if (!move) {
          return
        }
        reqid = requestAnimationFrame(fn)
        socket.send(
          JSON.stringify({
            type,
            username: currentUsername,
            room: current,
            action: e.key,
          })
        );
      }

      fn()

    }
  };

  const moving = sendAction("move");
  const stopMoving = () => {
    move = false
    cancelAnimationFrame(reqid)
    sendAction("stop-move");
  }

  const walls = map.map((row) => {
    const line = row.map((cellValue) => {
      const realValue = Array.isArray(cellValue) ? cellValue[1] : cellValue;

      const isAbility = [3, 4, 5].includes(realValue);
      const isEarnAbility = [7, 8, 9].includes(realValue);
      const isPlacingBomb = realValue === 6;
      const isFlames = realValue === 10;

      let baseClass = "path";
      if (isAbility) baseClass = "soft";
      else if (isEarnAbility) baseClass = "path";
      else baseClass = divsClasses[realValue] || "path";

      const box = {
        tag: "div",
        attrs: {
          class: `${isFlames ? divsClasses[10] : isPlacingBomb ? "path" : baseClass} box`,
        },

        children: [],
      };

      const playerAtCell = players.find(
        (p, idx) =>
          !p.isDeath && !p.isLosed &&
          (11 + idx === (Array.isArray(cellValue) ? cellValue[0] : cellValue))
      );

      if (playerAtCell) {
        const playerIndex = players.indexOf(playerAtCell);
        box.children.push({
          tag: "div",
          player: true,
          attrs: {
            key: `${playerIndex + 1}`,
            style:
              styles[playerAtCell.username] || "transform: translate(0px,0px);",
            class:
              classes[playerAtCell.username] || `player char${playerIndex + 1}`,
            onkeydown: moving,
            onkeyup: stopMoving,

          },
        });
      }

      if (isAbility) {
        box.children.push({
          tag: "div",
          attrs: { class: `abilitie ${divsClasses[realValue]}` },
        });
      } else if (isEarnAbility) {
        box.children.push({
          tag: "div",
          attrs: { class: "ability-container" },
          children: [
            {
              tag: "i",
              attrs: { class: divsClasses[realValue] },
            },
          ],
        });
      }

      if (isPlacingBomb) {
        box.children.push({
          tag: "div",
          attrs: {
            class: divsClasses[realValue],
          },
          children: [
            {
              tag: "i",
              attrs: { class: "fa-solid fa-bomb" },
            },
          ],
        });
      }

      if (isFlames) {
        box.children.push({
          tag: "div",
          attrs: {
            class: divsClasses[realValue],
          },
        });
      }

      return box;
    });

    return {
      tag: "div",
      attrs: { class: "wall" },
      children: line,
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
          children: walls,
        },
      ],
    },
  ];
};

export default battleField;

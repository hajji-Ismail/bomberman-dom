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
  10: "flames path",
};
// <i class="fa-regular fa-burst" style="color: #fe9862;"></i>


let keys = {
  up: false,
  down: false,
  left: false,
  right: false,
  space: false
};

let action
export let requestAnimation = {
  id: null
}

const battleField = () => {
  const current = state.get("current_room");
  const map = current.map;
  const players = current.players;
  const currentUsername = state.get("username");
  const socket = state.get("ws");
  const player = players.find((p) => p.username === currentUsername);
  const styles = state.get("playerStyles") || {};
  const classes = state.get("playerClasses") || {};

  const moving = (e) => {
    if (e.key === "ArrowUp") {
      keys = { up: true, down: false, left: false, right: false, space: false };
    } else if (e.key === "ArrowDown") {
      keys = { up: false, down: true, left: false, right: false, space: false };
    } else if (e.key === "ArrowLeft") {
      keys = { up: false, down: false, left: true, right: false, space: false };
    } else if (e.key === "ArrowRight") {
      keys = { up: false, down: false, left: false, right: true, space: false };
    } else if (e.key === " ") {
      keys = { up: false, down: false, left: false, right: false, space: true };
    }

    if (requestAnimation.id) return

    const playerMovement = () => {
      requestAnimation.id = requestAnimationFrame(playerMovement);

      action = null
      if (keys.up) action = "ArrowUp"
      else if (keys.down) action = "ArrowDown"
      else if (keys.left) action = "ArrowLeft"
      else if (keys.right) action = "ArrowRight"
      else if (keys.space) action = " "

      socket.send(
        JSON.stringify({
          type: "move",
          username: currentUsername,
          room: current,
          action
        })
      );
    };

    playerMovement();
  };

  const stopMoving = (e) => {
    if (e.key === "ArrowUp") keys.up = false
    if (e.key === "ArrowDown") keys.down = false
    if (e.key === "ArrowLeft") keys.left = false
    if (e.key === "ArrowRight") keys.right = false

    if (!keys.up && !keys.down && !keys.left && !keys.right) {
      cancelAnimationFrame(requestAnimation.id)
      requestAnimation.id = null

      socket.send(
        JSON.stringify({
          type: "stop-move",
          username: currentUsername,
          room: current,
          action
        })
      );
    }
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

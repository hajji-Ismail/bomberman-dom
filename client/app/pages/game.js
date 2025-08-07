// client/app/pages/game.js
export function generateMap(size) {
    let map = []
    for (let i = 0; i < size; i++) {
        let row = []
        for (let j = 0; j < size; j++) {
            if (i == 0 || i == size - 1 || j == 0 || j == size - 1) {
                row.push(1)
            } else {
                row.push(0)
            }
        }
        map.push(row)

    }

    return map
}

const map = generateMap(5)
console.table(map, "map");

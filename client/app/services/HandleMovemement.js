export function HandleMovement(data = {}, state) {
    const X = state.get("positionX") || 0
    const Y = state.get("positionY") || 0

    switch (data.direction) {
        case "right":
            state.setContext("positionX",X+ data.x*55)
            break;
        case "left":
            state.setContext("positionX",X- data.x*55)
            break
        case "up":
            state.setContext("positionY",Y- data.y*55)
            break
        case "down":
            state.setContext("positionY",Y+ data.y*55)
            break
        default:
            break;
    }
    state.set("style", ` transform: translate(${state.get("positionX")}px, ${state.get("positionY")}px);`)
    state.set("newCLass",data.newCLass)
}
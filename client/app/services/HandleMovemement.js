export function HandleMovement(data = {}, state) {
    const X = state.get("positionX") || 0
    const Y = state.get("positionY") || 0

    const username = data.player.username
    let style
    switch (data.direction) {
        case "right":
            style = ` transform: translate(${data.player.position.x + data.x}px, ${data.player.position.y}px)`
            state.set("style", { username, style })
            break;
        case "left":

            style = ` transform: translate(${data.player.position.x - data.x}px, ${data.player.position.y}px)`
            state.set("style", { username, style })
            break
        case "up":
            style = ` transform: translate(${data.player.position.x}px, ${data.player.position.y - data.y}px)`
            state.set("style", { username, style })
            break
        case "down":
            style = ` transform: translate(${data.player.position.x}px, ${data.player.position.y + data.y}px)`
            state.set("style", { username, style })
            break
        default:
            break;
    }
    state.set("style", ` transform: translate(${state.get("positionX")}px, ${state.get("positionY")}px);`)
    state.set("newCLass", data.newCLass)
}
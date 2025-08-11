export function HandleMovement(data = {}, state) {
    const username = data.player.username;
    let style;





    switch (data.direction) {
        case "right":
            style = `transform: translate(${data.player.position.xstep * 55}px, ${data.player.position.ystep * 55}px)`;
            break;
        case "left":
            style = `transform: translate(${data.player.position.xstep * 55}px, ${data.player.position.ystep * 55}px)`;
            break;
        case "up":
            style = `transform: translate(${data.player.position.xstep}px, ${data.player.position.ystep* 55}px)`;
            break;
        case "down":
            style = `transform: translate(${data.player.position.xstep}px, ${data.player.position.ystep * 55}px)`;
            break;
        default:
            style = `transform: translate(${data.player.position.xstep}px, ${data.player.position.ystep * 55}px)`;
    }

    // store style per player
    const styles = state.get("playerStyles") || {};
    styles[username] = style;
    state.set("playerStyles", styles);

    // store newCLass per player
    const classes = state.get("playerClasses") || {};
    classes[username] = data.newCLass;
    state.set("playerClasses", classes);
}

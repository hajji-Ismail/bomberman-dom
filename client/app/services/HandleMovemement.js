export function HandleMovement(data = {}, state) {
    const username = data.player.username;
    let style = `transform: translate(${data.player.position.xstep * 55}px, ${data.player.position.ystep * 55}px)`;

    // store style per player
    const styles = state.get("playerStyles") || {};
    styles[username] = style;
    state.set("playerStyles", styles);

    // store newCLass per player    
    const classes = state.get("playerClasses") || {};
    classes[username] = data.newCLass;
    state.set("playerClasses", classes);
}

export function StopMove(data = {}, state) {
    // const username = data.player.username;
    // const classes = state.get("playerClasses") || {};
    // classes[username] = data.newCLass;
    // state.set("playerClasses", classes);
}
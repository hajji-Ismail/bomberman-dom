export function HandleMovement(data = {}, state) {
    const username = data.player.username;
    let style;
    console.log(data);
    console.log(data.player.position.y );
    
    
const xinitial =1.35
const yinitial =1.85 
    switch (data.direction) {
        case "right":
            style = `transform: translate(${(data.player.position.x-xinitial)*55}px, ${data.player.position.y-yinitial}px)`;
            break;
        case "left":
            style = `transform: translate(${(data.player.position.x-xinitial) *55}px, ${data.player.position.y-yinitial}px)`;
            break;
        case "up":
            style = `transform: translate(${data.player.position.x-xinitial}px, ${(data.player.position.y-yinitial )*55}px)`;
            break;
        case "down":
            style = `transform: translate(${data.player.position.x-xinitial}px, ${data.player.position.y+yinitial *55}px)`;
            break;
        default:
            style = `transform: translate(${data.player.position.x}px, ${data.player.position.y}px)`;
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

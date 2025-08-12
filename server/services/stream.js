export function sendMessages(strem, response) {
    if (strem) {
        strem.send(JSON.stringify(response))
    }
}

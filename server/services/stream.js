function sendMessages(strem, response) {
    
    strem.send(JSON.stringify(response))
    
}
module.exports={sendMessages}
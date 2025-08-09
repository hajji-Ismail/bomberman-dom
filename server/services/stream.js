function sendMessages(strem, response) {
    console.log(strem, "=================================------------------------------------================");
    
    strem.send(JSON.stringify(response))
    
}
module.exports={sendMessages}
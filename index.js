const express = require('express');
const { Server } = require("ws");
const { Client } = require("ssh2");
const fs = require('fs');
const { REMOTE_HOST, REMOTE_PORT, USER_NAME,  PRIVATE_KEY_PATH } = require("./config");
const path = require('path');

const app  = express();


app.use(express.static("public"));


const wss = new Server(
{
    server: app.listen(3000, ()=>{
        console.log(`App is listening on port ${3000}`)
    })
}
);



wss.on('connection', (ws)=> {
    console.log("ws started")
const sshClient = new Client();

ws.on('message', (message)=>{
    console.log("hello message", message.toString())
})

sshClient.on("ready", ()=>{
    console.log("ssh client connected to remote machine...")
    ws.send("SSH client connected to remote machine");
}).connect({
host: REMOTE_HOST,
port: REMOTE_PORT,
username: USER_NAME,
privateKey: fs.readFileSync(PRIVATE_KEY_PATH)
});







ws.on('close', ()=> {
    console.log("ws ended")
    sshClient.end();
})
})
import { WebSocketServer } from 'ws';
import { handleMessage } from './engine.js';

const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', function connection(ws) {
    console.log(wss.clients.size, "client connected")

    ws.on('error', console.error);

    ws.on('message', function message(data) {
        const message = JSON.parse(data)
        console.log("received", message);
        const reply = handleMessage(message);
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(reply);
            }
        });
    });

    ws.on('close', function close() {
        console.log('client disconnected');
    });

    // ws.send('pong!');
    ws.send(handleMessage({}))
});

console.log('WebSocket server is running on ws://localhost:3000');


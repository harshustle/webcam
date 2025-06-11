// server.js - WebSocket Signaling Server
import WebSocket from 'ws';
const PORT = process.env.PORT || 3000;
const wss = new WebSocket.Server({ port: PORT });


let clients = [];

wss.on('connection', ws => {
  clients.push(ws);

  ws.on('message', message => {
    clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    clients = clients.filter(c => c !== ws);
  });
});

console.log("WebSocket signaling server running on ${PORT}");

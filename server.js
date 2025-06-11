// server.js - WebSocket Signaling Server

const WebSocket = require('ws');

// ✅ Let Render or other cloud hosts set the port
const PORT = process.env.PORT || 3000;

// ✅ Create WebSocket server on the correct port
const wss = new WebSocket.Server({ port: PORT });

let clients = [];

wss.on('connection', (ws) => {
  clients.push(ws);
  console.log("🔗 New client connected");

  ws.on('message', (message) => {
    // Broadcast message to all other clients
    clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    clients = clients.filter((c) => c !== ws);
    console.log("❌ Client disconnected");
  });
});

console.log(`✅ WebSocket signaling server running on port ${PORT}`);

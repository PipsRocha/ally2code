 Android App (Bridge)
🔹 Send Flic Events via HTTP

    val buttonId = button.bluetoothAddress  // Unique ID

val json = JSONObject().apply {
    put("event", event)
    put("timestamp", System.currentTimeMillis())
    put("buttonId", buttonId)
}

val request = Request.Builder()
    .url("https://your-web-app.com/api/flic-event")
    .post(RequestBody.create(MediaType.parse("application/json"), json.toString()))
    .build()

OkHttpClient().newCall(request).enqueue(object : Callback {
    override fun onFailure(call: Call, e: IOException) { /* handle error */ }
    override fun onResponse(call: Call, response: Response) { /* success */ }
})

SvelteKit Backend
🔹 1. WebSocket Server (src/lib/ws-server.js)
import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
console.log('Client connected');
});

export function broadcast(event) {
wss.clients.forEach((client) => {
if (client.readyState === 1) {
client.send(JSON.stringify(event));
}
});
}

 2. HTTP Endpoint (src/routes/api/flic-event/+server.ts)
 import type { RequestHandler } from '@sveltejs/kit';
import { broadcast } from '$lib/ws-server';

export const POST: RequestHandler = async ({ request }) => {
const data = await request.json();
const { event, timestamp, buttonId } = data;

broadcast({ type: 'flic', event, timestamp, buttonId });

return new Response(JSON.stringify({ status: 'ok' }), {
status: 200,
headers: { 'Content-Type': 'application/json' }
});
};


🎧 SvelteKit Frontend
🔹 WebSocket Listener and Sound Trigger (+page.svelte)
<script>
const socket = new WebSocket('ws://localhost:8080');

const sounds = {
'AA:BB:CC:DD:EE:01': new Audio('/sounds/click1.mp3'),
'AA:BB:CC:DD:EE:02': new Audio('/sounds/click2.mp3')
};

socket.onmessage = (event) => {
const data = JSON.parse(event.data);
if (data.type === 'flic') {
const sound = sounds[data.buttonId];
if (sound) sound.play();
}
};
</script>

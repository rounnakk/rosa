from fastapi import FastAPI, WebSocket
from fastapi.responses import HTMLResponse
from typing import Dict

app = FastAPI()

# Dictionary to store active WebSocket connections and their contexts
active_connections: Dict[str, str] = {}

data = ""

# HTML content for the chat interface
html_content = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WebSocket Chatbot</title>
</head>
<body>
    <h1>WebSocket Chatbot</h1>
    <div id="chatbox" style="height: 300px; overflow-y: scroll; border: 1px solid #ccc; padding: 10px; margin-bottom: 10px;"></div>
    <input type="text" id="message" placeholder="Type a message..." style="width: 80%; padding: 5px;">
    <button onclick="sendMessage()" style="padding: 5px;">Send</button>

    <script>
        let ws = new WebSocket("ws://localhost:8000/ws");

        // Function to handle messages received from the server
        ws.onmessage = function(event) {
            appendMessage(event.data);
        };

        // Function to send a message to the server
        function sendMessage() {
            let messageInput = document.getElementById("message");
            let message = messageInput.value.trim();

            if (message !== "") {
                ws.send(message);
                appendMessage("You: " + message);
                messageInput.value = "";
            }
        }

        // Function to append a message to the chatbox
        function appendMessage(message) {
            let chatbox = document.getElementById("chatbox");
            let messageElement = document.createElement("div");
            messageElement.textContent = message;
            chatbox.appendChild(messageElement);

            // Automatically scroll chatbox to bottom
            chatbox.scrollTop = chatbox.scrollHeight;
        }
    </script>
</body>
</html>
"""

# WebSocket endpoint to handle connections
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    user_id = str(id(websocket))  # Unique identifier for the connection
    # Initialize context for this user if it doesn't exist
    if user_id not in active_connections:
        active_connections[user_id] = {
            "user_id": user_id,
            "context": ""  # Initialize with an empty context or state
        }
    print("Connections: ",(len(active_connections) ))
    try:
        while True:
            data = await websocket.receive_text()
            await handle_message(websocket, data, active_connections[user_id])
            connection_info = active_connections[user_id]
            connection_info['context'] += " "
            connection_info['context'] += data
    except Exception as e:
        print(f"Connection error for user {user_id}: {e}")
    finally:
        del active_connections[user_id]  # Clean up on connection close

async def handle_message(websocket: WebSocket, message: str, user :dict):
    # Example: Process message and generate a response based on user context
    response = f"Echo: {message}"
    print(response)
    print(user)
    # Send response back to the user via WebSocket
    await websocket.send_text(response)

# Route to serve the HTML content
@app.get("/")
async def get():
    return HTMLResponse(content=html_content)

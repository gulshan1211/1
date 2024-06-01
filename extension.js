const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    context.subscriptions.push(
        vscode.commands.registerCommand('my-chatbot.openChatbot', () => {
            const panel = vscode.window.createWebviewPanel(
                'chatbot',
                'Chatbot',
                vscode.ViewColumn.One,
                {
                    enableScripts: true,
                }
            );

            panel.webview.html = getWebviewContent();
        })
    );

    
 // Register the webview view provider
 vscode.window.registerWebviewViewProvider('my-chatbot-view', {
	resolveWebviewView: (webviewView) => {
		// Store the resolved webviewView object
		resolvedWebviewView = webviewView;
	}
});


};

    


function getWebviewContent() {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Chatbot</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                }
                .chat-container {
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                }
                .messages {
                    flex: 1;
                    padding: 10px;
                    overflow-y: auto;
                    border: 1px solid #ccc;
                }
                .input-container {
                    display: flex;
                }
                input {
                    flex: 1;
                    padding: 10px;
                    border: 1px solid #ccc;
                }
                button {
                    padding: 10px;
                    border: 1px solid #ccc;
                    background: #007acc;
                    color: white;
                }
            </style>
        </head>
        <body>
            <div class="chat-container">
                <div class="messages" id="messages"></div>
                <div class="input-container">
                    <input type="text" id="input" placeholder="Type a message...">
                    <button onclick="sendMessage()">Send</button>
                </div>
            </div>
            <script>
                const vscode = acquireVsCodeApi();

                function sendMessage() {
                    const input = document.getElementById('input');
                    const message = input.value;
                    if (message) {
                        const messages = document.getElementById('messages');
                        const messageElement = document.createElement('div');
                        messageElement.textContent = message;
                        messages.appendChild(messageElement);
                        input.value = '';
                    }
                }
            </script>
        </body>
        </html>
    `;
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
}

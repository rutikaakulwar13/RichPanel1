// Replace 'YOUR_ACCESS_TOKEN' with your actual access token
const ACCESS_TOKEN = 'YOUR_ACCESS_TOKEN';
const PAGE_ID = 'YOUR_PAGE_ID';
const FB_GRAPH_API = 'https://graph.facebook.com/v12.0/';

// Fetch conversations and display them
function fetchConversations() {
    // Fetch conversations using Facebook Graph API
    fetch(`${FB_GRAPH_API}${PAGE_ID}/conversations?access_token=${ACCESS_TOKEN}`)
        .then(response => response.json())
        .then(data => {
            const conversationList = document.getElementById('conversation-list');
            conversationList.innerHTML = '';
            data.data.forEach(conversation => {
                const listItem = document.createElement('li');
                listItem.textContent = conversation.id;
                listItem.onclick = () => fetchMessages(conversation.id);
                conversationList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error fetching conversations:', error));
}

// Fetch messages for a specific conversation
function fetchMessages(conversationId) {
    // Fetch messages using Facebook Graph API
    fetch(`${FB_GRAPH_API}${conversationId}/messages?access_token=${ACCESS_TOKEN}`)
        .then(response => response.json())
        .then(data => {
            const conversationThread = document.getElementById('conversation-thread');
            conversationThread.innerHTML = '';
            data.data.forEach(message => {
                const listItem = document.createElement('li');
                listItem.textContent = message.message;
                conversationThread.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error fetching messages:', error));
}

// Send a message to a specific conversation
function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value;
    const conversationId = document.querySelector('.conversation-list li.selected').textContent;

    // Send message using Facebook Graph API
    fetch(`${FB_GRAPH_API}${conversationId}/messages?access_token=${ACCESS_TOKEN}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: message
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Message sent:', data);
        // Optionally, update UI to display the sent message
    })
    .catch(error => console.error('Error sending message:', error));

    messageInput.value = ''; // Clear input field after sending message
}

// Fetch conversations when the page loads
window.onload = fetchConversations;

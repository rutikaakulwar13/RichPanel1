window.fbAsyncInit = function() {
    FB.init({
      appId      : '2099746917061591',
      xfbml      : true,
      version    : 'v12.0'
    });
      
    FB.AppEvents.logPageView();   
      
    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            console.log('Logged in.');
            getMessages();
        } else {
            FB.login();
        }
    });
};

function getMessages() {
    FB.api('/248879228302402/conversations', function(response) {
        if (response && !response.error) {
            displayMessages(response.data);
        } else {
            console.error('Failed to fetch messages');
        }
    });
}

function displayMessages(messages) {
    var messageContainer = document.getElementById('message-container');
    messages.forEach(function(message) {
        var messageElement = document.createElement('div');
        messageElement.innerHTML = message.snippet;
        messageContainer.appendChild(messageElement);
    });
}

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

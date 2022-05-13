var sendChannel, 
	receiveChannel,
	chatWindow = document.querySelector('.chat-window'),
	chatWindowMessage = document.querySelector('.chat-window-message'),
	chatThread = document.querySelector('.chat-thread');

// On form submit, send message
chatWindow.onsubmit = function (e) {
	e.preventDefault();

    handleMessage(chatWindowMessage.value);
	 
  	$.ajax({
  		url: 'https://corsproxy.io/?' + encodeURIComponent('http://api.brainshop.ai/get?bid=162606&key=B6psSaOn7QldQxoO&f=json&jsoncallback=callback&uid=0&msg=' + chatWindowMessage.value),
   	    type: "GET",
        crossDomain: true,
        dataType: 'json',
        complete: function(response){
            var res = response.responseText.replace("callback('", '').replace("')", '');
            while(res.indexOf("\\") > -1) {
                res = res.replace("\\", '');
            }
            handleMessage2(res)
        }
   	});

    chatWindowMessage.value = '';

	return false;
};

function handleMessage (event) {
    var chatNewThread = document.createElement('ul'),
        chatNewMessage = document.createTextNode(event);

    // Add message to chat thread and scroll to bottom
    chatNewThread.appendChild(chatNewMessage);
    chatThread.appendChild(chatNewThread);
    chatThread.scrollTop = chatThread.scrollHeight;
}

function handleMessage2 (event) {
    var chatNewThread = document.createElement('li'),
    	chatNewMessage = document.createTextNode(event);

    // Add message to chat thread and scroll to bottom
    chatNewThread.appendChild(chatNewMessage);
    chatThread.appendChild(chatNewThread);
    pageScroll();
}
function pageScroll() {
    window.scrollBy(0,1);
    scrolldelay = setTimeout(pageScroll,10);
}
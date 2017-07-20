var listOfUsers = document.getElementById('displayUsers');
var enterChatButton = document.getElementById('enterChatButton');
var inputUserName = document.getElementById('inputUserName');
var inputUserNickname = document.getElementById('inputUserNickname');
var textPlace = document.getElementById('textPlace');
var inputMessage = document.getElementById('inputMessage');
var sendMessageButton = document.getElementById('sendMessageButton');
var userNameFiled = document.getElementById('userName');
var userNicknameFiled = document.getElementById('userNickname');



var user, message;




enterChatButton.addEventListener( 'click' , enterChat);
sendMessageButton.addEventListener('click', sendMessage);

function enterChat(){
	document.getElementById('popup').style.top = "99999px";

	user = {
		userName: inputUserName.value,
		userNickname: inputUserNickname.value 
	}

	userNameFiled.innerHTML = inputUserName.value;
	userNicknameFiled.innerHTML = ('@' + inputUserNickname.value);

	ajaxRequest({
		method: 'POST',
		url: '/users',
		data: user
	})

}

function sendMessage(){

	message = {
		text: inputMessage.value,
		senderName: userNameFiled.innerHTML,
		senderNickname: userNicknameFiled.innerHTML,
		time: new Date().toLocaleString()
	}

	ajaxRequest({
		method: 'POST',
		url: '/messages',
		data: message
	})

	console.log(message);

}

function ajaxRequest(options){
	var url = options.url;
	var method = options.method;
	var callback = options.callback;
	var data = options.data;
	var xhr = new XMLHttpRequest();

	xhr.open(method, url, true);
	xhr.setRequestHeader('Content-type', 'application/json');
	xhr.send(JSON.stringify(data));

	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			callback(this.responseText);
		}
	};
};

function getUsers(){
	ajaxRequest({
		url: '/users',
		method: 'GET',
		callback: function(users){
			users = JSON.parse(users);
			listOfUsers.innerHTML = '';
			for (var i in users){
				var el = document.createElement('li');
				el.innerHTML = users[i].userName;
				listOfUsers.appendChild(el);
			}
		}
	});
};

function getMessages(){
	ajaxRequest({
		url: '/messages',
		method: 'GET',
		callback: function(messages){
			messages = JSON.parse(messages);
			textPlace.innerHTML = '';
			for (var i in messages){
				var el = document.createElement('li');
				el.innerHTML = ('Sender: ' + messages[i].senderName + " (@" + messages[i].senderNickname + ")" + 
				", time: " + messages[i].time + '\n\n' + messages[i].text);
				if (messages[i].text.indexOf(userNicknameFiled.innerHTML) != -1){
					el.style.backgroundColor = "grey";
				}
				textPlace.appendChild(el);
			}
		}
	});
};


getUsers();
getMessages();

setInterval(function(){
	getUsers();
	getMessages()
}, 1000);
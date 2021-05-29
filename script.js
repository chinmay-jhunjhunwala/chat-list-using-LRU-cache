var myMap = new Map();//to store chat name as key and its list element as value
var chatList = document.querySelector("#ul");//to store the chat list
var notificationList = document.querySelector("#notificationList");//to store the notification list
var receiveButton = document.querySelector("#enter_button");
var deleteButton = document.querySelector("#delete_button");
var okButton = document.querySelector("#ok_button");

var cacheCapacity = 7;//cache memory limit

var chatNamesArray = ["Sambit", "Abhishek", "Shalini", "Chinmay", "Avijit", 
"Nikhil", "Siddharth", "Ananya", "Piyush", "Yash"];

var chatMessagesArray = ["Send me your current location..",
"Congratulations! I'm glad u could make..","The G Meet link will be shared soon..",
"Let's catch up this weekend at..", "At class, I'll call you back in 10 mins...",
"Do you have any information regarding..", "Any ideas which you think would work..",
"Hey, how are you doing? I hope..","If you get any updates, please keep me..","Can you suggest me some good.."];


function receiveHandler()
{
	//generating a random number to pickup random name and corresponding message
	var randomIndex = Math.floor(Math.random() * chatNamesArray.length);
	var name = chatNamesArray[randomIndex];
	var message = chatMessagesArray[randomIndex];
	var elementsOfChatList = chatList.childNodes;

	if(!myMap.has(name))
	{
		if(myMap.size === cacheCapacity)
		{
			var targetElement = elementsOfChatList[myMap.size-1];//get the last element which needs to be "evicted"
			var key = targetElement.childNodes[0].innerText;//get the chat name
			myMap.delete(key);//remove chat from map

			receiveButton.disabled = true;
			removeChat(targetElement);
			
			//first wait for the last chat to be removed and then update chat list
			setTimeout(updateChatList, 1000, name, message, elementsOfChatList);
		}
		else
			updateChatList(name,message,elementsOfChatList);
	}
	else
	{
		var targetElement = myMap.get(name);
		myMap.delete(name);

		//deleted from its current position and later pushed to the top of the list
		receiveButton.disabled = true;
		removeChat(targetElement);

		//wait for the chat to be removed from its current position
		//then update the chat list
		setTimeout(updateChatList, 1000, name, message, elementsOfChatList);
	}
}

function updateChatList(name, message, elementsOfChatList)
{
	receiveButton.disabled = false;
	var listItem = createNewChatListElement(name, message);
	
	// listItem.setAttribute("id",name);
	listItem.classList.add("newItem");//for animation purpose

	//store the chat name as key value and its list element as value
	myMap.set(name,listItem);

	//pushing newly created list element to the top
	chatList.insertBefore(listItem, elementsOfChatList[0]);
	
	//after the chat list is updated, update notification
	setTimeout(printNotification,550,"received", name);
}

function createNewChatListElement(name,message)
{
	var listElement = document.createElement("li");
	var chatName = document.createElement("span");
	var br = document.createElement("br");
	var chatMessage = document.createElement("span");

	chatName.textContent = name;
	chatMessage.textContent = message;

	listElement.appendChild(chatName);
	listElement.appendChild(br);
	listElement.appendChild(chatMessage);

	listElement.classList.add("listRender");
	listElement.childNodes[0].classList.add("chatName");

	return listElement;
}

function deleteHandler()
{
	receiveButton.disabled = true;
	var temp = document.querySelectorAll(".chatName");

	for (var i = 0; i < temp.length; i++)
	{
		temp[i].setAttribute("title","Click here to delete chat");
	    	temp[i].classList.add("pointerOnHover");//change cursor to pointer
	}

	chatList.addEventListener("click", removeChatHandler);
}

function removeChatHandler(event)
{
	var targetElement = event.target;

	//delete chat only if a chat name is clicked
	if(targetElement.classList[0] === "chatName")
	{
		var key = targetElement.innerText;
		myMap.delete(key);
		targetElement = targetElement.parentElement;
		removeChat(targetElement);

		//wait for sometime for the chat to be deleted
		//and then print notification
		setTimeout(printNotification, 1000, "deleted", targetElement.childNodes[0].innerText);
	}
}

function removeChat(targetElement)
{
	targetElement.classList.remove("newItem");
	targetElement.classList.add("remove");
	targetElement.addEventListener("animationend",() => {
		targetElement.remove();
	});
}

function okHandler()
{
	receiveButton.disabled = false;
	var temp = document.querySelectorAll(".chatName");

	for (var i = 0; i < temp.length; i++)
	{
		temp[i].setAttribute("title","");
	    	temp[i].classList.remove('pointerOnHover');
	}

	//disables deleting of chat until we press delete button again
	chatList.removeEventListener("click",removeChatHandler);
}

function printNotification(instruction, name)
{
	var tempNode = document.createElement("li");

	if(instruction === "received")
		tempNode.textContent = "Received a new message from " + name;
	else
		tempNode.textContent = "Deleted your chat with " + name;
	
	tempNode.classList.add("addNotification");
	notificationList.insertBefore(tempNode,notificationList.childNodes[0]);
}

receiveButton.addEventListener("click",receiveHandler);
deleteButton.addEventListener("click",deleteHandler);
okButton.addEventListener("click",okHandler);
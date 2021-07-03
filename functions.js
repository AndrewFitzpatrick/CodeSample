var enterButton = document.getElementById("enter");
var input = document.getElementById("userInput");
var ul = document.querySelector("ul");
var item = document.getElementsByTagName("li");
var itemText = document.getElementsByClassName("itemEntered");
var listArray = [];
var warn = document.getElementById("warning");
var extra = document.getElementById("extra");

warn.classList.add("hide");
extra.classList.add("hide");

// check if user input is already an item on the list
checkForDuplicates = () => {
	var userInput = input.value;
	for (let i = 0; i <= item.length - 1; i++) {
		listArray.push(itemText[i].innerHTML);
	}
	switch (true) {
		case (listArray.indexOf(input.value) !== -1) :
			duplicateFound(listArray);
			break;
		default:
			createListElement();
			break;
	}
}

// display warning if duplicate is found
duplicateFound = (arr) => {
	hideError(warn);
	extra.classList.remove("hide");
	var yesBtn = document.getElementById("yes_btn");
	yesBtn.addEventListener("click", createListElement);
}


// hide error messages
hideError = (...params) => {
	for (let i = 0; i < params.length; i++) {
  	params[i].classList.add('hide');
  }
}

// create a new list item
createListElement = () => {
	hideError(warn, extra);
	var li = document.createElement("li"); // creates an element "li"
	var span = document.createElement("span"); // creates an element "li"
	span.appendChild(document.createTextNode(input.value)); //makes text from input field the li text
	ul.appendChild(li); //adds li to ul
	li.appendChild(span)
	span.setAttribute("class", "itemEntered");
	input.value = ""; //Reset text input field

	// copmplete item when clicked
	crossOut = () => li.classList.toggle("done");

	li.addEventListener("click", crossOut);

	// delete item when X is clicked
	const deleteListItem = () => li.classList.add("delete");
	
	// add delete option to list item
	var dBtn = document.createElement("button");
	dBtn.appendChild(document.createTextNode("X"));
	li.appendChild(dBtn);
	dBtn.addEventListener("click", deleteListItem);	
}

// initial function call
addList = (event) => {
	// if there is a valid entry check for duplicates or show invalid entry warning
	switch (true) {
		case (input.value.trim().length > 0 || input.value.trim().length > 0 && event.which === 13) :
			checkForDuplicates();
			break;
		default :
			// if new item field is empty and submitted, display the warning element
			warn.classList.remove("hide");
			break;
	}
}

enterButton.addEventListener("click",addList);

input.addEventListener("keypress", function (e) {
    e.key === 'Enter' && addList(e)
});


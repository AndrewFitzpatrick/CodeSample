var enterButton = document.getElementById("enter");
var input = document.getElementById("userInput");
var ul = document.querySelector("ul");
var item = document.getElementsByTagName("li");

var itemText = document.getElementsByClassName("itemEntered");
var listArray = [];
var warn = document.getElementById("warning");
var extra = document.getElementById("extra");

// returns length of the input value
function inputLength(){
	return input.value.length;
}

// returns length of the list
function listLength(){
	return item.length;
}

// creates the warning element
function createWarningElement() {
	var li = document.createElement("li"); // creates an element "li"
	var warningText = "please enter a value";
	li.appendChild(document.createTextNode(warningText));
	ul.appendChild(li); //adds li to ul
}

// if new item field is empty and enter is pushed, display the warning element
function displayWarning() {
	warn.style.display = "block";
}

// check if user input is already an item on the list
function checkForDuplicates() {
	var userInput = input.value;
	for (let i = 0; i <= item.length - 1; i++) {
		listArray.push(itemText[i].innerHTML);
	}
	if (listArray.indexOf(input.value) !== -1) {
		// pass listarray to function for length
		duplicateFound(listArray);
	}
	else {
		createListElement();
	};
}

// display warning if duplicate is found
function duplicateFound(arr) {
	hideError(warn);
	extra.style.display = "block";
	var yesBtn = document.createElement("button");
	yesBtn.className = "yesBtn";
	yesBtn.appendChild(document.createTextNode("YES"));
	yesBtn.addEventListener("click", createListElement);
	// dont append button if button is present
	if (arr.length === 1) { extra.appendChild(yesBtn); }
}


// hide error messages
function hideError(...params) {
	for (let i = 0; i < params.length; i++) {
        if (params[i].style.display === "block") {params[i].style.display = "none";}
    }
}

// create a new list item
function createListElement() {
	hideError(warn, extra);	
	var li = document.createElement("li"); // creates an element "li"
	var span = document.createElement("span"); // creates an element "li"
	span.appendChild(document.createTextNode(input.value)); //makes text from input field the li text
	ul.appendChild(li); //adds li to ul
	li.appendChild(span)
	span.setAttribute("class", "itemEntered");
	input.value = ""; //Reset text input field


	// copmplete item when clicked
	function crossOut() {
		li.classList.toggle("done");
	}

	li.addEventListener("click",crossOut);


	// add delete option to list item
	var dBtn = document.createElement("button");
	dBtn.appendChild(document.createTextNode("X"));
	li.appendChild(dBtn);
	dBtn.addEventListener("click", deleteListItem);


	// delete item when X is clicked
	function deleteListItem(){
		li.classList.add("delete")
	}
}

// initial function call
function addList(event){
	if (inputLength() > 0 || inputLength() > 0 && event.which ===13) { //makes sure that an empty input field doesn't create a li
		checkForDuplicates();
	} else {
		 displayWarning();
	}
}

enterButton.addEventListener("click",addList);

input.addEventListener("keypress", function (e) {
    if (e.key === 'Enter') {
      addList(e)
    }
});


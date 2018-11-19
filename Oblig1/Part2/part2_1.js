var list = document.querySelector('#list'),
	form = document.querySelector('form'),
	item = document.querySelector('#item'),
	del = document.getElementById('#del');

form.addEventListener('submit', function(e) {
	e.preventDefault();
	if(item.value < 1) return; //ignores an empty input
	list.innerHTML += "<li>" + item.value + "<button id='del'> X </button></li>";
	store();
	$("#item").val("");
}, false);

$('#list').on('click', '#del',function(e) {
	$(this).parent().remove();
	store();
});

function store() {
	localStorage.setItem("items", list.innerHTML);
}

function storedItems() {
	var stored = localStorage.getItem("items");
	if(!stored) {
      alert("no stored values");
    } else {
      list.innerHTML = stored;
    }
}

storedItems();
/*
localStorage.clear();

$("#add").click(function () {
	var item = $("#text_in").val();
	$("#text_in").val("");
	$("#list").append("<li>" + item + "<button id='btn'>X</button></li>");
});

//removes element from list
$("#list").on('click', 'li', function(e) {
	$(this).remove();
});*/

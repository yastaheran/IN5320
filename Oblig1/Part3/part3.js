/** fra del 2.1 **/
var list = document.querySelector('#list'),
	form = document.querySelector('form'),
	country = document.querySelector('input'),
	del = document.getElementById('#del')
	pop = 0;

//adds element to list
form.addEventListener('submit', function(e) {
	e.preventDefault();
	if(country.value < 1) return; //ignorerer en tom input
	// Del 3, step 1
	var name = country.value;
	$.getJSON("http://api.population.io:80/1.0/population/"+ name +"/today-and-tomorrow/").done(function(result) {
		pop_today = result.total_population[0].population;
		var pop_tomorrow = result.total_population[1].population;
		var pop_rate = calculate_rate(pop_today, pop_tomorrow);
		//Del 3, step 2
		var t = setInterval(update_pop(pop_today, pop_rate), 1000);

		list.innerHTML += "<li>" + name + " -- " + pop + "<button id='del'> X </button></li>";
		store();
	}).fail(function() {
		alert('no country by that name');
	});
	$("#country").val("");
}, false);

//removes element from list
$("#list").on('click', '#del', function(e) {
	$(this).parent().remove();
	store();
});

function store() {
	localStorage.setItem("country", list.innerHTML);
}

function storedCountries() {
	var stored = localStorage.getItem("country");
	if(!stored) {
      alert("no stored values");
    } else {
      list.innerHTML = stored;
    }
}

function update_pop(today, rate) {
		pop = today + rate;
}

function calculate_rate(today, tomorrow) {
	//24*60*60 = 8600 sekunder i løpet av 24 timer
	return Math.ceil((tomorrow - pop_today)/86400);
}

storedCountries();

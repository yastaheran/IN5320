//List populator
//Step 2: C
var rom = ["java", "c", "pascal", "fortran", "lisp", "scheme",
			"logo","perl","ada","awk","caml","chill","simula"];
//Step 2: A
function leggTil(item) {
	var ul = document.querySelector("ul");
	var li = document.createElement("li");
	li.textContent = item;
    ul.appendChild(li);
}

//Step 2: B
function forHver(array, func) {
	for(var i = 0; i < array.length; i++) {
		var item = array[i];
		func(item);
	}
}

//Step 3: A
function sjekkOrd(element, searchWord) {
	if(element.startsWith(searchWord)) {
		return true;
	}
	return false;
}

//Step 3: B
function sjekkListe(list, searchWord) {
	list.sort();
	var resultat = [];
	for(var i = 0; i < list.length; i++) {
		if(sjekkOrd(list[i], searchWord)){
			resultat.push(list[i]);
		}
		
	}
	return resultat;
}

//Step 4:
function search() {
	var input = document.getElementById("search");
	var filter = input.value.toLowerCase();
	var nyListe = sjekkListe(rom, filter);
	forHver(nyListe, leggTil);
}

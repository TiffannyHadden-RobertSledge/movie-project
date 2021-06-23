"use strict";
getAllMovies();

// displayMovies(buildMovieList(getAllMovies))
window.onload = function () {
	// alert("Window is loading");
}

$("#submitButton").on("click", function () {
	console.log("adding movie");
	addMovie();
});

function getAllMovies() {
	fetch("https://hazel-distinct-waiter.glitch.me/movies", {
		method: "GET",
	})
		.then(response => response.json())
		.then(data => {
			// console.log(data);
			displayMovies((makeCard(data)))
		})
}

function makeCard(data) {
	let card = ``;
	$("#movies").empty();
	for (let i = 0; i < data.length; i++) {
		card += `
		<div class="card">
		<h4>${data[i].title}</h4>
		<p>${data[i].actors}</p>
		<p>${data[i].plot}</p>
		<p>${data[i].genre}</p>
		<p>${data[i].rating}</p>
		<button type="button" class="editButton">Edit Movie</button>
		<button class="deleteMovie" id="${data[i].id}">Delete Movie</button>
		${buildEditForm(data[i].id)}
`

		$(".deleteMovie").on("click", function(){
			let uniqueID = $(this).attr("id");
			console.log("clicked");
			deleteMovie(uniqueID);
		})

	}
	return card;
}


function displayMovies(listOfMovies) {
	$("#movies").append(listOfMovies);
	setToggleEventListener();
	setEditClickEvent();
}


function addMovie() {
	let title = $("#title").val()
	let rating = $("#rating").val()

	fetch("https://hazel-distinct-waiter.glitch.me/movies", {
		method: "POST",
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({title, rating}),
	})
		.then(response => response.json())
		.then(data => {
			console.log(data)
			getAllMovies()
		});
}

function buildEditForm(id) {
	let form = "<form class='hideMe'>";

	form += "<label for='editTitle'>Title</label><input class='editTitle'" +
		" name='editTitle' type='text'>";

	form += "<label for='editRating'>Rating</label><input class='editRating'" +
		" name='editRating' type='number' max='5'>";


	form += "<label for='editActors'>Actors</label><input class='editActors'" +
		" name='editActors' type='text'>";


	form += "<label for='editPlot'>Plot</label><input class='editPlot'" +
		" name='editPLot' type='text'>";


	form += "<label for='editDirector'>Director</label><input class='editDirector'" +
		" name='editDirector' type='text'>";


	form += "<label for='editYear'>Year</label><input class='editYear'" +
		" name='editYear' type='year'>";


	form += "<label for='editGenre'>Genre</label><input class='editGenre'" +
		" name='editGenre' type='text'>";


	form += `<button type='button' data-value='${id}' class='editMovies'>Submit` +
		" Changes</button>"

	form += "</form>";

	return form;
}
function setEditClickEvent() {

	$(".editMovies").on("click", function () {
		let editForm = $(this).parent();
		let movie = {
			title: editForm.find(".editTitle").val(),
			plot: editForm.find(".editPlot").val(),
			actors: editForm.find(".editActors").val(),
			rating: editForm.find(".editRating").val(),
			genre: editForm.find(".editGenre").val(),
			year: editForm.find(".editYear").val()
		}
		console.log(movie);
		editMovie(movie, $(this).attr("data-value"));
		$("#movies").empty();
	})
}
function editMovie(movie, id) {
	fetch(`https://hazel-distinct-waiter.glitch.me/movies/${id}`, {
		method: "PATCH",
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(movie),
	})
		.then(response => console.log(response.json()))
		.then(() => location.reload())
}
function setToggleEventListener(){
	$(".editButton").on("click", function () {
		$(".hideMe").toggle();
	})

	$(".deleteMovie").click(function() {
		let uniqueID = $(this).attr("id");
		console.log("clicked");
		deleteMovie(uniqueID)
	})
}

function deleteMovie(id) {
	fetch(`https://hazel-distinct-waiter.glitch.me/movies/${id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
	}).then(response => console.log("deleting"))
		.then(() => location.reload())
}
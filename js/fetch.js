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

$(".editButton").on("click", function () {
	console.log("clicked");
	$(".hideMe").toggle();
})

function getAllMovies() {
	fetch("https://hazel-distinct-waiter.glitch.me/movies", {
		method: "GET",
	})
		.then(response => response.json())
		.then(data => {
			console.log(data);
			displayMovies((makeCard(data)))
		})
}

function buildMovieList(data) {
	let output = "";
	$("#movies").empty();
	for (let i = 0; i < data.length; i++) {
		output += "<div class='card'>";
		output += "<h4>" + data[i].title + "</h4>";
		output += "<p>" + data[i].actors + "</p>";
		output += "<p>" + data[i].plot + "</p>";
		output += "<p>" + data[i].rating + "</p>";
		output += "<button type='button' class='editButton'>Edit Movie</button>"
		// output += buildEditForm();
		output += getFormInfo(data[i]);
		output += "</div>"
	}
	return output;
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
		<button type="button" id="editButton">Edit Movie</button>
		<button type="button" id="deleteButton">Delete Movie</button>
		${buildEditForm(data[i])}
`

	}
	return card;
}


function displayMovies(listOfMovies) {
	$("#movies").append(listOfMovies);
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

function buildEditForm() {
	let form = "<form class='hideMe'>";

	form += "<label for='editTitle'>Title</label><input id='editTitle'" +
		" name='editTitle' type='text'>";

	form += "<label for='editRating'>Rating</label><input id='editRating'" +
		" name='editRating' type='number' max='5'>";


	form += "<label for='editActors'>Actors</label><input id='editActors'" +
		" name='editActors' type='text'>";


	form += "<label for='editPlot'>Plot</label><input id='editPlot'" +
		" name='editPLot' type='text'>";


	form += "<label for='editDirector'>Director</label><input id='editDirector'" +
		" name='editDirector' type='text'>";


	form += "<label for='editYear'>Year</label><input id='editYear'" +
		" name='editYear' type='year'>";


	form += "<label for='editGenre'>Genre</label><input id='editGenre'" +
		" name='editGenre' type='text'>";


	form += "<button type='button' class='editMovies' id='editMovies'>Submit" +
		" Changes</button>"

	form += "</form>";

	return form;
}
function getFormInfo(info) {
	let movie = {
		title: $(this),
		plot: info.plot,
		actors: info.actors,
		rating: info.rating,
		genre: info.genre,
		year: info.year
	}
	$("#editMovies").on("click", function () {
		console.log("Editing current movie");
		editMovie(movie, info.id);
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
}

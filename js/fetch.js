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

$(".editButton").on("click", function() {
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
			displayMovies((buildMovieList(data)))
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
		output += buildEditForm(data[i]);
		output += "</div>"
	}
	return output;
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

function buildEditForm(info) {
	let form = "<form class='hideMe'>";

	form += "<label for='editTitle'>Title</label><input id='editTitle'" +
		" name='editTitle' type='text'>";
	let title = $("#editTitle");
	title.attr("value", info.title);
	console.log(title);

	form += "<label for='editRating'>Rating</label><input id='editRating'" +
		" name='editRating' type='number' max='5'>";
	let rating = $("#editRating").val(info.rating);

	form += "<label for='editActors'>Actors</label><input id='editActors'" +
		" name='editActors' type='text'>";
	let actors = $("#editActors").val(info.actors);

	form += "<label for='editPlot'>Plot</label><input id='editPlot'" +
		" name='editPLot' type='text'>";
	let plot = $("#editPlot").val(info.plot);

	form += "<label for='editDirector'>Director</label><input id='editDirector'" +
		" name='editDirector' type='text'>";
	let director = $("#editDirector").val(info.director);

	form += "<label for='editYear'>Year</label><input id='editYear'" +
		" name='editYear' type='year'>";
	let year = $("#editYear").val(info.year);

	form += "<label for='editGenre'>Genre</label><input id='editGenre'" +
		" name='editGenre' type='text'>";
	let genre = $("#editGenre").val(info.genre);

	form += "<button type='button' class='editMovies' id='editMovies'>Submit" +
		" Changes</button>"

	form += "</form>";

	$("#editMovies").on("click", function() {
		console.log("Editing current movie");
		editMovie(title, rating, director, year, plot, genre, actors);
	})

	return form;
}

function editMovie(title, rating, director, year, plot, genre, actors) {
	fetch("https://hazel-distinct-waiter.glitch.me/movies", {
		method: "PUT",
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({title, rating, director, year, plot, genre, actors}),
	})
		.then(response => console.log(response.json()))
}

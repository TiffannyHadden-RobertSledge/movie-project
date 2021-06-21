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

// getAllMovies().then((movies) => {
//
// }).catch((error) => {
//
// });

function getAllMovies() {
	console.log("getting all movies")
	fetch("https://hazel-distinct-waiter.glitch.me/movies", {
		method: "GET",
	})
		.then(response => response.json())
		.then(data => {
			console.log('Here are all the movies:');
			data.forEach(({title, genre, rating, id}) => {
				let newTitle = `${title}`;
				let newGenre = `${genre}`;
				let newRating = `${rating}`;
				let newID = `${id}`;
				makeCard(newTitle, newGenre, newRating, newID);
			});
		})
}

function makeCard(title, genre, rating, id) {

	let card;
	card = "";
	card += `<div class="card">`;
	card += `<div class="card-body">`;
	card += `<p class="card-text mb-0">${title} <br> ${genre}<br> ${rating}</p>`;
	card += `</div>`;
	card += `<div id="">`;
	card += `<button>Edit Movie</button>`;
	card += `<button class="deleteMovie" id="${id}">Delete Movie</button>`;
	card += buildEditForm(title, genre, rating, id);
	card += `</div>`;
	card += `</div></div>`;
	document.getElementById("movies").innerHTML += card;

	$(".deleteMovie").click(function() {
		let uniqueID = $(this).attr("id");
		deleteMovie(uniqueID)
	})
}

function displayMovies(listOfMovies) {
	$("#movies").append(listOfMovies);
}


function addMovie() {
	let title = $("#title").val()
	let rating = $("#rating").val()
	let actors = $("#actors").val()
	let plot = $("#plot").val()

	fetch("https://hazel-distinct-waiter.glitch.me/movies", {
		method: "POST",
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({title, rating, actors, plot}),
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

function deleteMovie(id) {
	fetch(`https://hazel-distinct-waiter.glitch.me/movies/${id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
	}).then(response => console.log("deleting"));
}

function dummyFunction() {

}
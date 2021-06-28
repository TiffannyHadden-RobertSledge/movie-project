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
		<div class="card col-4">
    <div class="card-img">
        <img src="${data[i].poster}" alt="${data[i].title}, movie poster" height="100%"
             width="80%">
    </div>
    <div class="hideOnEdit">
        <h4>${data[i].title}</h4>
        <p>${data[i].actors}</p>
        <p>${data[i].plot}</p>
        <p>${data[i].genre}</p>
        <p>${data[i].rating}</p>
        <button type="button" class="editButton">Edit Movie</button>
    </div>
    <button class="deleteMovie" id="${data[i].id}">Delete Movie</button>
    ${buildEditForm(data[i].id)}
</div>
`
		$(".deleteMovie").on("click", function () {
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
	let form = `
	<form class="hideMe">
	
	<label for="editTitle">Title</label>
	<input class="editTitle" name="editTitle" type="text">
	
	<label for="editRating">Rating</label>
	<input class="editRating" name="editRating" type="number" max="5" min="-5">
	
	<label for="editActors">Actors/Actresses</label>
	<input class="editActors" name="editActors" type="text">
	
	<label for="editPlot">Plot</label>
	<input class="editPlot" name="editPlot" type="text">
	
	<label for="editDirector">Director</label>
	<input class="editDirector" name="editDirector" type="text">
	
	<label for="editYear">Year</label>
	<input class="editYear" name="editYear" type="month">
	
	<label for="editGenre">Genre</label>
	<input class="editGenre" name="editGenre" type="text">
	
	<button type="button" data-value="${id}" class="editMovies">Submit Changes</button>
</form>`
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

function setToggleEventListener() {
	$(".editButton").on("click", function () {
		$(".hideMe").hide();
		$(this).parent().find(".hideMe").show();
		// $(this).parent().hide();
	})

	$(".deleteMovie").click(function () {
		let uniqueID = $(this).attr("id");
		console.log("clicked");
		deleteMovie(uniqueID)
	})

	$(".card").hover(unHide, hide);
}
function unHide(){
	$(this).find($(".card-img")).hide();
	$(this).find($(".hideOnEdit")).show();
}

function hide() {
	$(this).find($(".card-img")).show();
	$(this).find($(".hideOnEdit")).hide();
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
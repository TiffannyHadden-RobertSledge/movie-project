"use strict";
getAllMovies()

// displayMovies(buildMovieList(getAllMovies))


function getAllMovies() {
	fetch("https://hazel-distinct-waiter.glitch.me/movies", {
		method: "GET",
	})
		.then(response => response.json())
		.then(data => {
			displayMovies((buildMovieList(data)))
		})
}

window.onload = function () {
	alert("Window is loading");
}

function buildMovieList(data) {
	let output = "";
	for (let i = 0; i < data.length; i++) {
		output += "<h4>" + data[i].title + "</h4>";
		output += "<p>" + data[i].actors + "</p>";
		output += "<p>" + data[i].plot + "</p>";
		output += "<p>" + data[i].rating + "</p>";
	}
	return output;
}

function displayMovies(listOfMovies) {
	$("#movies").append(listOfMovies);
}

$("#submitButton").on("click", function (event) {
	event.preventDefault();
	let postTitle = $("#title").value
	let postRating = $("#rating").value
	console.log(postTitle);
	console.log(postRating);
	fetch("https://hazel-distinct-waiter.glitch.me/movies", {
		method: "POST",
		headers: {},
		body: {title: postTitle, rating: postRating}
	})
		.then(response => console.log(response.json()));
})
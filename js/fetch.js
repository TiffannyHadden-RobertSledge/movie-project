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
	$("#movies").empty();
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
})

fetch("https://hazel-distinct-waiter.glitch.me/movies", {
	method: "PATCH",
	headers: {
		'Content-Type': 'application/json',
	},
	body: JSON.stringify({title, rating}),
})
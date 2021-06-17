"use strict";
getAllMovies()
displayMovies(buildMovieList(getAllMovies))


function getAllMovies() {
    fetch("https://hazel-distinct-waiter.glitch.me/movies", {
        method: "GET",
    })
        .then(response => response.json())
        .then(data => console.log(data))
}

window.onload = function () {
    alert("Window is loading");
}

function buildMovieList(data) {
    for (let i = 0; i < data.length; i++) {
        let output = "";
        output += "<h4>" + data[i].title +"</h4>";
        output += "<p>" + data[i].actors +"</p>";
        output += "<p>" + data[i].plot +"</p>";
        output += "<p>" + data[i].rating +"</p>";
        return output;
    }}
    function displayMovies(listOfMovies) {
    $("#movies").html(listOfMovies)
    }
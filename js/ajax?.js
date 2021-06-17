"use strict";
fetch("https://hazel-distinct-waiter.glitch.me/movies", {
	method: "GET",
})
	.then(response =>{
		let results = response.json();
		console.log(results)

	})

window.onload = function(){
	alert("Window is loading");
}
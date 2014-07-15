$(document).ready(function() {
	$("#submit").on('click', function() {
		var url1 = $("#first-url").val();
		var url2 = $("#second-url").val();

		console.log("now processing for the urls: ");
		console.log(url1, url2);

		$.get( "/scrape", {
			url1: url1,
			url2: url2
		}).done(function(data) {

		});
	});
});
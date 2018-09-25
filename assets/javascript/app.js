//Institute Variables
var topics = ["ferrari", "porsche", "tesla", "bentley", "mercedes", "lambourghini", "toyota", "fiat", "corvette", "bmw"];

//Functions

	function renderButtons () {
		$("#buttons-view").empty();
		for (var c = 0; c < topics.length; c++) {
			var newButton = $("<button>");
			newButton.text(topics[c]);
			newButton.addClass("car btn btn-default");
			newButton.attr("data-name", topics[c]);
			
			$("#buttons-view").append(newButton);
		}
	}

	$("#add-car").on("click", function (event) {
		event.preventDefault();
		var car = $("#car-input").val().toLowerCase().trim();
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + car + "&api_key=dc6zaTOxFJmzC&limit=10";

		$.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {

	        if (response.data.length == 0) {
	        	alert("No Gifs found for car");
			
			} else if (topics.indexOf(car) != -1) {
				alert("car already exists");
			
			} else {
				topics.push(car);
				renderButtons();
			}

		});
	});

	function showGifs () {
		var car = $(this).attr("data-name");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + car + "&api_key=dc6zaTOxFJmzC&limit=10";

		$.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {

          console.log(response);

          $(".gifs-view").empty();
          for (var g = 0; g < response.data.length; g++) {
          	var gifDiv = $("<div>");
          	gifDiv.addClass("gifDiv");
          	gifDiv.html("<p>Rating: " + response.data[g].rating.toUpperCase() + "</p>");

          	var gifImage = $("<img src='" + response.data[g].images.fixed_height_still.url + "'>");
          	gifImage.addClass("gif");

          	var imageDiv = $("<div>");
          	imageDiv.addClass("play");
			imageDiv.attr("data-still", response.data[g].images.fixed_height_still.url);
          	imageDiv.attr("data-animate",response.data[g].images.fixed_height.url)
			imageDiv.attr("data-name", car);
			imageDiv.attr("data-state", "still");
          	
          	$(imageDiv).append(gifImage);
          	$(gifDiv).append(imageDiv);
          	$(".gifs-view").append(gifDiv);
			  
			}

    	});
	};

	function playGif () {

		if ($(this).attr("data-state") == "still") {
			$(this).html("<img src='" + $(this).attr("data-animate") + "'>");
			$(this).attr("data-state", "animate");
		
		} else {
			$(this).html("<img src='" + $(this).attr("data-still") + "'>");
			$(this).attr("data-state", "still");
		}

	};

	$(document).on("click", ".car", showGifs);
	$(document).on("click", ".play", playGif);

//Running Code
renderButtons();
var topics = ["ferrari", "porsche", "tesla", "bentley", "mercedes", "lambourghini", "toyota", "fiat", "corvette", "bmw"];


	// Function to load buttons above with text, class and attribute and then display
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

	// Function to add a car using AJAX
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

	// Function to show the Gifs using AJAX for retrieval
	function showGifs () {
		var car = $(this).attr("data-name");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + car + "&api_key=dc6zaTOxFJmzC&limit=10";

		$.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {

		// Clear the gifs and start the selection with a for loop
          $(".gifs-view").empty();
          for (var g = 0; g < response.data.length; g++) {
			
			// Create the Gif div and add the rating with the selection (including changing the rating to upper case) from the for loop
			var gifDiv = $("<div>");
          	gifDiv.addClass("gifDiv");
          	gifDiv.html("<p>Rating: " + response.data[g].rating.toUpperCase() + "</p>");

			// Create the variable to hold the fixed image before activating the Gif
          	var gifImage = $("<img src='" + response.data[g].images.fixed_height_still.url + "'>");
          	gifImage.addClass("gif");

			// Create the Image div and add attributes tying to the selection from the for loop
          	var imageDiv = $("<div>");
          	imageDiv.addClass("play");
			imageDiv.attr("data-still", response.data[g].images.fixed_height_still.url);
          	imageDiv.attr("data-animate",response.data[g].images.fixed_height.url)
			imageDiv.attr("data-name", car);
			imageDiv.attr("data-state", "still");
			  
			// Display the images and divs below one another when selecting a button
          	$(imageDiv).append(gifImage);
          	$(gifDiv).append(imageDiv);
          	$(".gifs-view").append(gifDiv);
			  
			}

    	});
	};

	// Function to play the Gifs when clicking on them
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

//Execute the code
renderButtons();
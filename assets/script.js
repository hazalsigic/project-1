// Get references to the input and button elements
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const messageModal = document.getElementById('messageModal');
const messageBody = document.getElementById('messageBody');

var oldCity = [];

//Creating the dropdown list items

if (localStorage.getItem("places")) {

	$("#dropdownList").empty();

	oldCity = JSON.parse(localStorage.getItem("places"));
	console.log(oldCity)
	
	// iterate through localstorage  
	for (i = 0 ; i < oldCity.length; i++) {
		var newLi = $("<li>");
		newLi.attr("class", " text-center my-1 oldSearch");
		newLi.text(oldCity[i]);
		$("#dropdownList").append(newLi);
	} 
};

//if a city in history section is clicked, the name of the city appears in the search bar
$(".oldSearch").on("click", function(event) {
	var newSearch = $(this).text();
	console.log(newSearch);
	$("#searchInput").val(newSearch);

})




// Add an event listener to the button
searchButton.addEventListener('click', function () {
	//Declaring the variables for function getCity

	// Get the value from the input field and trim whitespace
	const searchTerm = searchInput.value.trim();
	// Check if search term is empty
	if (searchTerm === '') {
		// Display message in modal
		messageBody.textContent = 'Please enter a valid city name.';
		$(messageModal).modal('show');

		// Exit function if search term is empty
		return;
	}

	// Perform some action with the search term (e.g., display it in the console)
	console.log('Search term:', searchTerm);

   //local storage part that will store the old searches 
    
	oldCity.push(searchTerm);
	localStorage.setItem("places", JSON.stringify(oldCity));
    


	$('.event').empty();
	$('.places').empty();


	getCityPlaces();
	getCityEvents();

	// Clear the input field
	searchInput.value = '';
});

function getCityEvents() {

	var cityLower= $("#searchInput").val();
    var cityName = cityLower.charAt(0).toUpperCase() + cityLower.slice(1)
    var apiKey = 'NGMel7eRMUXXZi8wrXSz5U45GI25vqZI';
    var baseUrl = `https://app.ticketmaster.com/discovery/v2/events?apikey=NGMel7eRMUXXZi8wrXSz5U45GI25vqZI&locale=*&size=200&city=${cityName}&apikey=${apiKey}`;


	fetch(baseUrl)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			console.log(data);

			var allEvents = data._embedded.events;
			var copyAllEvents = allEvents;
			var uniqueEvents = [];

			console.log(allEvents);
			console.log(allEvents[0].images[0].url);
			console.log(allEvents[0].dates.start.localDate);
			console.log(allEvents[0].url);

			//Function to check duplicate event names.
			function isAlreadyExist(element) {
				console.log('Length of copy event:' + copyAllEvents.length);
				for (var i = 0; i < copyAllEvents.length; i++) {
					if (element.name === copyAllEvents[i].name) {
						return true;
					}
				}
				return false;
			}
			// creates an array without duplicate values by validating event name.
			for (var j = 0; j < allEvents.length; j++) {
				if (!uniqueEvents.find(isAlreadyExist)) {
					uniqueEvents.push(allEvents[j]);
					console.log('Event added: ' + allEvents[j].name);
				} else {
					console.log('Duplicate event: ' + allEvents[j].name);
				}
				copyAllEvents = copyAllEvents.slice(1);
			}

			console.log(uniqueEvents);
			displayCityEvents();
			//Displays event details in the browser.
			function displayCityEvents() {
				var eventHeading = $('<h3>');
				eventHeading.text(`Events in ${cityName}`);

				eventHeading.attr("class", "title");
				$(".event").append(eventHeading);

				for (var k = 0; k < 10; k++) {
					var divEl = $('<div>').attr(
						'class',
						'card flex-row my-2 mr-4'
					);
					$('.event').append(divEl);
					var imgDiv = $('<div>');
					imgDiv.attr('class', 'rounded');
					divEl.append(imgDiv);
					var imgEl = $('<img>').attr({
						src: uniqueEvents[k].images[0].url,
						class: 'card-img-left example-card-img-responsive',
					});
					imgDiv.append(imgEl);
					var textDiv = $('<div>');
					textDiv.attr('class', 'mx-3 my-2');
					divEl.append(textDiv);
					var h5El = $('<h5>');
					h5El.attr('class', 'card-title');
					h5El.text(`${uniqueEvents[k].name}`);
					var dateEl = $('<h6>');
					var imgEl = $('<img>').attr(
						'src',
						uniqueEvents[k].images[0].url
					);
					var ticketEl = $('<a>')
						.attr({href: uniqueEvents[k].url, target: '_blank'})
						.text('Book Now ');
					ticketEl.attr('class', 'card-link');
					h5El.text(`${uniqueEvents[k].name}`);
					dateEl.text(
						`Date:${uniqueEvents[k].dates.start.localDate}`
					);
					dateEl.attr('class', 'card-subtitle');
					textDiv.append(h5El);
					textDiv.append(dateEl);
					textDiv.append(ticketEl);

					//Displays event details in the browser.
					function displayCityEvents() {
						var eventHeading = $('<h3>');
						eventHeading.text(`Events in ${cityName}`);
						eventHeading.attr('class', 'title');
						$('.event').append(eventHeading);
						for (var k = 0; k < 6; k++) {
							var divEl = $('<div>').attr(
								'class',
								'card flex-row my-2'
							);
							$('.event').append(divEl);
							var imgDiv = $('<div>');
							imgDiv.attr('class', 'rounded');
							divEl.append(imgDiv);
							var imgEl = $('<img>').attr({
								src: uniqueEvents[k].images[0].url,
								class: 'card-img-left example-card-img-responsive',
							});
							imgDiv.append(imgEl);
							var textDiv = $('<div>');
							textDiv.attr('class', 'mx-3 my-2');
							divEl.append(textDiv);
							var h5El = $('<h5>');
							h5El.attr('class', 'card-title');
							h5El.text(`${uniqueEvents[k].name}`);
							var dateEl = $('<h6>');
							dateEl.attr('class', 'card-subtitle');
							dateEl.text(
								`Date:${uniqueEvents[k].dates.start.localDate}`
							);
							var ticketEl = $('<a>')
								.attr('href', uniqueEvents[k].url)
								.text('Book Now ');
							ticketEl.attr('class', 'card-link');
							textDiv.append(h5El);
							textDiv.append(dateEl);
							textDiv.append(ticketEl);
						}
					}
				}
			}
		});
}

// Foursqare API call

function getCityPlaces() {
	var cityLower = $('#searchInput').val();
	var city = cityLower.charAt(0).toUpperCase() + cityLower.slice(1);
	const options = {
		method: 'GET',
		headers: {
			accept: 'application/json',
			Authorization: 'fsq36sfrhRZqepwiExveGGmG+6dJ5fjiN5oB26UQIeYh4Co=',
		},
	};

	fetch('https://api.foursquare.com/v3/places/search?near=' + city, options)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			console.log(data);

			// Creating variables to check if they are the correct data we would like to pull
			var placeCategory = data.results[0].categories[0].name;
			var placeName = data.results[0].name;
			var placeAddress = data.results[0].location.formatted_address;
			console.log(placeName);
			console.log(placeAddress);
			console.log(placeCategory); 

			//Creating the Place section

			//Places heading
			var placesHeading = $('<h3>');

			placesHeading.text(`Places in ${city}`);
			placesHeading.attr('class', 'title mx-3');
			$('.places').append(placesHeading);

			//for loop creating multiple places from the data array
			for (i = 0; i < data.results.length; i++) {
				//Creating the card
				var card = $('<div>');
				card.attr('class', 'card my-2 placesCard ml-4');
				$('.places').append(card);

				//Creating card Heading
				var cardHeading = $('<h5>');
				cardHeading.attr('class', 'card-title mx-3 mt-2');
				cardHeading.text(data.results[i].name);
				card.append(cardHeading);

				//Creating place category
				var cardCategory = $('<p>');
				cardCategory.attr('class', 'card-subtitle mx-3 text-muted');
				cardCategory.text(data.results[i].categories[0].name);
				card.append(cardCategory);

				//Adding address to the card
				var cardAddress = $('<p>');
				cardAddress.attr('class', 'card-text mx-3 mt-1');
				cardAddress.text(data.results[i].location.formatted_address);
				card.append(cardAddress);
			}
		});
}

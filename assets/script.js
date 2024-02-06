// Get references to the input and button elements
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const messageModal = document.getElementById('messageModal');
const messageBody = document.getElementById('messageBody');

// Add an event listener to the button
searchButton.addEventListener('click', function () {
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
  getCityPlaces();

	// Clear the input field
	searchInput.value = '';
});

var city = 'london';
var cityName = 'Manchester';
var apiKey = 'NGMel7eRMUXXZi8wrXSz5U45GI25vqZI';
var baseUrl = `https://app.ticketmaster.com/discovery/v2/events?apikey=NGMel7eRMUXXZi8wrXSz5U45GI25vqZI&locale=*&size=200&city=${cityName}&apikey=${apiKey}`;

//Get Event details in the city
function getCityEvents() {
	fetch(baseUrl)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			console.log(data);

			var allEvents = data._embedded.events;

			console.log(allEvents);
			console.log(allEvents[0].images[0].url);
			console.log(allEvents[0].dates.start.localDate);
			console.log(allEvents[0].url);

			var eventObjects = [];

			for (var i = 0; i < allEvents.length; i++) {
				var eventDetails = {
					eventName: allEvents[i].name,
					eventId: allEvents[i].id,
					imageUrl: allEvents[i].images[0].url,
					time: allEvents[i].dates.start.localDate,
					ticket: allEvents[i].url,
				};

				eventObjects.push(eventDetails);
			}

			for (var j = 0; j < 5; j++) {
				var rIndex = Math.floor(Math.random() * eventObjects.length);
				var divEl = $('<div>').attr('class', 'card');
				var h4El = $('<h4>');
				var imgEl = $('<img>').attr(
					'src',
					eventObjects[rIndex].imageUrl
				);
				var ticketEl = $('<a>')
					.attr('href', eventObjects[rIndex].ticket)
					.text('Click for Ticket details');
				h4El.text(`Event Name:${eventObjects[rIndex].eventName} 
                   Event Id:${eventObjects[rIndex].eventId} 
                   Event Date:${eventObjects[rIndex].time}`);

				divEl.append(h4El, imgEl, ticketEl);
				$('.event').append(divEl);

				console.log(`Event ${j + 1}:`, eventObjects[rIndex]);
			}
		});
}

getCityEvents();

// Foursqare API call

function getCityPlaces() {

  
var city = $("#searchInput").val();
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
			console.log(placeCategory); //this is returning in Turkish (my native language), not sure where foursquare getting that info so not sure how to change it to english. If we can't resolve it we can just remove that section.

			//Creating the Place section

			//Places heading
			var placesHeading = $('<h3>');
			placesHeading.text('Places to Discover');
			$('.places').append(placesHeading);

			//for loop creating multiple places from the data array
			for (i = 0; i < data.results.length; i++) {
				//Creating the card
				var card = $('<div>');
				card.attr('class', 'card');
				$('.places').append(card);

				//Creating card Heading
				var cardHeading = $('<h5>');
				cardHeading.attr('class', 'card-title');
				cardHeading.text(data.results[i].name);
				card.append(cardHeading);

				//Adding address to the card
				var cardAddress = $('<p>');
				cardAddress.attr('class', 'card-text');
				cardAddress.text(data.results[i].location.formatted_address);
				card.append(cardAddress);
			}
		});
}



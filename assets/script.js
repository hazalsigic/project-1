



var city = "london";
var cityName = "London";
var apiKey= "NGMel7eRMUXXZi8wrXSz5U45GI25vqZI";
var baseUrl=`https://app.ticketmaster.com/discovery/v2/events?apikey=NGMel7eRMUXXZi8wrXSz5U45GI25vqZI&locale=*&size=200&city=${cityName}&apikey=${apiKey}`



function getCityEvents(){
    fetch(baseUrl).then(function(response)
    { return response.json();
    }).then(function(data)
    { console.log(data);
    console.log(data);
})}

getCityEvents();


var apiKey = "NGMel7eRMUXXZi8wrXSz5U45GI25vqZI";
var cityName = "London";
var baseUrl =`https://app.ticketmaster.com/discovery/v2/events.json?city=*&size=200&=${cityName}&apikey=${apiKey}`;

fetch(baseUrl).then(function(response){
    return response.json();
}).then(function(data){
   
    console.log(data);

})

// Foursqare API call


var city = "London"
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'fsq36sfrhRZqepwiExveGGmG+6dJ5fjiN5oB26UQIeYh4Co='
        }
      };
      
      fetch('https://api.foursquare.com/v3/places/search?near=' + city, options)
        .then(function(response){
          return response.json();
        }).then( function(data){  
          console.log(data);

          // Creating variables to check if they are the correct data we would like to pull
          var placeCategory = data.results[0].categories[0].name;      
          var placeName = data.results[0].name;
          var placeAddress = data.results[0].location.formatted_address;
          console.log(placeName)
          console.log(placeAddress)
          console.log(placeCategory) //this is returning in Turkish (my native language), not sure where foursquare getting that info so not sure how to change it to english. If we can't resolve it we can just remove that section.
          
          //Creating the Place section

          //Places heading
          var placesHeading = $("<h3>");
          placesHeading.text("Places to Discover");
          $(".places").append(placesHeading);

          //for loop creating multiple places from the data array
          for (i = 0; i < data.results.length; i++){

            //Creating the card
            var card = $("<div>");
            card.attr("class", "card");
            $(".places").append(card);

            //Creating card Heading
            var cardHeading = $("<h5>");
            cardHeading.attr("class", "card-title");
            cardHeading.text(data.results[i].name);
            card.append(cardHeading);

            //Adding address to the card
            var cardAddress = $("<p>");
            cardAddress.attr("class", "card-text");
            cardAddress.text(data.results[i].location.formatted_address);
            card.append(cardAddress);

          }
        
        })
        


        
        
    

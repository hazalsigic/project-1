


var apiKey = "NGMel7eRMUXXZi8wrXSz5U45GI25vqZI";
var cityName = "London";
var baseUrl =`https://app.ticketmaster.com/discovery/v2/events.json?city=${cityName}&apikey=${apiKey}`;

fetch(baseUrl).then(function(response){
    return response.json();
}).then(function(data){
   
    console.log(data);

})

var city = "london";

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'fsq36sfrhRZqepwiExveGGmG+6dJ5fjiN5oB26UQIeYh4Co='
        }
      };
      
      fetch('https://api.foursquare.com/v3/places/search?near=' + city, options)
        .then(response => response.json())
        .then(response => 
          
          console.log(response))
        
        
          .catch(err => console.error(err));

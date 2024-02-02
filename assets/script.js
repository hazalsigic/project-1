var city = "london";
var cityName = "London";
var apiKey= "NGMel7eRMUXXZi8wrXSz5U45GI25vqZI";
var baseUrl=`https://app.ticketmaster.com/discovery/v2/events.json?countryCode=UK&apikey=${apiKey}`;


function getCityEvents(){
    fetch(baseUrl).then(function(response)
    { return response.json();
    }).then(function(data)
    { console.log(data);
    console.log(data);
})}

getDisplayCountryCodes();
getCityEvents();

/*Function to display country code */
function getDisplayCountryCodes(){

fetch("https://restcountries.com/v2/all")
.then(function(response){
 return response.json();
}).then(function(data){
    console.log(data);
    
})

}



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

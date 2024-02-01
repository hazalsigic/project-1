

var apiKey = "NGMel7eRMUXXZi8wrXSz5U45GI25vqZI";
var cityName = "London";
var baseUrl =`https://app.ticketmaster.com/discovery/v2/events.json?city=${cityName}&apikey=${apiKey}`;

fetch(baseUrl).then(function(response){
    return response.json();
}).then(function(data){
   
    console.log(data);

})
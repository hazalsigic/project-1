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
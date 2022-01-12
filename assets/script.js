// Adds the varibles for the button and input value
const searchButton = document.getElementById('searchBtn');
const searchInput = document.getElementById('search-input');
searchHistory = [];
// Gets current location data and displays the local weather
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (position) {
    long = position.coords.longitude;
    lat = position.coords.latitude;
    api = "http://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&units=imperial&appid=fde9f65a3fa7a456dacbde8a2369bb35"
    // Fetches the api information and displays current weather
    fetch(api)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        mainTemp.textContent = "Temp: " + (data['current']['temp']) + "°F";
        mainWind.textContent = "Wind: " + (data['current']['wind_speed']) + "MPH";
        mainHumidity.textContent = "Humidity: " + (data['current']['humidity']) + " %";
        mainUV.textContent = "UV Index: " + (data['current']['uvi']);

      });
  })
}

// Adds an event listener on the search button and on the click it fetches the api
searchButton.addEventListener('click', () => {

  const inputValue = searchInput.value;

  fetch('http://api.openweathermap.org/data/2.5/weather?q=' + inputValue + '&units=imperial&appid=fde9f65a3fa7a456dacbde8a2369bb35')
    .then(function (response) {
      // Checks if the input is valid
      if (response.status === 404) {
        alert("Please check your spelling and try again")
      }
      return response.json();
    })
    // This gets the coordinates to use with the one call API and also fetches it
    .then(function (data) {
      var lat = data["coord"]["lat"]
      var long = data["coord"]["lon"]
      var mainUV = document.getElementById('mainUV')
      cityName.textContent = (data['name']);


      console.log(long)
      console.log(data);
      console.log(cityName);

      fetch("http://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&units=imperial&appid=fde9f65a3fa7a456dacbde8a2369bb35")
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data)
          // Displays the weather of selected location
          mainTemp.textContent = "Temp: " + (data['current']['temp']) + "°F";
          mainWind.textContent = "Wind: " + (data['current']['wind_speed']) + "MPH";
          mainHumidity.textContent = "Humidity: " + (data['current']['humidity']) + " %";
          mainUV.textContent = "UV Index: " + (data['current']['uvi']);
          // Changes the color of the UV index box to the correct UV index color codes
          if (data['current']['uvi'] <= 2 || ['current']['uvi'] === 0) {
            mainUV.style.backgroundColor = "green"
          } else if (data['current']['uvi'] > 2 && data['current']['uvi'] < 5) {
            mainUV.style.backgroundColor = "yellow"
          } else if (data['current']['uvi'] > 5 && data['current']['uvi'] < 8) {
            mainUV.style.backgroundColor = "orange"
          } else {
            mainUV.style.backgroundColor = "red"
          }
        })
    })
})







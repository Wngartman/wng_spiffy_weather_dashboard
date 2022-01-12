// Adds the varibles for the button and input value
const searchButton = document.getElementById('searchBtn');
const searchInput = document.getElementById('search-input');

// Gets current location data and displays the local weather
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (position) {
    long = position.coords.longitude;
    lat = position.coords.latitude;
    api = "http://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&units=imperial&appid=fde9f65a3fa7a456dacbde8a2369bb35"
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
  })}


searchButton.addEventListener('click', () => {
    
    const inputValue = searchInput.value;

    fetch('http://api.openweathermap.org/data/2.5/weather?q=' + inputValue + '&units=imperial&appid=fde9f65a3fa7a456dacbde8a2369bb35')
      .then(function (response) {
        if (response.status === 404) {
          alert("Please check your spelling")
        }
        return response.json();
      })
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

            mainTemp.textContent = "Temp: " + (data['current']['temp']) + "°F";
            mainWind.textContent = "Wind: " + (data['current']['wind_speed']) + "MPH";
            mainHumidity.textContent = "Humidity: " + (data['current']['humidity']) + " %";
            mainUV.textContent = "UV Index: " + (data['current']['uvi']);

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



var searchHistory = [];
  var weatherApiUrl = "https://api.openweathermap.org"
  var weatherApiKey = "fde9f65a3fa7a456dacbde8a2369bb35"


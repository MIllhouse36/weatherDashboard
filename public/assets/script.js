$(document).ready(function(){
  renderHistory();
  $("#form").on("submit", function (event) {
    event.preventDefault();
    var cityName = $("#textarea").val().trim()
    
    if (cityName) {
      $.ajax({
        url:
          "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=890f39f45059cd40d76b8d16d77d5114",
        method: "GET",
      }).then(function (response) {
        // console.log(response);
        const tempF = (response.main.temp - 273.15) * 1.80 + 32;
        const windMph = parseInt(response.wind.speed * 2.2369);
        const lat = (response.coord.lat)
        const long = (response.coord.lon)
        const date = new Date(response.dt * 1000).toLocaleDateString().toString()
        // console.log(date)
  
        $("#currentCity").text(response.name);
        $("#currentIcon").attr("src", "https://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png");
        $("#currentIcon").attr("alt", "weather icon");
        $("#currentDate").text(date);
        $("#currentTemp").text(tempF.toFixed(0) + "°");
        $("#currentHumi").text(`Humidity: ${response.main.humidity}%`);
        $("#currentWind").text(`Windspeed: ${windMph}mph`);
  
        $.ajax({
          
          url: 
          "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&exclude=hourly,minutely&appid=890f39f45059cd40d76b8d16d77d5114",
          method: "GET",
        }).then(function (respond) {
          // console.log(respond);
          $("#currentUv").text(respond.current.uvi)
          for (let i = 1; i < 6; i++) {
            const tempF = (respond.daily[i].temp.day - 273.15) * 1.80 + 32;
            const date = new Date(respond.daily[i].dt * 1000).toLocaleDateString()
          
            $("#forecast-" + i + "-img").attr("src", "https://openweathermap.org/img/wn/" + respond.daily[i].weather[0].icon + "@2x.png");
            $("#forecast-" + i + "-img").attr("alt", "weather icon");
            $("#forecast-" + i + "-date").text(date);
            $("#forecast-" + i + "-temp").text(`${tempF.toFixed(0)}°F`);
            $("#forecast-" + i + "-humi").text(`RH: ${respond.daily[i].humidity}%`);
          }
          renderHistory(cityName);
        })
      })
    } else {
      alert("must type in a city")
    }
  
  });
  
  function renderHistory(city) {
    let historyCard = $("#history-card");
    historyCard.text("");
    let searchedCities = [];
    if (JSON.parse(localStorage.getItem("Searched"))) {
      searchedCities = JSON.parse(localStorage.getItem("Searched"));
      $.each(searchedCities, function (i, item) {
        let listItem = $("<p id=" + item + ">" + item + "</p>");
        historyCard.append(listItem);
      });
    }
    if (!searchedCities.includes(city)) {
      searchedCities.push(city);
    }
    if (!city) {
      return;
    }
    localStorage.setItem("Searched", JSON.stringify(searchedCities));
  }
})
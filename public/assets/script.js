


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
      console.log(response);
      $("#currentCity").text(response.name);
      $("#currentIcon").attr("src", "https://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png");
      $("#currentIcon").attr("alt", "weather icon");
      var currentUtcSeconds = response.dt;
        var currentDate = new Date(0);
        currentDate.setUTCSeconds(currentUtcSeconds);
        $("#currentDate").text(currentDate);
      var tempF = (response.main.temp - 273.15) * 1.80 + 32;
      var windMph = parseInt(response.wind.speed * 2.2369);
      $("#currentTemp").text(tempF.toFixed(0) + "°");
      $("#currentHumi").text(response.main.humidity + "%");
      $("#currentWind").text(windMph + " mph");
      var lat = (response.coord.lat)
      var long = (response.coord.lon)
      $.ajax({
        
        url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long +"&exclude=hourly,minutely&appid=890f39f45059cd40d76b8d16d77d5114",
        method: "GET",
      }).then(function (respond) {
        $("#currentUv").text(respond.current.uvi)
        console.log(respond);
      
        for (let i = 1; i < 6; i++) {
        $("#forecast-"+ i +"-img").attr("src", "https://openweathermap.org/img/wn/" + respond.daily[i].weather[0].icon + "@2x.png");
        $("#forecast-"+ i +"-img").attr("alt", "weather icon");
        var utcSeconds = respond.daily[i].dt;
        var date = new Date(0);
        date.setUTCSeconds(utcSeconds);
        $("#forecast-"+ i +"-date").text(date);
        var tempF = (respond.daily[i].temp.day - 273.15) * 1.80 + 32;
        $("#forecast-"+ i + "-temp").text(tempF.toFixed(0) + "°");
        $("#forecast-"+ i + "-humi").text(respond.daily[i].humidity + "%");
        }
        renderHistory(cityName);
      }) 
    })
} else {
  alert("must type in a city")
}

});

function renderHistory(city){
  var historyCard = $("#history-card");
  historyCard.text("");
  var searchedCities = [];
  if (JSON.parse(localStorage.getItem("Searched"))) {
    searchedCities = JSON.parse(localStorage.getItem("Searched"));
    $.each(searchedCities, function(i, item){
     var listItem = $("<p id="+item+">"+ item + "</p>");
    historyCard.append(listItem);
     });
  }
  if(!searchedCities.includes(city)){
    searchedCities.push(city);
  }
  if(!city){
    return;
  }
    localStorage.setItem("Searched", JSON.stringify(searchedCities));
  }
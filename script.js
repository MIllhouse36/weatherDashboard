// var searched = cityName;
var searchedCities = [];
var historyCard = $("#history-card");


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
      $("#currentIcon").attr("src", "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png");
      $("#currentIcon").attr("alt", "weather icon");
      var currentUtcSeconds = response.dt;
        var currentDate = new Date(0); // The 0 there is the key, which sets the date to the epoch
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
        
        url: "http://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long +"&exclude=hourly,minutely&appid=890f39f45059cd40d76b8d16d77d5114",
        method: "GET",
      }).then(function (respond) {
        $("#currentUv").text(respond.current.uvi)
        console.log(respond);
       
        // var forecastDays = returning.list
        // // console.log(forecastDays)
        // $.each(forecastDays, function(i, item){
          //   var forcastTemp = (item.main.temp - 273.15) * 1.80 + 32;
          //   var forcastHumi =  item.main.humidity;
          //   console.log(forcastTemp.toFixed(0) + "°");
          //   console.log(forcastHumi + "%");
          //   var listItem = $("<p>"+forcastHumi+"%"+"</p>")
          // });
        
        

        $("#forecast-1-img").attr("src", "http://openweathermap.org/img/wn/" + respond.daily[1].weather[0].icon + "@2x.png");
        $("#forecast-1-img").attr("alt", "weather icon");
        var utcSeconds = respond.daily[1].dt;
        var date1 = new Date(0); // The 0 there is the key, which sets the date to the epoch
        date1.setUTCSeconds(utcSeconds);
        $("#forecast-1-date").text(date1);
        var tempF1 = (respond.daily[1].temp.day - 273.15) * 1.80 + 32;
        $("#forecast-1-temp").text(tempF1.toFixed(0) + "°");
        $("#forecast-1-humi").text(respond.daily[1].humidity + "%");

        $("#forecast-2-img").attr("src", "http://openweathermap.org/img/wn/" + respond.daily[2].weather[0].icon + "@2x.png");
        $("#forecast-2-img").attr("alt", "weather icon");
        var utcSeconds = respond.daily[2].dt;
        var date2 = new Date(0); // The 0 there is the key, which sets the date to the epoch
        date2.setUTCSeconds(utcSeconds);
        $("#forecast-2-date").text(date2);
        var tempF2 = (respond.daily[2].temp.day - 273.15) * 1.80 + 32;
        $("#forecast-2-temp").text(tempF2.toFixed(0) + "°");
        $("#forecast-2-humi").text(respond.daily[2].humidity + "%");

        $("#forecast-3-img").attr("src", "http://openweathermap.org/img/wn/" + respond.daily[3].weather[0].icon + "@2x.png");
        $("#forecast-3-img").attr("alt", "weather icon");
        var utcSeconds = respond.daily[3].dt;
        var date3 = new Date(0); // The 0 there is the key, which sets the date to the epoch
        date3.setUTCSeconds(utcSeconds);
        $("#forecast-3-date").text(date3);
        var tempF3 = (respond.daily[3].temp.day - 273.15) * 1.80 + 32;
        $("#forecast-3-temp").text(tempF3.toFixed(0) + "°");
        $("#forecast-3-humi").text(respond.daily[3].humidity + "%");

        $("#forecast-4-img").attr("src", "http://openweathermap.org/img/wn/" + respond.daily[4].weather[0].icon + "@2x.png");
        $("#forecast-4-img").attr("alt", "weather icon");
        var utcSeconds = respond.daily[4].dt;
        var date4 = new Date(0); // The 0 there is the key, which sets the date to the epoch
        date4.setUTCSeconds(utcSeconds);
        $("#forecast-4-date").text(date4);
        var tempF4 = (respond.daily[4].temp.day - 273.15) * 1.80 + 32;
        $("#forecast-4-temp").text(tempF4.toFixed(0) + "°");
        $("#forecast-4-humi").text(respond.daily[4].humidity + "%");

        $("#forecast-5-img").attr("src", "http://openweathermap.org/img/wn/" + respond.daily[5].weather[0].icon + "@2x.png");
        $("#forecast-5-img").attr("alt", "weather icon");
        var utcSeconds = respond.daily[5].dt;
        var date5 = new Date(0); // The 0 there is the key, which sets the date to the epoch
        date5.setUTCSeconds(utcSeconds);
        $("#forecast-5-date").text(date5);
        var tempF5 = (respond.daily[5].temp.day - 273.15) * 1.80 + 32;
        $("#forecast-5-temp").text(tempF5.toFixed(0) + "°");
        $("#forecast-5-humi").text(respond.daily[5].humidity + "%");
        renderHistory(cityName);
      }) 
    })
}

  
  
});
function renderHistory(city){
    historyCard.text("");
  if (JSON.parse(localStorage.getItem("Searched"))) {
    searchedCities = JSON.parse(localStorage.getItem("Searched"));
  }
  searchedCities.push(city);
  
        $.each(searchedCities, function(i, item){
         var listItem = $("<p>"+ item + "</p>");
         historyCard.append(listItem);
         });
  
  
    localStorage.setItem("Searched", JSON.stringify(searchedCities));
  }
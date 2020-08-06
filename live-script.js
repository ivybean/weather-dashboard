var currentURL= "";
var textReset= "";
var forecastURL= "";

$(document).ready(function() {
$("#search-button").on("click", function() {
  var searchValue = $("#search-value").val();
  console.log(searchValue);
  // clear input box

  currentURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=69512b2524e83d5bf183c5680485a288";
  forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchValue + "&appid=69512b2524e83d5bf183c5680485a288";

  console.log(currentURL);
  console.log(forecastURL)
  searchWeather(currentURL);

  // getUVIndex(data.coord.lat, data.coord.lon);

  // display current day on page
   $("#currentDay").text(searchValue + " " + "(" + moment().format("dddd, MMMM Do")+ ")");

   $("#currentTime").text("Current Time: " + moment().format('LT')
   );
});

$(".history").on("click", "li", function() {
  searchWeather($(this).text());

});

function makeRow(text) {
  var li = $("<li>").addClass("list-group-item list-group-item-action").text(text);
  $(".history").append(li);
}


function searchWeather(queryURL) {
  //AJAX Function
  $.ajax({
    url: queryURL,
    method: "GET"})
  .done(function(weatherData){

    //current temperature
    console.log(weatherData.main.temp);
    var tempFahrenheit = Math.floor((weatherData.main.temp - 273.15)*9/5 +32);
    console.log(tempFahrenheit);
    //current humidity
    var humidity = weatherData.main.humidity;
    console.log(humidity);
    //current windspeed
    var windSpeed =weatherData.wind.speed; 
    console.log(windSpeed);
    //current UV Index

    var currentSection = $('<div>');
    currentSection.addClass("card");
    $('#todaySection').append(currentSection);
    $('#todaySection').append('<h5>' + "Temperature: " + tempFahrenheit + "\xB0" + " F" + '</h5>');
    $('#todaySection').append('<h5>' + "Humidity: " + humidity + "%" + '</h5>')
    $('#todaySection').append('<h5>' + "Wind Speed: " + windSpeed + "mph" + '</h5>')
  });


    getForecast(forecastURL);
}

  function getForecast(queryURL) {
    $.ajax({
      method: "GET",
      url: queryURL,
      success: function(forecastData) {
       
        for (var i=1; i<6; i++){
          //Forecast Date
          var forecastDate = moment().add(i, 'days').calendar();
          //Forecast Temperature
          var temp = Math.floor((forecastData.list[i].main.temp - 273.15)*9/5 +32);
          console.log("Forecast Temp: " + temp);
          
          var forecastTemp = $("<p>").html("Temperature: " + temp + "\xB0" + " F" ).attr("class", "p-temp");
          
          //Forecast Humidity
          var humidity = forecastData.list[i].main.humidity;
          var forecastHumidity = $("<p>").html("Humidity: " + humidity + "%").attr("class", "p-humidity");

          //Forecast Cards
          var forecastRow = $(".forecast-row");
          var forecastCol = $("<div>").attr("class", "col-lg-2 forecast-col");
          var forecastCard = $("<div>").attr("class", "card forecast-card");
          var forcastCardHeader = $("<div>").attr("class", "card-header forecast-card-header");
          var forecastCardBody = $("<div>").attr("class", "card-body restaurant-card-body");

          forecastRow.append(forecastCol.append(forecastCard));
          forecastCard.append(forcastCardHeader.append(forecastDate));
          forecastCard.append(forecastCardBody);
          forecastCardBody.append(forecastTemp);
          forecastCardBody.append(forecastHumidity);
        }
        // loop over all forecasts (by 3-hour increments)
        
        for (var i = 0; i < forecastData.list.length; i++) {
          // only look at forecasts around 3:00pm
          if (forecastData.list[i].dt_txt.indexOf("15:00:00") !== -1) {
            // create html elements for a bootstrap card
            

            // merge together and put on page
          }
        }
      }
    });
  }

  // function getUVIndex(lat, lon) {
  //   $.ajax({
  //     type: "",
  //     url: "" + lat + "&lon=" + lon,
  //     dataType: "json",
  //     success: function(data) {
  //       var uv = $("<p>").text("UV Index: ");
  //       var btn = $("<span>").addClass("btn btn-sm").text(data.value);
        
  //       // change color depending on uv value
        
  //       $("#today .card-body").append(uv.append(btn));
  //     }
  //   });
  // }

})
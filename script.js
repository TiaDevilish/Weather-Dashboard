var searchBtn = $(".searchBtn");
var apiKey = "a62987b69d3f49eebbfab3e9e65b476a";

for (var i = 0; i < localStorage.length; i++){
    var city = localStorage.getItem(i);
    var cityName = $(".list-group").addClass("list-group-item");
    cityName.append("<li>" + city + "</li>");
    console.log(localStorage);
}

searchBtn.click(function(){
    var searchInput = $(".searchInput").val();
    var urlCurrent = "http://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&appid=" + apiKey + "&units=metric";
    var urlFiveDay = "http://api.openweathermap.org/data/2.5/forecast?q=" + searchInput + "&appid=" + apiKey + "&units=metric";

    if(searchInput == ""){
        console.log(searchInput);
    }else{
        $.ajax({
            url: urlCurrent,
            method: "GET"
        }).then(function(response){
            var cityName = $(".list-group").addClass("list-group-item");
            var storLenght = localStorage.length;
            cityName.append("<li>" + response.name + "</li>");
            var localStrg = localStorage.setItem(storLenght, response.name);
            storLenght++;
            
            //current
            var currentCard = $(".currentCard").append("<div>").addClass("card-body");
            currentCard.empty();
            var currentCity = currentCard.append("<p>");
            currentCard.append(currentCity);

            var time = new Date(response.dt * 1000);
            currentCity.append(response.name + " " + time.toLocaleDateString("en-US"));
            currentCity.append(`<img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png">`);

            var currentTemp = currentCity.append("<p>");
            currentCity.append(currentTemp);
            currentTemp.append("<p>" + "Temperature: " + response.main.temp + " °C" + "</p>");
            
            currentTemp.append("<p>" + "Humidity: " + response.main.humidity + " %" + "</p>");

            currentTemp.append("<p>" + "Wind Speed: " + response.wind.speed + "</p>");
            console.log(response.wind.speed);

            var urlUV = `http://api.openweathermap.org/data/2.5/uvi?appid=a62987b69d3f49eebbfab3e9e65b476a&lat=${response.coord.lat}&lon=${response.coord.lon}`;

            $.ajax({
                url:urlUV,
                method:"GET"
            }).then(function(response){
                var currentUV = currentTemp.append("<p>" + "UV Index: " + response.value + "</p>").addClass("card-text");
                currentUV.addClass("UV");
                currentTemp.append(currentUV);
            });
        });

        //5day
        $.ajax({
            url: urlFiveDay,
            method: "GET"
        }).then(function (response) {
            var day = [0, 8, 16, 24, 32];
            var fiveDayCard = $(".fiveDayCard").addClass("card-body");
            var fiveDayDiv = $(".fiveDay").addClass("card-text");
            fiveDayDiv.empty();

            day.forEach(function (i) {
                var FiveDayTimeUTC = new Date(response.list[i].dt * 1000);
                FiveDayTimeUTC = FiveDayTimeUTC.toLocaleDateString("en-US");

                fiveDayDiv.append("<div>" + "<p>" + FiveDayTimeUTC + "</p>" + `<img src="https://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png">` + "<p>" + "Temperature: " + response.list[i].main.temp +  " °C" + "</p>" + "<p>" + "Humidity: " + response.list[i].main.humidity + "%" + "</p>" + "</div>" + "<hr>");


            })

        });




    }

})

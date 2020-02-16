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
            
            //current append to curcard
            var currentCard = $(".currentCard").append("<div>").addClass("card-body");
            currentCard.empty();
            var currentCity = currentCard.append("<p>");
            currentCard.append(currentCity);

            var time = new Date(response.dt * 1000);
            currentCity.append(response.name + " " + time.toLocaleDateString("en-US"));
            currentCity.append("<img src=http://openweathermap.org/img/wn/${response.wather[0].icon}@2.png>")
        })
    }

})

var searchBtn = $(".searchBtn");
var apiKey = "a62987b69d3f49eebbfab3e9e65b476a";
//function for when click btn save into local stor and show results

for (var i = 0; i < localStorage.length; i++){
    var city = localStorage.getItem(i);
    var cityName = $(".list-group").addClass("list-group-item");
    cityName.append("<li>" + city + "</li>");
    console.log(localStorage);
}

searchBtn.click(function(){
    var searchInput = $(".searchInput").val();
    var urlCurrent = "api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&appid=" + apiKey + "&units=metric";
    var urlFiveDay = "api.openweathermap.org/data/2.5/forecast?q=" + searchInput + "&appid=" + apiKey + "&units=metric";

    if(searchInput == ""){
        console.log(searchInput);
    }else{
        $.ajax({
            url: urlCurrent,
            method: "GET"
        }).then(function(response){
            var cityName = $(".list-group").addClass("list-group-item");
            cityName.append("<li>" + response + "</li>")
        })
    }
})
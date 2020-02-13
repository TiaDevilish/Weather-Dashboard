var searchBtn = $(".searchBtn");
var apiKey = "a62987b69d3f49eebbfab3e9e65b476a";
var inputCount = 0;
//function for when click btn save into local stor and show results

for (var i = 0; i < localStorage.length; i++){
    var city = localStorage.getItem(i);
    var cityName = $(".list-group").addClass("list-group-item");
    cityName.append("<li>" + city + "</li>");
    console.log(localStorage);
}

searchBtn.click(function(){
    console.log("@@@@@@@@@@");
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
            cityName.append("<li>" + response.name + "</li>");
            var localStrg = localStorage.setItem(inputCount, response.name);
            inputCount = inputCount + 1;
            
        })
    }

    
})
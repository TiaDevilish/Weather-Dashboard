var searchBtn = $(".searchBtn");
//function for when click btn save into local stor and show results

for (var i = 0; i < localStorage.length; i++){
    var city = localStorage.getItem(i);
    var cityName = $(".list-group").addClass("list-group-item");
    cityName.append("<li>" + city + "</li>");
    console.log(localStorage);
}
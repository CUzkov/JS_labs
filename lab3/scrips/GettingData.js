
if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position) {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
    });
}
else{

};

fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=04a8f926516de8567795579044b734ab`)
    .then(function (resp) { return resp.json() })
    .then(function (data) { Console.log(data) })
    .catch(function () {});  

    let lat = 1.0;
    let lon = 1.0;

fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=04a8f926516de8567795579044b734ab`)
    .then(function (resp) { return resp.json() })
    .then(function (data) { Console.log(data) })
    .catch(function () {});  
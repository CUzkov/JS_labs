if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position) {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=04a8f926516de8567795579044b734ab`)
            .then(function (resp) { return resp.json() })
            .then(function (data) { 
                let BlockDay = document.createElement('div');
                let DayTemp = document.createElement('p');
                for(let i = 0; i < 7; i++){
                    BlockDay.className = `BlockDay${i}`;
                    BlockDay.classList.add("BlockDay");

                    for(let j = 0; j < 5; j++){
                        
                    }
                    document.querySelector('.BlockSevenDays').append(BlockDay.cloneNode(true));
                    DayTemp.className = `DayTemp${i}`;
                    document.querySelector(`.BlockDay${i}`).append(DayTemp.cloneNode(true));
                    document.querySelector(`.DayTemp${i}`).innerHTML = ( "Днём: " + Math.round(data.daily[i].temp.day - 273) + "&deg;");
                }
            })
            .catch(function () {}); 
    });     
}   
else{

};


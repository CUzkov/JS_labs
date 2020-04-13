//Getting data and place  it
let sectors = ['северный', 'северо-восточный', 'восточный', 'юго-восточный', 'южный', 'юго-западный', 'западный', 'северо-западный', 'северный']; 
let massNames = ["Утром: ", "Днём: ", "Вечером: ", "Ночью: "];
let months = ['января', 'февраля', 'марта', 'апреля','мая', 'июня', 'июля', 'августа','сентября'];
let days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда','Четверг', 'Пятница', 'Суббота'];

let afterStr = "&deg;<br>";
let NowDate = new Date();
let weatherIcon = document.createElement('img');
    
function addTo(add, to, newProperty, removeProperty){
    let div = document.createElement('div');
    div.className = add;
    if(newProperty != null){
        div.classList.add(newProperty);
    }
    if(removeProperty != 0){
        div.classList.remove(removeProperty);
    }
    document.querySelector(to).append(div.cloneNode(true));
}

for (let i = 0; i < 7; i++){
    addTo(`day${i}`, '.blockSevenDays', 'day');
}
    
if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position) {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&lang=ru&appid=04a8f926516de8567795579044b734ab`)
            .then(function (resp) { return resp.json() })
            .then(function (data) { 
                for(let i = 0; i < 7; i++){
    
                    addTo(`day${i}Head`, `.day${i}`, 'dayFlex');
    
                    document.querySelector(`.day${i}Head`).innerHTML += (`${days[((NowDate.getDay() + i) % 7)]} ${(NowDate.getDate() + i)} ${months[(NowDate.getMonth() % 12)]}<br>`);
                    document.querySelector(`.day${i}Head`).innerHTML += (data.daily[i].weather[0].description);

                    addTo(`day${i}Body`, `.day${i}`, 'dayFlex');
                    addTo(`dayText${i}`, `.day${i}Body`);

                    document.querySelector(`.dayText${i}`).innerHTML += (massNames[1] + Math.round(data.daily[i].temp.day - 273) + afterStr);
                    document.querySelector(`.dayText${i}`).innerHTML += (massNames[0] + Math.round(data.daily[i].temp.morn - 273) + afterStr);
                    document.querySelector(`.dayText${i}`).innerHTML += (massNames[2] + Math.round(data.daily[i].temp.eve - 273) + afterStr);
                    document.querySelector(`.dayText${i}`).innerHTML += (massNames[3] + Math.round(data.daily[i].temp.night - 273) + afterStr);

                    addTo(`dayIcon${i}`, `.day${i}Body`);
    
                    weatherIcon.classList.add("weatherIcon1");
                    weatherIcon.src = `http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png`;
                    document.querySelector(`.dayIcon${i}`).append(weatherIcon.cloneNode(true));
                }
    
                addTo('CurrentDayUp', '.BlockCurrentDay', null, 'day');
    
                document.querySelector('.CurrentDayUp').innerHTML += (`<h3>Сегодня ${data.current.weather[0].description}<br>`);
    
                addTo('CurrentDayDown', '.BlockCurrentDay', 'CurrentDayDown')
                addTo('CurrentDayDownRihgt', '.CurrentDayDown')
                addTo('CurrentDayDownLeft', '.CurrentDayDown')
    
                document.querySelector('.CurrentDayDownRihgt').innerHTML += (`Температура: ${Math.round(data.current.temp - 273)}&deg;<br>`);
                document.querySelector('.CurrentDayDownRihgt').innerHTML += (`Ощущается как: ${Math.round(data.current.feels_like - 273)}&deg;<br>`);
                document.querySelector('.CurrentDayDownRihgt').innerHTML += (`Давление: ${Math.round(data.current.pressure/1.333)} мм рт. ст.<br>`);
                document.querySelector('.CurrentDayDownRihgt').innerHTML += (`Влажность: ${data.current.humidity} %<br>`);
                document.querySelector('.CurrentDayDownRihgt').innerHTML += (`Точка россы: ${Math.round(data.current.dew_point - 273)}&deg;<br>`);
                document.querySelector('.CurrentDayDownRihgt').innerHTML += (`УФ-индекс: ${data.current.uvi}<br>`);
                document.querySelector('.CurrentDayDownRihgt').innerHTML += (`Ветер: ${sectors[Math.round(data.current.wind_deg/45)]} ${data.current.wind_speed} м/с<br>`);
     
                weatherIcon.classList.remove("weatherIcon1");
                weatherIcon.classList.add("weatherIcon0");
                weatherIcon.src = `http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`;
                document.querySelector(`.CurrentDayDownLeft`).append(weatherIcon.cloneNode(true));
            }); 
    });     
}   





const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click',() => {

    const city = document.querySelector('.input');
     
    if(city === '')
        return;
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+city.value+'&units=metric&appid=80aa623e286d2527d14633de931863ae')
        .then(response => response.json())
        .then(json => {
            if(json.cod === '404') {
                container.style.height = '400px'; 
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                    var current = new Date();
                    var day_night = current.getHours();
                    if (day_night <= 18){
                        image.src = 'sunny.png';
                    }
                    else {
                        image.src = 'moon.png';
                    }
                    break;
                case 'Clouds':
                    var current = new Date();
                    var day_night = current.getHours();
                    if (day_night <= 12){
                        image.src = 'cloudy.jpg';
                    }
                    else {
                        image.src = 'cloudy1.jpg';
                    }
                    break;
                case 'Haze':
                    image.src = 'windy.jpg';
                    break;
                case 'Rain':
                    image.src = 'rainy.jpg';
                    break;
                case 'Snow':
                    image.src = 'snow.jpg';
                    break;
                case 'Widespread dust':
                    image.src = 'dust.jpg';
                    break;
                case 'Dust':
                    image.src = 'dust.jpg';
                    break;
                case 'Smoke':
                    image.src = 'smoke.jpg';
                    break;
                case 'Thunderstorm':
                    image.src = 'thunder.jpg';
                    break;
                case 'Thundering':
                    image.src = 'thunder.jpg';
                    break;
                default:
                    image.src = '';
            }
            var t=json['main']['temp'];
            temperature.innerHTML = t +'<span>°C</span>';

            var d =json['weather'][0]['description'];
            description.innerHTML = d ;

            var h = json['main']['humidity'];
            humidity.innerHTML = h + '%';

            var w = json['wind']['speed'];
            wind.innerHTML = w + 'kmph';

            weatherBox.style.display = '';
            weatherDetails.style.display = '';            
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');

        
            container.style.height = 'auto'; 
        });
});  

document.querySelector('#search').addEventListener('submit', async (event) => {
    event.preventDefault();

    const cityName = document.querySelector('#city_name').value;

    if (!cityName) {
        document.querySelector("#weather").classList.remove('show');
        showAlert('Digite uma cidade...');
        return;
    }
    
    const apiKey = 'e758f83e1c560913872e6d38613135d4';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`;

    const results = await fetch(apiUrl);
    const json = await results.json();

    if (json.cod === 200) {
        showInfo({
            city: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            tempMax: json.main.temp_max,
            tempMin: json.main.temp_min,
            description: json.weather[0].description,
            tempIcon: json.weather[0].icon,
            windSpeed: json.wind.speed,
            humidity: json.main.humidity,
        });
    } else {
        document.querySelector("#weather").classList.remove('show');
        showAlert(`
            Não foi possível localizar essa cidade 🥺
            <img src="src/img/search.svg"/>
        `);
    }
});

function showInfo(json) {
    showAlert('');
    document.querySelector("#weather").classList.add('show');
    document.querySelector('#title').innerHTML = `${json.city}, ${json.country}`;
    document.querySelector('#temp_value').innerHTML = `${json.temp.toFixed(1).toString().replace('.', ',')} °C`;
    document.querySelector('#temp_description').innerHTML = `${json.description}`;
    document.querySelector('#temp_img').setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector('#tempmax').innerHTML = `${json.tempMax.toFixed(1).toString().replace('.', ',')} °C`;
    document.querySelector('#tempmin').innerHTML = `${json.tempMin.toFixed(1).toString().replace('.', ',')} °C`;
    document.querySelector('#umidade').innerHTML = `${json.humidity}%`;
    document.querySelector('#wind').innerHTML = `${json.windSpeed.toFixed(1)} km/h`;

    setBackgroundByWeather(json.description);
}

function showAlert(msg) {
    document.querySelector('#alert').innerHTML = msg;
}

function setBackgroundByWeather(description) {
    const body = document.querySelector('body');
    const tempElement = document.querySelector('#temp');
    const container = document.querySelector('#container');
    const other1 = document.querySelector('#info1');
    const other2 = document.querySelector('#info2');
    const other3 = document.querySelector('#info3');
    const other4 = document.querySelector('#info4');

    const lowerCaseDescription = description.toLowerCase();

    if (lowerCaseDescription.includes('nublado')) {
        body.style.backgroundImage = 'url("https://i.pinimg.com/originals/c1/fc/9d/c1fc9d7f6ae08d56f2b84e81799790a5.gif")';
        tempElement.style.background = 'linear-gradient(to right, lightgray, darkgray)';
        container.style.background = 'linear-gradient(to right, #918989, #d7d7d7)';
        china.style.background = 'linear-gradient(to right, #918989, #d7d7d7)';
        const others = [other1, other2, other3, other4];
        others.forEach(other => {
            other.style.background = 'linear-gradient(to right, lightgray, darkgray)';
        });
    } else if (lowerCaseDescription.includes('limpo') || lowerCaseDescription.includes('céu limpo')) {
        body.style.backgroundImage = 'url("https://64.media.tumblr.com/22cbf4ef8c2f5511249378e53bf61c77/dd157364cccaf039-fa/s1280x1920/249dab13015735f78f1b904deae74aed39a5406d.gifv")';
        tempElement.style.background = 'linear-gradient(to right, #c2a0dd, #ff9fb4)';
        container.style.background = 'linear-gradient(to right, #c89ed5, #d3b895)';
        china.style.background = 'linear-gradient(to right, #c89ed5, #d3b895)';
        const others = [other1, other2, other3, other4];
        others.forEach(other => {
            other.style.background = 'linear-gradient(to right, #c2a0dd, #ff9fb4)';
        });
    } else if (lowerCaseDescription.includes('chuvoso') || lowerCaseDescription.includes('chuva') || lowerCaseDescription.includes('trovoadas')) {
        body.style.backgroundImage = 'url("https://i.pinimg.com/originals/f0/c2/64/f0c264e5f18ee610c88ca829cd46f32e.gif")';
        tempElement.style.background = 'linear-gradient(to right, skyblue, lightslategrey)';
        container.style.background = 'linear-gradient(to right, rgba(59, 161, 192, 0.911), #67a7b9)';
        china.style.background = 'linear-gradient(to right, rgba(59, 161, 192, 0.911), #67a7b9)';
        const others = [other1, other2, other3, other4];
        others.forEach(other => {
            other.style.background = 'linear-gradient(to right, skyblue, lightslategrey)';
        });
    } else if (lowerCaseDescription.includes('algumas')) {
        body.style.backgroundImage = 'url("https://i.pinimg.com/originals/da/e3/6a/dae36a74337de05e249ce5afcec907c1.gif")';
        tempElement.style.background = 'linear-gradient(to right, rgb(243 228 216), rgb(215 158 150))';
        container.style.background = 'linear-gradient(to right, rgb(255 183 126), rgb(215 131 121))';
        china.style.background = 'linear-gradient(to right, rgb(255 183 126), rgb(215 131 121))';
        const others = [other1, other2, other3, other4];
        others.forEach(other => {
            other.style.background = 'linear-gradient(to right, rgb(243 228 216), rgb(215 158 150))';
        });
    } else if (lowerCaseDescription.includes('dispersas')) {
        body.style.backgroundImage = 'url("https://i.pinimg.com/originals/16/72/20/167220fb4f5d929ccffbf2751183baf1.gif")';
        tempElement.style.background = 'linear-gradient(to right, rgb(223 225 228), rgb(223, 223, 223))';
        container.style.background = 'linear-gradient(to right, rgb(255 255 255 / 91%), rgb(223 223 223))';
        china.style.background = 'linear-gradient(to right, rgb(255 255 255 / 91%), rgb(223 223 223))';
        const others = [other1, other2, other3, other4];
        others.forEach(other => {
            other.style.background = 'linear-gradient(to right, rgb(223 225 228), rgb(223, 223, 223))';
        });
    } else if (lowerCaseDescription.includes('névoa')) {
        body.style.backgroundImage = 'url("https://i.pinimg.com/originals/16/72/20/167220fb4f5d929ccffbf2751183baf1.gif")';
        tempElement.style.background = 'linear-gradient(to right, rgb(223 225 228), rgb(223, 223, 223))';
        container.style.background = 'linear-gradient(to right, rgb(255 255 255 / 91%), rgb(223 223 223))';
        china.style.background = 'linear-gradient(to right, rgb(255 255 255 / 91%), rgb(223 223 223))';
        const others = [other1, other2, other3, other4];
        others.forEach(other => {
            other.style.background = 'linear-gradient(to right, rgb(223 225 228), rgb(223, 223, 223))';
        });
    } else if (lowerCaseDescription.includes('neve')) {
        body.style.backgroundImage = 'url("https://i.pinimg.com/originals/16/72/20/167220fb4f5d929ccffbf2751183baf1.gif")';
        tempElement.style.background = 'linear-gradient(to right, rgb(223 225 228), rgb(223, 223, 223))';
        container.style.background = 'linear-gradient(to right, rgb(255 255 255 / 91%), rgb(223 223 223))';
        china.style.background = 'linear-gradient(to right, rgb(255 255 255 / 91%), rgb(223 223 223))';
        const others = [other1, other2, other3, other4];
        others.forEach(other => {
            other.style.background = 'linear-gradient(to right, rgb(223 225 228), rgb(223, 223, 223))';
        });
    } else {
        body.style.backgroundImage = 'url("https://64.media.tumblr.com/752e98a41362e1c7e51c7a50a78c179c/f56cd24a7cd794d6-54/s2048x3072_c0,0,100000,85880/782343118d50eddb426ac93204cac586f38469cd.gif")';
    }
}

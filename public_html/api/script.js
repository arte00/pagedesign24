
// API KEY cf4e3808f35b0b8fbe51b9a3974a1510

const getBtn = document.getElementById('button');
const searchBar = document.getElementById('search');

const xhr = new XMLHttpRequest();

xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200){

        let weather = JSON.parse(xhr.responseText);

        let temperature = weather['list'][0]['main']['temp']

        document.getElementById('demo').innerHTML = toKelvin(temperature);
    }
    if (xhr.readyState === 404){

        console.log('File or resource not found');
    }
}

const getData = () => {

    let city = searchBar.value;

    xhr.open('get', "https://api.openweathermap.org/data/2.5/forecast?q=" + capitalize(city) + ",pl&appid=cf4e3808f35b0b8fbe51b9a3974a1510", true);
    xhr.send();
};

getBtn.addEventListener('click', getData)

// UTILS

const capitalize = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

const toKelvin = (temp) => {
    return temp - 273.15;
}
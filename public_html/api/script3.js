
const apiQuery = 'http://localhost:8080/posts/comments?page=0&sort=ASC';
const apiQuery2 = 'https://api.openweathermap.org/data/2.5/weather?q=Szczecin&appid=cf4e3808f35b0b8fbe51b9a3974a1510'
let requestedData;

const getData = () => {
  let textPlace = document.getElementById('main');

  fetch(apiQuery, {mode: "no-cors"})
      .then(response => response.json())
      .then(data => requestedData=data);

  if (requestedData != null){
    requestedData.forEach(
        element => {
          textPlace.innerText += `${element.id}, ${element.title}, ${element.content}, ${element.created} \n`;
          element.comment.forEach(
              element => textPlace.innerText += `\t${element.content}\n`
          )
        }
    )
  }
}

document.getElementById('button').onclick = getData;
const urlApi = 'http://localhost/Forum-API/';
const topicContent = document.querySelector('.main');
const title = document.querySelector('title');
const h1 = document.querySelector('h1');
const arianne = document.querySelector('.arianne');
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idTopic = urlParams.get('id_topic');
const createTopic = document.querySelector('.create-topic');
const answerTopic = document.querySelector('.answer-topic')
const button = document.querySelector('.button-creation');
let idCat = ''
let idUser =''

//listing des messages
fetch(urlApi + 'topic/' + idTopic)
.then(response => response.json())
.then(response => {
  console.log(response)
  let template = ''
  h1.innerHTML = response.data[0]['topic_name']
  arianne.innerHTML = `<a href="index.html">Accueil</a><span> ⇢ </span><a href="./category.html?id_category=${response.data[0]['id_category']}"> ${response.data[0]['name_category']} </a> <span> ⇢ </span><span>${response.data[0]['topic_name']}</span>`
  // faire la boucle ici
  response.data.forEach(message => {
    template += `
      <div data-id="${message.id_message}" class="message">
        <div class="left-column">
          <span>${message.user_name}</span>
          <span class="nbMessage">Message : 
          </span>
        </div>
        <div class="right-column">
          <span>${message.date_message}</span>
          <span>${message.message}</span>
        </div>
      </div>
    `
  })
  topicContent.innerHTML = template
  idCat = response.data[0]['id_category']
  //nbMessage.innerHTML = `Messages : ${response.user[]['id_user']}`
})
.catch(error=>console.log(error))


button.addEventListener('click', (e) => {
  e.preventDefault()
  if(e.target.classList.contains('create-topic')) { 
    window.location.href = `./message.html?id_category=${idCat}&id_user=3`
  }
  else if(e.target.classList.contains('answer-topic')) { 
    window.location.href = `./message.html?id_topic=${idTopic}&id_user=3`
}})
const urlApi = 'http://localhost/Forum-API/';
const h1 = document.querySelector('h1');
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const arianne = document.querySelector('.arianne');
const writeMessage = document.querySelector('.writeMessage');
const messageFromTopic = document.querySelector('.messageFromTopic');
const idTopic = parseInt(urlParams.get('id_topic'));
const topicContent = document.querySelector('.main');
const messageTitle = document.querySelector('.message-title')
const form = document.querySelector('.form-message')
const idCat = parseInt(urlParams.get('id_category'))
const userMessage = document.querySelector('.user-message');

/* créer un message */

const createTopic = () => {
  console.log('on crée un topic')
  h1.innerHTML = 'Créer un nouveau sujet'
  form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(urlApi + 'topic/' + idCat, {
      method: 'POST',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({
        id_category: idCat,
        topic_name: messageTitle.value,
        message: userMessage.value,
        id_user: 3
      })
    })
    .then(response => response.json())
    .then(response => {
      console.log(response)
      console.log(response.data['id_topic'])
      const redirectUrl = "./topic.html?id_topic=" + response.data['id_topic']
      window.location.href = redirectUrl
      })
      .catch(error=>console.log(error))
    })
    messageFromTopic.remove()


}

/*répondre à un topic */
const answerTopic = () => {
 console.log('on répond à un topic existant')
  form.addEventListener('submit', e=> {
    e.preventDefault()
    fetch(urlApi + 'message/' + idTopic, {
      method: 'POST',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({
        id_topic: idTopic,
        message: userMessage.value,
        id_user: 3
      })
    })
    .then(response => response.json())
    .then(response => {
      console.log(response)
      console.log(idTopic)
      const redirectUrl = "./topic.html?id_topic=" + idTopic
      window.location.href = redirectUrl
    })
    .catch(error=>console.log(error))
  })
 messageTitle.disabled = true
 console.log(urlApi + 'topic/' + idTopic)
  fetch(urlApi + 'topic/' + idTopic)
  .then(response => response.json())
  .then(response => {
    console.log(response)
    let template =''
    messageTitle.value = response.data[0]['topic_name']
    h1.innerHTML = 'Répondre à ' + response.data[0]['topic_name']
    arianne.innerHTML = `
    <a href="index.html">Accueil  </a>
    <span> ⇢ </span>
    <a href="./category.html?id_category=${response.data[0]['id_category']}"> ${response.data[0]['name_category']} </a> 
    <span> ⇢ </span>
    <a href="./topic.html?id_topic=${response.data[0]['id_topic']}"> ${response.data[0]['topic_name']} </a> 
    <span> ⇢ </span> 
    <span> Rédiger une réponse </span>
    `
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
    topicContent.classList.add('column-reverse')
    topicContent.innerHTML = template
  })
  .catch(error=>console.log(error))
}



idTopic
? answerTopic() 
: createTopic() 
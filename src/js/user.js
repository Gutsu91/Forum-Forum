const urlApi = 'http://localhost/Forum-API/';
const messList = document.querySelector('.messList');
const leftColumn = document.querySelector('.left-column')
const title = document.querySelector('title');
const h1 = document.querySelector('h1');
const arianne = document.querySelector('.arianne');
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idUser = urlParams.get('id_user');
console.log(idUser);

fetch(urlApi + 'user/' + idUser)
.then(response => response.json())
.then(response => {
  console.log(response)
  let template =''
  h1.innerHTML = 'Profil de ' + response.data[0]['user_name']
  arianne.innerHTML =`<a href="index.html">Accueil  </a><span>   >>>   <span>Profil de ${response.data[0]['user_name']}`
  leftColumn.innerHTML = `
    <div class="email"> 
      <span>Email :</span> 
      <span>${response.data[0]['email']}</span>
    </div>
    <div class="email">
      <span>Membre depuis :</span>
      <span>${response.data[0]['registration_date']}</span>
    </div>
    <span> Sujets : ${response.data[0]['nb_topic']}</span>
    <span> Messages : ${response.data[0]['nb_message']} </span>
  `
  response.messages.forEach(user => {
    template += `
    <div class="messages">
    <div class="message-head"><h3><a href="topic.html?id_topic=${user.id_topic}">${user.topic_name}</a></h3>
    <span>${user.date_message}</span></div>
    <div class="user-message">${user.message}</div>   </div> 
    `
  })
  messList.innerHTML = template
})
.catch(error=>console.log(error))
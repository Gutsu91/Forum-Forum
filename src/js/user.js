const urlApi = 'http://localhost/Forum-API/';
const messList = document.querySelector('.messList');
const leftColumn = document.querySelector('.left-column')
const title = document.querySelector('title');
const h1 = document.querySelector('h1');
const arianne = document.querySelector('.arianne');
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idUser = sessionStorage.getItem('id_user')
const connectLink = document.querySelector('.connectLink')
const statusMessage = document.querySelector('.statusMessage')


sessionStorage.getItem('id_user') === null 
? sessionStorage.setItem('id_user',3)
: console.log('ok')

// on modifie le header en fonction du statut connecté ou non
if (sessionStorage.getItem('id_user') != 3 || sessionStorage.getItem('id_user') === null) {
  connectLink.innerHTML = `
<li><a href="./user.html?id_user=${idUser}">Mon profil</a></li>
<li><a href="" class="deconnexion">Déconnexion</a></li>
`
}

//On gère les clicks sur les liens connection /deconnection
//Si lien = connection -> on stock l'url depuis laquelle l'utilisateur a clické sur connection
connectLink.addEventListener('click', e => {
  if(e.target.classList.contains('connexion')) {
    e.preventDefault()
    const currentUrl = window.location.href
    sessionStorage.setItem('connectUrl', currentUrl)
    window.location.href = './connect.html'
  } else if(e.target.classList.contains('deconnexion')) {
    e.preventDefault()
    console.log('foo')
    fetch(urlApi + 'deconnect')
    .then(response => response.json())
    .then(response => {
      console.log(response)
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('id_user')
      sessionStorage.setItem('id_user', 3)
      statusMessage.innerHTML = 'Vous êtes bien déconnectés. Vous allez être redirigé'
      statusMessage.classList.add('messageSuccess')
      location.reload()
    })
    .catch(error=>console.log(error))
  }
  }) 

fetch(urlApi + 'user/' + idUser)
.then(response => response.json())
.then(response => {
  console.log(response)
  let template =''
  h1.innerHTML = 'Profil de ' + response.data[0]['user_name']
  arianne.innerHTML =`<a href="index.html">Accueil  </a><span> ⇢ <span>Profil de ${response.data[0]['user_name']}`
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
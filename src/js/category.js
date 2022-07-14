const urlApi = 'http://localhost/Forum-API/';
const topicList = document.querySelector('.topicList');
const title = document.querySelector('title')
const h1 = document.querySelector('h1');
const arianne = document.querySelector('.arianne');
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idCat = urlParams.get('id_category');
const button = document.querySelector('.button');
const connectLink = document.querySelector('.connectLink')
const idUser = sessionStorage.getItem('id_user')
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

//listing des catégories
fetch(urlApi + 'category/' + idCat)
.then (response => response.json())
.then (response => {
  console.log(response);
  // definir balise title ici: title.innerHTML = 'foo'
  h1.innerHTML = response.data[0]['name_category']
  arianne.innerHTML = `<a href="index.html">Accueil</a><span> ⇢ </span><span> ${response.data[0]['name_category']} </span> `
  let template =`<section class="denom">
  <div>Sujet</div>
  <div>Messages</div>
  <div>Dernière réponse</div>
</section>`;
  response.data.forEach(topic => {
    template += `
    <article class="topic">
      <div>
        <span><a href="./topic.html?id_topic=${topic.id_topic}">${topic.topic_name}</a></span>
        <span>Par <a href="">${topic.user_name}</a> </span>
      </div>
      <div>
        <span>${topic.nb_message}</span>
      </div>
      <div>
        <a href="#">User</a>
        <span>à ${topic.latest}</span>
      </div>
    </article>
    `
  })
  topicList.innerHTML = template
})
.catch(error => console.log(error))

button.addEventListener('click', e => {
  e.preventDefault()
  window.location.href = `./message.html?id_category=${idCat}&id_user=3`
})
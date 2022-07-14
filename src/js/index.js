const urlApi = 'http://localhost/Forum-API/';
const catList = document.querySelector('.main')
const connectLink = document.querySelector('.connectLink')
const navLink = document.querySelector('nav > ul')
const idUser = sessionStorage.getItem('id_user')
const statusMessage = document.querySelector('.statusMessage')

sessionStorage.getItem('id_user') === null 
? sessionStorage.setItem('id_user',3)
: void(0)


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

//listing des catégories
fetch(urlApi + 'category')
  .then(response => response.json())
  .then(response => {
    console.log(response)
    let template = ''
    response.data.forEach(category => {
        template += `
        <section data-catID="${category.id_category}" class="category">
          <h2><a href="./category.html?id_category=${category.id_category}">${category.name_category}</a></h2>
          <div>
            <p> Sujets : ${category.nb_topic}</p>
            <p> Messages : ${category.nb_message}</p>
          </div>
          <div>
            <p><a href="./topic.html?id_topic=${category.id_topic}">${category.topic_name}</a></p>
            <p><a href="./topic.html?id_topic=${category.id_topic}"> Pseudo</a> à ${category.max_message}</p>
          </div>
        </section>
        `
    })
    catList.innerHTML = template
  })
.catch(error => console.log(error))
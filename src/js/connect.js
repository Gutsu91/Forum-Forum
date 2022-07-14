
const urlApi = 'http://localhost/Forum-API/';
const connectForm =document.querySelector('.form-connect')
const deconnect = document.querySelector('.form-disconnect')
const userNameField = document.querySelector('.input-user_name')
const pwField = document.querySelector('.input-password')
const statusMessage = document.querySelector('.statusMessage')
const connectLink = document.querySelector('.connectLink')
const idUser = sessionStorage.getItem('id_user')
let nextUrl = './index.html'

sessionStorage.getItem('id_user') === null 
? sessionStorage.setItem('id_user',3)
: console.log('ok')



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
    location.reload()
  })
  .catch(error=>console.log(error))
}
}) 

// on modifie le header en fonction du statut connecté ou non
if (sessionStorage.getItem('id_user') != 3 || sessionStorage.getItem('id_user') === null) {
  connectLink.innerHTML = `
<li><a href="./user.html?id_user=${idUser}">Mon profil</a></li>
<li><a href="" class="deconnexion">Déconnexion</a></li>
`
}

if(sessionStorage.getItem('id_user') != 3 && sessionStorage.getItem('id_user') != null)  {
  connectForm.innerHTML = `<p>Vous êtes déjà connectés!</p>`
}

//event listener au submit du form dans lequel on met un fetch
connectForm.addEventListener('submit', e => {
  e.preventDefault()
  let letsConnect = {
    user_name: userNameField.value,
    password: pwField.value
  }
  userNameField.value=""
  pwField.value=""
  fetch(urlApi + 'auth', {
    headers: {"Content-Type" : "application/json"},
    method: 'POST',
    body: JSON.stringify(letsConnect)
  })
  .then(response => response.json())
  .then(response => {
    console.log(response)
    switch(response.code) {
      case 403:
        statusMessage.innerHTML = 'Erreur d\'identifiant et/ou de mot de passe. Veuillez réessayer'
        statusMessage.classList.add('messageFailure')
        setTimeout(resetForm => {
          statusMessage.innerHTML = ''
          statusMessage.classList.remove('messageFailure')
        }, 2500)
        break
      case 200:
        sessionStorage.setItem('token', response.token)
        sessionStorage.removeItem('id_user')
        sessionStorage.setItem('id_user', response.id_user)
        statusMessage.innerHTML = 'Connexion réussie, vous allez être redirigés'
        statusMessage.classList.add('messageSuccess')
        sessionStorage.getItem('connectUrl') == null
        ? nextUrl = './index.html'
        : nextUrl = sessionStorage.getItem('connectUrl')
        setTimeout(redirect => {window.location.href = nextUrl}, 2500)
    }
  })
  .catch(error => console.log(error))
})
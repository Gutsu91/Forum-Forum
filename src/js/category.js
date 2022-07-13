const urlApi = 'http://localhost/Forum-API/';
const topicList = document.querySelector('.topicList');
const title = document.querySelector('title')
const h1 = document.querySelector('h1');
const arianne = document.querySelector('.arianne');
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idCat = urlParams.get('id_category');
const button = document.querySelector('.button');
console.log(idCat)

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
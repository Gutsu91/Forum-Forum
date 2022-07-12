const urlApi = 'http://localhost/Forum-API/';
const topicList = document.querySelector('.topicList');
const title = document.querySelector('title')

//listing des catégories
fetch(urlApi + 'topic')
.then (response => response.json())
.then (response => {
  console.log(response)
  // definir balise title ici: title.innerHTML = 'foo'
  let template =''
  response.data.forEach(topic => {
    template += `
    <article>
      <div>
        <span>${topic.topic_name}</span>
        <span>Par User<!--${topic.id_user} ramener nom du user ici--> </span>
      </div>
      <div>
        <span>42</span>
      </div>
      <div>
        <a href="#">User</a>
        <span>à [heure]</span>
      </div>
    </article>
    `
  })
  topicList.innerHTML = template
})
.catch(error => console.log(error))
console.log('foo')
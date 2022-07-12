const urlApi = 'http://localhost/Forum-API/';
const topicContent = document.querySelector('main');
const title = document.querySelector('title');
const h1 = document.querySelector('h1');

//listing des messages
const fetchdis = (id = 1) => {
  fetch(urlApi + 'topic/' + id)
    .then(response => response.json())
    .then(response => {
      console.log(response)
      let template = ''
      h1.innerHTML = response.data[0]['topic_name']
      // faire la boucle ici
      response.data.forEach(message => {
        template += `
        <div>
          <div>
            <span data-id="${message.id}">${message.id_user}</span>
            <span>Number of message</span>
          </div>
          <div>
            <span>${message.date_message}</span>
            <span>${message.message}</span>
          </div>
        </div>
        `
      })
      topicContent.innerHTML = template
    })
    .catch(error=>console.log(error))
}
fetchdis()
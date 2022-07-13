const urlApi = 'http://localhost/Forum-API/';
const catList = document.querySelector('.main')

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
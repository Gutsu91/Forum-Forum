const urlApi = 'http://localhost:8888/forum-ClientAPI/';
const catList = document.querySelector('main')

//listing des catégories
fetch(urlApi + 'category')
  .then(response => response.json())
  .then(response => {
    console.log(response)
    let template = ''
    response.data.forEach(category => {
        template += `
        <section data-catID="${category.id_category}">
        <h1>${category.name_category}</h1>
          <div>
            <p> Nombre de sujets : ${category.nbhits}<!-- ramener le nombre de topics dans la réponse get de category --></p>
            <p> Nombre de messages : </p>
          </div>
          <div>
            <p><a href="#"> Nom du dernier sujet</a></p>
            <p><a href="#"> Pseudo</a> à [heure]</p>
          </div>
        </section>
        `
    })
    catList.innerHTML = template
  })
.catch(error => console.log(error))
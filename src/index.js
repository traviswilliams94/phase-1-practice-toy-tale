let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

//event listener for submit button
document.querySelector('form').addEventListener('submit', handleSubmit);


//submit handling function

function handleSubmit(e){
  e.preventDefault();
  const form = e.target;

  let toyObj = {
    name:form.name.value,
    image:form.image.value,
    id: "" ,
    likes: 0,
  }
  
  renderToyCard(toyObj);
  createToy(toyObj);
  form.reset();

};

//function to increase Likes

// function increaseLikes (){
//   card.id+= 1
//   card.querySelector('p').textContent = card.id
// };

//build cards from exisitng toy data
function renderToyCard(toyObj){
  let toyList = document.createElement('ol')
  toyList.id = 'toylist'
  document.getElementById('toy-collection').appendChild(toyList)

  let card = document.createElement('li')
  card.innerHTML = `
  <h2>${toyObj.name}</h2>
  <img src="${toyObj.image}"/>
  <p>${toyObj.likes}</p>
  <button class="like-btn" id="[toy_id]">Like ❤️ </button>`

  //event listener for like buttons
  card.querySelector('.like-btn').addEventListener('click', () => {
    toyObj.likes+= 1
    card.querySelector('p').textContent = toyObj.likes
    increaseLikes(toyObj)
  });

  //add toy card to DOM
  document.getElementById('toylist').appendChild(card)
};

// fetch requests. first fetch to pull in exisiting toys
function getAllToys(){
  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(toys => toys.forEach(toy => renderToyCard(toy)))
}

//second fetch to post new toys
function createToy(toyObj){
  fetch('http://localhost:3000/toys',{
    method: 'POST',
    headers:  {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
        body:JSON.stringify(toyObj)
    })
    .then(res => res.json())
    .then(toyObj => console.log(toyObj))
    
  };

  //third fetch to Patch and update a toys like count
  function increaseLikes(toyObj){
    fetch(`http://localhost:3000/toys/${toyObj.id}`, {
      method: 'PATCH',
      headers:  {
          "Content-Type": "application/json",
          "Accept": "application/json"
      },
          body:JSON.stringify(toyObj)
      })
      .then(res => res.json())
      .then(toyObj => console.log(toyObj))
  }


function initialize(){
  getAllToys();
}
initialize()
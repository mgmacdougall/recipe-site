const submissionForm = document.getElementById('submission-form');
const rootNode = document.getElementById('root');
const homePageSection = document.querySelectorAll('section')[0];
const recListEl = document.getElementById('rec-list');

const resetRecipeCardDetails = () => {
  const recipeDetailsEl = document.getElementById('rec-details');
  recipeDetailsEl.innerHTML = '';
};

const recipeButtonListener = async e => {
  if (e.target.dataset.id) {
    const recipeInfo = await fetchRecipeDetailsById(e.target.dataset.id);
    renderChange();
    renderRecipe(recipeInfo);
  }
};

const getRecipeImage = async id => {
  const recipeImage = await fetchRecipeImageById(id);
  return recipeImage;
};

const renderRecipe = async recipe => {
  resetRecipeCardDetails();
  const image = await getRecipeImage(recipe.id);
  const imageObjectURL = URL.createObjectURL(image);
  const recipeDetailsEl = document.getElementById('rec-details');
  recipeDetailsElInnerHtml = `
    <img src=${imageObjectURL} class="img-fluid" style="width:100%;" alt="...">
  `;
  const recipeSteps = recipe.steps
    .map(
      step => `
      <li class="list-group-item">${step}</li>
  `
    )
    .join('');

  const recipeHtml = `
  <div class="container my-5">
      ${recipeDetailsElInnerHtml}
      <div class="p-5 text-center bg-body-tertiary rounded-3">
        <h1 class="text-body-emphasis">${recipe.name}</h1>
        <p class="lead">
          ${recipe.details}
        </p>
        <ol class="list-group list-group-numbered">
        ${recipeSteps}
        </ol>
      </div>
    </div>`;
  recipeDetailsEl.innerHTML = recipeHtml;
};

const fetchRecipeDetailsById = async id => {
  const details = await fetch(`http://localhost:5454/${id}`);
  const data = await details.json();
  return data;
};

const fetchRecipeImageById = async id => {
  const details = await fetch(`http://localhost:5454/img/${id}`);
  return details.blob();
};

const renderChange = () => {
  homePageSection.classList.add('hidden');
  document.querySelector("[href='/edit'").classList.toggle('hidden');
};

async function populateData() {
  const {udata} = await loadData();
  const d = udata.map((data, index) => {
    return `<div class="col-md-6 mt-2" >
    <div class="${index % 2 === 0
      ? 'h-100 p-5 text-bg-dark rounded-3'
      : 'h-100 p-5 bg-body-tertiary border rounded-3'}">
      <h2>${data.name}</h2>
   
      
          <p>${data.details}</p>
          <button class="${index % 2 === 0
            ? 'btn btn-outline-light'
            : 'btn btn-outline-secondary'} type="button" data-id=${data.id}>More...</button>
        </div>
      </div>
      `;
  });

  rootNode.innerHTML = `
  <div class="container py-4">
    <div class="row align-items-md-stretch">
      ${d.join('')}
    </div>
  </div>
`;
}

async function loadData() {
  const data = await fetch('http://localhost:5454/');
  return data.json();
}

const addRecipe = () => {};
document.addEventListener('DOMContentLoaded', populateData);
document.addEventListener('click', recipeButtonListener);

const renderRecipeForm = () => {
  // Disable the 'Add...' button.
  document.querySelector("[href='/edit'").classList.toggle('hidden');
  const containerEl = document.getElementById('edit');
  const containerFormEl = `
    <div class="px-4 py-5 my-5 text-center">
        <form>
          <div class="mb-3">
            <label for="title" class="form-label">Title</label>
            <input type="text" class="form-control" id="title" aria-describedby="emailHelp">
          </div>
          <div class="mb-3">
          <textarea class="form-control" placeholder="Write steps here..." id="floatingTextarea"></textarea>
          <label for="floatingTextarea">Comments</label>
          </div>
          <button type="submit" class="btn btn-primary">Save</button>
      </form>
    </div>
  `;
  containerEl.innerHTML = containerFormEl;
};

document.querySelector('.nav').addEventListener('click', e => {
  e.preventDefault();
  if (e.target.innerText.toLowerCase().includes('add')) {
    rootNode.innerHTML = '';
    recListEl.classList.toggle('hidden');
    renderRecipeForm(e.target);
  }
  if (e.target.innerText.toLowerCase().includes('home')) {
    location.replace('/');
  }
});

document.querySelector('body').addEventListener('submit', async e => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const steps = document.getElementById('floatingTextarea').value;
  const data = {name: title, steps: steps};

  const options = {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  };

  fetch(`http://localhost:5454/postDetails`, options).then(() => {
    location.replace('/');
  });
});

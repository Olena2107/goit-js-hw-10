import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from './js/cat-api';

Notiflix.Notify.init({
  timeout: 6000,
  width: '400px',
  fontSize: '16px',
  cssAnimationStyle: 'from-bottom',
});

const selectEl = document.querySelector('.breed-select');
const catInfoEl = document.querySelector('.cat-info');
const loaderAlert = document.querySelector('.loader');
// const errorAlert = document.querySelector('.error');

const errorMessage = 'Oops! Something went wrong! Try reloading the page!';


selectEl.addEventListener('change', onClickCatInfo);

  fetchBreeds()
    .then(breeds => {
      onRenderingSelect(breeds);
      
      loaderAlert.classList.add('is-hidden');
    })
    .catch(() => {
      Notiflix.Notify.failure(errorMessage);
    });

function onClickCatInfo(e) {
  catInfoEl.style.opacity = 0.2;
  loaderAlert.classList.remove('is-hidden');
  const breedId = e.currentTarget.value;
  fetchCatByBreed(breedId)
    .then(breeds => {
      catInfoEl.style.opacity = 1;
      onRenderingInfo(breeds);
      loaderAlert.classList.add('is-hidden');
    })
    .catch(() => {
      Notiflix.Notify.failure(errorMessage);
    });
}

function onRenderingSelect(breeds) {
  const markup = breeds
    .map(({ name, id }) => {
      return `<option value="${id}">${name}</option>`;
    })
    .join();

  selectEl.innerHTML = markup;
  new SlimSelect({
    select: selectEl,
  });
}
///
function onRenderingInfo(breeds) {
  const markup = breeds
    .map(({ url, breeds: [{ name, temperament, description }] }) => {
      return `
      <img class="cat-info__cat-img" src="${url}" alt="cat ${name}" width="460px">
      <div class="cat-info__text-box">
        <h2 class="cat-info__tittle">${name}</h2>
        <p class="cat-info__description">${description}</p>
        <p class="cat-info__temperament"><span class="temperament__header">Temperament:</span> ${temperament}</p>
      </div>`;
    })
    .join();

  catInfoEl.innerHTML = markup;
}
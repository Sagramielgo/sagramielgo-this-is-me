const createBtn = document.querySelector('.js-create-btn');
const cardResultElement = document.querySelector('.js-card-result');
const createdSection = document.querySelector('.js-created');
const errorElement = document.querySelector('.js-consoleError');
const errorSection = document.querySelector('.js-error');
const shareTwitterBtn = document.querySelector('.js-twitterBtn');
const shareTwitter = document.querySelector('.js-twitter');

function handleCreateBtn(ev) {
  ev.preventDefault();

  /*  console.log('Mis datos', getUserData()); */

  const url = 'https://profileawesome.herokuapp.com/card';
  const data = getUserData();

  fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success === true) {
        cardResultElement.innerHTML =
          '<h3 class="cardCreated">Haz click aquí para ver tu tarjeta<h3>';
        cardResultElement.href = data.cardURL;
        createdSection.classList.remove('created--hidden');
        errorSection.classList.add('created--hidden');
      } else {
        errorElement.innerHTML = data.error;
        errorSection.classList.remove('created--hidden');
        createdSection.classList.add('created--hidden');
      }
    });
}

createBtn.addEventListener('click', handleCreateBtn);

function handleTwitterBtn() {
  const tweetText = encodeURIComponent(
    '¡Echa un vistazo a la tarjeta que me he creado con This Is Me Profile Cards!'
  );
  const tweetHashtag = encodeURIComponent('Adalab,promoL,thisIsMe,frontend');
  const generatedCardURL = cardResultElement.href;
  shareTwitter.href = `https://twitter.com/intent/tweet?text=${tweetText}&url=${generatedCardURL}&hashtags=${tweetHashtag}`;
}
shareTwitterBtn.addEventListener('click', handleTwitterBtn);

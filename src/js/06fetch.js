const createBtn = document.querySelector('.js-create-btn');
const cardResultElement = document.querySelector('.js-card-result');
const createdSection = document.querySelector('.js-created');
const errorElement = document.querySelector('.js-consoleError');
const errorSection = document.querySelector('.js-error');

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
      console.log('Server response:', data);
      if (data.success === true) {
        cardResultElement.innerHTML = 'Haz click aquí para ver tu tarjeta';
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

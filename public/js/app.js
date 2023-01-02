console.log('Client side JS file is loaded!')

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const location = search.value;
  search.value = '';
  
  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';

  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = error
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      }
    })
  })
})

// Goal: use input val to get weather 
// 1. migrate fetch call into the submit callback X
// 2. use the search text as the address query srting value X
// 3. submit the form with a valid and invalid value to test
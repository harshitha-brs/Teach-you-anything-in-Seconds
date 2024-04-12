/**
Author:    Build Rise Shine with Nyros (BRS)
Created:   11.05.2022
Library / Component: Script file
Description: Logic behind the app(fetching the data from the API)
(c) Copyright by BRS Studio.
**/
var resultText = '';
const search = document.querySelector('#submit');
const searchQuery = document.querySelector('#searchQuery');
const results = document.querySelector('#results');
const res_blk = document.querySelector('#res_blk');
const err_blk = document.querySelector('#err_blk');
const loader = document.querySelector('#loader');
const geminiAiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${window.GEMINI_AI_KEY}`;
const headers = {
  "Content-Type": "application/json",
}

search.addEventListener('click', function() {
  if(!searchQuery.value) {return}
  getCompletions();
})

async function getCompletions() {
  let prompt;
  loader.classList.remove('d-none');
  answer.classList.add('d-none');
  res_blk.classList.add('d-none');
  results.innerHTML = null;
  resultText = '';
  err_blk.classList.add('d-none');
  err_blk.innerHTML = null;

  const dataObj = {
    method: 'POST',
    cache: 'no-cache',
    headers: headers,
    referrerPolicy: 'no-referrer',
    body: `{
      contents: [{
        "parts":[{
        "text": "Question is ${searchQuery.value.replace(/\?/g, '')}"}]
      }]
    }`
  }

  try {
    const response = await fetch(geminiAiUrl,dataObj)
    const aresponse = await response.json()
    loader.classList.add('d-none');
    answer.classList.remove('d-none');
    if(!response.ok) { throw await response.json(); }
    results.textContent = aresponse.candidates[0].content.parts[0].text;
    res_blk.classList.remove('d-none');
  } catch (error) {
    console.log(error);
    err_blk.classList.remove('d-none');
    err_blk.innerHTML = error.error.message;
    answer.classList.remove('d-none');
    loader.classList.add('d-none');
  }

}

searchQuery.addEventListener('mouseover', function() {
  searchQuery.value = null;
})

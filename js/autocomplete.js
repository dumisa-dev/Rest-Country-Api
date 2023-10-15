let countries = [];
fetch(`https://restcountries.com/v3.1/all`)
.then((res)=>res.json())
  .then((allCountriesNames)=>{

    console.log(allCountriesNames);

    allCountriesNames.map(e=>{

      countries.push(e.name.common);
      countries.sort();

    });
  })
  .catch(err=>{
    console.log(err);
  });

(function () {
  "use strict";
  let inputField = document.getElementById('countryInput');
  let currencyBoxSuggestion = document.getElementById('suggestions');
  inputField.addEventListener('input', changeAutoComplete);
  currencyBoxSuggestion.addEventListener('click', selectItem);

  function changeAutoComplete({ target }) {
    let data = target.value;
    currencyBoxSuggestion.innerHTML = ``;
    if (data.length) {
      let autoCompleteValues = autoComplete(data);
      autoCompleteValues.forEach(value => { addItem(value); });
    }
  }

  function autoComplete(inputValue) {
    return countries.filter(
      (value) => value.toLowerCase().startsWith(inputValue.toLowerCase())
    );
  }

  function addItem(value) {
    currencyBoxSuggestion.innerHTML = currencyBoxSuggestion.innerHTML + `<li>${value}</li>`;
  }

  function selectItem({ target }) {
    if (target.tagName === 'LI') {
      inputField.value = target.textContent;
      currencyBoxSuggestion.innerHTML = ``;
      countriesApi()
    }
  }
})();



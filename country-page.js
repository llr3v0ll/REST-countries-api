const selectedCountry = localStorage.getItem("selectedCountry");
const mainDiv = document.querySelector("#country-container");
const flagContainer = document.querySelector(".flag-container");
const info = document.querySelector(".country-info-container");

fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((country) => {
      if (country.name == selectedCountry) {
        const img = document.createElement("img");
        img.src = country.flag;

        flagContainer.appendChild(img);

        var currencyString = "";
        if (country.currencies != undefined) {
          country.currencies.forEach((item) => {
            currencyString += `${item.name}, `;
          });
        } else {
          currencyString = "None  ";
        }

        var languageString = "";
        country.languages.forEach((item) => {
          languageString += `${item.name}, `;
        });

        var borderString = "";
        if (country.borders != undefined) {
          country.borders.forEach((border) => {
            data.forEach((countryS) => {
              if (countryS.alpha3Code == border) {
                borderString += `<button onclick="changeLocalStorage(event)">${countryS.name}</button>`;
                return;
              }
            });
          });
        } else {
          borderString = `<span style="margin-left:5px; font-size=15px;" >None</span>`;
        }

        info.innerHTML = `
        <h1>${country.name}</h1>
        <div class="list-container">
         <ul class="first-list">
            <li><span>Native Name:</span> ${country.nativeName}</li>
            <li><span>Population:</span> ${country.population.toLocaleString(
              "en-US"
            )}</li>
            <li><span>Region:</span> ${country.region}</li>
            <li><span>Sub Region:</span> ${country.subregion}</li>
            <li><span>Capital:</span> ${country.capital || "None"}</li>
         </ul>
         <ul>
            <li><span>Top Level Domain:</span> ${country.topLevelDomain}</li>
            <li><span>Currencies:</span> ${currencyString.slice(
              0,
              currencyString.length - 2
            )}</li>
            <li><span>Languages:</span> ${languageString.slice(
              0,
              languageString.length - 2
            )}</li>
         </ul>
        </div>
        <div class="border">
        <ul>
              <li><span>Border Countries: </span></li>
        </ul>
        ${borderString}
        </div>
        
        `;
      }
    });
  });

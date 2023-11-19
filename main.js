// COUNTRIES API -----------------------------------------------------------------------------------------------------------------------------------------------------------------------
const container = document.querySelector("#container");

fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((country) => {
      const div = document.createElement("div");
      const img = document.createElement("img");
      const infobox = document.createElement("div");

      const reg = country.region.toLowerCase().split(" ");
      div.classList.add("country-box", reg);

      img.src = country.flag;
      img.draggable = false;
      div.appendChild(img);

      infobox.classList.add("info-container");
      infobox.innerHTML = `
      <h2>${country.name}</h2>
      <p><span>Population: </span>${country.population.toLocaleString(
        "en-US"
      )}</p>
      <p><span>Region: </span>${country.region}</p>
      <p><span>Capital: </span>${
        country.capital == undefined ? "N/A" : country.capital
      }</p>
      `;

      div.appendChild(infobox);
      container.appendChild(div);
    });
  });

// SEARCH BAR ---------------------------------------------------------------------------------------------------------------------------------------------------------------------
var allCountries;
window.addEventListener("load", () => {
  const a = document.querySelectorAll(".country-box");
  return (allCountries = a);
});

const searchInput = document.querySelector("#searchinp");

searchInput.addEventListener("keyup", () => {
  allCountries.forEach((item) => {
    const textName = item.childNodes[1].childNodes[1].textContent.toLowerCase();
    if (
      textName.slice(0, searchInput.value.length) !=
      searchInput.value.toLowerCase()
    ) {
      item.classList.add("hidden2");
    } else {
      item.classList.remove("hidden2");
    }
  });
});

// FITER APPLY --------------------------------------------------------------------------------------------------------------------------------------------------------------------

const select = document.querySelector("#select-box");
const arrow = document.querySelector(".arrow-ic");

select.addEventListener("focus", () => {
  arrow.style.rotate = "0deg";
});
select.addEventListener("focusout", () => {
  arrow.style.rotate = "180deg";
});

select.onchange = () => {
  allCountries.forEach((country) => {
    if (select.value == "All") {
      country.classList.remove("hidden");
    } else if (select.value == "Africa") {
      country.classList[1] == "africa"
        ? country.classList.remove("hidden")
        : country.classList.add("hidden");
    } else if (select.value == "Europe") {
      country.classList[1] == "europe"
        ? country.classList.remove("hidden")
        : country.classList.add("hidden");
    } else if (select.value == "Asia") {
      country.classList[1] == "asia"
        ? country.classList.remove("hidden")
        : country.classList.add("hidden");
    } else if (select.value == "Americas") {
      country.classList[1] == "americas"
        ? country.classList.remove("hidden")
        : country.classList.add("hidden");
    } else if (select.value == "Oceania") {
      country.classList[1] == "oceania"
        ? country.classList.remove("hidden")
        : country.classList.add("hidden");
    }
  });
  select.blur();
};

// ON CLICK EVENT
var clickedCountry = (item) => {
  item.addEventListener("click", (event) => {
    window.location.href = "country-details.html";
    const cntrString =
      event.currentTarget.childNodes[1].childNodes[1].textContent;
    localStorage.setItem("selectedCountry", cntrString);
  });
};

window.addEventListener("load", () => {
  allCountries.forEach(clickedCountry);
});

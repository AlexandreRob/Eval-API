const url = "http://localhost:3000/pokemon";
let data = [];
let count = 2;
let sortMethod = "";

const idMain = document.getElementById("idMain");
const searchInput = document.getElementById("searchInput");
const inputRange = document.getElementById("inputRange");
const sortName = document.getElementById("sortName");

async function fetchData() {
  try {
    const req = await fetch(url);
    data = await req.json();
    // console.log(data);
    displayCard();
  } catch (error) {
    console.log(error);
  }
}

function displayCard() {
  idMain.innerHTML = "";

  copyPokedex = [...data];

  // Search by name
  if (searchInput.value) {
    copyPokedex = copyPokedex.filter((p) =>
      p.name.toLowerCase().includes(searchInput.value.toLowerCase())
    );
  }

  switch (sortMethod) {
    // Filter de A-Z
    case "sortNameAsc":
      copyPokedex = copyPokedex.sort((p1, p2) =>
        p1.name.localeCompare(p2.name)
      );
      break;

    // Filter de Z-A
    case "sortNameDesc":
      copyPokedex = copyPokedex.sort((p2, p1) =>
        p1.name.localeCompare(p2.name)
      );
      break;

    // Filter smallest to tallest
    case "sortHeightAsc":
      copyPokedex = copyPokedex.sort((p1, p2) => p1.height - p2.height);
      break;

    // Filter tallest to smallest
    case "sortHeightDesc":
      copyPokedex = copyPokedex.sort((p1, p2) => p2.height - p1.height);
      break;

    default:
      break;
  }

  copyPokedex.slice(0, count).forEach((p) => {
    idMain.innerHTML += `
  <div class="card-container">
        <div class="card-header">
          <h2>${p.name}</h2>
        </div>

        <img src="${p.image}" alt="" />

        <div class="card-info">
          <p>Type : ${p.type}</p>

          <p>Height : ${p.height}m</p>
        </div>
      </div>
  
  `;
  });
}

searchInput.addEventListener("input", () => {
  displayCard();
});

inputRange.addEventListener("input", () => {
  count = inputRange.value;
  displayCard();
});

sortName.addEventListener("change", () => {
  sortMethod = sortName.value;
  displayCard();
});

fetchData();

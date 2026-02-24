const params = new URLSearchParams(window.location.search);
const id = params.get("id");

fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(response => response.json())
    .then(data => {

        const container = document.getElementById("destination-container");


function createList(array, getName, getUrl) {
  return array
    .map(item => `
      <li>
        <a href="${getUrl(item)}" target="_blank">
          ${getName(item)}
        </a>
      </li>
    `)
    .join("");
}

        const abilitiesList = createList(
            data.abilities,
            item => item.ability.name,
            item => item.ability.url
        );

        const movesList = createList(
            data.moves,
            item => item.move.name,
            item => item.move.url
        );

        const formsList = createList(
            data.forms,
            item => item.name,
            item => item.url
        );

        container.innerHTML = `
      <h1>${data.name}</h1>
  <img src="${data.sprites.front_default}" />

  <h3>Abilities</h3>
  <ul>${abilitiesList}</ul>

  <h3>Moves</h3>
  <ul>${movesList}</ul>

  <h3>Forms</h3>
  <ul>${formsList}</ul>
    `;
    });
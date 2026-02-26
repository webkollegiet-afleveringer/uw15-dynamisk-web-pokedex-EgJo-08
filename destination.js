const params = new URLSearchParams(window.location.search);
const id = params.get("id");

fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  .then(res => res.json())
  .then(data => {

    
    return fetch(data.species.url)
      .then(res => res.json())
      .then(speciesData => ({ data, speciesData }));
  })
  .then(({ data, speciesData }) => {

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

    const typelist = createList(
      data.types,
      item => item.type.name,
      item => item.type.url
    );

    const formsList = createList(
      data.forms,
      item => item.name,
      item => item.url
    );

    const formattedId = String(id).padStart(3, "0");

    container.innerHTML = `
      <h1>${data.name}</h1>
      <img src="${data.sprites.front_default}" />
      <p id="number">#${formattedId}</p>

      <h3>Abilities</h3>
      <ul>${abilitiesList}</ul>

      <h3>Generation</h3>
      <p class = "big"> ${speciesData.generation.name}</p>

      <h3>Type</h3>
      <ul>${typelist}</ul>

      <h3>Weight</h3>
      <p>${data.weight} kg</p>

      <h3>Forms</h3>
      <ul>${formsList}</ul>
    `;
  });
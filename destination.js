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
    document.body.className = data.types[0].type.name;
    container.innerHTML = `
  <article class="pokemon-card">

    <div class="hero">
      <h1 class="name">${data.name}</h1>
      <span class="number">#${formattedId}</span>
      <img class="pokemon-img" src="${data.sprites.other['official-artwork'].front_default}" />
    </div>

    <div class="content">

      <div class="type-row">
        ${data.types.map(t => `
          <span class="type ${t.type.name}">
            ${t.type.name}
          </span>
        `).join("")}
      </div>

      <section class="info-block">
        <h3>About</h3>
        <div class="about-grid">
          <div>
            <span class="label">Weight</span>
            <span>${data.weight / 10} kg</span>
          </div>
          <div>
            <span class="label">Height</span>
            <span>${data.height / 10} m</span>
          </div>
          <div>
            <span class="label">Generation</span>
            <span class ="big">${speciesData.generation.name}</span>
          </div>
        </div>
      </section>

      <section class="info-block">
        <h3>Abilities</h3>
        <ul class="simple-list">${abilitiesList}</ul>
      </section>

      <section class="info-block">
        <h3>Forms</h3>
        <ul class="simple-list">${formsList}</ul>
      </section>

    </div>

  </article>
`;
  });
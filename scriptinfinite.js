const listElement = document.querySelector("#pokemon-list");

let offset = 0;
const limit = 20;
let loading = false;
let hasMore = true;
let allPokemon = [];
let searchMode = false;
let allLoaded = false;


function loadAllPokemon() {
    return fetch(`https://pokeapi.co/api/v2/pokemon?limit=100000`)
        .then(res => res.json())
        .then(data => {
            allPokemon = data.results;
            allLoaded = true;
        });
}

const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        } else {
            entry.target.classList.remove("visible");
        }
    });
}, {
    threshold: 0
});


const scrollObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !loading && hasMore) {
        loadPokemon();
    }
}, {
    threshold: 0
});


const sentinel = document.createElement("div");
sentinel.id = "scroll-trigger";
listElement.after(sentinel);
scrollObserver.observe(sentinel);
const artworkUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork"

function loadPokemon() {
    loading = true;

    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
        .then(res => res.json())
        .then(data => {

            if (data.results.length === 0) {
                hasMore = false;
                return;
            }

            data.results.forEach(pokemon => {

                const listitem = document.createElement("div");
                const id = pokemon.url.split("/").filter(Boolean).pop();
                const formattedId = String(id).padStart(3, "0");
                listitem.innerHTML = `
                    <div class="items">
                    <p class="number">#${formattedId}</p>
                    <img src="${artworkUrl}/${id}.png">
                        <h2>${pokemon.name}</h2>
                        <a href="destination.html?id=${id}">
                            Se mere om ${pokemon.name}
                        </a>
                    </div>
                `;

                listElement.appendChild(listitem);

                const item = listitem.querySelector(".items");
                animationObserver.observe(item);
            });

            offset += limit;
            loading = false;
        });
}


loadPokemon();



document.getElementById('searchbar').addEventListener('input', async function (event) {

    const searchTerm = event.target.value.toLowerCase();


    if (searchTerm.length > 0) {

        searchMode = true;


        scrollObserver.unobserve(sentinel);


        if (!allLoaded) {
            await loadAllPokemon();
        }


        listElement.innerHTML = "";


        const filtered = allPokemon.filter(pokemon =>
            pokemon.name.toLowerCase().includes(searchTerm)
        );

        filtered.forEach(pokemon => {

            const listitem = document.createElement("div");
            const id = pokemon.url.split("/").filter(Boolean).pop();
            const formattedId = String(id).padStart(3, "0");
            listitem.innerHTML = `
                <div class="items visible">
                      <p id="number">#${formattedId}</p>
                    <img src="${artworkUrl}/${id}.png">
                        <h2>${pokemon.name}</h2>
                        <a href="destination.html?id=${id}">
                            Se mere om ${pokemon.name}
                        </a>
                </div>
            `;

            listElement.appendChild(listitem);
        });

    } else {

        searchMode = false;

        listElement.innerHTML = "";
        offset = 0;
        hasMore = true;

        scrollObserver.observe(sentinel);
        loadPokemon();
    }
});
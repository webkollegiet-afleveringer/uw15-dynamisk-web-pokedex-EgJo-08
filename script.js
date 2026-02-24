const listElement = document.querySelector("#pokemon-list")

const url = new URL("https://pokeapi.co/api/v2/pokemon/")


fetch(url)
    .then(response => response.json())
    .then(data => data.results.forEach(pokemon => {

        const listitem = document.createElement("div")

        const id = pokemon.url.split("/").filter(Boolean).pop();

        listitem.innerHTML = `
        <div class = "items">
                <h2>${pokemon.name}</h2>
                <a href="destination.html?id=${id}">
                    Se mere
                </a>
            </div>`;

        listElement.appendChild(listitem);

    }));

document.getElementById('searchbar').addEventListener('input', function (event) {
    const searchTerm = event.target.value.toLowerCase();
    const listItems = document.querySelectorAll('.items');

    listItems.forEach(function (item) {
        const itemText = item.textContent.toLowerCase();

        if (itemText.includes(searchTerm)) {
            item.style.display = 'list-item';
        } else {
            item.style.display = 'none';
        }
    });
});
const listElement = document.querySelector("#pokemon-list");
const paginationElement = document.querySelector("#pagination");

const limit = 20;
let currentPage = 1;
let totalPages = 0;

function fetchPokemon(page) {
    const offset = (page - 1) * limit;
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            totalPages = Math.ceil(data.count / limit);

            listElement.innerHTML = ""; 

            data.results.forEach(pokemon => {

                const listitem = document.createElement("div");
                const id = pokemon.url.split("/").filter(Boolean).pop();

                listitem.innerHTML = `
                    <div class="items">
                        <h2>${pokemon.name}</h2>
                        <a href="destination.html?id=${id}">
                            Se mere
                        </a>
                    </div>`;

                listElement.appendChild(listitem);
            });

            createPagination();
        });
}

function createPagination() {
    paginationElement.innerHTML = "";


    const prevBtn = document.createElement("button");
    prevBtn.textContent = "Prev";
    prevBtn.disabled = currentPage === 1;
    prevBtn.onclick = () => {
        currentPage--;
        fetchPokemon(currentPage);
    };
    paginationElement.appendChild(prevBtn);

    
    const pageInfo = document.createElement("span");
    pageInfo.textContent = ` Page ${currentPage} of ${totalPages} `;
    paginationElement.appendChild(pageInfo);

    
    const nextBtn = document.createElement("button");
    nextBtn.textContent = "Next";
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.onclick = () => {
        currentPage++;
        fetchPokemon(currentPage);
    };
    paginationElement.appendChild(nextBtn);
}


fetchPokemon(currentPage);

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
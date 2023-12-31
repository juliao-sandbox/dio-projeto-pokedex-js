const pokemonList = document.getElementById('pokemon-list')
const loadMoreButton = document.getElementById('load-more')

const maxRecords = 151
const limit = 6
let offset = 0

function loadPokemonItems(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
            <a href="/detail.html?id=${pokemon.number}">
                <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>

                    <img src="${pokemon.picture}" alt="${pokemon.name}">
                </div>
                </li>
            </a>
        `).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordNextPage = offset + limit

    if (qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItems(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItems(offset, limit)
    }
})

loadPokemonItems(offset, limit)

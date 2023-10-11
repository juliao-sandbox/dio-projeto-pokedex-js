const pokemonElement = document.getElementById('pokemon')
const urlParams = new URLSearchParams(window.location.search)
pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${urlParams.get('id')}`

pokeApi.getPokemonDetail({url: pokemonUrl})
    .then((pokemon) => {
        const pokemonHtml = `
            <div class="bg-half-circle ${pokemon.type}"></div>
            <header>
                <div class="first-line">
                    <button class="go-back" onclick="history.back()">&lt;&lt; Voltar</button>
                </div>
                <span class="name">${pokemon.name} <span class="number">#${pokemon.number}</span></span>
                <img src="${pokemon.picture}" alt="${pokemon.name}">
                <span class="type ${pokemon.type}">${pokemon.type}</span>
            </header>

            <div class="info">
                <ol class="stats">
                    ${pokemon.stats.map((stat) => `
                    <li class="stat">
                        ${stat.name}: <progress class="${stat.value < 50 ? 'stat-low' : 'stat-high'}" max="100" value="${stat.value}">${stat.value}</progress>
                    </li>`).join('')}
                </ol>
            </div>
        `
        // debugger
        pokemonElement.innerHTML = pokemonHtml
    })



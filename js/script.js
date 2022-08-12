function pokemonDetail(url) {
    var image = document.getElementById("pokemon-image")
    var pokemonName = document.getElementById("pokemon-name")
    fetch(url)
        .then(resp => resp.json())
        .then(function (data) {
            image.src = data.sprites.other["official-artwork"].front_default
            pokemonName.innerHTML = `<h3>${data.name}</h3>`.toLocaleUpperCase()

            var table_ability = document.getElementById("table-ability");
            var tbody_ability = table_ability.getElementsByTagName("tbody")[0]
            tbody_ability.innerHTML = ""
            data.stats.forEach(element => {
                tbody_ability.innerHTML +=
                    `<tr><td>${element.stat.name}</td><td>${element.base_stat}</td></tr>`
            });
        })
}

document.addEventListener('DOMContentLoaded', () => {

    function createNode(element) {
        return document.createElement(element);
    }

    function append(parent, el) {
        return parent.appendChild(el);
    }

    const table = document.getElementById("table")
    var tbody = table.getElementsByTagName("tbody")[0]

    function loadPokemonList() {
        fetch('https://pokeapi.co/api/v2/pokemon/?limit=25')
            .then(resp => resp.json())
            .then(function (data) {
                data.results.forEach(pokemon => {
                    tbody.innerHTML +=
                        `<tr><td>${pokemon.name}</td><td><button onclick="pokemonDetail('${pokemon.url}')">Ver detalle</button></td>`
                });
                //document.getElementById("table-ability").style.display = "none";
            })
    }

    loadPokemonList()
})
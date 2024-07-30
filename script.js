const poke_container = document.getElementById('poke-container')
const pokemon_count = 10

const filter = document.getElementById('filter') 
const players = []

filter.addEventListener('input', (e) => 
    filterData(e.target.value))

const fetchPokemons = async () => {
    //const url = `https://drop-api.ea.com/rating/fc-24?locale=en&limit=100`
    const url = "https://23.218.63.125/rating/fc-24?locale=en&limit=100"
    
    const res = await fetch('./response.json');

    const data = await res.json()
    console.log(data.items)
    createPokemonCard(data.items)
}

const createPokemonCard = (pokemons) => {
    let pokemon = null
    for(let i = 0; i < pokemons.length; i++) {
        pokemon = pokemons[i]

        const pokemonEl = document.createElement('div')
        pokemonEl.classList.add('pokemon')
        
        players.push(pokemonEl)

        const age = calculateAge(pokemon.birthdate)

        const pokemonInnerHtml = `
            <div class="ratings">
                <span class="overall">${pokemon.rank}</span>
                <span class="flag">
                    <img src="${pokemon.nationality.imageUrl}" style="width: 34px; height: 34px;"  alt="">
                </span>
            </div>
            <div style="text-align:left; font-size: small">
                <small>${pokemon.position.label}</small>
            </div>

            <div class="info">
            <div class="img-container">
                <img src="${pokemon.avatarUrl}" alt="">
            </div>
                <p style="margin:0;font-size: x-small;">Overall</p>
                <p class="number">${pokemon.overallRating}</p>
                <h3 class="name"><small>${pokemon.firstName}</small> ${pokemon.lastName}</h3>
                <p class="league">${pokemon.leagueName} - ${pokemon.team.label}</p>
            </div>
            <br>
            <div class="player-info">
                <table style="width: 100%; font-size: x-small; padding: 2px; text-align: center;">
                    <thead>
                        <tr>
                            <th>Age</th>
                            <th>Height</th>
                            <th>Weight</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>${age}</td>
                            <td>${pokemon.height}cm</td>    
                            <td>${pokemon.weight}kg</td>    
                        </tr>
                    </tbody>
                    <table class="table table-dark" style="font-size: x-small; padding: 3px;">
                        <thead>
                            <tr>
                                <th>PAC</th><th>SHO</th><th>PAS</th><th>DRI</th><th>DEF</th><th>PHY</th>                        
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>${pokemon.stats.pac.value}</td>    
                                <td>${pokemon.stats.sho.value}</td>    
                                <td>${pokemon.stats.pas.value}</td>    
                                <td>${pokemon.stats.dri.value}</td>    
                                <td>${pokemon.stats.def.value}</td>    
                                <td>${pokemon.stats.phy.value}</td>    
                            </tr>
                        </tbody>
                </table>
    
            </div> 
        `

        pokemonEl.innerHTML = pokemonInnerHtml

        poke_container.appendChild(pokemonEl)
    }
}

function calculateAge(birthDateString) {
    // Parse the birth date string into a Date object
    const birthDate = new Date(birthDateString);
    
    // Get the current date
    const currentDate = new Date();
    
    // Calculate the difference in years
    let age = currentDate.getFullYear() - birthDate.getFullYear();
    
    // Adjust age if the birth date has not occurred yet this year
    const currentMonth = currentDate.getMonth();
    const birthMonth = birthDate.getMonth();
    const currentDay = currentDate.getDate();
    const birthDay = birthDate.getDate();

    if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) {
        age--;
    }

    return age;
}

function filterData(searchTerm) {
    players.forEach(element => {
        var names = element.querySelectorAll('h3.name')
        
        names.forEach(name => {
            if(name.innerText.toLowerCase().includes(searchTerm.toLowerCase())) {
                element.classList.remove('hide')
            } else {
                element.classList.add('hide')
            }    
        });
    });
}

fetchPokemons()
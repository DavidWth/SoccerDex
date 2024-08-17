const poke_container = document.getElementById('poke-container')
const pokemon_count = 10

const filter = document.getElementById('filter') 
const players = []

var top_5_players_overall = []

var overall = 0; // Example value

// Function to dynamically load the variable into the HTML
function countPlayers() {
    var allVisiblePlayers = document.querySelectorAll('div.pokemon:not(.hide)')

    overall = allVisiblePlayers.length 
    console.log("Overall " + allVisiblePlayers.length)

    var overallElement = document.getElementById('overall');
    if (overallElement) {
        overallElement.textContent = overall;
    }
}

function countAvgOverall() {
    var allPlayers = document.querySelectorAll('div.pokemon:not(.hide)')
    
    // Initialize an empty object to store the counts
    var avgOverall = 0;

    // Iterate through the elements array
    allPlayers.forEach(element => {
        var overallTag = element.querySelector('p.number')

        // Get the inner text of the current element
        const overall = parseInt(overallTag.innerText, 10)
            
        // If the text is already in the object, increment its count
        avgOverall += overall
    });


    var avgOverallTag = document.getElementById('overallTotal');
    if (avgOverallTag) {
        if(allPlayers.length == 0) {
            avgOverallTag.textContent = 0
        } else {
            avgOverallTag.textContent = parseInt(avgOverall / allPlayers.length, 10);
        }
    }
    console.log(avgOverall)
}

function countAvgAge() {
    var allPlayers = document.querySelectorAll('div.pokemon:not(.hide)')
    
    // Initialize an empty object to store the counts
    var avgAge = 0;

    // Iterate through the elements array
    allPlayers.forEach(element => {
        var ageTag = element.querySelector('span.age')

        // Get the inner text of the current element
        const age = parseInt(ageTag.innerText, 10)
            
        // If the text is already in the object, increment its count
        avgAge += age
    });


    var avgAgeTag = document.getElementById('avgAge');
    if (avgAgeTag) {
        if(allPlayers.length == 0) {
            avgAgeTag.textContent = 0
        } else {
            avgAgeTag.textContent = parseInt(avgAge / allPlayers.length, 10);
        }
    }
    console.log(avgAge)
}

function countAvgBody() {
    var allPlayers = document.querySelectorAll('div.pokemon:not(.hide)')
    
    // Initialize an empty object to store the counts
    var avgHeight = 0;
    var avgWeight = 0;

    // Iterate through the elements array
    allPlayers.forEach(element => {
        var heightTag = element.querySelector('span.height')
        var weightTag = element.querySelector('span.weight')

        // Get the inner text of the current element
        const height = parseInt(heightTag.innerText, 10)
        // Get the inner text of the current element
        const weight = parseInt(weightTag.innerText, 10)
            
        // If the text is already in the object, increment its count
        avgHeight += height
        avgWeight += weight
    });


    var avgHeightTag = document.getElementById('avgHeight');
    var avgWeightTag = document.getElementById('avgWeight');
    if (avgHeightTag) {
        if(allPlayers.length == 0) {
            avgHeightTag.textContent = 0
            avgWeightTag.textContent = 0
        } else {
            avgWeightTag.textContent = parseInt(avgWeight / allPlayers.length, 10);
            avgHeightTag.textContent = parseInt(avgHeight / allPlayers.length, 10);
        }
    }
    console.log(avgHeightTag + "::" + avgWeightTag)
}

function countTeams() {
    var allPlayers = document.querySelectorAll('div.pokemon:not(.hide)')
    

    // Initialize an empty object to store the counts
    const textCounts = {};

    // Iterate through the elements array
    allPlayers.forEach(element => {
        var team = element.querySelector('span.team')

        // Get the inner text of the current element
        const text = team.innerText;
            
        // If the text is already in the object, increment its count
        if (textCounts[text]) {
            textCounts[text]++;
        } else {
            // If the text is not in the object, add it with a count of 1
            textCounts[text] = 1;
        }
    });

    var teams = document.getElementById('teams');
    if (teams) {
        teams.textContent = Object.keys(textCounts).length;
    }
}



filter.addEventListener('input', (e) => 
    filterData(e.target.value))

const fetchPokemons = async () => {
    //const url = `https://drop-api.ea.com/rating/fc-24?locale=en&limit=100`
    const url = "https://23.218.63.125/rating/fc-24?locale=en&limit=100"
    
    const res = await fetch('./response.json');

    const data = await res.json()
    console.log(data.items)
    createPokemonCard(data.items)

    console.log(getTopPlayers(data.items))
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
                <h4 class="name"><small>${pokemon.firstName}</small> ${pokemon.lastName}</h4>
                <p class="league">${pokemon.leagueName} - <span class='team'>${pokemon.team.label}</span></p>
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
                            <td><span class='age'>${age}</span></td>
                            <td><span class='height'>${pokemon.height}</span>cm</td>    
                            <td><span class='weight'>${pokemon.weight}</span>kg</td>    
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

    countPlayers()
    countTeams()
    countAvgOverall()
    countAvgAge()
    countAvgBody()
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
    console.log(searchTerm)
    players.forEach(element => {
        var namesNl = element.querySelectorAll('h4.name')
        var teamsNl = element.querySelectorAll('span.team')

        const combined = namesNl[0].innerText + " " + teamsNl[0].innerText

        if(combined.toLowerCase().includes(searchTerm.toLowerCase())) {
            element.classList.remove('hide')
        } else {
            element.classList.add('hide')
        }    
    });

    countPlayers()
    countTeams()
    countAvgOverall()
    countAvgAge()
    countAvgBody()
}

// Function to calculate the average of additional attributes
function calculateAverage(player) {
    return (player.stats.pac.value + player.stats.sho.value + player.stats.pas.value + player.stats.dri.value + player.stats.def.value + player.stats.phy.value) / 6;
}

// Function to get the top 5 players based on overall and average of other attributes
function getTopPlayers(players) {
    // Sort players by overall value, and by average of other attributes if overall is the same
    players.sort((a, b) => {
        if (b.overallRating !== a.overallRating) {
            return b.overallRating - a.overallRating;
        } else {
            return calculateAverage(b) - calculateAverage(a);
        }
    });

    // Get the top 5 players
    return players.slice(0, 5).map(player => ({
        name: player.firstName + " " + player.lastName, // ${pokemon.firstName}</small> ${pokemon.lastName}
        overall: player.overallRating
    }));
}


fetchPokemons()
// Call the function when the script is loaded (optional)
// document.addEventListener('DOMContentLoaded', loadOverall);
/* Global Variables Used */
let pokemonList = [];
const categoryList = [];

/* Pokemon Class with relevant detail */
class Pokemon{
    constructor(name, imageUrl, types, stats){
        this.name = name;
        this.imageUrl = imageUrl;
        this.types = types;
        this.stats = stats;
    }
}

/* Updating Stats - The bar in particular card section */
function UpdateStats(pokemon){
    const statsHTML = document.getElementsByClassName('stat-item');
    for(let i=0;i<6;i++){
        let innerBar = statsHTML[i].getElementsByClassName('inner-bar')[0];
        innerBar.style.width = `min(${pokemon.stats[i].base_stat}%, 100%)`;
    }
}

/* Setting Up Click Listeners */ 
function SetUpClickListeners(){
    // Click listeners for pokemon card
    const pokemonItemCard = Array.from(document.getElementsByClassName('pokemon-card'));
    for(let i=0;i<pokemonItemCard.length;i++){
        pokemonItemCard[i].addEventListener('click', HandleItemClick);
    }

    // Click listeners for Close button in a particular card section
    const closeBtn = document.getElementById('close-btn');
    closeBtn.addEventListener('click', CloseBtnClick);

    // Click listeners for category chips 
    const categoryChips =  document.getElementsByClassName('categories')[0].getElementsByTagName('span');
    for(let chip of categoryChips){
        chip.addEventListener('click', ChipClicked);
    }

    // Click listeners for search button
    const searchBtn = document.getElementById('search-btn');
    searchBtn.addEventListener('click', SearchBtnClicked);
}

/* Searching a pokemon by name */
// When search button is clicked
function SearchBtnClicked(){
    let pokeName = document.getElementsByTagName('input')[0].value.toLowerCase();
    DisplayByName(pokeName);
}
// Displays the searched pokemon card
function DisplayByName(pokeName){
    for(pokemon of pokemonList){
        if(pokemon.name == pokeName){
            pokemonList = [];
            pokemonList.push(pokemon);
            const pokemonContainer = document.getElementById('pokemon-list');
            pokemonContainer.innerHTML = '';

            let typeListHtml = '';
            for (type of pokemon.types) {
              type = type.type.name;
              typeListHtml += `<li class="${type}">${type}</li>`;
            }

            pokemonContainer.innerHTML += `
              <div class='pokemon-card'>
                <img src='${pokemon.imageUrl}' alt="">
                <h3>${pokemon.name}</h3>
                <ul>${typeListHtml}</ul>
              </div>`;
            
            SetUpClickListeners();
            return;
        }
    }

    // Pokemon not found
    NotFound();     // display message
    main();     // Display default pokemons
}
// When a pokemon is not found - displays a not found messge
function NotFound(){
    const errorDiv = document.getElementsByClassName('error-msg')[0];
    errorDiv.removeAttribute("hidden");

    setTimeout(function() {
        errorDiv.setAttribute("hidden", true);
      }, 3000);
}

/* Displaying pokemons only with the selected categories */
// When a chip is clicked
function ChipClicked(event){
    // When Selected
    if(event.target.getAttribute('isSelected') == 'false'){
        event.target.style.opacity = '1';
        event.target.setAttribute('isSelected', 'true');
        categoryList.push(event.target.classList.value);
    }
    // When removed
    else{
        event.target.style.opacity = '0.6';
        let index = categoryList.indexOf(event.target.classList.value);
        categoryList.splice(index, 1);
        event.target.setAttribute('isSelected', 'false');
    }
    UpdateCategory();
}
// Update pokemon list with selected categories
async function UpdateCategory(){
    const pokemonContainer = document.getElementById('pokemon-list');
    pokemonContainer.innerHTML = '';

    if(categoryList.length == 0){
        main();
        return;
    }

    let tempPokeList = pokemonList;
    pokemonList = [];
    for(let poke of tempPokeList){
        for(type of poke.types){
            if(categoryList.includes(type.type.name)){
                pokemonList.push(poke);
            }
        }
    }
    
    for(let poke of pokemonList){
        let typeListHtml = '';
            for (type of poke.types) {
              type = type.type.name;
              typeListHtml += `<li class="${type}">${type}</li>`;
            }

            pokemonContainer.innerHTML += `
              <div class='pokemon-card'>
                <img src='${poke.imageUrl}' alt="">
                <h3>${poke.name}</h3>
                <ul>${typeListHtml}</ul>
              </div>`;
    }
    SetUpClickListeners();
}

/* When close button is clicked in particular card section */
function CloseBtnClick(event){
    let section = document.getElementsByClassName('particular-pokemon-section')[0];
    let sectionContainer = document.getElementsByClassName('section-container')[0];
    section.setAttribute("hidden", true);
    sectionContainer.setAttribute("hidden", true);
}

/* When pokemon card is clicked */
function HandleItemClick(event){
    let pokemonListHTML = Array.from(document.getElementsByClassName('pokemon-card'));

    // Displaying the particular pokemon section and card
    let section = document.getElementsByClassName('particular-pokemon-section')[0];
    let sectionContainer = document.getElementsByClassName('section-container')[0];
    section.removeAttribute("hidden");
    sectionContainer.removeAttribute("hidden");

    // Getting only the pokemon card when clicked
    const clickedItem = event.target.closest('.pokemon-card');
    const clickedPoke = pokemonList[pokemonListHTML.indexOf(clickedItem)];

    const particularPokeSection = document.getElementsByClassName('particular-pokemon-section')[0];
    // Used to add types of a pokemon
    let typeListHtml = "";
    for (type of clickedPoke.types) {
        type = type.type.name;
        typeListHtml += `<li class="${type}">${type}</li>`;
    }

    // HTML format for the particular pokemon card
    const particularPokeCardHtml = `
    <div class="particular-pokemon-card">
    <div class="name">
        <h1>${clickedPoke.name}</h1>
    </div>
    <div class="img">
        <img src="${clickedPoke.imageUrl}" alt="">
    </div>
    <div class="types">
        <ul>
            ${typeListHtml}
        </ul>
    </div>
    <div class="stats">
        <div class="stat-item">
            <h3>HP</h3>
            <p>${clickedPoke.stats[0].base_stat}</p>
            <div class="stat-bar">
                <div class="outer-bar">
                    <div class="inner-bar"></div>
                </div>
            </div>
        </div>
        <div class="stat-item">
            <h3>ATK</h3>
            <p>${clickedPoke.stats[1].base_stat}</p>
            <div class="stat-bar">
                <div class="outer-bar">
                    <div class="inner-bar"></div>
                </div>
            </div>
        </div>
        <div class="stat-item">
            <h3>DEF</h3>
            <p>${clickedPoke.stats[2].base_stat}</p>
            <div class="stat-bar">
                <div class="outer-bar">
                    <div class="inner-bar"></div>
                </div>
            </div>
        </div>
        <div class="stat-item">
            <h3>SATK</h3>
            <p>${clickedPoke.stats[3].base_stat}</p>
            <div class="stat-bar">
                <div class="outer-bar">
                    <div class="inner-bar"></div>
                </div>
            </div>
        </div>
        <div class="stat-item">
            <h3>SDEF</h3>
            <p>${clickedPoke.stats[4].base_stat}</p>
            <div class="stat-bar">
                <div class="outer-bar">
                    <div class="inner-bar"></div>
                </div>
            </div>
        </div>
        <div class="stat-item">
            <h3>SPD</h3>
            <p>${clickedPoke.stats[5].base_stat}</p>
            <div class="stat-bar">
                <div class="outer-bar">
                    <div class="inner-bar"></div>
                </div>
            </div>
        </div>
    </div>
</div>`;

// Removing any previous card
if(particularPokeSection.getElementsByClassName('particular-pokemon-card')[0]){
    particularPokeSection.getElementsByClassName('particular-pokemon-card')[0].remove();
}

particularPokeSection.innerHTML += particularPokeCardHtml;

// updating stats
UpdateStats(clickedPoke);

// Background Color based on pokemon type
let mainColor = clickedPoke.types[0].type.name;
document.getElementsByClassName('particular-pokemon-section')[0].classList.add(mainColor);

// Removing any previous type class
for(let i of document.getElementsByClassName('particular-pokemon-section')[0].classList){
    if(i == "particular-pokemon-section" || i == mainColor){
        continue;
    }
    else{
        document.getElementsByClassName('particular-pokemon-section')[0].classList.remove(i);
    }
}
}

/* Getting Pokemons from PokeAPI */
function GetPokeData() {
    return new Promise((resolve, reject) => {
      const promises = [];
      pokemonList = [];
  
      for (let i = 1; i <= 250; i++) {
        const promise = fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
          .then(response => response.json())
          .then(data => {
            const name = data.name;
            const imageUrl = data.sprites.other.home.front_default;
            const typesList = data.types;
            const stats = data.stats;

            let pokemon = new Pokemon(name, imageUrl, typesList, stats);


            let typeListHtml = '';
            for (type of pokemon.types) {
              type = type.type.name;
              typeListHtml += `<li class="${type}">${type}</li>`;
            }

  
            const pokemonContainer = document.getElementById('pokemon-list');
            pokemonContainer.innerHTML += `
              <div class='pokemon-card'>
                <img src='${pokemon.imageUrl}' alt="">
                <h3>${pokemon.name}</h3>
                <ul>${typeListHtml}</ul>
              </div>`;
  
            pokemonList.push(pokemon);

          })
          .catch(error => {
            console.error('Error: ', error);
          });
  
        promises.push(promise);
      }
  
      Promise.all(promises)
        .then(() => {
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  
/* Driver Function */
async function main() {
    await GetPokeData();
    SetUpClickListeners();
}

// Calling driver function
main();
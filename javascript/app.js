class getPokemonStats {
    constructor(name, hp, sprite, gender) {
        this.name = name;
        this.currentHp = hp;
        this.hp = hp;
        this.sprite = sprite;
        this.gender = gender;
        this.attack1 = '';
        this.attack2 = '';
        this.attack3 = '';
        this.attack4 = '';
    }
}


const getRandomGender = () => {
    if( Math.random() < 0.5) {
        return 'img/female.png';
    }
    else {
        return 'img/male.png';
    }
}


const getRandomId = () => {
    let randPokemon = Math.floor(Math.random() * Math.floor(803));
    return randPokemon;
}


const getCapitalizedName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
}


const makePokemon = (randomId, div) => {
    const $container = $(div);
    $.ajax({
        url: `https://pokeapi.co/api/v2/pokemon/${randomId}/`,
        type: "GET",
    }).done(function(data) {
        const pokemon = new getPokemonStats(data.name, data.stats[5].base_stat, data.sprites.front_default, getRandomGender());

        const team = $("<div class = 'pokemonBox'>"); 
        const sprite = $(`<img src = ${pokemon.sprite} class = 'sprite'>`);

        const name = $("<p class = 'pokemonName'>");
        const gender = $(`<img src = '${pokemon.gender}' class = 'gender'>`);

        const healthBar = $("<div class = 'health-bar'></div>");
        const health = $("<p class = 'health'>");
        health.text(`${pokemon.currentHp}/${pokemon.hp}`);
        name.text(getCapitalizedName(pokemon.name));

        $container.append(team);
        team.append(sprite);
        team.append(name);
        team.append(gender);
        team.append(healthBar);
        team.append(health);

    })
}


const makePokemonRow = () => {
    for(i = 0; i < 2; i++) {
        const randomId = getRandomId();
        makePokemon(randomId);  
    }
}


const makeTeam = (teamNum) => {
    for(i = 0; i < 3; i++) {
        const div = $(`<div class = 'row${i}'>`);
        console.log(i)
        $(`#team${teamNum}`).append(div);
        for(j = 0; j < 2; j++) {
            const randomId = getRandomId();
            makePokemon(randomId, div);  
        }
    }
}


$(() => {

    $('#create').on('click', (event) => {
        makeTeam(1);
        makeTeam(2);
    });
});
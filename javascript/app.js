class getPokemonStats {
    constructor(name, hp, sprite, backSprite, gender, id) {
        this.name = name;
        this.currentHp = hp;
        this.hp = hp;
        this.sprite = sprite;
        this.backSprite = backSprite;
        this.gender = gender;
        this.id = id;
        this.attack1 = '';
        this.attack2 = '';
        this.attack3 = '';
        this.attack4 = '';
    }
}

const pokemonList = [];
const yourPokemon = [];
const oppPokemon = [];

const getRandomGender = () => {
    if( Math.random() < 0.5) {
        return 'img/female.png';
    }
    else {
        return 'img/male.png';
    }
}

/* GETS RANDOM NUMBER BETWEEN 1 803 TO GET A RANDOM POKEMON */
const getRandomId = () => {
    let randPokemon = (Math.floor(Math.random() * Math.floor(802)) + 1);
    return randPokemon;
}

const getCapitalizedName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
}

/* TO ACCESS THE ACTUAL MAKING OF POKEMON AND WHERE THE DATA IS ACTUALLY GRABBED */
const makePokemon = (randomId, div, pokemonBox) => {

    $.ajax({
        url: `https://pokeapi.co/api/v2/pokemon/${randomId}/`,
        type: "GET",
    }).done(function(data) {

        const pokemon = new getPokemonStats(
            data.name, 
            data.stats[5].base_stat, 
            data.sprites.front_default, 
            data.sprites.back_default, 
            getRandomGender(), 
            data.id
        );
        
        pokemonList.push(pokemon);
        appendBox(pokemon, pokemonBox, div);

    });
}

const appendBox = (pokemon, pokemonBox, div) => {
        const $container = $(div);
        const team = $(`<div class = '${pokemonBox}'>`); 
        const sprite = $(`<img src = ${pokemon.sprite} class = 'sprite'>`);

        const name = $("<p class = 'pokemonName'>");
        const gender = $(`<img src = '${pokemon.gender}' class = 'gender'>`);

        const healthBar = $("<div class = 'health-bar'>");

        const health = $("<p class = 'health'>");
        health.text(`${pokemon.currentHp}/${pokemon.hp}`);

        const pokemonId = $("<p class = 'pokemonId'>");
        pokemonId.text(`${pokemon.id}`);

        name.text(getCapitalizedName(pokemon.name));

        $container.append(team);
        team.append(sprite);
        team.append(name);
        team.append(gender);
        team.append(pokemonId);
        pokemonId.hide();
        team.append(healthBar);
        team.append(health);
}

const makePokemonRow = () => {
    for(i = 0; i < 2; i++) {
        const randomId = getRandomId();
        makePokemon(randomId);  
    }
}

const makeTeam = (teamNum) => {

    if(teamNum === 1) {
        const playerTeam = $("<h1 class = 'teamH1'>");
        const e = '\u00E9';
        playerTeam.text(`Select a Pok${e}mon!`);
        $('#team1').append(playerTeam);
    }
    else if(teamNum === 2) {
        const compTeam = $("<h1 class = 'teamH1'>");
        const e = '\u00E9';
        compTeam.text(`Your opponent\'s Pok${e}mon!`);
        $('#team2').append(compTeam);
    }

    const box = 'pokemonBox';
    const pokemonBox = (box.concat('', teamNum.toString()));

    for(i = 0; i < 3; i++) {
        const div = $(`<div class = 'row${i}'>`);
        $(`#team${teamNum}`).append(div);

        for(j = 0; j < 2; j++) {
            const randomId = getRandomId();
            makePokemon(randomId, div, pokemonBox);
        }
    }
}

const scrollWindow = (id) => {
    event.preventDefault();
    $('html, body').animate({
        scrollTop: $(id).offset().top}, 1500);
}

const createPlayerBattleCard = (img) => {
    const battleCard = $("<div class = 'battleCard'>");
    const p = $('<p>');
    const sprite = $(`<img src='${img}'>`);
    p.text('PLAYER BATTLECARD');
    battleCard.append(p);
    battleCard.append(sprite)
    $('#battleContainer').append(battleCard);
}

const createOppBattleCard = () => {
    const battleCard = $("<div class = 'battleCard'>");
    const p = $('<p>');
    p.text('OPPONENT BATTLECARD');
    battleCard.append(p);
    $('#battleContainer').append(battleCard);
}




/* START OF JQUERY */

$(() => {

    $('#create').on('click', (event) => {
        scrollWindow($('#scroll'));
        $('#team1').empty();
        $('#team2').empty();
        makeTeam(1);
        makeTeam(2);
        $('.confirmDiv').empty();
    });

    $('body').on('click', '.pokemonBox1', (event) => {

        console.log(pokemonList);

        $('.pokemonBox1').css('border', '0.20em solid green');
        $(event.currentTarget).css('border', '0.20em solid lime');

        const confirm = $("<button id = 'confirm'>");
        confirm.text('Confirm');

        $('.confirmDiv').empty();
        $('.confirmDiv').append(confirm);
        selectedPokemon = $(event.currentTarget);

        console.log(selectedPokemon);
        // console.log(selectedPokemon);
        scrollWindow(confirm);

    });

     $('body').on('click', '.confirmDiv', (event) => {

        console.log(selectedPokemon);
    });
});
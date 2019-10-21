class getPokemonStats {
    constructor(name, hp, sprite, backSprite, gender, id) {
        this.name = name;
        this.id = id;
        this.currentHp = hp;
        this.hp = hp;
        this.sprite = sprite;
        this.backSprite = backSprite;
        this.gender = gender;
        this.attack1 = [2, 3, 15];
        this.attack2 = [5, 6, 10];
        this.attack3 = [8];
        this.attack4 = [7, 9];
    }
}

const yourList = [];
const oppList =[];

const selectedPokemon = [];
const oppSelectedPokemon = [];

const yourSelectedId = [];

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

const scrollWindow = (id) => {
    event.preventDefault();
    $('html, body').animate({
        scrollTop: $(id).offset().top}, 1500);
}

const appendBox = (pokemon, pokemonBox, div, count) => {

    const $container = $(div);
    const team = $(`<div class = '${pokemonBox}'>`); 

    const name = $("<p class = 'pokemonName'>");
    const sprite = $(`<img src = ${pokemon.sprite} class = 'sprite'>`);
    const gender = $(`<img src = '${pokemon.gender}' class = 'gender'>`);
    const healthBar = $("<div class = 'healthBar'>");

    const health = $("<p class = 'health'>");
    health.text(`${pokemon.currentHp}/${pokemon.hp}`);

    name.text(getCapitalizedName(pokemon.name));

    $container.append(team);
    team.append(sprite);
    team.append(name);
    team.append(gender);

    team.append(healthBar);
    team.append(health);

    team.attr('id', pokemon.id);

}

/* TO ACCESS THE ACTUAL MAKING OF POKEMON AND WHERE THE DATA IS ACTUALLY GRABBED */
const makePokemon = (randomId, div, pokemonBox, count, arrayName) => {

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

        arrayName.push(pokemon);
        appendBox(pokemon, pokemonBox, div, count);

    });

};

const makeTeam = (teamNum, count, arrayName) => {


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
            makePokemon(randomId, div, pokemonBox, count, arrayName);
            count++;

        }
    }
}

const oppPokemon = () => {

    const rand = Math.floor(Math.random() * 6);
    const opp = oppList[rand].id;

    for(i = 0; i < oppList.length; i++) {
        if(oppList[i].id === opp) {
            oppSelectedPokemon.push(oppList[i])
        }
    }
}

const yourPokemon = () => {

    for(i = 0; i < yourList.length; i++) {
        if(yourList[i].id === yourSelectedId[0]) {
            selectedPokemon.push(yourList[i]);
        }
    }
}

const playAudio = () => {
    const audio = document.getElementById('audio');
    audio.play();
}

const createPlayerBattleCard = () => {

    const playerBattle = $("<div class = 'playerBattle' id = 'card2'>");

    const spriteDiv = $("<div class = 'spriteDiv left'>");
    const battleCard = $("<div class = 'battleCard right' id = 'bottomSide'>");
    const backSprite = $(`<img src='${selectedPokemon[0].backSprite}' id = 'yourSprite'>`);
    const name = $("<p class = 'battleCardName'>");
    const gender = $(`<img src = '${selectedPokemon[0].gender}'>`);
    const lvl = $("<p class = 'lvl'>");
    const healthBar = $("<div class = 'currentHealthBar'>");
    const health = $("<p class = 'currentHealth'>");

    name.text(selectedPokemon[0].name.toUpperCase());
    health.text(`${selectedPokemon[0].currentHp}/${selectedPokemon[0].hp}`);

    lvl.text('Lv99');

    battleCard.append(name);
    battleCard.append(gender);
    battleCard.append(lvl);    
    battleCard.append(healthBar);
    battleCard.append(health);

    spriteDiv.append(backSprite);

    $(playerBattle).append(spriteDiv);
    $(playerBattle).append(battleCard);
    $('#battleContainer').append(playerBattle)
}

const createOppBattleCard = () => {
    
    const oppBattle = $("<div class = 'playerBattle' id = 'card1'>");

    const spriteDiv = $("<div class = 'spriteDiv right'>");
    const battleCard = $("<div class = 'battleCard left' id = 'topSide'>");
    const sprite = $(`<img src='${oppSelectedPokemon[0].sprite}' id = 'oppSprite'>`);
    const name = $("<p class = 'battleCardName'>");
    const gender = $(`<img src = '${oppSelectedPokemon[0].gender}'>`);
    const lvl = $("<p class = 'lvl'>");
    const healthBar = $("<div class = 'currentHealthBar'>");

    name.text(oppSelectedPokemon[0].name.toUpperCase());

    lvl.text('Lv99');

    battleCard.append(name);
    battleCard.append(gender);
    battleCard.append(lvl);
    battleCard.append(healthBar);

    
    spriteDiv.append(sprite);

    $(oppBattle).append(battleCard);
    $(oppBattle).append(spriteDiv);
    $('#battleContainer').append(oppBattle)
    

}


/* START OF JQUERY */


$(() => {

    $('#create').on('click', (event) => {

        scrollWindow($('#scroll'));
        $('#team1').empty();
        $('#team2').empty();
        makeTeam(1, 0, yourList);
        makeTeam(2, 6, oppList);
        $('.confirmDiv').empty();

    });

    $('body').on('click', '.pokemonBox1', (event) => {

        $('.pokemonBox1').css('border', '0.20em solid green');
        $(event.currentTarget).css('border', '0.20em solid lime');

        const confirm = $("<button id = 'confirm'>");
        confirm.text('Confirm');

        $('.confirmDiv').empty();
        $('.confirmDiv').append(confirm);

        yourSelectedId.shift();
        yourSelectedId.push(parseInt(event.currentTarget.getAttribute('id')));

        scrollWindow(confirm);

    });

    $('body').on('click', '.confirmDiv', (event) => {

        yourPokemon();
        oppPokemon();

        // playAudio();

        console.log(selectedPokemon);
        console.log(oppSelectedPokemon);

        createOppBattleCard();
        createPlayerBattleCard();

        const bar = $("<div class = 'bar'>");
        const leftBorder = $("<div class = 'leftBorder'>");
        const leftBar = $("<div class = 'leftBar'>");
        const rightBar = $("<div class = 'rightBar'>");
        const rightBorder = $("<div class = 'rightBorder'>");
        const battleContainer = $('#battleContainer');

        const leftP = $('<p>');
        const leftP2 = $('<p>');

        const rightP = $('<p>');

        leftP.text('What will');
        leftP2.text(`${selectedPokemon[0].name.toUpperCase()} do?`);

        rightP.text('FIGHT');

        $(leftBar).append(leftP);
        $(leftBar).append(leftP2);
        $(rightBar).append(rightP);

        $(leftBorder).append(leftBar);
        $(rightBorder).append(rightBar);

        $(bar).append(leftBorder);
        $(bar).append(rightBorder);

        $(battleContainer).append(bar);
        setTimeout(scrollWindow(bar), 5000);


    });
});
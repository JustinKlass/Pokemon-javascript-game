class getPokemonStats {
    constructor(name, hp, sprite, backSprite, gender, id, attack1, attack2, attack3, attack4) {
        this.name = name;
        this.id = id;
        this.currentHp = hp;
        this.hp = hp;
        this.sprite = sprite;
        this.backSprite = backSprite;
        this.gender = gender;
        this.attack1 = [attack1, 20, 40, 60];
        this.attack2 = [attack2, 5, 10, 20];
        this.attack3 = [attack3, 5, 10, 20];
        this.attack4 = [attack4, 5, 10, 20];
    }
}

const yourList = [];
const oppList =[];

let selectedPokemon = [];
let oppSelectedPokemon = [];

const yourSelectedId = [];
let gameOver = 1;

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

const scrollWindow = (id, time) => {
    event.preventDefault();
    $('html, body').animate({
        scrollTop: $(id).offset().top}, time);
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
            data.id,
            data.moves[0].move.name,
            data.moves[1].move.name,
            data.moves[2].move.name,
            data.moves[3].move.name
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
    const audioTag = $("<audio src='../audio/pokemon-battle.mp3' id='audio'>");
    $('#battleContainer').append(audioTag);
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
    const backHealthBar = $("<div class = 'currentHealthBar'>");
    const healthBar = $("<div id = 'playerUpdatedHealthBar'>");
    const health = $("<p class = 'currentHealth'>");

    name.text(selectedPokemon[0].name.toUpperCase());
    health.text(`${selectedPokemon[0].currentHp}/${selectedPokemon[0].hp}`);

    lvl.text('Lv99');

    backHealthBar.append(healthBar);
    battleCard.append(name);
    battleCard.append(gender);
    battleCard.append(lvl);    
    battleCard.append(backHealthBar);
    battleCard.append(health);

    spriteDiv.append(backSprite);

    setTimeout(function() {
        $(backSprite).css('margin-left', '8rem');
    }, 1000);

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

    const backHealthBar = $("<div class = 'currentHealthBar'>");
    const healthBar = $("<div id = 'oppUpdatedHealthBar'>");

    name.text(oppSelectedPokemon[0].name.toUpperCase());

    lvl.text('Lv99');

    backHealthBar.append(healthBar);
    battleCard.append(name);
    battleCard.append(gender);
    battleCard.append(lvl);    
    battleCard.append(backHealthBar);

    
    spriteDiv.append(sprite);

    setTimeout(function() {
        $(sprite).css('margin-right', '9rem');
    }, 1000);

    $(oppBattle).append(battleCard);
    $(oppBattle).append(spriteDiv);
    $('#battleContainer').append(oppBattle)
    

}

const createLeftBar = (bar) => {

    const leftBorder = $("<div class = 'leftBorder'>");
    const leftBar = $("<div class = 'leftBar'>");

    const leftP = $('<p>');
    const leftP2 = $('<p>');

    leftP.text('What will');
    leftP2.text(`${selectedPokemon[0].name.toUpperCase()} do?`);

    $(leftBar).append(leftP);
    $(leftBar).append(leftP2);

    $(leftBorder).append(leftBar);

    $(bar).append(leftBorder);
}

const createRightBar = (bar) => {

    const rightBar = $("<div class = 'rightBar'>");
    const rightBorder = $("<div class = 'rightBorder'>");

    const rightB1 = $("<button class = 'button' id = 'fight'>");
    const rightB2 = $("<button class = 'button' id = 'bag'>");
    const buttonRow1 = $("<div class = 'buttonRow1'>")

    const rightB3 = $("<button class = 'button' id = 'pokemonStorage'>");
    const rightB4 = $("<button class = 'button' id = 'run'>");
    const buttonRow2 = $("<div class = 'buttonRow2'>")

    rightB1.text('FIGHT');
    rightB2.text('BAG');
    rightB3.text('POKEMON');
    rightB4.text('RUN');

    $(buttonRow1).append(rightB1);
    $(buttonRow1).append(rightB2);
    $(buttonRow2).append(rightB3);
    $(buttonRow2).append(rightB4);

    $(rightBar).append(buttonRow1);
    $(rightBar).append(buttonRow2);

    $(rightBorder).append(rightBar);

    $(bar).append(rightBorder);
}

const createAttackMenu = () => {

    $('.leftBar').empty();

    const attack1 = $("<button class = 'attackButton' id = 'attack1'>");
    const attack2 = $("<button class = 'attackButton' id = 'attack2'>");
    const buttonRow1 = $("<div class = 'attackButtonRow1'>")

    const attack3 = $("<button class = 'attackButton' id = 'attack3'>");
    const attack4 = $("<button class = 'attackButton' id = 'attack4'>");
    const buttonRow2 = $("<div class = 'attackButtonRow2'>")

    attack1.text(`${selectedPokemon[0].attack1[0]}`.toUpperCase());
    attack2.text(`${selectedPokemon[0].attack2[0]}`.toUpperCase());
    attack3.text(`${selectedPokemon[0].attack3[0]}`.toUpperCase());
    attack4.text(`${selectedPokemon[0].attack4[0]}`.toUpperCase());

    $(buttonRow1).append(attack1);
    $(buttonRow1).append(attack2);
    $(buttonRow2).append(attack3);
    $(buttonRow2).append(attack4);

    $('.leftBar').append(buttonRow1);
    $('.leftBar').append(buttonRow2);

    $('.leftBorder').css('background', 'white');

    $('.leftBorder').append($('.leftBar'));
}

const playerAttack = () => {

    $('.leftBar').empty();

    const p = $("<p class = 'attackText'>");
    p.text(`${selectedPokemon[0].name.toUpperCase()} used ${selectedPokemon[0].attack1[0].toUpperCase()}`);
    $('.leftBar').append(p);




    setTimeout(function() {
        $('#yourSprite').addClass('yourAttackAnimation');
    }, 500);
    setTimeout(function() {
        $('#oppSprite').addClass('blink');
    }, 1000);




    let randDmg = (Math.floor(Math.random() * Math.floor(3)) + 1);
    const damage = selectedPokemon[0].attack1[randDmg];

    oppSelectedPokemon[0].currentHp -= damage;

    attackNum = damage;
    let a = (oppSelectedPokemon[0].currentHp * 100) / oppSelectedPokemon[0].hp;

    setTimeout(function() {

        $('.leftBar').empty();
        $('.leftBar').append(p);



        if(randDmg === 1) {
            p.text(`It\'s not very effective...`);
        }

        else if(randDmg === 3) {
            p.text(`It\'s super effective!`);
        }




        $('#oppUpdatedHealthBar').animate({
            'width': a + "%"
        }, 700);

        if(oppSelectedPokemon[0].currentHp < (oppSelectedPokemon[0].hp / 2) && oppSelectedPokemon[0].currentHp > (oppSelectedPokemon[0].hp / 4)) {
            $('#oppUpdatedHealthBar').css('background-color', '#E6C916');
        }
    
        else if(oppSelectedPokemon[0].currentHp <= (oppSelectedPokemon[0].hp / 4)) {
            $('#oppUpdatedHealthBar').css('background-color', '#FD5439');
        }

        $('#yourSprite').removeClass('yourAttackAnimation');
        $('#oppSprite').removeClass('blink');

    }, 2250);

    if(oppSelectedPokemon[0].currentHp <= 0) {
        gameOver = 0;
        setTimeout(function() {
            $('#oppSprite').css('margin-top', '100rem');
            $('.leftBar').empty();
            $('.leftBar').append(p);
            p.text(`${oppSelectedPokemon[0].name.toUpperCase()} has fainted...`);

        }, 4000);
    }
}

const oppAttack = () => {

    $('.leftBar').empty();

    const p = $("<p class = 'attackText'>");
    p.text(`${oppSelectedPokemon[0].name.toUpperCase()} used ${oppSelectedPokemon[0].attack1[0].toUpperCase()}`);
    $('.leftBar').append(p);



    setTimeout(function() {
        $('#oppSprite').addClass('oppAttackAnimation');
    }, 500);
    setTimeout(function() {
        $('#yourSprite').addClass('blink');
    }, 1000);




    let randDmg = (Math.floor(Math.random() * Math.floor(3)) + 1);
    const damage = oppSelectedPokemon[0].attack1[randDmg];
    selectedPokemon[0].currentHp -= damage;



    let a = (selectedPokemon[0].currentHp * 100) / selectedPokemon[0].hp;



    setTimeout(function() {

        $('.leftBar').empty();
        $('.leftBar').append(p);


        if(randDmg === 1) {
            p.text(`It\'s not very effective...`);
        }

        else if(randDmg === 3) {
            p.text(`It\'s super effective!`);
        }



        $('#playerUpdatedHealthBar').animate({
            'width': a + "%"
        }, 700);

        if(selectedPokemon[0].currentHp < (selectedPokemon[0].hp / 2) && selectedPokemon[0].currentHp > (selectedPokemon[0].hp / 4)) {
            $('#playerUpdatedHealthBar').css('background-color', '#E6C916');
        }

        else if(selectedPokemon[0].currentHp <= (selectedPokemon[0].hp / 4)) {
            $('#playerUpdatedHealthBar').css('background-color', '#FD5439');
        }

        const currentHealth = $('.currentHealth');
        currentHealth.text((selectedPokemon[0].currentHp) + '/ ' + selectedPokemon[0].hp);

        $('#oppSprite').removeClass('oppAttackAnimation');
        $('#yourSprite').removeClass('blink');
        
    }, 2250);

    if(selectedPokemon[0].currentHp <= 0) {
        gameOver = 0;
        setTimeout(function() {
            $('#yourSprite').css('margin-top', '100rem');
            $('.leftBar').empty();
            $('.leftBar').append(p);
            p.text(`${selectedPokemon[0].name.toUpperCase()} has fainted...`);

        }, 4000);
    }

    else {
        setTimeout(function() {

            const bar = $('.bar');
            $('.leftBorder').remove();
            $('.rightBorder').remove();
            createLeftBar(bar);
            createRightBar(bar);
        }, 4000);
    }
}


/* START OF JQUERY */


$(() => {

    $('#create').on('click', (event) => {

        scrollWindow($('#scroll'), 1000);
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

        scrollWindow(confirm, 1000)

    });

    $('body').on('click', '.confirmDiv', (event) => {

        yourPokemon();
        oppPokemon();

        playAudio();

        createOppBattleCard();
        createPlayerBattleCard();

        const battleContainer = $('#battleContainer');
        const bar = $("<div class = 'bar'>");

        createLeftBar(bar);
        createRightBar(bar);

        $(battleContainer).append(bar);

        scrollWindow(bar, 1000);

    });

    $('body').on('click', '#fight', (event) => {
        createAttackMenu();
    });

    $('body').on('click', '#attack1', (event) => {
        if(gameOver === 1) {
        playerAttack();
        }
        if(gameOver === 1) {
        setTimeout(oppAttack, 5000);
        }
    });

    $('body').on('click', '#run', (event) => {
        $('#battleContainer').remove();
        const battleContainer = $("<div id = 'battleContainer'>");
        $('body').append(battleContainer);

        selectedPokemon[0].currentHp = selectedPokemon[0].hp;
        oppSelectedPokemon[0].currentHp = oppSelectedPokemon[0].hp;

        selectedPokemon = [];
        oppSelectedPokemon = [];

    });
});
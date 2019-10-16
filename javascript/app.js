class getPokemonStats {
    constructor(name, hp, sprite) {
        this.name = name;
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
const makePokemon = (randomId) => {
    const $container = $('#team1');

    $.ajax({
        url: `https://pokeapi.co/api/v2/pokemon/${randomId}/`,
        type: "GET",
    }).done(function(data) {
        const team = $("<div class = 'pokemonBox'>"); 
        const sprite = $(`<img src = ${data.sprites.front_default} class = 'sprite'>`);
        const name = $("<p class = 'pokemonName'>");
        const gender = $(`<img src = '${getRandomGender()}' class = 'gender'>`);
        name.text(data.name);

        $container.append(team);
        team.append(sprite);
        team.append(name);
        team.append(gender);

    })
}

$(() => {
    $('#create').on('click', (event) => {
        for(i = 0; i < 2; i++) {
            const randomId = getRandomId();
            makePokemon(randomId);
        }
    })
})
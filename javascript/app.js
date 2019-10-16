class getPokemonStats {
    constructor(name, hp, sprite) {
        this.name = name;
        this.hp = hp;
        this.sprite = sprite;
        // this.gender = gender;
        this.attack1 = '';
        this.attack2 = '';
        this.attack3 = '';
        this.attack4 = '';
    }
}

// $(() => {

// const makePokemon = () => {
//         let randPokemon = Math.floor(Math.random() * Math.floor(803));
//         $.ajax({
//             url: `https://pokeapi.co/api/v2/pokemon/${randPokemon}/`,
//             type: "GET",
//         }).done(function(data) {
//             // let $gender;
//             // if (Math.random() < 0.5) {
//             //     $gender = 'img/female.png';
//             // }
//             // else {
//             //     $gender = 'img/male.png';
//             // }
//             //console.log(new pokemon(data.name, data.stats[5].base_stat, data.sprites.front_default));
//             const pokemon = new getPokemonStats(data.name, data.stats[5].base_stat, data.sprites.front_default);
//             console.log(pokemon);
//             console.log(data.sprites)
//             const $container = $('#team1');
//             const $div = $(`<div class='team'>`);
//             const $img = $(`<img src='${pokemon.sprite.front_default}'>`);

//             $container.append($div);
//             $div.append($img);
    
//         });
//     }
//     // const appendTeam = () => {
//     //     makePokemon();
//     //     const $container = $('#team1');
//     //     const $poke_div = $(`<div id=${i} class='team'>`);
//     //     const $poke_sprite = $(`<img src=${data.sprite} class='sprite'>`);
//     //     // const $poke_gender = $(`<img src='${$gender}' class='gender'>`);
//     //     const $poke_name = $("<h3 class='title'>");
//     //     $poke_name.text($poki.name);
    
//     //     $container.append($poke_div);
//     //     $poke_div.append($poke_sprite);
//     //     $poke_div.append($poke_name);
//     //     // $poke_div.append($poke_gender);
    
//     //     console.log(data);
//     // }

// const loop = (num) => {
//     for(i = 0; i < num; i++) {
//         makePokemon();
//     }
// }
//     $('#create').on('click', (event) => {
//         loop(2);
//     })
// })

const makePokemon = (randPokemon) => {
    const $container = $('#team1');
    $.ajax({
        url: `https://pokeapi.co/api/v2/pokemon/${randPokemon}/`,
        type: "GET",
    }).done(function(data) {
        console.log(data);
        console.log(data.sprites);
        console.log(data.sprites.front_default);
        const $poke_sprite = $(`<img src=${data.sprites.front_default}>`);
        $container.append($poke_sprite);

    })
}

$(() => {
    $('#create').on('click', (event) => {
        for(i = 0; i < 4; i++) {
            let randPokemon = Math.floor(Math.random() * Math.floor(808));
            makePokemon(randPokemon);
        }
    })
})
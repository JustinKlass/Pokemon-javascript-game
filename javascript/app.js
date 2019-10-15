$(() => {
    const $container = $('#team1');
    $('#create').on('click', (event) => {
        for(i = 0; i < 1; i++) {
            let pokemon = Math.floor(Math.random() * Math.floor(808));
            console.log(pokemon);
            $.ajax({
                url: `https://pokeapi.co/api/v2/pokemon/${pokemon}/`,
                type: "GET",
            }).done(function(data) {
                console.log(data);
                console.log(data.sprites);
                console.log(data.sprites.front_default);
                const $poke_sprite = $(`<img src=${data.sprites.front_default}>`);
                $container.append($poke_sprite);

        })
        }
    })
})

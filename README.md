# Pokemon

https://justinklass.github.io

This program uses the Pokemon API to randomly generate two teams of six pokemon. The first six
are player's and the second six are the computer's. A player can select a pokemon from their team to battle a randomly selected pokemon from the computer's team.

The Pokemon API is used to query the name, sprite, hp, id, and attacks of the selected pokemon. The game is started when the player hits confirm. The program has a variable set to one when it is loaded. When an attack function is called, it will check to see if a pokemon's health is equal to or below zero. If it is, it will set the variable to zero, stopping the game.

Audio files are played through an audio play function at certain specific times. The attack audio is played when someone attacks. The battle audio is played at the beginning of the battle. The damage audio is played when someone takes damage.

Ongoing problems include the issue of transitioning the sprites correctly when a pokemon faints and consistently and reliably playing more than one game without having to reload the page.

Future additions include adding a pokedex on a seperate page and being able to create your own teams of six to battle with. I would also like to get real damage values. Lastly, I would like to have battles with more than one pokemon on each team.

To get your own version of this program, simply go to https://github.com/JustinKlass/JustinKlass.github.io and click on the clone button. Copy the provided url and open your terminal. Type 'git clone url'. After that, you should have your very own cloned version!



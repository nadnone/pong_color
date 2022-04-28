import { C_CENTER } from './contances.js'
import { InitkeyboardEvent } from './keyboardEvent.js'
import { Player } from './Player.js'
import { gameloop } from './gameloop.js'
import { Ball } from './Ball.js';
import { IA } from './IAPlayer2.js';

let game_canva = document.getElementById("game_canva");
let context = game_canva.getContext("2d");

let player1 = new Player(context, 5, C_CENTER.y);
let player2 = new Player(context, C_CENTER.x*2 - 35, C_CENTER.y)

// initialize IA
let ia = new IA(player2, context);


let ball = new Ball(C_CENTER.x, C_CENTER.y, context);

function init()
{
    game_canva.style.height = `${C_CENTER.h}px`;
    game_canva.style.width = `${C_CENTER.w}px`;

    InitkeyboardEvent(player1, player2, ball);

    setInterval(() => {
        gameloop(player1, player2, context, ball, ia)
    }, 60);

}


init();
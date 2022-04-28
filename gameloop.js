import { C_CENTER } from './contances.js'

let B_time = 0;

function gameloop(player1, player2, context, ball, ia)
{
    let A_time = Date.now();
    let delta_time = (A_time - B_time) / 1000;
    context.clearRect(0,0, C_CENTER.w, C_CENTER.h);
    
    draw_net(context);

    player1.update(delta_time);

    ball.update(delta_time, player1);

    ia.update(ball);


    B_time = Date.now(); 
}

function draw_net(context){

    // net
    context.beginPath();
    context.fillStyle = "#FFFFFF"
    context.rect(C_CENTER.x - 5, 0, 10, C_CENTER.h);
    context.fill();

}

export { gameloop }
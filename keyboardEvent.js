import { PLAYER_DIM } from "./contances.js";

function InitkeyboardEvent(player1, player2, ball)
{
    addEventListener("keydown", (event) => {

        if (event.key === "W" || event.key === "w")
        {
            player1.addVelocity(-12);
        }
        if (event.key === "S" || event.key === "s")
        {
            player1.addVelocity(12);
        }

        if (event.key === " ")
        {
            ball.startGame(PLAYER_DIM.w, player1.getPosY() + PLAYER_DIM.h/2);
        }

    });
}

export { InitkeyboardEvent }

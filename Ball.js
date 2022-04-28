import { C_CENTER, PLAYER_DIM } from "./contances.js";

export class Ball
{
    constructor(x,y, context)
    {
        this.x = x;
        this.y = y;
        this.h = 20;
        this.w = 20;
        this.angle = 90;
        this.context = context;
        this.running = false;
        this.speed = 256;
        this.sens = 1;
        this.loose = false;
    }
    getPosY()
    {
        return this.y;
    }
    getPosX()
    {
        return this.x;
    }
    collide()
    {
        this.angle *= -1;
        this.x -= 10;
        this.speed += 50;
    }

    update(delta_time, player1)
    {
        if (this.running)
        {

            this.x += Math.sin(this.angle) * this.speed * delta_time * this.sens;
            this.y += Math.cos(this.angle) * this.speed * delta_time * this.sens;
          
            this.context.beginPath();
            this.context.fillStyle = "#00FF00"
            this.context.rect(this.x, this.y, this.w, this.h);
            this.context.fill();


            this.collide_wall_check(player1);
        }
        else if(!this.running && this.loose)
        {
            this.context.beginPath();
            this.context.fillStyle = "#FF0000";
            this.context.font = "64px Arial Black";
            this.context.fillText("You Loose !", C_CENTER.x/2.5, C_CENTER.y);
            this.context.fill();
        }
        else 
        {
            this.context.beginPath();
            this.context.fillStyle = "#00FF00";
            this.context.font = "45px Arial Black";
            this.context.fillText("Press Spacebar", C_CENTER.x/2.2, C_CENTER.y);
            this.context.fillText("To play !", C_CENTER.x/1.33, C_CENTER.y*1.2);
            this.context.fill();
        }
    }
    collide_wall_check(player1)
    {
        // player1
        if(
            this.x < player1.getPosX() + PLAYER_DIM.w &&
            this.x + this.w > player1.getPosX() &&
            this.y < player1.getPosY() + PLAYER_DIM.h &&
            this.y + this.h > player1.getPosY()
        )
        {
            this.sens *= -1;
            this.x = 30;
        }
        // top
        else if(this.y < 0)
        {
            this.angle += 45;
            this.y += 10;
        }
        // bottom
        else if(this.y + this.h > C_CENTER.h)
        {
            this.angle += 45;
            this.y -= 10;
        }
        // right
        else if(this.x + this.w > C_CENTER.w)
        {
            this.sens *= -1;
            this.x -= 10;
        }
        // right
        else if(this.x < 0)
        {
            this.running = false;
            this.loose = true;
        }

    }

    startGame(x,y){

        this.x = x;
        this.y = y;
        this.speed = 256;
        this.angle = 45;
        this.running = true;
    }
    getIfRunning()
    {
        return this.running;
    }

}
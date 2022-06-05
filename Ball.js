import { C_CENTER, DEFAULT_BALL_SPEED, MAX_SPEED_BALL, PLAYER_DIM, SPEED_BALL_INCREAMENT } from "./constantes.js";

export class Ball
{
    constructor(x,y, context, statsBar)
    {
        this.x = x;
        this.y = y;
        this.h = 20;
        this.w = 20;
        this.angle = 45;
        this.context = context;
        this.running = false;
        this.speed = DEFAULT_BALL_SPEED;
        this.sens = 1;
        this.loose = false;
        this.statsBar = statsBar;
    }
    getPosY()
    {
        return this.y;
    }
    getPosX()
    {
        return this.x;
    }
    getSpeed()
    {
        return this.speed;
    }
    collide(statsBar)
    {
        this.sens = -1;
        this.x -= 10;
        this.speed += SPEED_BALL_INCREAMENT;

        this.angle *= -1;

        statsBar.addPts();
    }
    update(delta_time, player1)
    {
        if (this.running)
        {

            this.x += Math.sin(this.angle) * this.speed * delta_time;
            this.y += Math.cos(this.angle) * this.speed * delta_time;
          
            this.context.beginPath();
            this.context.fillStyle = "#00FF00"
            this.context.rect(this.x, this.y, this.w, this.h);
            this.context.fill();

            this.collide_wall_check(player1)

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
        // angle limit
        if(this.angle < -360 || this.angle > 360) this.angle = 45 * this.sens;
        if(this.speed > MAX_SPEED_BALL) this.speed = MAX_SPEED_BALL;

        // player1
        if(
            this.x < player1.getPosX() + PLAYER_DIM.w &&
            this.x + this.w > player1.getPosX() &&
            this.y < player1.getPosY() + PLAYER_DIM.h &&
            this.y + this.h > player1.getPosY()
        )
        {
            this.sens = 1;
            this.angle *= -1;
            this.x += 30;
        }
        // top
        if(this.y < 0)
        {
            this.angle = 135 - this.angle;
            this.y += 10 ;
        }
        // bottom
        else if(this.y + this.h > C_CENTER.h)
        {
            this.angle = 135 - this.angle;
            this.y -= 10;
        }
        // right
        else if(this.x + this.w > C_CENTER.w)
        {
            // ca n'arrivera jamais :)
        }
        // left
        if(this.x < 0)
        {
            this.running = false;
            this.loose = true;
        }


    }

    startGame(x,y){

        this.x = x;
        this.y = y;
        this.speed = DEFAULT_BALL_SPEED;
        this.statsBar.reset();
        this.angle = 45;
        this.running = true;
    }
    getIfRunning()
    {
        return this.running;
    }

}
import { C_CENTER, PLAYER_DIM } from "./contances.js";

export class Player {
    constructor(context, x, y){

        context.beginPath();
        context.fillStyle = "#FFFFFF"
        context.rect(x, y, PLAYER_DIM.w, PLAYER_DIM.h);
        context.fill();

        this.velocity_y = 0;
        this.SPEED = 32;
        this.context = context;

        this.posY = C_CENTER.y;
        this.posX = x;
    }


    setPosY(y)
    {
        this.y = y;
    }

    getPosY()
    {
        return this.posY;
    }
    getPosX()
    {
        return this.posX;
    }
    addVelocity(velocity){
        if (velocity > 24 ) velocity = 24;
        else if (velocity < -24) velocity = -24;

        this.velocity_y += velocity;

    }

    update(time){




        if (this.posY > C_CENTER.h - PLAYER_DIM.h) 
        {
            this.posY = C_CENTER.h - PLAYER_DIM.h;
            this.velocity_y = 0;
        }
        else if (this.posY < 0) 
        {
            this.posY = 0; 
            this.velocity_y = 0;
        }


        this.posY += this.velocity_y * this.SPEED * time;


        this.context.beginPath();
        this.context.fillStyle = "#FFFFFF"
        this.context.rect(this.posX, this.posY, PLAYER_DIM.w, PLAYER_DIM.h);
        this.context.fill();
    }

}
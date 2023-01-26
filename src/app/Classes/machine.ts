import { Part } from "./Part";

export class Machine extends Part {
    private radius: number = 40;

    constructor(x: number, y: number, id: number) {
        super();
        this.x = x;
        this.y = y;
        this.id = id;
    }

    override draw(ctx: CanvasRenderingContext2D, x: number, y: number) {
        ctx.beginPath();
    }

    override update(ctx: CanvasRenderingContext2D) {
        this.colour = 'rgba(0, 255, 145, 255)'
        this.renderArrow(ctx);
        ctx.strokeStyle = 'rgba(0, 0, 0, 255)'; //black
        ctx.lineWidth = 10;
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.radius, this.radius, 0, 0, 360);
        ctx.stroke();
        ctx.fillStyle = this.colour;
        ctx.fill();
        ctx.fillStyle = 'rgba(0, 0, 0, 255)';
        ctx.font = '30px Arial'
        ctx.fillText('M' + this.id, this.x - this.radius / 2, this.y + this.radius * 0.25);
        this.flash();
    }

    override move(x: number, y: number): void {
        
    }

    changeColour(color: string): void {
        throw new Error("Method not implemented.");
    }

    flash() {
    }

    override isMouseInside(mouseX: number, mouseY: number): boolean {
        return (mouseX - this.x) * (mouseX - this.x) + (mouseY - this.y) * (mouseY - this.y) <= this.radius * this.radius;
    }
}

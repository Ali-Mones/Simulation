import { Part } from "./part";

export class Queue extends Part {

    private width = 80;
    private height = 50;

    constructor(x: number, y: number, id: number) {
        super();
        this.x = x;
        this.y = y;
        this.id = id;
    }

    override draw(ctx: CanvasRenderingContext2D, x: number, y: number): void {
        
    }
    override update(ctx: CanvasRenderingContext2D): void {
        this.colour = 'rgba(255, 255, 148, 255)'
        this.renderArrow(ctx);
        ctx.fillStyle = this.colour;
        ctx.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
        ctx.lineWidth = 5;
        ctx.strokeStyle = 'rgba(0, 0, 0, 255)'; //black
        ctx.beginPath();
        ctx.strokeRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
        ctx.fillStyle = 'rgba(0, 0, 0, 255)';
        ctx.font = '30px Arial'
        ctx.fillText('Q' + this.id, this.x - this.width / 4, this.y + this.height * 0.2);
    }
    override move(x: number, y: number): void {
        throw new Error("Method not implemented.");
    }
    override isMouseInside(mouseX: number, mouseY: number): boolean {
        throw new Error("Method not implemented.");
    }
    override changeColour(color: string): void {
        throw new Error("Method not implemented.");
    }
    override flash(): void {
        throw new Error("Method not implemented.");
    }
}
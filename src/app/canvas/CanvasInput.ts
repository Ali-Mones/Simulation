import { CanvasComponent } from "./canvas.component";

export class CanvasInput {

    constructor(private canvas: CanvasComponent) {}

    mouseDown() {
        this.canvas.render();
    }

    mouseUp() {

    }

    mouseMove() {
        
    }
}
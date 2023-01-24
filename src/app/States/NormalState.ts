import { MoveState } from "./moveState";
import { State } from "./state";

export class NormalState extends State {

    mouseUp(e: MouseEvent): void {
    }
    mouseDown(e: MouseEvent): void {
        this.canvas.parts.forEach((part) => {
            if (part.isMouseInside(e.x, e.y - 28)) {
                this.canvas.state = new MoveState(this.canvas, part, e.x, e.y - 28);
            }
        });
    }
    mouseMove(e: MouseEvent): void {
    }
    
}